<template>
  <div>
    <v-row>
      <v-col v-if="purchaseCountIntervalItems != null" cols="12" lg="6">
        <v-card class="mt-6">
          <v-card-title>
            <v-icon left>mdi-counter</v-icon>
            {{ $t('_purchases.labels.salesCount') }}
            <v-spacer></v-spacer>
            <v-select hide-details dense outlined v-model="selectedInterval"
                      style="z-index: 20"
                      :items="intervalItems" item-text="name" item-value="value"></v-select>
          </v-card-title>
          <v-card-text>
            <PurchaseNumberChart :data="purchaseCountIntervalItems"></PurchaseNumberChart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="heatmapItems != null" cols="12" lg="6">
        <v-card class="mt-6">
          <v-card-title>
            <v-icon left>mdi-counter</v-icon>
            {{ $t('_purchases.labels.salesCount') }}
          </v-card-title>
          <v-card-text>
            <PurchaseTimeHeatmap :data="heatmapItems"></PurchaseTimeHeatmap>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6" v-if="purchaseCountIntervalItems == null">
        <v-skeleton-loader type="card"/>
      </v-col>
      <v-col cols="12" lg="6" v-if="heatmapItems == null">
        <v-skeleton-loader type="card"/>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import PurchaseNumberChart from '@/components/Charts/PurchaseNumberChart.vue';
import openapi from '@/api/openapi';
import PurchaseTimeHeatmap from '@/components/Charts/PurchaseTimeHeatmap.vue';

export default {
  name: 'Purchases',
  components: { PurchaseTimeHeatmap, PurchaseNumberChart },
  props: ['timeRange', 'currency', 'intervalItems'],
  data() {
    return {
      purchaseCountIntervalItems: null,
      heatmapItems: null,
      selectedInterval: 'MONTH',
    };
  },
  beforeMount() {
    this.fetchPurchases();
    this.fetchPurchaseHeatmap();
  },
  watch: {
    currency() {
      if (this.currency != null) {
        this.fetchPurchases();
        this.fetchPurchaseHeatmap();
      }
    },
    selectedInterval() {
      if (this.currency != null) {
        this.fetchPurchases();
      }
    },
    timeRange() {
      this.fetchPurchaseHeatmap();
    },
  },
  methods: {
    async fetchPurchases() {
      (await openapi).shop_getPurchasesByDateStatistics({
        interval: this.selectedInterval,
      }).then((rsp) => {
        this.purchaseCountIntervalItems = rsp.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    async fetchPurchaseHeatmap() {
      let begin;
      let end;

      if (this.timeRange?.length === 2) {
        begin = new Date(this.timeRange[0]).toISOString();
        end = new Date(this.timeRange[1]).toISOString();
      }
      (await openapi).shop_getPurchaseHeatmap({
        begin, end,
      }).then((rsp) => {
        this.heatmapItems = rsp.data;
      });
    },
  },
};
</script>

<style scoped>

</style>
