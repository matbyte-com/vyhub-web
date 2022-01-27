<template>
  <div>
    Debits to approve
    <PaginatedDataTable ref="debitTable" :headers="headers"
                        :items="debits"
                        :totalItems="totalItems"
                        default-sort-by="date"
                        :default-sort-desc="true"
                        @reload="fetchData">
      <template v-slot:item.actions="{ item }">
        <v-btn depressed small color="error"
               @click="showDetails(item.purchase)">
          <v-icon left>
            mdi-eye
          </v-icon>
          {{ $t('details') }}
        </v-btn>
        <v-btn depressed small color="success" @click="$refs.debitConfirmationDialog.show(item)"
               class="ml-1">
          <v-icon left>mdi-check</v-icon>
          {{ $t('confirmDebit') }}
        </v-btn>
      </template>
      <template v-slot:item.coupon="{ item }">
        <span v-for="coupon in getCoupons(item)" :key="coupon">
          {{ coupon }}
        </span>
      </template>
      <template v-slot:item.date="{ item }">
        {{ utils.formatDate(item.date) }}
      </template>
    </PaginatedDataTable>
    <confirmation-dialog text="Confirm Debit? This can't be undone." btn-text="Confirm"
                         ref="debitConfirmationDialog" @submit="confirmDebit"/>
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
      headers: [
        { text: this.$t('date'), value: 'date' },
        { text: this.$t('amount_total'), value: 'amount_total', sortable: false },
        { text: this.$t('coupon'), value: 'coupon' },
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
      (await openapi).shop_getDebits({
        coupon_purchase_open: true,
        ...(queryParams != null ? queryParams : this.$refs.debitTable.getQueryParameters()),
      })
        .then((rsp) => {
          this.debits = rsp.data.items;
          this.totalItems = rsp.data.total;
        });
    },
    showDetails(purchase) {
      this.$router.push({ path: '/shop/admin/purchases', query: { purchaseId: purchase.id } });
    },
    getCoupons(item) {
      if (!item) { return ''; }
      return item.extra.coupons;
    },
    async confirmDebit(item) {
      (await openapi)['payment-gateway_confirmDebit'](item.id).then(() => {
        this.$refs.debitConfirmationDialog.closeAndReset();
        this.fetchData();
      }).catch((err) => {
        this.$refs.debitConfirmationDialog.setErrorMessage(err.response.data.detail);
      });
    },
  },
};
</script>

<style scoped>

</style>
