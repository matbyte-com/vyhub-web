<template>
  <div>
    <v-card flat class="card-rounded mb-5"
            v-if="$vuetify.breakpoint.smAndDown && anyShopStatsEnabled">
      <ShopStatsSide />
    </v-card>
    <v-row>
      <v-col cols="12" :md="anyShopStatsEnabled || this.recommendedPackets ? 8 : 12"
             :lg="anyShopStatsEnabled || this.recommendedPackets ? 9 : 12"
             class="d-flex flex-column align-content-space-between">
        <transition mode="out-in"
                    enter-active-class="animate__animated animate__fadeIn animate__faster">
          <router-view  />
        </transition>
      </v-col>
      <v-col v-if="anyShopStatsEnabled || this.recommendedPackets" cols="12" md="4" lg="3"
             class="d-flex flex-column">
        <v-card class="card-rounded" flat
                v-if="!$vuetify.breakpoint.smAndDown && anyShopStatsEnabled">
          <ShopStatsSide />
        </v-card>
        <div class="card-rounded"
             :class="{ 'mt-6':!$vuetify.breakpoint.smAndDown && anyShopStatsEnabled }">
          <RecommendedPacketsSide />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RecommendedPacketsSide from '@/components/ShopComponents/RecommendedPacketsSide.vue';
import ShopStatsSide from '@/components/ShopComponents/ShopStatsSide.vue';
import openapiCached from '@/api/openapiCached';

export default {
  components: { ShopStatsSide, RecommendedPacketsSide },
  data() {
    return {
      recommendedPackets: false,
    };
  },
  beforeMount() {
    this.fetchRecommended();
  },
  methods: {
    async fetchRecommended() {
      (await openapiCached).shop_getPackets({ recommended: true, limit: 1 }).then((rsp) => {
        if (rsp.data !== null && rsp.data.length > 0) {
          this.recommendedPackets = true;
        }
      });
    },
  },
  computed: {
    anyShopStatsEnabled() {
      if (!this.$store.getters.shopConfig) { return false; }
      return this.$store.getters.shopConfig.last_donators_enabled
        || this.$store.getters.shopConfig.top_donators_enabled
        || this.$store.getters.shopConfig.donation_goal_enabled;
    },
  },
};
</script>

<style scoped>
.absolute {
  position: absolute;
  opacity: 0;
}
</style>
