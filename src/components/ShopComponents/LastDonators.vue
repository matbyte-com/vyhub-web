<template>
<div style="min-height: 105px">
  <v-card-title class="pt-0 pb-0">
    <HeadlineSidebar class="mx-auto"
                     :title="$store.getters.shopConfig.last_donators_display_title"
                     icon="mdi-clock-end"/>
  </v-card-title>
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
</div>
</template>

<script>
import HeadlineSidebar from '@/components/HomeComponents/HeadlineSidebar.vue';
import openapiCached from '@/api/openapiCached';

export default {
  name: 'LastDonators',
  components: { HeadlineSidebar },
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
};
</script>

<style scoped>

</style>
