<template>
  <div>
    <div v-if="series != null">
      <apexchart
        type="area"
        :options="options"
        :series="series"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    currency: Object,
  },
  data() {
    return {
      options: {
        theme: {
          mode: '',
        },
        chart: {
          id: 'debit-chart',
          zoom: {
            autoScaleYaxis: true,
          },
        },
        colors: [],
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 6,
        },
        yaxis: {
          title: {
            text: this.$t('sales'),
          },
          labels: {
            formatter: (y) => `${this.utils.formatDecimal(y)} ${this.currency.symbol}`,
          },
        },
        tooltip: {
          x: {
            format: 'yyyy-MM-dd',
          },
        },
        /*
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
          },
        }, */
      },
    };
  },
  computed: {
    series() {
      if (this.data == null) {
        return null;
      }

      const data = this.data.map((stat) => ({
        x: new Date(stat.date).getTime(),
        y: stat.amount_total,
      }));

      return [{
        name: this.$t('amount'),
        data,
      }];
    },
  },
  mounted() {
    this.options.colors = [this.$vuetify.theme.current.primary];
    this.options.theme.mode = this.$vuetify.theme.current.dark ? 'dark' : 'light';
  }
};
</script>

<style scoped>

</style>
