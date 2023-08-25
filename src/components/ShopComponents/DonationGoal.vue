<template>
  <div style="min-height: 105px">
    <div class="vh-donation-goal"
            v-if="shopConfig">
      <v-card-title v-if="!noTitle" class="pb-2 pt-0">
        <HeadlineSidebar class="mx-auto"
                         :title="shopConfig.donation_goal_display_title"
                         :no-icon="true"
                         icon="mdi-flag-checkered"/>
      </v-card-title>
      <v-progress-linear striped :value="donationProgress" height="20" class="progress-bar">
        <span :class="'subtitle-2 ' + (donationProgress >= 48 ? 'white--text' : '')">
          {{ donationProgress }}%
        </span>
      </v-progress-linear>
      <div class="text-center mt-1">
        <v-fade-transition>
                <span v-if="donationGoal && donationGoal.currency" class="subtitle-1">
        {{ utils.formatDecimal(donationGoal.current) }}{{donationGoal.currency.symbol}}
        / {{ utils.formatDecimal(donationGoal.goal) }}{{donationGoal.currency.symbol}}
        {{ $t('_shop.labels.perMonth') }}</span>
        </v-fade-transition>
      </div>
    </div>
    <v-skeleton-loader v-else type="card" />
  </div>
</template>

<script>
import HeadlineSidebar from '@/components/HomeComponents/HeadlineSidebar.vue';
import openapi from '@/api/openapi';

export default {
  name: 'DonationGoal.vue',
  components: { HeadlineSidebar },
  props: ['noTitle'],
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
