<template>
  <div>
    <v-card
      v-if="$vuetify.display.smAndDown && anyShopStatsEnabled"
      flat
      class="card-rounded mb-5"
    >
      <ShopStatsSide />
    </v-card>
    <v-row>
      <v-col
        cols="12"
        :md="anyShopStatsEnabled || recommendedPackets ? 8 : 12"
        :lg="anyShopStatsEnabled || recommendedPackets ? 9 : 12"
        class="d-flex flex-column align-content-space-between"
      >
        <transition
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn animate__faster"
        >
          <router-view />
        </transition>
      </v-col>
      <v-col
        v-if="anyShopStatsEnabled || recommendedPackets"
        cols="12"
        md="4"
        lg="3"
        class="d-flex flex-column"
      >
        <v-card
          v-if="!$vuetify.display.smAndDown && anyShopStatsEnabled"
          class="card-rounded"
          flat
        >
          <ShopStatsSide />
        </v-card>
        <div
          class="card-rounded"
          :class="{ 'mt-6':!$vuetify.display.smAndDown && anyShopStatsEnabled }"
        >
          <RecommendedPacketsSide />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import openapiCached from '@/api/openapiCached';

export default {
  data() {
    return {
      recommendedPackets: false,
    };
  },
  computed: {
    anyShopStatsEnabled() {
      if (!this.$store.getters.shopConfig) { return false; }

      if (!this.$store.getters.shopConfig.show_widgets_on_shop_page) { return false; }

      return this.$store.getters.shopConfig.last_donators_enabled
        || this.$store.getters.shopConfig.top_donators_enabled
        || this.$store.getters.shopConfig.donation_goal_enabled;
    },
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
};
</script>

<style scoped>
.absolute {
  position: absolute;
  opacity: 0;
}
</style>
