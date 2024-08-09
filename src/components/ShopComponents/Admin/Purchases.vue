<template>
    <div>
      <PaginatedDataTable
        ref="purchaseTable"
        :headers="headers"
        :items="purchases"
        :total-items="totalItems"
        default-sort-by="date"
        :default-sort-desc="true"
        @reload="fetchData">
        <template v-slot:header>
          <v-row>
            <v-col class="d-flex align-center">
              <v-menu offset-y :close-on-content-click="false">
                <template v-slot:activator="{ props }">
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
                <v-checkbox
                  class="ml-2, mr-2"
                  dense
                  hide-details
                  v-for="(st, index) in availableStatus"
                  :key="index"
                  v-model="selectedStatus"
                  :label="$t(`_shop.purchaseStatus.${st.toLowerCase()}`)"
                  :value="st"
                  @update:model-value="newStatus"
                ></v-checkbox>
                <a class="ma-1" @click="selectedStatus = []; fetchData()">
                  {{ $t('reset') }}</a>
              </v-menu>
            </v-col>
          </v-row>
        </template>
        <template v-slot:item.date="{ item }">
          <span>{{ new Date(item.date).toLocaleString() }}</span>
        </template>
        <template v-slot:item.user="{ item }">
          <UserLink :user="item.user"></UserLink>
        </template>
        <template v-slot:item.amount_net="{ item }">
          <span v-if="!item.credits_used">
            {{ item.currency.symbol }}
            {{ item.amount_net.toLocaleString(undefined, {minimumFractionDigits: 2}) }}
          </span>
        </template>
        <template v-slot:item.amount_total="{ item }">
          <span v-if="!item.credits_used">
            {{ item.currency.symbol }}
            {{ item.amount_total.toLocaleString(undefined, {minimumFractionDigits: 2}) }}
          </span>
        </template>
        <template v-slot:item.credits="{ item }">
          <span v-if="item.credits_used">
            {{ item.credits }}
          </span>
        </template>
        <template v-slot:item.status="{ item }">
          <span>
            <PurchaseStatusChip :status="item.status"></PurchaseStatusChip>
          </span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn variant="flat" size="small" color="error"
                 @click="showDetails(item)">
            <v-icon start>
              mdi-eye
            </v-icon>
            {{ $t('details') }}
          </v-btn>
        </template>
      </PaginatedDataTable>
      <Dialog
        ref="purchaseDetailDialog"
        icon="mdi-currency-usd"
        :title="$t('_purchases.labels.details')"
        :max-width="700"
        v-model="purchaseDetailShown">
        <template>
          <div v-if="currentPurchase != null">
            <v-row>
              <v-col>
                <div class="text-h6 mt-3">
                  {{ $t('details') }}
                </div>
                <v-list density="compact">
                  <v-list-item>
                    
                      {{ $t('id') }}
                    
                    
                      {{ currentPurchase.id }}
                    
                  </v-list-item>
                  <v-list-item>
                    
                      {{ $t('user') }}
                    
                    
                      <span><UserLink :user="currentPurchase.user"></UserLink></span>
                    
                  </v-list-item>
                  <v-list-item>
                    
                      {{ $t('date') }}
                    
                    
                      {{ new Date(currentPurchase.date).toLocaleString() }}
                    
                  </v-list-item>
                  <v-list-item>
                    
                      {{ $t('status') }}
                    
                    
                      <PurchaseStatusChip :status="currentPurchase.status"></PurchaseStatusChip>
                    
                  </v-list-item>
                  <v-list-item v-if="currentPurchase.credits_used">
                    
                      {{ $store.getters.shopConfig.credits_display_title }}
                    
                    
                      {{ currentPurchase.credits }}
                    
                  </v-list-item>
                  <v-list-item v-if="!currentPurchase.credits_used">
                    
                      {{ $t('_purchases.labels.amountNet') }}
                    
                    
                      {{ currentPurchase.amount_net
                      .toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                      {{ currentPurchase.currency.symbol }}
                    
                  </v-list-item>
                  <v-list-item v-if="!currentPurchase.credits_used">
                    
                      {{ $t('_purchases.labels.amountTotal') }}
                    
                    
                      {{ currentPurchase.amount_total
                      .toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                      {{ currentPurchase.currency.symbol }}
                    
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <div class="text-h6">
                  {{ $t('packets') }}
                </div>

                <div>
                  <v-table>
                    <template>
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
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="cp in currentPurchase.cart_packets" v-bind:key="cp.id"
                        >
                          <td>{{ cp.packet_title }}</td>
                          <td v-if="!currentPurchase.credits_used && cp.price_net != null">
                            {{ cp.price_net.toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                            {{ cp.currency.symbol }}
                            ({{ $t('_shop.labels.net') }})
                          </td>
                          <td v-else-if="!currentPurchase.credits_used">
                            {{ cp.price_total
                            .toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                            {{ cp.currency.symbol }}
                          </td>
                          <td v-else>
                            {{ cp.credits }}
                            {{ $store.getters.shopConfig.credits_display_title }}
                          </td>
                          <td>
                            <v-chip v-if="cp.discount != null" color="info" size="small">
                              -{{ cp.discount.percentage }}% {{ cp.discount.name }}
                            </v-chip>
                            <div v-else>
                              -
                            </div>
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
                  <template>
                    <thead>
                    <tr>
                      <th>
                        {{ $t('date') }}
                      </th>
                      <th>
                        {{ $t('gateway') }}
                      </th>
                      <th >
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
                      <td v-if="debit.transaction_url == null">{{ debit.payment_gateway.name }}</td>
                      <td v-else>
                        <a :href="debit.transaction_url" target="_blank">
                        {{ debit.payment_gateway.name }}
                        </a>
                      </td>
                      <td v-if="debit.amount_total != null">
                        {{ debit.amount_total
                        .toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                        {{ currentPurchase.currency.symbol }}
                      </td>
                      <td v-else>
                        {{ debit.credits }}
                        {{ $store.getters.shopConfig.credits_display_title }}
                      </td>
                      <td>
                        <v-btn color="primary" variant="outlined" size="small" :disabled="!debit.invoice_available"
                               @click="downloadInvoice(debit)">
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
        <template v-slot:actions>
          <div v-if="currentPurchase != null && $checkProp('purchase_edit')">
            <v-btn variant="text" color="green" @click="checkPurchase(currentPurchase)">
              <v-icon start>mdi-credit-card-refresh</v-icon>
              {{ $t('refresh') }}
            </v-btn>
            <v-btn variant="text" color="error" @click="$refs.confirmSubCancelDialog.show(currentPurchase)"
                   v-if="currentPurchase.status === 'RECURRING'">
              <v-icon start>mdi-cancel</v-icon>
              {{ $t('_purchases.labels.cancelSubscription') }}
            </v-btn>
            <v-btn variant="text" color="warning" @click="revokePurchase(currentPurchase)"
                   v-if="currentPurchase.status === 'FINISHED'">
              <v-icon start>mdi-cancel</v-icon>
              {{ $t('_purchases.labels.revoke') }}
            </v-btn>
            <v-btn variant="text" color="warning" @click="unrevokePurchase(currentPurchase)"
                   v-if="currentPurchase.status === 'REVOKED'">
              <v-icon start>mdi-check</v-icon>
              {{ $t('_purchases.labels.unrevoke') }}
            </v-btn>
            <v-btn variant="text" color="error" @click="$refs.confirmRefundDialog.show(currentPurchase)"
                   v-if="currentPurchase.refundable">
              <v-icon start>mdi-cash-refund</v-icon>
              {{ $t('_purchases.labels.refund') }}
            </v-btn>
            <v-btn variant="text" color="error" @click="$refs.confirmDeleteDialog.show(currentPurchase)">
              <v-icon start>mdi-delete</v-icon>
              {{ $t('delete') }}
            </v-btn>
          </div>
        </template>
      </Dialog>
      <ConfirmationDialog
        :text="$t('_purchases.messages.refundConfirm')"
        btn-icon="mdi-cash-refund"
        :btn-text="$t('_purchases.labels.refund')"
        @submit="refundPurchase"
        ref="confirmRefundDialog"
      >
      </ConfirmationDialog>
      <DeleteConfirmationDialog
        :text="$t('_purchases.messages.deleteConfirm')"
        btn-icon="mdi-delete"
        :btn-text="$t('delete')"
        @submit="deletePurchase"
        :countdown="true"
        ref="confirmDeleteDialog"
      >
      </DeleteConfirmationDialog>
      <ConfirmationDialog
        :text="$t('_purchases.messages.cancelSubscriptionConfirm')"
        btn-icon="mdi-cancel"
        :btn-text="$t('_purchases.labels.cancelSubscription')"
        @submit="cancelSubscription"
        ref="confirmSubCancelDialog"
        :width="500"
      >
      </ConfirmationDialog>
    </div>
</template>

<script>
import PaginatedDataTable from '@/components/PaginatedDataTable.vue';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import openapi from '../../../api/openapi';
import UserLink from '../../UserLink.vue';
import Dialog from '../../Dialog.vue';
import PurchaseStatusChip from '../PurchaseStatusChip.vue';
import ConfirmationDialog from '../../ConfirmationDialog.vue';

export default {
  name: 'AllPurchases',
  components: {
    DeleteConfirmationDialog,
    PaginatedDataTable,
    ConfirmationDialog,
    PurchaseStatusChip,
    Dialog,
    UserLink,
  },
  data() {
    return {
      headers: [
        { text: this.$t('id'), value: 'id', sortable: false },
        { text: this.$t('status'), value: 'status', sortable: false },
        { text: this.$t('date'), value: 'date' },
        { text: this.$t('user'), value: 'user', sortable: false },
        { text: this.$t('_purchases.labels.amountNet'), value: 'amount_net' },
        { text: this.$t('_purchases.labels.amountTotal'), value: 'amount_total' },
        { text: this.$store.getters.shopConfig.credits_display_title, value: 'credits' },
        {
          text: this.$t('actions'), value: 'actions', width: '200px', sortable: false, align: 'right',
        },
      ],
      purchases: null,
      currentPurchase: null,
      totalItems: 0,
      orderBy: 'date',
      sortDesc: true,
      selectedStatus: [],
      availableStatus: [],
    };
  },
  methods: {
    async updateCurrentPurchase() {
      const api = await openapi;

      if (this.$route.query.purchase_id != null) {
        api.shop_getPurchase({ uuid: this.$route.query.purchase_id }).then((rsp) => {
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
      this.$router.push({ query: { purchase_id: purchase.id } });
    },
    filterFinishedDebits(debits) {
      return debits.filter((debit) => debit.status === 'FINISHED');
    },
    async downloadInvoice(debit) {
      (await openapi).shop_getDebitInvoice(
        { uuid: debit.id },
        null,
        { responseType: 'blob' },
      ).then((rsp) => {
        this.utils.showFile(rsp.data, `${debit.invoice_number}.pdf`);
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async revokePurchase(purchase) {
      const api = await openapi;

      api.shop_editPurchase({ uuid: purchase.id }, { status: 'REVOKED' })
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

      api.shop_deletePurchase({ uuid: purchase.id })
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

      api.shop_editPurchase({ uuid: purchase.id }, { status: 'FINISHED' })
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

      api.shop_editPurchase({ uuid: purchase.id }, { status: 'REFUNDED' })
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
          api.shop_checkPayment({ uuid: debit.id }).then(() => {
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

      api.shop_editPurchase({ uuid: purchase.id }, { status: 'FINISHED' })
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
  },
  beforeMount() {
    this.updateCurrentPurchase();
    this.fetchData();
    this.queryAvailableStatus();
  },
  computed: {
    purchaseDetailShown: {
      get() {
        return this.$route.query.purchase_id != null;
      },
      set(newValue) {
        if (!newValue) {
          this.$router.push({ query: { } });
        }
      },
    },
  },
  watch: {
    $route() {
      this.updateCurrentPurchase();
    },
  },
};
</script>

<style scoped>

</style>
