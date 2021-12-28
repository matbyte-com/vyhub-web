<template>
  <v-card class="flex-grow-1">
    <v-card-title>
      <v-icon class="mr-2">mdi-account-group</v-icon>
      {{ $t('_dashboard.labels.bansAndWarnings') }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-chip color="primary" :to="{ name: 'Bans', query: { user_id: user.id } }">
            <v-icon left>
              mdi-account-cancel
            </v-icon>
            {{ $t('bans') }}:
            <span>
            &nbsp;
            {{ banCount }}
            </span>
          </v-chip>
        </v-col>
        <v-col>
          <v-chip color="primary" :to="{ name: 'Warnings', query: { user_id: user.id } }">
            <v-icon left>
              mdi-account-alert
            </v-icon>
            {{ $t('warnings') }}:
            <span>
            &nbsp;
            {{ warningCount }}
          </span>
          </v-chip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import openapi from '../../api/openapi';

export default {
  name: 'BansAndWarnings',
  data() {
    return {
      banCount: 0,
      warningCount: 0,
    };
  },
  props: {
    user: Object,
  },
  beforeMount() {
    this.fetchData();
  },
  watch: {
    $route() {
      this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      (await openapi).ban_getBans({ user_id: this.user.id, size: 1 }).then((rsp) => {
        this.banCount = rsp.data.total;
      });
      (await openapi).warning_getWarnings({ query: this.user.username, size: 1 }).then((rsp) => {
        this.warningCount = rsp.data.total;
      });
    },
  },
};
</script>

<style scoped>

</style>
