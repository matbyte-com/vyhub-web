<template>
  <div>
    <v-card
      class="vh-dashboard-logs card-rounded"
      flat
    >
      <v-card-title>
        <v-btn
          v-if="!logsShown"
          variant="outlined"
          color="primary"
          @click="showLogs"
        >
          <span>
            <v-icon start>mdi-eye</v-icon>
            {{ $t('show') }}
          </span>
        </v-btn>
      </v-card-title>
      <v-card-text v-if="user != null && logsShown">
        <LogTable
          ref="logTable"
          type="user"
          :obj-id="user.id"
          :show-search="false"
        >
          <template #footer-right>
            <v-btn
              class="animate__animated animate__faster"
              :class="{ 'animate__rotateOut' : rotatingOut}"
              icon="mdi-refresh"
              variant="outlined"
              color="primary"
              @click="showLogs"
            />
          </template>
        </LogTable>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: { user: Object },
  data() {
    return {
      logsShown: false,
      rotatingOut: false,
    };
  },
  watch: {
    user() {
      this.logsShown = false;
    },
  },
  methods: {
    showLogs() {
      if (this.logsShown) {
        this.$refs.logTable.fetchData();
        this.rotatingOut = true;
        setTimeout(() => {
          this.rotatingOut = false;
        }, 800);
      } else {
        this.logsShown = true;
      }
    },
  },
};
</script>

<style scoped>

</style>
