<template>
  <div style="min-height: 105px">
    <div class="vh-top-donators"
            v-if="shopConfig">
      <v-card-title v-if="!noTitle" class="pb-1 pt-0">
        <CardTitle :no-icon="noIcon" :centered="centerHeadline"
                   :title="shopConfig.top_donators_display_title" icon="mdi-podium"/>
      </v-card-title>
      <v-card-text>
        <div class="d-flex align-center mt-3" style="overflow-x: auto; height: 55px"
             v-if="topDonators && topDonators.donators.length > 0">
          <v-spacer/>
          <v-fade-transition>
          <span class="mr-2 subtitle-1 text-no-wrap" v-show="finished"
                v-if="topDonators && topDonators.donators.length > 0">
            {{ Math.round(topDonators.donators[0].purchases_total) }} {{ currencySymbol }}
          </span>
          </v-fade-transition>
          <v-tooltip bottom v-for="(donator, index) in donatorsToShow"
                     :key="index">
            <template v-slot:activator="{ on, attrs }">
              <router-link :to="{ name: 'UserDashboard',
                     params: {id: donator.user.id}}">
                <v-avatar size="55" v-bind="attrs" class="animate__animated animate__backInDown
               animate__fast"
                          v-on="on" :style="`margin-right: -10px; z-index: ${index}`">
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
          <v-fade-transition>
          <span style="margin-left: 18px" class="subtitle-1 text-no-wrap"
                v-if="topDonators && topDonators.donators.length > 0"
                v-show="finished">
            {{ Math.round(topDonators.donators[topDonators.donators.length - 1]
            .purchases_total) }}
            {{ currencySymbol }}
          </span>
          </v-fade-transition>
          <v-spacer/>
        </div>
      </v-card-text>
    </div>
    <div v-if="topDonators !== null && topDonators.donators.length === 0" class="text-center mt-3">
      {{ $t('noDataAvailable') }}
    </div>
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import CardTitle from '@/components/CardTitle.vue';

export default {
  name: 'TopDonators',
  components: { CardTitle },
  props: ['noTitle', 'noIcon', 'centerHeadline'],
  data() {
    return {
      donatorsToShow: [],
      topDonators: null,
      finished: false,
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
        this.topDonators.donators = this.topDonators.donators.reverse();
        this.addDonators(0, this.topDonators.donators.length);
      });
    },
    addDonators(index, max) {
      if (index < max) {
        setTimeout(() => {
          this.donatorsToShow.push(this.topDonators.donators[index]);
          this.addDonators(index + 1, max);
        }, 100);
      } else {
        this.finished = true;
      }
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
