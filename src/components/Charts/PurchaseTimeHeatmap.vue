<template>
  <div>
    <div v-if="series != null">
      <apexchart
        type="heatmap"
        :options="options"
        :series="series"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseTimeHeatmap',
  props: {
    data: Array,
  },
  data() {
    return {
      options: {
        theme: {
          mode: (this.$vuetify.theme.dark ? 'dark' : 'light'),
        },
        colors: ['#008FFB'],
        chart: {
          id: 'purchase-heatmap',
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          title: {
            text: this.$t('time'),
          },
          labels: {
            formatter: (y) => (this.convertTimeRange(y)),
            // formatter: (y) => (y),
          },
        },
        yaxis: {
          labels: {
            formatter: (y) => (this.getLocalizedWeekday(y)),
            // formatter: (y) => (y),
          },
        },
        tooltip: {
          custom({
            series, seriesIndex, dataPointIndex, w,
          }) {
            if (series[seriesIndex][dataPointIndex] === 0) {
              return '';
            }
            return `${'<div class="arrow_box pa-2">'
              + '<span>'}${series[seriesIndex][dataPointIndex]}</span>`
              + '</div>';
          },
        },

      },
    };
  },
  computed: {
    series() {
      if (this.data == null || this.data === 0) {
        return null;
      }

      // Initialize the series array
      const series = [];

      this.data.forEach((item) => {
        const { day, time_interval, purchase_count } = item;

         
        if (!series.hasOwnProperty(day)) {
          series[day] = {};
        }

        series[day][time_interval] = purchase_count;
      });

      // Add missing values for days and purchase counts
      for (let day = 0; day <= 6; day += 1) {
         
        if (!series.hasOwnProperty(day)) {
          series[day] = {};
        }

        for (let interval = 0; interval <= 11; interval += 1) {
           
          if (!series[day].hasOwnProperty(interval)) {
            series[day][interval] = 0;
          }
        }
      }

      // Convert the series object into the required ApexCharts format
      const apexSeries = Object.entries(series).map(([day, intervals]) => {
        const timeSeries = Object.entries(intervals).map(([interval, count]) => ({
          x: interval,
          y: count,
        }));

        return {
          name: day,
          data: timeSeries,
        };
      });

      return apexSeries.reverse();
    },
  },
  methods: {
    getLocalizedWeekday(day) {
      if (!day) {
        return '';
      }
      const date = new Date();
      date.setDate(date.getDate() + 4 + day);
      return date.toLocaleString(this.$i18n.locale, { weekday: 'long' });
    },
    convertTimeRange(timeRange) {
      // do some timezone magic to cope with different timezones to display
      // the result in the user's timezone
      const offsetMinutes = new Date().getTimezoneOffset();
      const offsetHours = -(offsetMinutes / 60);
      const startHour = ((timeRange * 2) + offsetHours) % 24;
      const endHour = (startHour + 2) % 24;
      const startTime = `${startHour.toString().padStart(2, '0')}`;
      const endTime = `${endHour.toString().padStart(2, '0')}`;
      return `${startTime} - ${endTime}`;
    },
  },
};
</script>

<style scoped>

</style>
