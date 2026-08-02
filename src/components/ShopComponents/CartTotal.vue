<template>
  <div>
    <v-row>
      <v-col>
        <div>
          {{ $t('_shop.labels.subtotal') }}
          <div class="float-right">
            {{ utils.formatCurrency(displayPrice.net, displayPrice.currency.code) }}
          </div>
        </div>
        <div>
          {{ $t('_shop.labels.tax') }} ({{ displayPrice.tax_rate }}%)
          <div class="float-right">
            {{ utils.formatCurrency(displayPrice.amount_tax, displayPrice.currency.code) }}
          </div>
        </div>
        <div class="font-weight-bold">
          {{ priceFirst != null ? $t('_shop.labels.payNow') : $t('_shop.labels.total') }}
          <div class="float-right">
            {{ utils.formatCurrency(displayPrice.total, displayPrice.currency.code) }}
          </div>
        </div>
        <div
          v-if="priceFirst != null"
          class="text-caption text-medium-emphasis mt-1"
        >
          {{ $t('_shop.labels.afterwardsRecurring', {
            price: utils.formatCurrency(price.total, price.currency.code) }) }}
          <span v-if="recurringText">{{ recurringText }}</span>
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
    price: {
      type: Object,
      default: () => ({}),
    },
    priceFirst: {
      type: Object,
      default: null,
    },
    recurring: {
      type: Number,
      default: null,
    },
  },
  computed: {
    displayPrice() {
      return this.priceFirst != null ? this.priceFirst : this.price;
    },
    recurringText() {
      if (this.recurring == null) return null;
      return this.utils.isSingularTimeunit(this.recurring)
        || `${this.$t('every')} ${this.utils.formatLength(this.recurring)}`;
    },
  },
};
</script>

<style scoped>

</style>
