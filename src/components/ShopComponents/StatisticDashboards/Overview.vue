<template>
  <v-row>
    <v-col cols="12" lg="8">
      <v-card v-if="debitStats != null">
        <v-card-title>
          <v-icon start>mdi-currency-usd</v-icon>
          {{ $t('revenue') }}
          <v-spacer></v-spacer>
          <v-select hide-details density="compact" variant="outlined" v-model="selectedSalesInterval"
                    style="z-index: 20"
                    :items="intervalItems" item-title="name" item-value="value"></v-select>
        </v-card-title>
        <v-card-text>
          <DebitChart :data="debitStats" :currency="currency"></DebitChart>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" lg="4" v-if="purchaseStats != null">
      <v-row>
        <v-col cols="4" lg="12" xl="6">
          <v-card>
            <v-card-title>
              <v-icon start>mdi-numeric</v-icon>
              {{ $t('_purchases.labels.salesCount') }}
            </v-card-title>
            <v-card-text>
              <div class="text-h4 text-center">
                {{ successfulStats.count }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" lg="12" xl="6">
          <v-card>
            <v-card-title>
              <v-icon start>mdi-cash-register</v-icon>
              {{ $t('_purchases.labels.totalRevenue') }}
            </v-card-title>
            <v-card-text>
              <div class="text-h4 text-center">
                {{
                  successfulStats.amount_total
                    .toLocaleString(undefined, {minimumFractionDigits: 2})
                }}
                {{ currency.symbol }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" lg="12" xl="6">
          <v-card>
            <v-card-title>
              <v-icon start>mdi-cash</v-icon>
              {{ $t('_purchases.labels.activeSubscriptions') }}
              <v-spacer />
              <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                  <v-icon
                   
                    v-bind="props"
                  >
                    mdi-information
                  </v-icon>
                </template>
                <span>{{$t('_purchases.labels.notAffectedByRangeSelector')}}</span>
              </v-tooltip>
            </v-card-title>
            <v-card-text>
              <div class="text-h4 text-center">
                {{ purchaseStats.active_subscriptions }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" lg="12" xl="6">
          <v-card>
            <v-card-title>
              <v-icon start>mdi-calendar-refresh</v-icon>
              {{ $t('_purchases.labels.monthlyRevenue') }}
              <v-spacer />
              <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                  <v-icon
                   
                    v-bind="props"
                  >
                    mdi-information
                  </v-icon>
                </template>
                <span>{{$t('_purchases.labels.notAffectedByRangeSelector')}}</span>
              </v-tooltip>
            </v-card-title>
            <v-card-text>
              <div class="text-h4 text-center">
                {{
                  purchaseStats.monthly_revenue
                    .toLocaleString(undefined, {minimumFractionDigits: 2})
                }}
                {{ currency.symbol }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" lg="12" xl="6">
          <v-card>
            <v-card-title>
              <v-icon start>mdi-circle-multiple</v-icon>
              {{ $t('_purchases.labels.creditsSpent') }}
            </v-card-title>
            <v-card-text>
              <div class="text-h4 text-center">
                {{ successfulStats.credits }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" lg="12" xl="6">
          <v-card>
            <v-card-title>
              <v-icon start>mdi-percent</v-icon>
              {{ $t('_purchases.labels.averagePurchaseAmount') }}
            </v-card-title>
            <v-card-text>
              <div class="text-h4 text-center">
                {{ purchaseStats.average_purchase.
              toLocaleString(undefine, { minimumFractionDigits: 2 }) }} {{ currency.symbol }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" lg="12">
          <v-card>
            <v-card-title>
              <v-icon start>mdi-earth</v-icon>
              {{ $t('_purchases.labels.revenueByCountry') }}
            </v-card-title>
            <v-card-text>
              <PurchaseCountryChart :currency="currency" :data="purchaseStats.country">

              </PurchaseCountryChart>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" lg="12">
          <v-card>
            <v-card-title>
              <v-icon start>mdi-gift-open</v-icon>
              {{ $t('_purchases.labels.revenueByCategory') }}
            </v-card-title>
            <v-card-text>
              <PurchaseCategoryChart :currency="currency" :data="categoryStats"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" lg="8" v-if="debitStats == null">
      <v-skeleton-loader type="card"/>
    </v-col>
    <v-col cols="12" lg="4" v-if="purchaseStats == null">
      <v-skeleton-loader type="card"/>
    </v-col>
  </v-row>
</template>

<script>
import DebitChart from '@/components/Charts/DebitChart.vue';
import PurchaseCountryChart from '@/components/Charts/PurchaseCountryChart.vue';
import PurchaseCategoryChart from '@/components/Charts/PurchaseCategoryChart.vue';
import openapi from '@/api/openapi';

export default {
  name: 'Overview',
  components: { PurchaseCategoryChart, PurchaseCountryChart, DebitChart },
  props: ['timeRange', 'currency', 'intervalItems'],
  beforeMount() {
    this.queryStatistics();
    this.queryLineGraphs();
  },
  watch: {
    currency() {
      if (this.currency != null) {
        this.queryStatistics();
        this.queryLineGraphs();
      }
    },
    selectedSalesInterval() {
      if (this.currency != null) {
        this.queryLineGraphs();
      }
    },
    timeRange() {
      this.queryStatistics();
    },
  },
  data() {
    return {
      selectedSalesInterval: 'MONTH',
      debitStats: null,
      purchaseStats: null,
      categoryStats: null,
    };
  },
  methods: {
    async queryStatistics() {
      const api = await openapi;
      let begin;
      let end;

      if (this.timeRange?.length === 2) {
        begin = new Date(this.timeRange[0]).toISOString();
        end = new Date(this.timeRange[1]).toISOString();
      }

      api.shop_getPurchaseStatistic({
        currency_code: this.currency.code,
        begin,
        end,
      }).then((rsp) => {
        this.purchaseStats = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
      api.shop_getPacketCategoryStatistic({
        currency_code: this.currency.code,
        begin,
        end,
      }).then((rsp) => {
        this.categoryStats = rsp.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    async queryLineGraphs() {
      const api = await openapi;

      api.shop_getDebitStatistic({
        currency_code: this.currency.code,
        interval: this.selectedSalesInterval,
      }).then((rsp) => {
        this.debitStats = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
  },
  computed: {
    successfulStats() {
      if (this.purchaseStats == null) {
        return null;
      }

      const stats = {
        count: 0,
        amount_net: 0.0,
        amount_tax: 0.0,
        amount_total: 0.0,
        credits: 0,
      };

      if ('FINISHED' in this.purchaseStats.status) {
        stats.count += this.purchaseStats.status.FINISHED.count;
        stats.amount_net += this.purchaseStats.status.FINISHED.amount_net;
        stats.amount_tax += this.purchaseStats.status.FINISHED.amount_tax;
        stats.amount_total += this.purchaseStats.status.FINISHED.amount_total;
        stats.credits += this.purchaseStats.status.FINISHED.credits;
      }

      if ('RECURRING' in this.purchaseStats.status) {
        stats.count += this.purchaseStats.status.RECURRING.count;
        stats.amount_net += this.purchaseStats.status.RECURRING.amount_net;
        stats.amount_tax += this.purchaseStats.status.RECURRING.amount_tax;
        stats.amount_total += this.purchaseStats.status.RECURRING.amount_total;
        stats.credits += this.purchaseStats.status.RECURRING.credits;
      }

      return stats;
    },
  },
};
</script>

<style scoped>

</style>
