<template>
<div style="min-height: 105px" class="vh-last-donators">
  <v-card-title v-if="!noTitle" class="pb-0 pt-0">
    <CardTitle :no-icon="noIcon" :centered="centerHeadline"
               :title="shopConfig.last_donators_display_title" icon="mdi-clock-end"/>
  </v-card-title>
  <v-card-text>
    <div v-if="lastDonators !== null && lastDonators.length === 0" class="text-center mt-3">
      {{ $t('noDataAvailable') }}
    </div>
    <v-row class="mt-2">
      <v-col cols="6" sm="6" md="12" xl="6" class="pt-0 mt-0"
             v-for="donation in lastDonators" :key="donation.id">
        <div class="d-flex align-center">
          <router-link :to="{ name: 'UserDashboard',
                       params: {id: donation.user.id}}">
            <v-avatar :size="55">
              <v-img :src="donation.user.avatar"
                     lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png"
                     alt="Avatar"/>
            </v-avatar>
          </router-link>
          <div class="ml-2">
            {{ donation.user.username }} <br>
            {{ donation.amount_total }} {{ donation.currency.symbol }}
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card-text>
</div>
</template>

<script>
import openapiCached from '@/api/openapiCached';
import CardTitle from '@/components/CardTitle.vue';

export default {
  name: 'LastDonators',
  props: ['noIcon', 'noTitle', 'centerHeadline'],
  components: { CardTitle },
  data() {
    return {
      lastDonators: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapiCached).shop_getLastDonators().then((rsp) => {
        this.lastDonators = rsp.data;
      });
    },
  },
  computed: {
    shopConfig() {
      return this.$store.state.shopConfig;
    },
  },
};
</script>

<style scoped>

</style>
