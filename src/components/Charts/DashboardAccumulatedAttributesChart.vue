<template>
  <div>
    <div v-if="series != null">
      <apexchart height="300" type="area" :options="options" :series="series">

      </apexchart>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardAccumulatedAttributesChart',
  props: {
    data: Array,
    definition: Object,
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

      const data = this.data.map((stat) => ({
        x: new Date(stat.date).getTime(),
        y: stat.value,
      }));

      return [{
        name: this.definition.title,
        data,
      }];
    },
    options() {
      if (this.definition == null) {
        return null;
      }

      return {
        theme: {
          mode: (this.$vuetify.theme.dark ? 'dark' : 'light'),
        },
        chart: {
          id: 'accumulated-attribute-chart',
          zoom: {
            autoScaleYaxis: true,
          },
        },
        colors: [this.$vuetify.theme.currentTheme.primary],
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
            text: this.definition.title,
          },
          labels: {
            /* eslint-disable-next-line max-len */
            formatter: (y) => `${this.utils.formatDecimal(y)} ${this.definition.unit}`,
          },
        },
        tooltip: {
          x: {
            format: 'yyyy-MM-dd HH:mm:ss',
          },
        },
      };
    },
  },
};
</script>
