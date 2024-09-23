<template>
  <div style="min-height: 105px">
    <div
      v-if="shopConfig"
      class="vh-top-donators"
    >
      <v-card-title
        v-if="!noTitle"
        class="pb-1 pt-0"
      >
        <CardTitle
          :no-icon="noIcon"
          :centered="centerHeadline"
          :title="shopConfig.top_donators_display_title"
          icon="mdi-podium"
        />
      </v-card-title>
      <v-card-text style="width: inherit">
        <div
          v-if="topDonators && topDonators.donators.length > 0"
          class="d-flex align-center mt-3"
          style="overflow-x: auto; height: 65px; overflow-y: hidden;"
        >
          <v-spacer />
          <v-fade-transition>
            <span
              v-show="finished"
              v-if="topDonators && topDonators.donators.length > 0"
              class="mr-2 text-subtitle-1 text-no-wrap"
            >
              {{ Math.round(topDonators.donators[0].purchases_total) }} {{ currencySymbol }}
            </span>
          </v-fade-transition>
          <v-tooltip
            v-for="(donator, index) in donatorsToShow"
            :key="index"
            location="bottom"
          >
            <template #activator="{ props }">
              <router-link
                :to="{ name: 'UserDashboard',
                       params: {id: donator.user.id}}"
              >
                <v-avatar
                  size="55"
                  class="animate__animated animate__backInDown
               animate__fast"
                  v-bind="props"
                  :style="`margin-right: -10px; z-index: ${index}`"
                >
                  <v-img
                    :src="donator.user.avatar"
                    lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png"
                    alt="Avatar"
                  />
                </v-avatar>
              </router-link>
            </template>
            <span>
              {{ donator.user.username }} {{ donator.purchases_total }} {{ currencySymbol }}
            </span>
          </v-tooltip>
          <v-fade-transition>
            <span
              v-if="topDonators && topDonators.donators.length > 0"
              v-show="finished"
              style="margin-left: 18px"
              class="text-subtitle-1 text-no-wrap"
            >
              {{ Math.round(topDonators.donators[topDonators.donators.length - 1]
                .purchases_total) }}
              {{ currencySymbol }}
            </span>
          </v-fade-transition>
          <v-spacer />
        </div>
      </v-card-text>
    </div>
    <div
      v-if="topDonators !== null && topDonators.donators.length === 0"
      class="text-center mt-3"
    >
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
  computed: {
    currencySymbol() {
      return this.topDonators.currency.symbol;
    },
    shopConfig() {
      return this.$store.getters.shopConfig;
    },
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
};
</script>

<style scoped>

</style>
