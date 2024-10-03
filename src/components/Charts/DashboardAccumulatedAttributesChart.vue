<template>
  <div>
    <div v-if="series != null">
      <apexchart
        height="300"
        type="area"
        :options="options"
        :series="series"
      />
    </div>
    <div v-else>
      <v-row>
        <v-col>
          <v-skeleton-loader type="heading" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-skeleton-loader type="image" />
        </v-col>
      </v-row>
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
          mode: (this.$vuetify.theme.current.dark ? 'dark' : 'light'),
        },
        chart: {
          id: 'accumulated-attribute-chart',
          zoom: {
            autoScaleYaxis: true,
          },
        },
        colors: [this.$vuetify.theme.current.primary],
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
