<template>
  <div>
    <div v-if="currencies != null">
      <v-row class="align-center justify-space-between" dense>
        <v-col cols="12" lg="9">
          <v-menu offset-y style="z-index: 21" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-btn
                variant="outlined"
                :class="currentRangeBtn === 'range' ? 'v-btn--active' : ''"
                color="primary"
               
                v-bind="props">
                {{ $t('_purchases.labels.range') }}
              </v-btn>
            </template>
            <v-date-picker
              range
              v-model="timeRange"
              :max="tomorrow.toISOString()" @change="currentRangeBtn = 'range'"/>
          </v-menu>
          <v-btn variant="outlined" class="ml-1" :class="currentRangeBtn === 'allTime' ? 'v-btn--active' : ''"
                 @click="timeRange = null; currentRangeBtn = 'allTime'">
            {{ $t('_purchases.labels.allTime') }}
          </v-btn>
          <v-btn variant="outlined" class="ml-1"
                 :class="currentRangeBtn === 'thisYear' ? 'v-btn--active' : ''"
                 @click="timeRange = [firstOfThisYear.toISOString(), tomorrow.toISOString()];
                 currentRangeBtn = 'thisYear'">
            {{ $t('_purchases.labels.thisYear') }}
          </v-btn>
          <v-btn variant="outlined" class="ml-1"
                 :class="currentRangeBtn === 'thisMonth' ? 'v-btn--active' : ''"
                 @click="timeRange = [firstOfThisMonth.toISOString(), tomorrow.toISOString()];
                 currentRangeBtn = 'thisMonth'">
            {{ $t('_purchases.labels.thisMonth') }}
          </v-btn>
        </v-col>
        <v-col cols="6" lg="3" class="d-flex align-center">
          <v-select :items="dashboards" v-model="currentDashboard" hide-details variant="outlined" density="compact"
                    item-title="name" item-value="value"/>
          <v-select item-title="name" item-value="code" :items="currencies"
                    v-model="currentCurrency"
                    hide-details class="ml-1"
                    variant="outlined"
                    density="compact"
                    return-object/>
        </v-col>
      </v-row>
      <Overview v-if="currentDashboard === 'overview'"
                :timeRange="timeRange"
                :currency="currentCurrency"
                :intervalItems="intervalItems"/>
      <Purchases v-if="currentDashboard === 'purchases'"
                 :timeRange="timeRange"
                 :currency="currentCurrency"
                 :intervalItems="intervalItems"/>
    </div>
  </div>
</template>

<script>
import Purchases from '@/components/ShopComponents/StatisticDashboards/Purchases.vue';
import Overview from '@/components/ShopComponents/StatisticDashboards/Overview.vue';
import openapiCached from '../../../api/openapiCached';

export default {
  name: 'Statistics',
  components: {
    Purchases,
    Overview,
  },
  data() {
    return {
      timeRange: null,
      currencies: null,
      currentCurrency: null,
      currentRangeBtn: 'allTime',
      dashboards: [
        {
          name: this.$t('overview'),
          value: 'overview',
        },
        {
          name: this.$t('purchases'),
          value: 'purchases',
        },
      ],
      currentDashboard: 'overview',
      intervalItems: [
        {
          name: this.$t('perDay'),
          value: 'DAY',
        },
        {
          name: this.$t('perMonth'),
          value: 'MONTH',
        },
        {
          name: this.$t('perYear'),
          value: 'YEAR',
        },
      ],
    };
  },
  beforeMount() {
    this.fetchData();
  },
  watch: {
    $route() {
      this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      const cachedApi = await openapiCached;

      cachedApi.shop_getCurrencies().then((rsp) => {
        this.currencies = rsp.data;

        if (this.currencies.length > 0) {
          [this.currentCurrency] = this.currencies;
        }
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
  },
  computed: {
    tomorrow() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    },
    firstOfThisMonth() {
      const first = new Date();
      first.setDate(1);
      return first;
    },
    firstOfThisYear() {
      const first = new Date();
      first.setMonth(0);
      first.setDate(1);
      return first;
    },
  },
};
</script>

<style scoped>

</style>
