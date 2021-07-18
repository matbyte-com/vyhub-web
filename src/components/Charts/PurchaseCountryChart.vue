<template>
  <div>
    <div v-if="series != null">
      <apexchart type="donut" :options="options" :series="series.data"></apexchart>
    </div>
  </div>
</template>

<script>
import countries from 'country-list';

export default {
  name: 'PurchaseCountryChart',
  props: {
    data: Object,
    currency: Object,
  },
  data() {
    return {
    };
  },
  computed: {
    series() {
      if (this.data == null) {
        return null;
      }

      const data = [];
      const labels = [];

      Object.entries(this.data).forEach(([key, value]) => {
        labels.push(countries.getName(key));
        data.push(value.amount_total);
      });

      return {
        data,
        labels,
      };
    },
    options() {
      if (this.series == null) {
        return null;
      }

      return {
        theme: {
          mode: (this.$vuetify.theme.dark ? 'dark' : 'light'),
        },
        chart: {
          id: 'purchase-country-chart',
        },
        labels: this.series.labels,
        dataLabels: {
          enabled: true,
          formatter: (val, opts) => `${opts.w.config.series[opts.seriesIndex].toLocaleString(undefined, { minimumFractionDigits: 2 })} ${this.currency.symbol}`,
        },
        tooltip: {
          y: {
            formatter: (value) => `${value.toLocaleString(undefined, { minimumFractionDigits: 2 })} ${this.currency.symbol}`,
          },
        },
      };
    },
  },
};
</script>

<style scoped>

</style>
