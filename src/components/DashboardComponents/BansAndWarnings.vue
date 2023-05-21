<template>
  <v-card class="flex-grow-1">
    <v-card-text>
      <v-row>
        <v-col>
          <v-btn block :color="(banCount ? 'error darken-2' : 'gray')"
                  :to="{ name: 'Bans', query: { user_id: user.id } }">
            <v-icon left>
              mdi-account-cancel
            </v-icon>
            {{ $t('bans') }}:
            <span>
            &nbsp;
            {{ banCount }}
            </span>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn :color="(warningCount ? 'warning darken-2' : 'gray')" block
                  :to="{ name: 'Warnings', query: { user_id: user.id } }">
            <v-icon left>
              mdi-account-alert
            </v-icon>
            {{ $t('warnings') }}:
            <span>
            &nbsp;
            {{ warningCount }}
          </span>
          </v-btn>
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
    bundle: {
      type: Object,
      default: null,
    },
  },
  beforeMount() {
    this.fetchData();
  },
  watch: {
    user() {
      this.fetchData();
    },
    bundle() {
      this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      let serverbundle_id = [];
      if (this.bundle !== null) serverbundle_id = [this.bundle.id];
      (await openapi).ban_getBans({ user_id: this.user.id, size: 1, serverbundle_id })
        .then((rsp) => { this.banCount = rsp.data.total; });
      (await openapi).warning_getWarnings({ user_id: this.user.id, size: 1, serverbundle_id })
        .then((rsp) => { this.warningCount = rsp.data.total; });
    },
  },
};
</script>

<style scoped>

</style>
