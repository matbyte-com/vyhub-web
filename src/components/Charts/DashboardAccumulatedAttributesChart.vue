<template>
  <div>
    <div v-if="series != null">
      <apexchart type="line" :options="options" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardAccumulatedAttributesChart',
  props: {
    data: Array,
  },
  data() {
    return {
      options: {
        chart: {
          id: 'accumulatedAttributeChart',
          type: 'line',
          zoom: {
            autoScaleYaxis: true,
          },
        },
        stroke: {
          curve: 'smooth',
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
            text: this.$t('value'),
          },
          labels: {
            /* eslint-disable-next-line max-len */
            // formatter: (y) => `${y.toLocaleString(undefined, { minimumFractionDigits: 2 })} ${this.currency.symbol}`,
          },
        },
        tooltip: {
          x: {
            format: 'yyyy-MM-dd',
          },
        },
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
        y: stat.value,
      }));

      return [{
        name: this.data.definition_id,
        data,
      }];
    },
  },
};
</script>
