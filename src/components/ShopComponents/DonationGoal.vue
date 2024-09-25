<template>
  <div style="min-height: 105px">
    <div
      v-if="shopConfig"
      class="vh-donation-goal"
    >
      <v-card-title
        v-if="!noTitle"
        class="pb-2 pt-0 d-flex"
      >
        <CardTitle
          :no-icon="noIcon"
          :centered="centerHeadline"
          :title="shopConfig.donation_goal_display_title"
          icon="mdi-flag-checkered"
        />
        <v-spacer v-if="!noShopBtn" />
        <v-btn
          v-if="!noShopBtn"
          variant="outlined"
          class="mt-1"
          size="small"
          :to="{ name: 'Shop' }"
        >
          <span>{{ $t('shop') }}</span>
        </v-btn>
      </v-card-title>
      <v-card-text
        style="width: inherit"
        :class="textClasses"
      >
        <v-progress-linear
          rounded
          striped
          :model-value="donationProgress"
          height="20"
          class="progress-bar"
        >
          <span :class="'subtitle-2 ' + (donationProgress >= 48 ? 'white--text' : '')">
            {{ donationProgress }}%
          </span>
        </v-progress-linear>
        <div class="text-center mt-1">
          <v-fade-transition>
            <span
              v-if="donationGoal && donationGoal.currency"
              class="text-subtitle-1"
            >
              {{ utils.formatDecimal(donationGoal.current) }}{{ donationGoal.currency.symbol }}
              / {{ utils.formatDecimal(donationGoal.goal) }}{{ donationGoal.currency.symbol }}
              {{ $t('_shop.labels.perMonth') }}</span>
          </v-fade-transition>
        </div>
      </v-card-text>
    </div>
    <v-skeleton-loader
      v-else
      type="card"
    />
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import CardTitle from '@/components/CardTitle.vue';

export default {
  name: 'DonationGoal.vue',
  components: { CardTitle },
  props: ['noIcon', 'noTitle', 'centerHeadline', 'textClasses', 'noShopBtn'],
  data() {
    return {
      donationGoal: null,
      donationGoalFinal: 0,
    };
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
};
</script>

<style scoped>
</style>
