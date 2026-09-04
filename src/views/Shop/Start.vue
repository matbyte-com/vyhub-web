<script setup>
import openapiCached from '@/api/openapiCached';
import {computed, onBeforeMount, ref} from "vue";
import { useVyHubStore } from '@/store';
import {useDisplay} from "vuetify";

const recommendedPackets = ref(false);

const store = useVyHubStore()
const display = ref(useDisplay());

onBeforeMount( () => {
  fetchRecommended();
});

async function fetchRecommended() {
  (await openapiCached).shop_getPackets({ recommended: true, limit: 1 }).then((rsp) => {
    if (rsp.data !== null && rsp.data.length > 0) {
      recommendedPackets.value = true;
    }
  });
}

const anyShopStatsEnabled = computed(() => {
  if (!store.shopConfig) { return false; }

  if (!store.shopConfig.show_widgets_on_shop_page) { return false; }

  return store.shopConfig.last_donators_enabled
    || store.shopConfig.top_donators_enabled
    || store.shopConfig.donation_goal_enabled;
});
</script>

<template>
  <div>
    <v-card
      v-if="display.smAndDown && anyShopStatsEnabled"
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
          v-if="!display.smAndDown && anyShopStatsEnabled"
          class="card-rounded"
          flat
        >
          <ShopStatsSide />
        </v-card>
        <div
          class="card-rounded"
          :class="{ 'mt-6':!display.smAndDown && anyShopStatsEnabled }"
        >
          <RecommendedPacketsSide />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
</style>
