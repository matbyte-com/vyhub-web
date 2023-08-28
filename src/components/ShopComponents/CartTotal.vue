<template>
  <div>
    <div>
      {{ $t('_shop.labels.subtotal') }}
      <div class="float-right" v-if="price">
        {{ price.net.toLocaleString(undefined, {minimumFractionDigits: 2}) }}
        {{ price.currency.symbol }}
      </div>
      <div class="float-right" v-else>
        <v-skeleton-loader type="button" />
      </div>
    </div>
    <div>
      {{ $t('_shop.labels.tax') }} ({{ price.tax_rate }}%)
      <div class="float-right" v-if="price">
        {{ price.amount_tax.toLocaleString(undefined, {minimumFractionDigits: 2}) }}
        {{ price.currency.symbol }}
      </div>
      <div class="float-right" v-else>
        <v-skeleton-loader type="chip" tile width="50" height="20" />
      </div>
    </div>
    <div class="font-weight-bold">
      {{ $t('_shop.labels.total') }}
      <div class="float-right" v-if="price">
        {{ price.total.toLocaleString(undefined, {minimumFractionDigits: 2}) }}
        {{ price.currency.symbol }}
      </div>
      <div class="float-right" v-else>
        <v-skeleton-loader type="chip" tile width="50" height="20" />
      </div>
    </div>
    <v-row align="center" class="mt-1 mb-1" v-if="price && price.credits != null">
      <v-divider />
      <span class="mr-3 ml-3">{{ $t('or') }}</span>
      <v-divider />
    </v-row>
    <div v-if="price && price.credits != null">
        <div class="font-weight-bold">
          {{ $store.getters.shopConfig.credits_display_title }}
          <div class="float-right">
            {{ price.credits }}
          </div>
        </div>
    </div>
    <div class="font-italic body-2 text-center mt-3" v-if="price.tax_info">
      {{ price.tax_info }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartTotal',
  props: ['price'],
  data() {
    return {
    };
  },
};
</script>

<style scoped>

</style>
