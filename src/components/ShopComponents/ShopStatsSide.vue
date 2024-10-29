<template>
  <div class="vh-shop-stats">
    <v-tabs
      v-show="numberOfTabs !== 1"
      v-model="tab"
      :density="$vuetify.display.mdAndDown ? 'compact' : 'comfortable'"
      color="primary"
      grow
      :show-arrows="false"
    >
      <v-tab
        v-if="$store.getters.shopConfig.donation_goal_enabled"
        min-width="40px"
        class="square"
      >
        <v-icon :size="iconSize">
          mdi-flag-checkered
        </v-icon>
      </v-tab>
      <v-tab
        v-if="$store.getters.shopConfig.top_donators_enabled"
        min-width="40px"
        class="square"
      >
        <v-icon :size="iconSize">
          mdi-podium
        </v-icon>
      </v-tab>
      <v-tab
        v-if="$store.getters.shopConfig.last_donators_enabled"
        min-width="40px"
        class="square"
      >
        <v-icon :size="iconSize">
          mdi-clock-end
        </v-icon>
      </v-tab>
    </v-tabs>
    <div>
      <v-tabs-window
        v-model="tab"
      >
        <v-tabs-window-item v-if="$store.getters.shopConfig.donation_goal_enabled">
          <DonationGoal
            :no-shop-btn="true"
            class="mt-3 vh-shop-donation-goal"
            :no-icon="true"
            :center-headline="true"
          />
        </v-tabs-window-item>
        <v-tabs-window-item v-if="$store.getters.shopConfig.top_donators_enabled">
          <TopDonators
            class="mt-3 vh-shop-top-donators"
            :no-icon="true"
            :center-headline="true"
          />
        </v-tabs-window-item>
        <v-tabs-window-item v-if="$store.getters.shopConfig.last_donators_enabled">
          <LastDonators
            class="mt-3 vh-shop-last-donators"
            :no-icon="true"
            :center-headline="true"
          />
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
    };
  },
  computed: {
    numberOfTabs() {
      if (!this.$store.getters.shopConfig) return 0;
      let count = 0;
      if (this.$store.getters.shopConfig.donation_goal_enabled) count += 1;
      if (this.$store.getters.shopConfig.top_donators_enabled) count += 1;
      if (this.$store.getters.shopConfig.last_donators_enabled) count += 1;
      return count;
    },
    iconSize() {
      return this.$vuetify.display.lgAndUp ? '30' : '20';
    }
  },
};
</script>

<style scoped>
.square {
  min-width: 48px;
}
</style>
