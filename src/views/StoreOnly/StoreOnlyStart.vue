<script setup>
import {computed, ref, onMounted} from "vue";
import openapiCached from "../../api/openapiCached";
import {useStore} from "vuex";

onMounted(() => {
  fetchRecommendedPackets(false);
})

const recommendedPackets = ref();
const store = useStore();

async function fetchRecommendedPackets() {
  (await openapiCached).shop_getPackets({recommended: true, limit: 1}).then((rsp) => {
    if (rsp.data !== null && rsp.data.length > 0) {
      recommendedPackets.value = true;
    }
  })
}


const anyShopStatsEnabled = computed(() => {
  if (!store.state.shopConfig) {
    return false;
  }

  if (!store.state.shopConfig.show_widgets_on_shop_page) {
    return false;
  }

  return store.state.shopConfig.last_donators_enabled
    || store.state.shopConfig.top_donators_enabled
    || store.state.shopConfig.donation_goal_enabled;
})

</script>

<template>
  <div>
    <!-- Header Picture -->
    <div
      style="height: 30vh"
      class="d-flex justify-center align-center"
    >
      Picture
    </div>
    <!-- App Bar -->
    <v-container>
      <div>
        <v-toolbar
          style="margin-top: -50px"
          rounded="lg"
          color="header"
        >
          <v-tabs
            color="primary"
            style="width: 100%"
            align-tabs="center"
          >
            <v-tab density="compact">
              12
            </v-tab>
          </v-tabs>
        </v-toolbar>
      </div>
      <!-- Categories -->
      <v-row>
        <v-col>
          <!-- News -->
        </v-col>
        <!-- Sidebar -->
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
    </v-container>
  </div>
</template>

<style scoped>

</style>
