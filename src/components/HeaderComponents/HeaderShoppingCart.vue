<template>
  <div>
    <v-btn
      v-if="!listItem"
      variant="text"
      style="min-width: 30px; width: 34px; height: 34px"
      icon
      :to="{ name: 'ShopCart' }"
    >
      <v-badge
        v-if="$store.getters.cartPacketCount > 0"
        location="bottom right"
        color="error"
      >
        <template #badge>
          <div
            class="animate__animated"
            :class="{ 'animate__heartBeat': bouncing }"
          >
            {{ $store.getters.cartPacketCount }}
          </div>
        </template>
        <v-icon>mdi-cart-variant</v-icon>
      </v-badge>
      <v-icon
        v-else
        icon="mdi-cart-variant"
      />
    </v-btn>
    <v-list-item
      v-else
      :to="{ name: 'ShopCart' }"
      class="d-flex"
    >
      <v-list-item-title>
        <v-icon
          start
          icon="mdi-cart-variant"
        />
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
  props: {
    listItem: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      bouncing: false,
    };
  },
  watch: {
    '$store.getters.cartPacketCount': function () {
      this.bouncing = true;
      setTimeout(() => {
        this.bouncing = false;
      }, 1000);
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
