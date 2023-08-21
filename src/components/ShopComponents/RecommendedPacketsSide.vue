<template>
  <v-card class="vh-cart-recommended-packets" color="transparent" flat
          v-if="recommendedPackets !== null && recommendedPackets.length > 0">
    <v-card-title class="d-flex">
      <v-icon left>mdi-star-shooting</v-icon>
      {{ $t('_shop.labels.recommended') }}
      <v-divider class="ml-3 mb-1 divider-strong align-self-end"/>
    </v-card-title>
    <v-card-text>
      <div v-if="!$vuetify.breakpoint.smAndDown">
        <v-row v-if="recommendedPackets">
          <v-col cols="6" md="6" lg="12" xl="6" v-for="p in recommendedPackets" :key="p.id"
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
      </div>
      <div v-else>
        <Swiper :number-of-elements="4" :per-page-custom="perPage">
          <swiper-slide v-for="p in recommendedPackets" :key="p.id">
            <PacketCard
              :small="true" :disable-hover="true" :packet="p" />
          </swiper-slide>
        </Swiper>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import PacketCard from '@/components/ShopComponents/PacketCard.vue';
import openapi from '@/api/openapi';
import Swiper from '@/components/Swiper.vue';

export default {
  name: 'RecommendedPacketsSide',
  components: { Swiper, PacketCard },
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
  computed: {
    perPage() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 3.15;
      }
      return 1;
    },
  },
};
</script>

<style scoped>

</style>
