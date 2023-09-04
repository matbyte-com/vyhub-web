<template>
  <div>
    <v-row justify="center" class="vh-home-shop-stats">
      <v-col cols="11" sm="8" md="6" lg="5" xl="4"
             v-if="$store.getters.shopConfig.donation_goal_enabled"
             class="d-flex">
        <v-card class="card-rounded pt-2 px-2 flex-grow-1" hover>
          <DonationGoal text-classes="mt-3" :center-headline="true"/>
        </v-card>
      </v-col>
      <v-col cols="11" sm="8" md="6" lg="5" xl="4"
             v-if="$store.getters.shopConfig.top_donators_enabled">
        <v-card class="card-rounded pt-2 px-2" hover>
          <TopDonators :center-headline="true" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TopDonators from '@/components/ShopComponents/TopDonators.vue';
import DonationGoal from '../ShopComponents/DonationGoal.vue';

export default {
  name: 'ShopInformation',
  components: { DonationGoal, TopDonators },
  props: ['headline'],
};
</script>

<style scoped>

</style>
