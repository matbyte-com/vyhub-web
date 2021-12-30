<template>
    <div>
      <DataTable
        :headers="headers"
        :items="purchases"
        :external-search="true"
        @update:page="newPage" @update:sort-by="newOrderBy"
        @update:sort-desc="newSortDesc"
        :footer-props="{
                     'disable-items-per-page': true,
                   }"
        @search="newSearch"
        :server-items-length.sync="totalItems"
        :items-per-page.sync="itemsPerPage">
        <template v-slot:header>
          <v-row>
            <v-col class="d-flex align-center">
              <v-menu offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>
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
                  @change="newStatus"
                ></v-checkbox>
                <a class="ma-1" @click="selectedStatus = []; queryData(1)">
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
          <v-btn depressed small color="error"
                 @click="showDetails(item)">
            <v-icon left>
              mdi-eye
            </v-icon>
            {{ $t('details') }}
          </v-btn>
        </template>
      </DataTable>
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
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      {{ $t('id') }}
                    </v-list-item-content>
                    <v-list-item-content>
                      {{ currentPurchase.id }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      {{ $t('user') }}
                    </v-list-item-content>
                    <v-list-item-content>
                      <span><UserLink :user="currentPurchase.user"></UserLink></span>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      {{ $t('date') }}
                    </v-list-item-content>
                    <v-list-item-content>
                      {{ new Date(currentPurchase.date).toLocaleString() }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      {{ $t('status') }}
                    </v-list-item-content>
                    <v-list-item-content>
                      <PurchaseStatusChip :status="currentPurchase.status"></PurchaseStatusChip>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="currentPurchase.credits_used">
                    <v-list-item-content>
                      {{ $t('_shop.labels.credits') }}
                    </v-list-item-content>
                    <v-list-item-content>
                      {{ currentPurchase.credits }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="!currentPurchase.credits_used">
                    <v-list-item-content>
                      {{ $t('_purchases.labels.amountNet') }}
                    </v-list-item-content>
                    <v-list-item-content>
                      {{ currentPurchase.amount_net
                      .toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                      {{ currentPurchase.currency.symbol }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="!currentPurchase.credits_used">
                    <v-list-item-content>
                      {{ $t('_purchases.labels.amountTotal') }}
                    </v-list-item-content>
                    <v-list-item-content>
                      {{ currentPurchase.amount_total
                      .toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                      {{ currentPurchase.currency.symbol }}
                    </v-list-item-content>
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
                  <v-simple-table>
                    <template>
                      <thead>
                        <tr>
                          <th>
                            {{ $t('name') }}
                          </th>
                          <th>
                            {{ $t('price') }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="cp in currentPurchase.cart_packets" v-bind:key="cp.id"
                        >
                          <td>{{ cp.packet_title }}</td>
                          <td v-if="!currentPurchase.credits_used">
                            {{ cp.price_net.toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                            {{ cp.currency.symbol }}
                          </td>
                          <td v-else>
                            {{ cp.credits }}
                            {{ $t('_shop.labels.credits') }}
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <div class="text-h6">
                  {{ $t('payments') }}
                </div>
                <v-simple-table>
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
                        {{ $t('_shop.labels.credits') }}
                      </td>
                      <td>
                        <v-btn color="primary" outlined small :disabled="!debit.invoice_available"
                               @click="downloadInvoice(debit)">
                          <v-icon>
                            mdi-file-download
                          </v-icon>
                        </v-btn>
                      </td>
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </div>
        </template>
        <template v-slot:actions>
          <div v-if="currentPurchase != null">
            <v-btn text color="green" @click="checkPurchase(currentPurchase)">
              <v-icon left>mdi-credit-card-refresh</v-icon>
              {{ $t('refresh') }}
            </v-btn>
            <v-btn text color="error" @click="$refs.confirmSubCancelDialog.show(currentPurchase)"
                   v-if="currentPurchase.status === 'RECURRING'">
              <v-icon left>mdi-cancel</v-icon>
              {{ $t('_purchases.labels.cancelSubscription') }}
            </v-btn>
            <v-btn text color="warning" @click="revokePurchase(currentPurchase)"
                   v-if="currentPurchase.status === 'FINISHED'">
              <v-icon left>mdi-cancel</v-icon>
              {{ $t('_purchases.labels.revoke') }}
            </v-btn>
            <v-btn text color="warning" @click="unrevokePurchase(currentPurchase)"
                   v-if="currentPurchase.status === 'REVOKED'">
              <v-icon left>mdi-check</v-icon>
              {{ $t('_purchases.labels.unrevoke') }}
            </v-btn>
            <v-btn text color="error" @click="$refs.confirmRefundDialog.show(currentPurchase)"
                   v-if="currentPurchase.refundable">
              <v-icon left>mdi-cash-refund</v-icon>
              {{ $t('_purchases.labels.refund') }}
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
import DataTable from '../../DataTable.vue';
import openapi from '../../../api/openapi';
import UserLink from '../../UserLink.vue';
import Dialog from '../../Dialog.vue';
import PurchaseStatusChip from '../PurchaseStatusChip.vue';
import ConfirmationDialog from '../../ConfirmationDialog.vue';

export default {
  name: 'AllPurchases',
  components: {
    ConfirmationDialog,
    PurchaseStatusChip,
    Dialog,
    UserLink,
    DataTable,
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
        { text: this.$t('_shop.labels.credits'), value: 'credits' },
        {
          text: this.$t('actions'), value: 'actions', width: '200px', sortable: false, align: 'right',
        },
      ],
      purchases: null,
      page: 1,
      search: '',
      itemsPerPage: 10,
      totalItems: 20,
      orderBy: 'date',
      sortDesc: true,
      selectedStatus: [],
      availableStatus: [],
    };
  },
  methods: {
    async queryData(page) {
      const api = await openapi;

      api.shop_getPurchases({
        size: this.itemsPerPage,
        page,
        query: this.search,
        sort_by: this.orderBy,
        sort_desc: this.sortDesc,
        status: this.selectedStatus,
      }).then((rsp) => {
        this.purchases = rsp.data.items;
        this.totalItems = rsp.data.total;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async queryAvailableStatus() {
      (await openapi).shop_getPurchaseStatuses().then((rsp) => {
        this.availableStatus = rsp.data;
      });
    },
    showDetails(purchase) {
      this.$router.push({ query: { purchaseId: purchase.id } });
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
          this.queryData(1);
        }).catch((err) => {
          console.log(err);
          this.utils.notifyUnexpectedError(err.response.data);
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
          this.queryData(1);
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
          this.queryData(1);
          this.$refs.confirmRefundDialog.closeAndReset();
        }).catch((err) => {
          console.log(err);
          this.$refs.confirmRefundDialog.setErrorMessage(err.response.data);
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
            this.queryData(1);
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
            title: this.$t('_purchases.messages.cancelSubscriptionSuccess'),
            type: 'success',
          });
          this.queryData(1);
          this.$refs.confirmSubCancelDialog.closeAndReset();
        }).catch((err) => {
          console.log(err);
          this.$refs.confirmSubCancelDialog.setErrorMessage(err.response.data);
        });
    },
    newSearch(str) {
      this.search = str;
      this.queryData(1);
    },
    newOrderBy(str) {
      if (str[0] !== this.orderBy && str[0] !== undefined) {
        // eslint-disable-next-line prefer-destructuring
        this.orderBy = str[0];
        this.queryData(1);
      }
    },
    newSortDesc(val) {
      if (val[0] !== this.sortDesc && val[0] !== undefined) {
        // eslint-disable-next-line prefer-destructuring
        this.sortDesc = val[0];
        this.queryData(1);
      }
    },
    newStatus(status) {
      this.selectedStatus = status;
      this.queryData(1);
    },
    newPage(page) {
      this.page = page;
      this.queryData(page);
    },
  },
  beforeMount() {
    this.queryData(this.page);
    this.queryAvailableStatus();
  },
  watch: {
    $route() {
      // this.queryData(1);
    },
  },
  computed: {
    purchaseDetailShown: {
      get() {
        return this.$route.query.purchaseId != null;
      },
      set(newValue) {
        if (!newValue) {
          this.$router.push({ query: { } });
        }
      },
    },
    currentPurchase() {
      if (this.purchases && this.purchases.length > 0) {
        const purchase = this.purchases.find(
          (p) => p.id === this.$route.query.purchaseId,
        );

        if (purchase != null) {
          return purchase;
        }
      }

      return null;
    },
  },
};
</script>

<style scoped>

</style>
