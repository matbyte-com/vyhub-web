<template>
  <div>
    <div v-if="series != null">
      <apexchart type="area" :options="options" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseNumberChart',
  props: {
    data: Array,
  },
  data() {
    return {
      options: {
        theme: {
          mode: (this.$vuetify.theme.dark ? 'dark' : 'light'),
        },
        chart: {
          id: 'debit-chart',
          zoom: {
            autoScaleYaxis: true,
          },
        },
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
            formatter: (y) => (y),
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

      const total = this.data.map((stat) => ({
        x: new Date(stat.date).getTime(),
        y: stat.total,
      }));

      const recurring = this.data.map((stat) => ({
        x: new Date(stat.date).getTime(),
        y: stat.recurring,
      }));

      const one_time = this.data.map((stat) => ({
        x: new Date(stat.date).getTime(),
        y: stat.one_time,
      }));

      return [
        {
          name: this.$t('total'),
          data: total,
        },
        {
          name: this.$t('recurring'),
          data: recurring,
        },
        {
          name: this.$t('oneTime'),
          data: one_time,
        },
      ];
    },
  },
};
</script>

<style scoped>

</style>
