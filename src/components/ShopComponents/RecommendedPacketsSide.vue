<template>
  <v-card class="vh-cart-recommended-packets"
          v-if="recommendedPackets !== null && recommendedPackets.length > 0">
    <v-card-title class="d-flex">
      <v-icon left>mdi-star-shooting</v-icon>
      {{ $t('_shop.labels.recommended') }}
      <v-divider class="ml-3 mb-1 divider-strong align-self-end"/>
    </v-card-title>
    <v-card-text>
      <v-row v-if="recommendedPackets">
        <v-col cols="6" md="6" lg="6" xl="6" v-for="p in recommendedPackets" :key="p.id"
               class="d-flex align-content-space-between">
          <PacketCard
                      :small="true" :disable-hover="true" :packet="p" />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="6" md="6" lg="6" xl="6" v-for="i in 4" :key="i">
          <v-skeleton-loader type="card" height="200" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import PacketCard from '@/components/ShopComponents/PacketCard.vue';
import openapi from '@/api/openapi';

export default {
  name: 'RecommendedPacketsSide',
  components: { PacketCard },
  data() {
    return {
      recommendedPackets: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).shop_getPackets({ recommended: true, limit: 4 }).then((rsp) => {
        this.recommendedPackets = rsp.data;
      });
    },
  },
};
</script>

<style scoped>

</style>
