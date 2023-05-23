<template>
  <div>
    <div v-if="currencies != null">
      <v-row>
        <v-spacer/>
        <v-col xl="2" lg="3" md="6" sm="12">
          <v-select item-text="name" item-value="code" :items="currencies"
                    v-model="currentCurrency"
                    hide-details
                    outlined
                    dense
                    return-object></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col xl="8" lg="7" sm="12">
          <v-card v-if="debitStats != null">
            <v-card-title>
              <v-icon left>mdi-currency-usd</v-icon>
              {{ $t('revenue') }}
              <v-spacer></v-spacer>
              <v-select hide-details dense outlined v-model="selectedSalesInterval"
                        style="z-index: 20"
                        :items="intervalItems" item-text="name" item-value="value"></v-select>
            </v-card-title>
            <v-card-text>
              <DebitChart :data="debitStats" :currency="currentCurrency"></DebitChart>
            </v-card-text>
          </v-card>
          <v-card v-if="purchaseCountIntervalItems != null" class="mt-6">
            <v-card-title>
              <v-icon left>mdi-counter</v-icon>
              {{ $t('_purchases.labels.salesCount') }}
              <v-spacer></v-spacer>
              <v-select hide-details dense outlined v-model="selectedSalesInterval"
                        style="z-index: 20"
                        :items="intervalItems" item-text="name" item-value="value"></v-select>
            </v-card-title>
            <v-card-text>
              <PurchaseNumberChart :data="purchaseCountIntervalItems"></PurchaseNumberChart>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col xl="4" lg="5" sm="12">
          <v-row>
            <v-col xl="6" lg="12" md="4" sm="6">
              <v-card v-if="purchaseStats != null">
                <v-card-title>
                  <v-icon left>mdi-numeric</v-icon>
                  {{ $t('_purchases.labels.salesCount') }}
                </v-card-title>
                <v-card-text>
                  <div class="text-h4 text-center">
                    {{ successfulStats.count }}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col xl="6" lg="12" md="4" sm="6">
              <v-card v-if="purchaseStats != null">
                <v-card-title>
                  <v-icon left>mdi-cash-register</v-icon>
                  {{ $t('_purchases.labels.totalRevenue') }}
                </v-card-title>
                <v-card-text>
                  <div class="text-h4 text-center">
                    {{
                      successfulStats.amount_total
                        .toLocaleString(undefined, {minimumFractionDigits: 2})
                    }}
                    {{ currentCurrency.symbol }}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col xl="6" lg="12" md="4" sm="6">
              <v-card v-if="purchaseStats != null">
                <v-card-title>
                  <v-icon left>mdi-calendar-refresh</v-icon>
                  {{ $t('_purchases.labels.monthlyRevenue') }}
                </v-card-title>
                <v-card-text>
                  <div class="text-h4 text-center">
                    {{
                      purchaseStats.monthly_revenue
                        .toLocaleString(undefined, {minimumFractionDigits: 2})
                    }}
                    {{ currentCurrency.symbol }}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col xl="6" lg="12" md="4" sm="6">
              <v-card v-if="purchaseStats != null">
                <v-card-title>
                  <v-icon left>mdi-circle-multiple</v-icon>
                  {{ $t('_purchases.labels.creditsSpent') }}
                </v-card-title>
                <v-card-text>
                  <div class="text-h4 text-center">
                    {{ successfulStats.credits }}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col xl="12" lg="12" md="8" sm="12">
              <v-card v-if="purchaseStats != null">
                <v-card-title>
                  <v-icon left>mdi-earth</v-icon>
                  {{ $t('_purchases.labels.revenueByCountry') }}
                </v-card-title>
                <v-card-text>
                  <PurchaseCountryChart :currency="currentCurrency" :data="purchaseStats.country">

                  </PurchaseCountryChart>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col xl="12" lg="12" md="8" sm="12">
              <v-card v-if="purchaseStats != null">
                <v-card-title>
                  <v-icon left>mdi-gift-open</v-icon>
                  {{ $t('_purchases.labels.revenueByCategory') }}
                </v-card-title>
                <v-card-text>
                  <PurchaseCategoryChart :currency="currentCurrency" :data="categoryStats"
                  />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import PurchaseCategoryChart from '@/components/Charts/PurchaseCategoryChart.vue';
import PurchaseNumberChart from '@/components/Charts/PurchaseNumberChart.vue';
import DebitChart from '../../Charts/DebitChart.vue';
import openapi from '../../../api/openapi';
import openapiCached from '../../../api/openapiCached';
import PurchaseCountryChart from '../../Charts/PurchaseCountryChart.vue';

export default {
  name: 'Statistics',
  components: {
    PurchaseNumberChart, PurchaseCategoryChart, PurchaseCountryChart, DebitChart,
  },
  data() {
    return {
      debitStats: null,
      purchaseStats: null,
      currencies: null,
      currentCurrency: null,
      categoryStats: null,
      purchaseCountIntervalItems: null,
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
      selectedSalesInterval: 'MONTH',
    };
  },
  beforeMount() {
    this.fetchData();
  },
  watch: {
    $route() {
      this.fetchData();
    },
    currentCurrency() {
      if (this.currentCurrency != null) {
        this.queryStatistics();
      }
    },
    selectedSalesInterval() {
      if (this.currentCurrency != null) {
        this.queryStatistics();
      }
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
    async queryStatistics() {
      const api = await openapi;

      api.shop_getDebitStatistic({
        currency_code: this.currentCurrency.code,
        interval: this.selectedSalesInterval,
      }).then((rsp) => {
        this.debitStats = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });

      api.shop_getPurchaseStatistic({
        currency_code: this.currentCurrency.code,
      }).then((rsp) => {
        this.purchaseStats = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
      api.shop_getPacketCategoryStatistic({
        currency_code: this.currentCurrency.code,
      }).then((rsp) => {
        this.categoryStats = rsp.data;
      }).catch((err) => {
        console.log(err);
      });
      api.shop_getPurchasesByDateStatistics({
        interval: this.selectedSalesInterval,
      }).then((rsp) => {
        this.purchaseCountIntervalItems = rsp.data;
      }).catch((err) => {
        console.log(err);
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
