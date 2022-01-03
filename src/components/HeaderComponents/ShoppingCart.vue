<template>
  <div>
    <v-btn text
           icon
           :to="{ name: 'ShopCart' }"
           v-if="!listItem">
      <v-badge
        bottom
        overlap
        color="error"
        :content="$store.getters.cartPacketCount"
        v-if="$store.getters.cartPacketCount > 0"
      >
        <v-icon>mdi-cart-variant</v-icon>
      </v-badge>
      <v-icon v-else>mdi-cart-variant</v-icon>
    </v-btn>
    <v-list-item v-else :to="{ name: 'ShopCart' }">
      <v-badge
        bottom
        overlap
        color="error"
        :content="$store.getters.cartPacketCount"
        v-if="$store.getters.cartPacketCount > 0 && !listItem"
      >
        <v-icon left>mdi-cart-variant</v-icon>
      </v-badge>
      <v-icon left v-else>mdi-cart-variant</v-icon>
      <v-list-item-title>
        {{ $t('_shop.labels.cart') }}
        <span v-if="listItem && $store.getters.cartPacketCount > 0">
          ({{ $store.getters.cartPacketCount }})
        </span>
      </v-list-item-title>
    </v-list-item>
  </div>
</template>

<script>
import ShopService from '@/services/ShopService';

export default {
  name: 'ShoppingCart',
  props: {
    listItem: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      ShopService.refreshCartPacketCount();
    },
  },
};
</script>

<style scoped>

</style>
