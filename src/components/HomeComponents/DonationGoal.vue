<template>
  <div>
    <v-card :class="$vuetify.breakpoint.mdAndUp ? '' : 'transparent'" class="vh-donation-goal" flat
            v-if="donationGoal && shopConfig">
      <v-card-title class="pb-0">
        <v-row>
          <v-col cols="12" class="d-flex align-center">
            <HeadlineSidebar :title="shopConfig.donation_goal_display_title"
                             icon="mdi-flag-checkered"/>
            <v-spacer />
            <v-btn :to="{name: 'Shop'}" outlined color="success"
                   :x-small="$vuetify.breakpoint.mdAndDown"
                   :small="$vuetify.breakpoint.lgAndUp">
              <v-icon left>
                mdi-sack
              </v-icon>
              <span>{{ $t('shop') }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
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
