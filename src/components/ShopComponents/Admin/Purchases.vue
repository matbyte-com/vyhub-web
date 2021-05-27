<template>
    <div>
      <DataTable
        :headers="headers"
        :items="purchases"
        :sort-by="['date']"
        :sort-desc="[true]"
        :search="true">
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
    </div>
</template>

<script>
import DataTable from '../../DataTable.vue';
import openapi from '../../../api/openapi';
import UtilService from '../../../services/UtilService';
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
        { text: this.$t('id'), value: 'id' },
        { text: this.$t('status'), value: 'status' },
        { text: this.$t('date'), value: 'date' },
        { text: this.$t('user'), value: 'user' },
        { text: this.$t('_purchases.labels.amountNet'), value: 'amount_net' },
        { text: this.$t('_purchases.labels.amountTotal'), value: 'amount_total' },
        { text: this.$t('_shop.labels.credits'), value: 'credits' },
        {
          text: this.$t('actions'), value: 'actions', width: '200px', sortable: false, align: 'right',
        },
      ],
      purchases: null,
    };
  },
  methods: {
    async queryData() {
      const api = await openapi;

      api.shop_getPurchases().then((rsp) => {
        this.purchases = rsp.data;
      }).catch((err) => {
        console.log(err);
        UtilService.notifyUnexpectedError(err.response.data);
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
        UtilService.showFile(rsp.data, `${debit.invoice_number}.pdf`);
      }).catch((err) => {
        console.log(err);
        UtilService.notifyUnexpectedError(err.response.data);
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
          this.queryData();
        }).catch((err) => {
          console.log(err);
          UtilService.notifyUnexpectedError(err.response.data);
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
          this.queryData();
        }).catch((err) => {
          console.log(err);
          UtilService.notifyUnexpectedError(err.response.data);
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
          this.queryData();
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
            this.queryData();
          }).catch((err) => {
            console.log(err);
            UtilService.notifyUnexpectedError(err.response.data);
          });
        }
      });
    },
  },
  beforeMount() {
    this.queryData();
  },
  watch: {
    $route() {
      this.queryData();
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
