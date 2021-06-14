<template>
  <v-card>
    <v-card-title class="pb-0">
      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <v-icon color="primary" class="mr-1">mdi-flag-checkered</v-icon>
          <v-sheet vertical color="primary" width="2" height="25" class="">
          </v-sheet>
          <span class="ml-2 mr-1">
            {{ $t('_shop.labels.donationGoal') }}
          </span>
          <v-spacer />
          <v-btn :to="{name: 'Shop'}" outlined color="success" small>
            <v-icon left>
              mdi-sack
            </v-icon>
            <span>{{ $t('shop') }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-progress-linear :value="getProgress" height="20" class="mt-3">
        <strong>{{ getProgress }}%</strong>
      </v-progress-linear>
      <div class="d-flex">
        <span>33€ / 69€ {{ $t('_shop.labels.perMonth') }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DonationGoal.vue',
  data() {
    return {
    };
  },
  computed: {
    getProgress() {
      return 17;
    },
  },
};
</script>

<style scoped>

</style>
