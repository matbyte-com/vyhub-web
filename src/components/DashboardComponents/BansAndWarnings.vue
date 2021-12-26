<template>
  <v-card class="flex-grow-1">
    <v-card-title>
      <v-icon class="mr-2">mdi-account-group</v-icon>
      {{ $t('Bans and Warnings') }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-icon left>
            mdi-account-cancel
          </v-icon>
          {{ $t('bans') }}:
          <span>
            {{ banCount }}
          </span>
        </v-col>
        <v-col>
          <v-icon left>
            mdi-account-alert
          </v-icon>
          {{ $t('warnings') }}:
          <span>
            {{ warningCount }}
          </span>
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
  methods: {
    async fetchData() {
      (await openapi).ban_getBans({ query: this.user.username, size: 1 }).then((rsp) => {
        this.userBans = rsp.data.total;
      });
      (await openapi).warning_getWarnings({ query: this.user.username, size: 1 }).then((rsp) => {
        this.userWarnings = rsp.data.total;
      });
    },
  },
};
</script>

<style scoped>

</style>
