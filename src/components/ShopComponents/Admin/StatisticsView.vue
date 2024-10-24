<template>
  <div>
    <div v-if="currencies != null">
      <v-row
        class="align-center justify-space-between"
        dense
      >
        <v-col
          cols="12"
          lg="9"
        >
          <v-menu
            location="bottom"
            style="z-index: 21"
            :close-on-content-click="false"
          >
            <template #activator="{ props }">
              <v-btn
                variant="outlined"
                :class="currentRangeBtn === 'range' ? 'v-btn--active' : ''"
                color="primary"

                v-bind="props"
              >
                {{ $t('_purchases.labels.range') }}
              </v-btn>
            </template>
            <v-date-picker
              v-model="timeRange"
              multiple="range"
              :max="tomorrow.toISOString()"
              @change="currentRangeBtn = 'range'"
            />
          </v-menu>
          <v-btn
            variant="outlined"
            class="ml-1"
            :class="currentRangeBtn === 'allTime' ? 'v-btn--active' : ''"
            @click="timeRange = null; currentRangeBtn = 'allTime'"
          >
            {{ $t('_purchases.labels.allTime') }}
          </v-btn>
          <v-btn
            variant="outlined"
            class="ml-1"
            :class="currentRangeBtn === 'thisYear' ? 'v-btn--active' : ''"
            @click="timeRange = [firstOfThisYear.toISOString(), tomorrow.toISOString()];
                    currentRangeBtn = 'thisYear'"
          >
            {{ $t('_purchases.labels.thisYear') }}
          </v-btn>
          <v-btn
            variant="outlined"
            class="ml-1"
            :class="currentRangeBtn === 'thisMonth' ? 'v-btn--active' : ''"
            @click="timeRange = [firstOfThisMonth.toISOString(), tomorrow.toISOString()];
                    currentRangeBtn = 'thisMonth'"
          >
            {{ $t('_purchases.labels.thisMonth') }}
          </v-btn>
        </v-col>
        <v-col
          cols="6"
          lg="3"
          class="d-flex align-center"
        >
          <v-select
            v-model="currentDashboard"
            :items="dashboards"
            hide-details
            variant="outlined"
            density="compact"
            item-title="name"
            item-value="value"
          />
          <v-select
            v-model="currentCurrency"
            item-title="name"
            item-value="code"
            :items="currencies"
            hide-details
            class="ml-1"
            variant="outlined"
            density="compact"
            return-object
          />
        </v-col>
      </v-row>
      <div v-if="currentCurrency">
        <OverviewStatistics
          v-if="currentDashboard === 'overview'"
          :time-range="timeRange"
          :currency="currentCurrency"
          :interval-items="intervalItems"
        />
        <PurchasesStatistics
          v-if="currentDashboard === 'purchases'"
          :time-range="timeRange"
          :currency="currentCurrency"
          :interval-items="intervalItems"
        />
      </div>
      <div v-else>
        <v-alert
          variant="tonal"
          class="mt-3"
          color="info"
          dense
        >
          {{ $t('noDataAvailable') }} (Purchases)
        </v-alert>
      </div>
    </div>
  </div>
</template>

<script>
import openapiCached from '../../../api/openapiCached';

export default {
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
  watch: {
    $route() {
      this.fetchData();
    },
  },
  beforeMount() {
    this.fetchData();
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
};
</script>

<style scoped>

</style>
