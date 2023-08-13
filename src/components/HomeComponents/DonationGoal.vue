<template>
  <div>
    <v-card class="vh-donation-goal card-rounded" flat v-if="donationGoal && shopConfig">
      <v-card-title class="pb-0">
        <HeadlineSidebar :title="shopConfig.donation_goal_display_title"
                         icon="mdi-flag-checkered"/>
        <v-spacer />
        <v-btn :to="{name: 'Shop'}" outlined color="success"
               :x-small="$vuetify.breakpoint.md" style="min-width: 32px"
               :small="$vuetify.breakpoint.lgAndUp || $vuetify.breakpoint.smAndDown">
          <v-icon :left="$vuetify.breakpoint.mdAndUp">
            mdi-sack
          </v-icon>
          <span v-if="!$vuetify.breakpoint.sm">{{ $t('shop') }}</span>
        </v-btn>
      </v-card-title>
      <v-card-text style="width: inherit">
        <v-progress-linear striped :value="donationProgress" height="20" class="mt-3">
        <span :class="'subtitle-2 ' + (donationProgress >= 48 ? 'white--text' : '')">
          {{ donationProgress }}%
        </span>
        </v-progress-linear>
        <div class="text-center mt-1">
          <span v-if="donationGoal.currency" class="subtitle-1">
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
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).shop_getDonationGoal().then((rsp) => {
        this.donationGoal = rsp.data;
      });
    },
  },
  computed: {
    donationProgress() {
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
