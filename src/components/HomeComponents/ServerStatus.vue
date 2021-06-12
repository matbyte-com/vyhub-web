<template>
  <v-card>
    <v-card-title class="pb-0">
      <v-row>
        <v-col cols="12" class="d-flex">
          <v-icon color="primary" class="mr-1">mdi-server</v-icon>
          <v-sheet vertical color="primary" width="2" height="25" class="mt-1">
          </v-sheet>
          <span class="ml-2 mr-1">
            {{ $t('server') }}
          </span>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <div v-for="bundle in bundles" :key="bundle.id" class="mt-3">
        <v-icon v-if="bundle.icon" left small :color="bundle.color">{{ bundle.icon }}</v-icon>
        <span :style="'color:' + bundle.color">{{ bundle.name }}</span>
        <v-divider class="mb-2"/>
        <v-simple-table dense>
          <tbody>
          <tr v-for="server in getServer(bundle.id)" :key="server.id">
            <td>
              <v-icon color="green" left>
                mdi-flash
              </v-icon>
              <span>
                <a>42 / 69</a>
              </span>
            </td>
            <td>{{ server.name }}</td>
            <!--
            <td>{{ server.address }}:{{ server.port }}</td>
            -->
          </tr>
          </tbody>
        </v-simple-table>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import openapiCached from '@/api/openapiCached';

export default {
  name: 'ServerStatus',
  components: { },
  data() {
    return {
      servers: [],
      bundles: [],
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapiCached).server_getServers().then((rsp) => {
        this.servers = rsp.data;
      });
      (await openapiCached).server_getBundles().then((rsp) => {
        this.bundles = rsp.data;
      });
    },
    getServer(bundleId) {
      return this.servers.filter((s) => s.serverbundle_id === bundleId);
    },
  },
};
</script>

<style scoped>

</style>