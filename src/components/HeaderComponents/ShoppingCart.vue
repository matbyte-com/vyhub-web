<template>
  <v-btn text
         icon
         @click="$router.push({ name: 'ShopCart' })">
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
</template>

<script>
import ShopService from '@/services/ShopService';

export default {
  name: 'ShoppingCart',
  mounted() {
    this.queryData();
  },
  methods: {
    queryData() {
      ShopService.refreshCartPacketCount();
    },
  },
};
</script>

<style scoped>

</style>
