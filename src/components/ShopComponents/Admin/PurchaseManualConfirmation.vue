<template>
  <div>
    <PaginatedDataTable ref="debitTable" :headers="headers"
                        :items="debits"
                        :totalItems="totalItems"
                        default-sort-by="date"
                        :default-sort-desc="true"
                        @reload="fetchData">
      <template v-slot:header>
        <v-checkbox
          :hide-details="true"
          dense
          v-model="showApprovedDebits"
          :label="$t('_purchases.labels.showApprovedDebits')"
          @update:model-value="fetchData"
          class="mr-3 align-self-center mt-0 pt-0">
        </v-checkbox>
      </template>
      <template v-slot:item.payment_gateway="{ item }">
        {{ item.payment_gateway ? item.payment_gateway.name : '' }}
      </template>
      <template v-slot:item.amount_total="{ item }">
        {{ item ? `${item.amount_total} ${item.purchase.currency.symbol}` : '' }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn variant="flat" size="small" color="error"
               @click="showDetails(item.purchase)">
          <v-icon start>
            mdi-eye
          </v-icon>
          {{ $t('details') }}
        </v-btn>
        <v-btn variant="flat" size="small" color="success" @click="$refs.debitConfirmationDialog.show(item)"
               class="ml-1" :disabled="item.status !== 'STARTED'
               || item.purchase.status !== 'OPEN'">
          <v-icon start>mdi-check</v-icon>
          {{ $t('_purchases.labels.confirm') }}
        </v-btn>
        <v-btn variant="flat" size="small" color="error" class="ml-1"
               :disabled="item.status !== 'STARTED'"
               @click="$refs.debitDeclineDialog.show(item)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.coupon="{ item }">
        <span v-for="coupon in getCoupons(item)" :key="coupon">
          {{ coupon }} <br/>
        </span>
      </template>
      <template v-slot:item.date="{ item }">
        {{ utils.formatDate(item.date) }}
      </template>
    </PaginatedDataTable>
    <confirmation-dialog :text="$t('_purchases.labels.confirmDebitText')"
                         :btn-text="$t('_purchases.labels.confirm')"
                         ref="debitConfirmationDialog" @submit="confirmDebit"/>
    <confirmation-dialog :text="$t('_purchases.labels.declineDebitText')"
                         :btn-text="$t('_purchases.labels.decline')"
                         ref="debitDeclineDialog" @submit="declineDebit"/>
  </div>
</template>

<script>
import PaginatedDataTable from '@/components/PaginatedDataTable.vue';
import openapi from '@/api/openapi';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';

export default {
  name: 'Paysafecard',
  components: { ConfirmationDialog, PaginatedDataTable },
  data() {
    return {
      totalItems: 0,
      debits: null,
      showApprovedDebits: false,
      headers: [
        { text: this.$t('date'), value: 'date' },
        { text: this.$t('_purchases.labels.paymentGateway'), value: 'payment_gateway' },
        { text: this.$t('_purchases.labels.amountTotal'), value: 'amount_total', sortable: false },
        { text: this.$t('_purchases.labels.coupon'), value: 'coupon', sortable: false },
        {
          text: this.$t('actions'), value: 'actions', align: 'right', sortable: false,
        },
      ],
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData(queryParams = null) {
      const status = ['STARTED'];
      if (this.showApprovedDebits) {
        status.push('APPROVED');
        status.push('FINISHED');
      }
      (await openapi).shop_getDebits({
        has_coupon_data: true,
        status,
        ...(queryParams != null ? queryParams : this.$refs.debitTable.getQueryParameters()),
      })
        .then((rsp) => {
          this.debits = rsp.data.items;
          this.totalItems = rsp.data.total;
        });
    },
    showDetails(purchase) {
      this.$router.push({ path: '/admin/shop/purchases', query: { purchase_id: purchase.id } });
    },
    getCoupons(item) {
      if (!item) { return ''; }
      return item.extra.coupons;
    },
    async confirmDebit(item) {
      (await openapi).shop_confirmCouponDebit(item.id).then(() => {
        this.$refs.debitConfirmationDialog.closeAndReset();
        this.fetchData();
        this.$notify({
          title: this.$t('_purchases.messages.confirmPurchaseSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.debitConfirmationDialog.setError(err);
      });
    },
    async declineDebit(item) {
      const api = await openapi;

      if (item.purchase.status !== 'OPEN') {
        api.shop_cancelPayment(item.id).then(() => {
          this.$refs.debitDeclineDialog.closeAndReset();
          this.fetchData();
          this.$notify({
            title: this.$t('_messages.cancelSuccess'),
            type: 'success',
          });
        });
      } else {
        api.shop_editPurchase(item.purchase.id, { status: 'CANCELLED' }).then(() => {
          this.$refs.debitDeclineDialog.closeAndReset();
          this.fetchData();
          this.$notify({
            title: this.$t('_messages.cancelSuccess'),
            type: 'success',
          });
        }).catch((err) => {
          this.$refs.debitDeclineDialog.setError(err);
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
