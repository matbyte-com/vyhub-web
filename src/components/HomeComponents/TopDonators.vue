<template>
  <div>
    <v-card :class="$vuetify.breakpoint.mdAndUp ? '' : 'transparent'" flat
            v-if="topDonators && shopConfig">
      <v-card-title class="pb-0">
        <v-row>
          <v-col cols="12" class="d-flex align-center">
            <HeadlineSidebar :title="shopConfig.top_donators_display_title" icon="mdi-podium"/>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text v-if="topDonators.donators.length > 0">
        <div class="d-flex align-center mt-3" style="overflow-x: auto">
          <v-spacer/>
          <span class="mr-2 subtitle-1 text-no-wrap">
          {{ Math.round(topDonators.donators[0].purchases_total) }} {{ currencySymbol }}
        </span>
          <v-tooltip bottom v-for="(donator, index) in topDonators.donators" :key="donator.user.id">
            <template v-slot:activator="{ on, attrs }">
              <router-link :to="{ name: 'UserDashboard',
                         params: {id: donator.user.id}}">
                <v-avatar size="55" v-bind="attrs"
                          v-on="on" :style="`margin-right: -10px; z-index: ${100-index}`">
                  <v-img :src="donator.user.avatar"
                         lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png"
                         alt="Avatar"/>
                </v-avatar>
              </router-link>
            </template>
            <span>
            {{ donator.user.username }} {{ donator.purchases_total }} {{ currencySymbol }}
          </span>
          </v-tooltip>
          <span style="margin-left: 18px" class="subtitle-1 text-no-wrap">
          {{ Math.round(topDonators.donators[topDonators.donators.length - 1].purchases_total) }}
           {{ currencySymbol }}
          </span>
          <v-spacer/>
        </div>
      </v-card-text>
      <v-card-text v-else/>
    </v-card>
    <v-skeleton-loader v-else type="card"/>
  </div>
</template>

<script>
import HeadlineSidebar from '@/components/HomeComponents/HeadlineSidebar.vue';
import openapi from '@/api/openapi';

export default {
  name: 'TopDonators',
  components: { HeadlineSidebar },
  data() {
    return {
      topDonators: null,
      key: 0,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).shop_getTopDonators().then((rsp) => {
        this.topDonators = rsp.data;
      });
    },
  },
  computed: {
    currencySymbol() {
      return this.topDonators.currency.symbol;
    },
    shopConfig() {
      return this.$store.getters.shopConfig;
    },
  },
};
</script>

<style scoped>

</style>
