<template>
  <div>
    <v-card>
      <v-card-text class="pa-5">
        <div class="text-center text-h3 pb-2">
          {{ headline }}
        </div>
        <v-row justify="center">
          <v-col cols="8" md="6" lg="5" v-if="$store.getters.shopConfig.donation_goal_enabled">
            <DonationGoal class="grow"/>
          </v-col>
          <v-col cols="8" md="6" lg="5" v-if="$store.getters.shopConfig.top_donators_enabled">
            <TopDonators class="grow" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import TopDonators from '@/components/BuilderComponents/TopDonators.vue';
import DonationGoal from './DonationGoal.vue';

export default {
  name: 'ShopInformation',
  components: { DonationGoal, TopDonators },
  props: ['headline'],
};
</script>

<style scoped>
.grow {
  transition: all .2s ease-in-out;
}
.grow:hover {
  transform: scale(1.02);
}

</style>
