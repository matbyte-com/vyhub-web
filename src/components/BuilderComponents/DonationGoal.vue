<template>
  <div>
    <v-card class="vh-donation-goal" flat
            v-if="shopConfig">
      <v-card-title>
        <HeadlineSidebar class="mx-auto" :title="shopConfig.donation_goal_display_title"
                         icon="mdi-flag-checkered"/>
      </v-card-title>
      <v-card-text>
        <v-progress-linear striped :value="donationProgress" height="20" class="progress-bar">
          <span :class="'subtitle-2 ' + (donationProgress >= 48 ? 'white--text' : '')">
            {{ donationProgress }}%
          </span>
        </v-progress-linear>
        <div class="text-center mt-1">
        <span v-if="donationGoal && donationGoal.currency" class="subtitle-1">
          {{ utils.formatDecimal(donationGoal.current) }}{{donationGoal.currency.symbol}}
          / {{ utils.formatDecimal(donationGoal.goal) }}{{donationGoal.currency.symbol}}
          {{ $t('_shop.labels.perMonth') }}</span>
        </div>
      </v-card-text>
    </v-card>
    <v-skeleton-loader v-else type="card" />
  </div>
</template>

<script>
import HeadlineSidebar from '@/components/HomeComponents/HeadlineSidebar.vue';
import openapi from '@/api/openapi';

export default {
  name: 'DonationGoal.vue',
  components: { HeadlineSidebar },
  data() {
    return {
      donationGoal: null,
      donationGoalFinal: 0,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).shop_getDonationGoal().then((rsp) => {
        setTimeout(() => {
          this.donationGoal = rsp.data;
        }, 100);
      });
    },
  },
  computed: {
    donationProgress() {
      if (!this.donationGoal) return 0;
      if (!this.donationGoal.current) return 0;
      return Math.floor((this.donationGoal.current / this.donationGoal.goal) * 100);
    },
    shopConfig() {
      return this.$store.state.shopConfig;
    },
  },
};
</script>

<style scoped>
</style>
