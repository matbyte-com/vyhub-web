<template>
  <div>
    <v-row
      v-if="!imageCardUrl"
      justify="center"
      class="vh-home-shop-stats"
    >
      <v-col
        v-if="$store.getters.shopConfig.donation_goal_enabled"
        cols="11"
        sm="8"
        md="6"
        lg="5"
        xl="4"
        class="d-flex"
      >
        <v-card
          class="card-rounded pt-2 px-2 flex-grow-1"
          hover
        >
          <DonationGoal
            text-classes="mt-3"
            :center-headline="true"
          />
        </v-card>
      </v-col>
      <v-col
        v-if="$store.getters.shopConfig.top_donators_enabled"
        cols="11"
        sm="8"
        md="6"
        lg="5"
        xl="4"
      >
        <v-card
          class="card-rounded pt-2 px-2"
          hover
        >
          <TopDonators :center-headline="true" />
        </v-card>
      </v-col>
    </v-row>
    <v-card
      v-else
      class="card-rounded"
      :img="imageCardUrl"
      flat
      :dark="whiteText"
    >
      <v-row
        :justify="$vuetify.display.mdAndUp ? 'start' : 'center'"
        class="vh-home-shop-stats"
      >
        <v-col
          cols="11"
          sm="9"
          md="8"
          lg="6"
        >
          <div
            v-if="$store.getters.shopConfig.donation_goal_enabled"
            class="card-rounded pt-2 px-2 flex-grow-1"
          >
            <DonationGoal text-classes="mt-3" />
          </div>
          <v-divider
            v-if="$store.getters.shopConfig.donation_goal_enabled &&
              $store.getters.shopConfig.top_donators_enabled"
            class="mr-6"
          />
          <div
            v-if="$store.getters.shopConfig.top_donators_enabled"
            class="card-rounded pt-2 px-2"
          >
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
