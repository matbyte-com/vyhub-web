<template>
  <div>
    <v-row>
      <v-col>
        <v-card outlined flat class="fill-height">
          <v-card-title>
            {{ $t('serverbundle') }}
          </v-card-title>
          <v-data-table
            :headers="bundleHeaders"
            :items="bundles">
          </v-data-table>
          <v-card-actions>
            <v-btn text color="primary">
              <v-icon left>mdi-plus</v-icon>
              <span>{{ $t('settings.labels.addBundle') }}</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined flat class="fill-height">
          <v-card-title>
            {{ $t('settings.gameserver') }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import api from '@/api/api';

export default {
  name: 'Server',
  components: {
  },
  data() {
    return {
      bundles: [],
      server: [],
      bundleHeaders: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('type'), value: 'server_type' },
        { text: this.$t('settings.defaultGroup'), value: 'default_group.name' },
      ],
    };
  },
  beforeMount() {
    api.server.getBundles().then((rsp) => { this.bundles = rsp.data; });
  },
};
</script>

<style scoped>

</style>
