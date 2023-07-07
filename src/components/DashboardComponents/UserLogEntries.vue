<template>
  <div>
    <v-card class="vh-dashboard-logs">
      <v-card-title>
        <v-icon left>
          mdi-format-list-bulleted
        </v-icon>
        {{ $t('logs') }}
        <v-spacer></v-spacer>
        <v-btn :icon="logsShown" outlined color="primary" @click="showLogs">
          <v-icon v-if="logsShown">mdi-refresh</v-icon>
          <span v-else>
            <v-icon left>mdi-eye</v-icon>
            {{ $t('show') }}
          </span>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <LogTable ref="logTable" type="user" :obj-id="user.id" :show-search="false"
                  v-if="user != null && logsShown" />
        <v-skeleton-loader v-else></v-skeleton-loader>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import LogTable from '../LogTable.vue';

export default {
  name: 'UserLogEntries',
  components: { LogTable },
  props: { user: Object },
  data() {
    return {
      logsShown: false,
    };
  },
  methods: {
    showLogs() {
      if (this.logsShown) {
        this.$refs.logTable.fetchData();
      } else {
        this.logsShown = true;
      }
    },
  },
  watch: {
    user() {
      this.logsShown = false;
    },
  },
};
</script>

<style scoped>

</style>
