<template>
<div>
  <v-card-text>
    <v-tabs v-model="tab" grow v-show="numberOfTabs !== 1">
      <v-tab class="square" v-if="$store.getters.shopConfig.donation_goal_enabled">
        <v-icon :large="$vuetify.breakpoint.lgAndUp">mdi-flag-checkered</v-icon></v-tab>
      <v-tab class="square" v-if="$store.getters.shopConfig.top_donators_enabled">
        <v-icon :large="$vuetify.breakpoint.lgAndUp">mdi-podium</v-icon></v-tab>
      <v-tab class="square" v-if="$store.getters.shopConfig.last_donators_enabled">
        <v-icon :large="$vuetify.breakpoint.lgAndUp">mdi-clock-end</v-icon></v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-if="$store.getters.shopConfig.donation_goal_enabled">
        <DonationGoal :no-shop-btn="true" class="mt-3" :no-icon="true" :center-headline="true"/>
      </v-tab-item>
      <v-tab-item v-if="$store.getters.shopConfig.top_donators_enabled">
        <TopDonators class="mt-3" :no-icon="true" :center-headline="true" />
      </v-tab-item>
      <v-tab-item v-if="$store.getters.shopConfig.last_donators_enabled">
        <LastDonators class="mt-3" :no-icon="true" :center-headline="true" />
      </v-tab-item>
    </v-tabs-items>
  </v-card-text>
</div>
</template>

<script>
import LastDonators from '@/components/ShopComponents/LastDonators.vue';
import DonationGoal from './DonationGoal.vue';
import TopDonators from './TopDonators.vue';

export default {
  name: 'ShopStatsSide',
  components: { LastDonators, TopDonators, DonationGoal },
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
  },
};
</script>

<style scoped>
.square {
  min-width: 48px;
}
</style>
