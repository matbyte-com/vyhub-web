<template>
  <div>
    <PaginatedDataTable
      ref="debitTable"
      :headers="headers"
      :items="debits"
      :total-items="totalItems"
      default-sort-by="date"
      :default-sort-desc="true"
      @reload="fetchData"
    >
      <template #header>
        <v-checkbox
          v-model="showApprovedDebits"
          :hide-details="true"
          density="compact"
          :label="$t('_purchases.labels.showApprovedDebits')"
          class="mr-3 align-self-center mt-0 pt-0"
          @update:model-value="fetchData"
        />
      </template>
      <template #item.payment_gateway="{ item }">
        {{ item.payment_gateway ? item.payment_gateway.name : '' }}
      </template>
      <template #item.amount_total="{ item }">
        {{ item ? `${item.amount_total} ${item.purchase.currency.symbol}` : '' }}
      </template>
      <template #item.actions="{ item }">
        <v-btn
          variant="flat"
          size="small"
          color="error"
          @click="showDetails(item.purchase)"
        >
          <v-icon start>
            mdi-eye
          </v-icon>
          {{ $t('details') }}
        </v-btn>
        <v-btn
          variant="flat"
          size="small"
          color="success"
          class="ml-1"
          :disabled="item.status !== 'STARTED'
            || item.purchase.status !== 'OPEN'"
          @click="$refs.debitConfirmationDialog.show(item)"
        >
          <v-icon start>
            mdi-check
          </v-icon>
          {{ $t('_purchases.labels.confirm') }}
        </v-btn>
        <v-btn
          variant="flat"
          size="small"
          color="error"
          class="ml-1"
          :disabled="item.status !== 'STARTED'"
          @click="$refs.debitDeclineDialog.show(item)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <template #item.coupon="{ item }">
        <span
          v-for="coupon in getCoupons(item)"
          :key="coupon"
        >
          {{ coupon }} <br>
        </span>
      </template>
      <template #item.date="{ item }">
        {{ utils.formatDate(item.date) }}
      </template>
    </PaginatedDataTable>
    <confirmation-dialog
      ref="debitConfirmationDialog"
      :text="$t('_purchases.labels.confirmDebitText')"
      :btn-text="$t('_purchases.labels.confirm')"
      @submit="confirmDebit"
    />
    <confirmation-dialog
      ref="debitDeclineDialog"
      :text="$t('_purchases.labels.declineDebitText')"
      :btn-text="$t('_purchases.labels.decline')"
      @submit="declineDebit"
    />
  </div>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  data() {
    return {
      totalItems: 0,
      debits: null,
      showApprovedDebits: false,
      headers: [
        { title: this.$t('date'), key: 'date' },
        { title: this.$t('_purchases.labels.paymentGateway'), key: 'payment_gateway' },
        { title: this.$t('_purchases.labels.amountTotal'), key: 'amount_total', sortable: false },
        { title: this.$t('_purchases.labels.coupon'), key: 'coupon', sortable: false },
        {
          title: this.$t('actions'), key: 'actions', align: 'end', sortable: false,
        },
      ],
    };
  },
  mounted() {
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
