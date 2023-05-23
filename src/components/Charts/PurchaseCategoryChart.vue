<template>
  <div>
    <div v-if="series != null">
      <apexchart type="donut" :options="options" :series="series.data"></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseCategoryChart',
  props: {
    data: Array,
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

      this.data.forEach((s) => {
        labels.push(s.category.name);
        data.push(s.amount);
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
          id: 'purchase-category-chart',
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
