<template>
  <div>
    <div v-if="series != null">
      <apexchart
        height="370"
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
    data: {
      type: Array,
      default: null,
    },
    definition: {
      type: Object,
      default: null,
    },
    // Earliest date currently loaded (null = full history already loaded).
    start: {
      type: Date,
      default: null,
    },
    loading: Boolean,
  },
  emits: ['load-more'],
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
          animations: {
            enabled: !this.data || this.data.length < 365,
          },
          id: 'accumulated-attribute-chart',
          zoom: {
            autoScaleYaxis: true,
          },
          events: {
            zoomed: this.onRangeChange,
            scrolled: this.onRangeChange,
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
  methods: {
    // ApexCharts hands us the visible x-axis range after a zoom/scroll. If the
    // user pans/zooms out to before the loaded window, ask the parent to fetch
    // the missing older data.
    onRangeChange(chartContext, { xaxis }) {
      if (this.loading || this.start == null || xaxis == null || xaxis.min == null) {
        return;
      }

      if (xaxis.min < this.start.getTime()) {
        this.$emit('load-more', new Date(Math.floor(xaxis.min)));
      }
    },
  },
};
</script>
