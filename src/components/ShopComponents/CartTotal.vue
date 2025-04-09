<template>
  <div>
    <v-row>
      <v-col>
        <div>
          {{ $t('_shop.labels.subtotal') }}
          <div class="float-right">
            {{ utils.formatCurrency(price.net, price.currency.code) }}
          </div>
        </div>
        <div>
          {{ $t('_shop.labels.tax') }} ({{ price.tax_rate }}%)
          <div class="float-right">
            {{ utils.formatCurrency(price.amount_tax, price.currency.code) }}
          </div>
        </div>
        <div class="font-weight-bold">
          {{ $t('_shop.labels.total') }}
          <div class="float-right">
            {{ utils.formatCurrency(price.total, price.currency.code) }}
          </div>
        </div>
      </v-col>
    </v-row>
    <div
      v-if="price.credits != null"
      class="d-flex align-center"
    >
      <v-divider />
      <span class="mr-3 ml-3">{{ $t('or') }}</span>
      <v-divider />
    </div>
    <v-row v-if="price.credits != null">
      <v-col>
        <div class="font-weight-bold">
          {{ $store.getters.shopConfig.credits_display_title }}
          <div class="float-right">
            {{ price.credits }}
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="price.tax_info">
      <v-col>
        <div
          v-if="price.tax_info"
          class="font-italic text-body-2 text-center"
        >
          {{ price.tax_info }}
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    price: Object,
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>

</style>
