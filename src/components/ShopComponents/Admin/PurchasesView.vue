<template>
  <div>
    <PaginatedDataTable
      ref="purchaseTable"
      :headers="headers"
      :items="purchases"
      :total-items="totalItems"
      default-sort-by="date"
      :default-sort-desc="true"
      @reload="fetchData"
    >
      <template #header>
        <v-row>
          <v-col class="d-flex align-center">
            <v-menu
              location="bottom"
              :close-on-content-click="false"
            >
              <template #activator="{ props }">
                <v-btn
                  variant="outlined"
                  color="primary"

                  v-bind="props"
                >
                  <v-icon start>
                    mdi-filter
                  </v-icon>
                  {{ $t('status') }}
                </v-btn>
              </template>
              <v-card>
                <v-checkbox
                  v-for="(st, index) in availableStatus"
                  :key="index"
                  v-model="selectedStatus"
                  class="ml-2, mr-2"
                  density="compact"
                  hide-details
                  :label="$t(`_shop.purchaseStatus.${st.toLowerCase()}`)"
                  :value="st"
                  @update:model-value="newStatus"
                />
                <a
                  href="javascript:void(0)"
                  class="ma-1"
                  @click="selectedStatus = []; fetchData()"
                >
                  {{ $t('reset') }}</a>
              </v-card>
            </v-menu>
            <v-menu
              v-if="selectedPurchases.length > 0"
              location="bottom"
            >
              <template #activator="{ props }">
                <v-btn
                  variant="outlined"
                  color="primary"
                  v-bind="props"
                  class="ml-2"
                >
                  <v-icon start>
                    mdi-cog
                  </v-icon>
                  {{ $t('actions') }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-if="selectedPurchases.some(p => p.status === 'FINISHED' && p.refundable)"
                  @click="openBulkAction('refund')"
                >
                  <v-list-item-title>
                    <v-icon start>
                      mdi-cash-refund
                    </v-icon>
                    {{ $t('_purchases.labels.refund') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-if="selectedPurchases.some(p => p.status === 'RECURRING')"
                  @click="openBulkAction('cancelSub')"
                >
                  <v-list-item-title>
                    <v-icon start>
                      mdi-cancel
                    </v-icon>
                    {{ $t('_purchases.labels.cancelSubscription') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-if="selectedPurchases.some(p => p.status === 'FINISHED')"
                  @click="openBulkAction('revoke')"
                >
                  <v-list-item-title>
                    <v-icon start>
                      mdi-cancel
                    </v-icon>
                    {{ $t('_purchases.labels.revoke') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-if="selectedPurchases.some(p => p.status === 'REVOKED')"
                  @click="openBulkAction('unrevoke')"
                >
                  <v-list-item-title>
                    <v-icon start>
                      mdi-check
                    </v-icon>
                    {{ $t('_purchases.labels.unrevoke') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                  @click="openBulkAction('delete')"
                >
                  <v-list-item-title>
                    <v-icon start>
                      mdi-delete
                    </v-icon>
                    {{ $t('delete') }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </template>
      <template #item.select-field="{ item }">
        <v-checkbox
          v-if="$checkProp('purchase_edit')"
          :disabled="(selectedPurchases.length > 0 && !selectedPurchases.some(p => p.status === item.status)) || (selectedPurchases.length >= 15 && !selectedPurchases.includes(item))"
          v-model="selectedPurchases"
          class="pt-3"
          density="compact"
          :value="item"
        />
      </template>
      <template #item.date="{ item }">
        <span>{{ new Date(item.date).toLocaleString() }}</span>
      </template>
      <template #item.user="{ item }">
        <UserLink :user="item.user" />
      </template>
      <template #item.amount_net="{ item }">
        <span v-if="!item.credits_used">
          {{ utils.formatCurrency(item.amount_net, item.currency.code) }}
        </span>
      </template>
      <template #item.amount_total="{ item }">
        <span v-if="!item.credits_used">
          {{ utils.formatCurrency(item.amount_total, item.currency.code) }}
        </span>
      </template>
      <template #item.credits="{ item }">
        <span v-if="item.credits_used">
          {{ item.credits }}
        </span>
      </template>
      <template #item.status="{ item }">
        <span>
          <PurchaseStatusChip :status="item.status" />
        </span>
      </template>
      <template #item.actions="{ item }">
        <v-btn
          variant="flat"
          size="small"
          color="error"
          @click="showDetails(item)"
        >
          <v-icon start>
            mdi-eye
          </v-icon>
          {{ $t('details') }}
        </v-btn>
      </template>
    </PaginatedDataTable>
    <Dialog
      ref="purchaseDetailDialog"
      v-model="purchaseDetailShown"
      icon="mdi-currency-usd"
      :title="$t('_purchases.labels.details')"
      :max-width="700"
    >
      <template #default>
        <div v-if="currentPurchase != null">
          <v-row>
            <v-col>
              <div class="text-h6 mt-3">
                {{ $t('details') }}
              </div>
              <v-table>
                <template #default>
                  <tbody>
                    <tr>
                      <td>{{ $t('id') }}</td>
                      <td>{{ currentPurchase.id }}</td>
                    </tr>
                    <tr>
                      <td>{{ $t('user') }}</td>
                      <td><span><UserLink :user="currentPurchase.user" /></span></td>
                    </tr>
                    <tr>
                      <td>{{ $t('date') }}</td>
                      <td> {{ new Date(currentPurchase.date).toLocaleString() }}</td>
                    </tr>
                    <tr>
                      <td>{{ $t('status') }}</td>
                      <td>
                        <PurchaseStatusChip :status="currentPurchase.status" />
                      </td>
                    </tr>
                    <tr v-if="currentPurchase.credits_used">
                      <td> {{ $store.getters.shopConfig.credits_display_title }}</td>
                      <td>{{ currentPurchase.credits }}</td>
                    </tr>
                    <tr v-if="!currentPurchase.credits_used">
                      <td>{{ $t('_purchases.labels.amountNet') }}</td>
                      <td>
                        {{ utils.formatCurrency(currentPurchase.amount_net, currentPurchase.currency.code) }}
                      </td>
                    </tr>
                    <tr v-if="!currentPurchase.credits_used">
                      <td> {{ $t('_purchases.labels.amountTotal') }}</td>
                      <td>
                        {{ utils.formatCurrency(currentPurchase.amount_total, currentPurchase.currency.code) }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-table>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <div class="text-h6">
                {{ $t('packets') }}
              </div>

              <div>
                <v-table>
                  <template #default>
                    <thead>
                      <tr>
                        <th>
                          {{ $t('name') }}
                        </th>
                        <th>
                          {{ $t('price') }}
                        </th>
                        <th>
                          {{ $t('discount') }}
                        </th>
                        <th>
                          {{ $t('_shop.labels.recipient') }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="cp in currentPurchase.cart_packets"
                        :key="cp.id"
                      >
                        <td>{{ cp.packet_title }}</td>
                        <td v-if="!currentPurchase.credits_used && cp.price_net != null">
                          {{ utils.formatCurrency(cp.price_net, cp.currency.code) }}
                          ({{ $t('_shop.labels.net') }})
                        </td>
                        <td v-else-if="!currentPurchase.credits_used">
                          {{ utils.formatCurrency(cp.price_total, cp.currency.code) }}
                        </td>
                        <td v-else>
                          {{ cp.credits }}
                          {{ $store.getters.shopConfig.credits_display_title }}
                        </td>
                        <td>
                          <v-chip
                            v-if="cp.discount != null"
                            color="info"
                            size="small"
                          >
                            -{{ cp.discount.percentage }}% {{ cp.discount.name }}
                          </v-chip>
                          <div v-else>
                            -
                          </div>
                        </td>
                        <td>
                          <UserLink v-if="cp.target_user" :user="cp.target_user" />
                          <UserLink v-else :user="currentPurchase.user" />
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-table>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <div class="text-h6">
                {{ $t('payments') }}
              </div>
              <v-table>
                <template #default>
                  <thead>
                    <tr>
                      <th>
                        {{ $t('date') }}
                      </th>
                      <th>
                        {{ $t('gateway') }}
                      </th>
                      <th>
                        {{ $t('amount') }}
                      </th>
                      <th>
                        {{ $t('invoice') }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="debit in filterFinishedDebits(currentPurchase.debits)"
                      :key="debit.id"
                    >
                      <td>{{ new Date(debit.date).toLocaleString() }}</td>
                      <td v-if="debit.transaction_url == null">
                        {{ debit.payment_gateway.name }}
                      </td>
                      <td v-else>
                        <a
                          :href="debit.transaction_url"
                          target="_blank"
                        >
                          {{ debit.payment_gateway.name }}
                        </a>
                      </td>
                      <td v-if="debit.amount_total != null">
                        {{ utils.formatCurrency(debit.amount_total, currentPurchase.currency.code) }}
                      </td>
                      <td v-else>
                        {{ debit.credits }}
                        {{ $store.getters.shopConfig.credits_display_title }}
                      </td>
                      <td>
                        <v-btn
                          color="primary"
                          variant="outlined"
                          size="small"
                          :disabled="!debit.invoice_available"
                          @click="downloadInvoice(debit)"
                        >
                          <v-icon>
                            mdi-file-download
                          </v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-table>
            </v-col>
          </v-row>
        </div>
      </template>
      <template #actions>
        <div v-if="currentPurchase != null && $checkProp('purchase_edit')">
          <v-btn
            variant="text"
            color="green"
            @click="checkPurchase(currentPurchase)"
          >
            <v-icon start>
              mdi-credit-card-refresh
            </v-icon>
            {{ $t('refresh') }}
          </v-btn>
          <v-btn
            v-if="currentPurchase.status === 'RECURRING'"
            variant="text"
            color="error"
            @click="$refs.confirmSubCancelDialog.show(currentPurchase)"
          >
            <v-icon start>
              mdi-cancel
            </v-icon>
            {{ $t('_purchases.labels.cancelSubscription') }}
          </v-btn>
          <v-btn
            v-if="currentPurchase.status === 'FINISHED'"
            variant="text"
            color="warning"
            @click="revokePurchase(currentPurchase)"
          >
            <v-icon start>
              mdi-cancel
            </v-icon>
            {{ $t('_purchases.labels.revoke') }}
          </v-btn>
          <v-btn
            v-if="currentPurchase.status === 'REVOKED'"
            variant="text"
            color="warning"
            @click="unrevokePurchase(currentPurchase)"
          >
            <v-icon start>
              mdi-check
            </v-icon>
            {{ $t('_purchases.labels.unrevoke') }}
          </v-btn>
          <v-btn
            v-if="currentPurchase.refundable"
            variant="text"
            color="error"
            @click="$refs.confirmRefundDialog.show(currentPurchase)"
          >
            <v-icon start>
              mdi-cash-refund
            </v-icon>
            {{ $t('_purchases.labels.refund') }}
          </v-btn>
          <v-btn
            variant="text"
            color="error"
            @click="$refs.confirmDeleteDialog.show(currentPurchase)"
          >
            <v-icon start>
              mdi-delete
            </v-icon>
            {{ $t('delete') }}
          </v-btn>
        </div>
      </template>
    </Dialog>
    <ConfirmationDialog
      ref="confirmRefundDialog"
      :text="$t('_purchases.messages.refundConfirm')"
      btn-icon="mdi-cash-refund"
      :btn-text="$t('_purchases.labels.refund')"
      @submit="refundPurchase"
    />
    <DeleteConfirmationDialog
      ref="confirmDeleteDialog"
      :text="$t('_purchases.messages.deleteConfirm')"
      btn-icon="mdi-delete"
      :btn-text="$t('delete')"
      :countdown="true"
      @submit="deletePurchase"
    />
    <ConfirmationDialog
      ref="confirmSubCancelDialog"
      :text="$t('_purchases.messages.cancelSubscriptionConfirm')"
      btn-icon="mdi-cancel"
      :btn-text="$t('_purchases.labels.cancelSubscription')"
      :width="500"
      @submit="cancelSubscription"
    />
    <ConfirmationDialog
      ref="bulkConfirmDialog"
      :text="bulkConfirmText"
      :btn-text="bulkConfirmBtnText"
      btn-icon="mdi-check"
      :width="500"
      @submit="runBulkAction"
    />
  </div>
</template>

<script>
import openapi from '../../../api/openapi';

export default {
  data() {
    return {
      headers: [
        { key: 'select-field', sortable: false, width: '50px' },
        {title: this.$t('id'), key: 'id', sortable: false},
        {title: this.$t('status'), key: 'status', sortable: false},
        {title: this.$t('date'), key: 'date'},
        {title: this.$t('user'), key: 'user', sortable: false},
        {title: this.$t('_purchases.labels.amountNet'), key: 'amount_net'},
        {title: this.$t('_purchases.labels.amountTotal'), key: 'amount_total'},
        {title: this.$store.getters.shopConfig.credits_display_title, key: 'credits'},
        {
          title: this.$t('actions'), key: 'actions', width: '200px', sortable: false, align: 'end',
        },
      ],
      selectedPurchases: [],
      purchases: null,
      currentPurchase: null,
      totalItems: 0,
      orderBy: 'date',
      sortDesc: true,
      selectedStatus: [],
      availableStatus: [],
      bulkAction: null,
      bulkActionItems: [],
      bulkConfirmText: null,
    };
  },
  computed: {
    purchaseDetailShown: {
      get() {
        return this.$route.query.purchase_id != null;
      },
      set(newValue) {
        if (!newValue) {
          this.$router.push({query: {}});
        }
      },
    },
    bulkConfirmBtnText() {
      const cfg = this.bulkActions[this.bulkAction];
      return cfg?.label ?? this.$t('confirm');
    },
    bulkActions() {
      return {
        refund: {
          label: this.$t('_purchases.labels.refund'),
          confirmMessageKey: '_purchases.messages.refundConfirm',
          filter: (p) => p.status === 'FINISHED' && p.refundable,
          request: (api, purchase) => api.shop_editPurchase({uuid: purchase.id}, {status: 'REFUNDED'}),
        },
        cancelSub: {
          label: this.$t('_purchases.labels.cancelSubscription'),
          confirmMessageKey: '_purchases.messages.cancelSubscriptionConfirm',
          filter: (p) => p.status === 'RECURRING',
          request: (api, purchase) => api.shop_editPurchase({uuid: purchase.id}, {status: 'FINISHED'}),
        },
        revoke: {
          label: this.$t('_purchases.labels.revoke'),
          filter: (p) => p.status === 'FINISHED',
          request: (api, purchase) => api.shop_editPurchase({uuid: purchase.id}, {status: 'REVOKED'}),
        },
        unrevoke: {
          label: this.$t('_purchases.labels.unrevoke'),
          filter: (p) => p.status === 'REVOKED',
          request: (api, purchase) => api.shop_editPurchase({uuid: purchase.id}, {status: 'FINISHED'}),
        },
        delete: {
          label: this.$t('delete'),
          confirmMessageKey: '_purchases.messages.deleteConfirm',
          filter: () => true,
          request: (api, purchase) => api.shop_deletePurchase({uuid: purchase.id}),
        },
      };
    },
  },
  watch: {
    $route() {
      this.updateCurrentPurchase();
    },
  },
  mounted() {
    this.updateCurrentPurchase();
    this.fetchData();
    this.queryAvailableStatus();
  },
  methods: {
    async updateCurrentPurchase() {
      const api = await openapi;

      if (this.$route.query.purchase_id != null) {
        api.shop_getPurchase({uuid: this.$route.query.purchase_id}).then((rsp) => {
          this.currentPurchase = rsp.data;
        }).catch(() => {
          this.currentPurchase = null;
        });
      } else {
        this.currentPurchase = null;
      }
    },
    async fetchData(queryParams = null) {
      const api = await openapi;

      this.updateCurrentPurchase();

      api.shop_getPurchases({
        status: this.selectedStatus,
        ...(queryParams != null ? queryParams : this.$refs.purchaseTable.getQueryParameters()),
      }).then((rsp) => {
        this.selectedPurchases = [];
        this.purchases = rsp.data.items;
        this.totalItems = rsp.data.total;
      });
    },
    async queryAvailableStatus() {
      (await openapi).shop_getPurchaseStatuses().then((rsp) => {
        this.availableStatus = rsp.data;
      });
    },
    showDetails(purchase) {
      this.$router.push({query: {purchase_id: purchase.id}});
    },
    filterFinishedDebits(debits) {
      return debits.filter((debit) => debit.status === 'FINISHED');
    },
    async downloadInvoice(debit) {
      (await openapi).shop_getDebitInvoice(
        {uuid: debit.id},
        null,
        {responseType: 'blob'},
      ).then((rsp) => {
        this.utils.showFile(rsp.data, `${debit.invoice_number}.pdf`);
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async revokePurchase(purchase) {
      const api = await openapi;

      api.shop_editPurchase({uuid: purchase.id}, {status: 'REVOKED'})
        .then(() => {
          this.$notify({
            title: this.$t('_purchases.messages.revokeSuccess'),
            type: 'success',
          });
          this.fetchData();
        }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async deletePurchase(purchase) {
      const api = await openapi;

      api.shop_deletePurchase({uuid: purchase.id})
        .then(() => {
          this.$notify({
            title: this.$t('_messages.deleteSuccess'),
            type: 'success',
          });
          this.fetchData();
          this.$refs.purchaseDetailDialog.close();
          this.$refs.confirmDeleteDialog.closeAndReset();
        });
    },
    async unrevokePurchase(purchase) {
      const api = await openapi;

      api.shop_editPurchase({uuid: purchase.id}, {status: 'FINISHED'})
        .then(() => {
          this.$notify({
            title: this.$t('_purchases.messages.unrevokeSuccess'),
            type: 'success',
          });
          this.fetchData();
        }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async refundPurchase(purchase) {
      const api = await openapi;

      api.shop_editPurchase({uuid: purchase.id}, {status: 'REFUNDED'})
        .then(() => {
          this.$notify({
            title: this.$t('_purchases.messages.refundInitSuccess'),
            type: 'success',
          });
          this.fetchData();
          this.$refs.confirmRefundDialog.closeAndReset();
        }).catch((err) => {
        console.log(err);
        this.$refs.confirmRefundDialog.setError(err);
      });
    },
    async checkPurchase(purchase) {
      const api = await openapi;

      purchase.debits.forEach((debit) => {
        if (debit.status === 'STARTED' || debit.status === 'APPROVED') {
          api.shop_checkPayment({uuid: debit.id}).then(() => {
            this.$notify({
              title: this.$t('_purchases.messages.refreshSuccess'),
              type: 'success',
            });
            this.fetchData();
          }).catch((err) => {
            console.log(err);
            this.utils.notifyUnexpectedError(err.response.data);
          });
        }
      });
    },
    async cancelSubscription(purchase) {
      const api = await openapi;

      api.shop_editPurchase({uuid: purchase.id}, {status: 'FINISHED'})
        .then(() => {
          this.$notify({
            title: this.$t('_messages.cancelSuccess'),
            type: 'success',
          });
          this.fetchData();
          this.$refs.confirmSubCancelDialog.closeAndReset();
        }).catch((err) => {
        console.log(err);
        this.$refs.confirmSubCancelDialog.setError(err);
      });
    },
    newStatus(status) {
      this.selectedStatus = status;
      this.fetchData();
    },
    openBulkAction(action) {
      const cfg = this.bulkActions[action];
      if (!cfg) return;
      const targets = this.selectedPurchases.filter(cfg.filter);
      if (targets.length === 0) return;
      this.bulkAction = action;
      this.bulkActionItems = targets;
      if (cfg.confirmMessageKey) {
        this.bulkConfirmText = `${this.$t(cfg.confirmMessageKey)} (${targets.length})`;
        this.$refs.bulkConfirmDialog.show();
      } else {
        this.runBulkAction();
      }
    },
    // TODO: Change Back-End to support multiple IDs in one request and change this to send one request per action type instead of one per purchase
    // TODO: Improve language keys to support pluralization and different wordings based on success/partial success/failure
    async runBulkAction() {
      if (!this.bulkAction || this.bulkActionItems.length === 0) return;
      const cfg = this.bulkActions[this.bulkAction];
      if (!cfg) return;
      const api = await openapi;
      const items = [...this.bulkActionItems];
      const results = await Promise.allSettled(items.map((purchase) => cfg.request(api, purchase)));
      const successCount = results.filter(r => r.status === 'fulfilled').length;
      const failedCount = items.length - successCount;

      if (successCount > 0) {
        this.$notify({ title: `${cfg.label} ${successCount}/${items.length}`, type: 'success' });
      }

      if (failedCount > 0) {
        const firstError = results.find(r => r.status === 'rejected');
        if (firstError?.reason?.response?.data) {
          this.utils.notifyUnexpectedError(firstError.reason.response.data);
        } else if (failedCount === items.length && this.$refs.bulkConfirmDialog) {
          this.$refs.bulkConfirmDialog.setErrorMessage(`${failedCount}/${items.length} failed`);
        }
      }

      if (successCount > 0) {
        await this.fetchData();
      }

      this.selectedPurchases = [];
      this.bulkAction = null;
      this.bulkActionItems = [];
      this.bulkConfirmText = null;
      if (this.$refs.bulkConfirmDialog) {
        this.$refs.bulkConfirmDialog.closeAndReset();
      }
    },
  },
};
</script>

