<template>
  <div>
    <v-row justify="center" class="vh-home-shop-stats" v-if="!imageCardUrl">
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
    <v-card class="card-rounded" :img="imageCardUrl" flat v-else :dark="whiteText">
      <v-row :justify="$vuetify.breakpoint.mdAndUp ? 'start' : 'center'" class="vh-home-shop-stats">
        <v-col cols="11" sm="9" md="8" lg="6">
            <div class="card-rounded pt-2 px-2 flex-grow-1"
                    v-if="$store.getters.shopConfig.donation_goal_enabled">
              <DonationGoal text-classes="mt-3"/>
            </div>
            <v-divider class="mr-6"
                       v-if="$store.getters.shopConfig.donation_goal_enabled &&
                        $store.getters.shopConfig.top_donators_enabled"/>
            <div class="card-rounded pt-2 px-2"
                    v-if="$store.getters.shopConfig.top_donators_enabled">
              <TopDonators />
            </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import TopDonators from '@/components/ShopComponents/TopDonators.vue';
import DonationGoal from '../ShopComponents/DonationGoal.vue';

export default {
  name: 'ShopInformation',
  components: { DonationGoal, TopDonators },
  props: ['imageCardUrl', 'whiteText'],
};
</script>

<style scoped>

</style>
