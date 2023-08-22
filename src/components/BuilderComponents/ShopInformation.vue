<template>
  <div>
    <v-row justify="center">
      <v-col cols="8" md="6" lg="5" v-if="$store.getters.shopConfig.donation_goal_enabled">
        <DonationGoal class="grow-on-hover"/>
      </v-col>
      <v-col cols="8" md="6" lg="5" v-if="$store.getters.shopConfig.top_donators_enabled">
        <TopDonators class="grow-on-hover" />
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
.grow-on-hover {
  transition: all .2s ease-in-out;
}
.grow-on-hover:hover {
  transform: scale(1.02);
}

</style>
