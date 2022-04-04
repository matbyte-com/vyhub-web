<template>
  <v-card :class="$vuetify.breakpoint.mdAndUp ? '' : 'transparent'" flat>
    <v-card-title class="pb-0">
      <v-row>
        <v-col cols="12" class="d-flex">
          <HeadlineSidebar icon="mdi-server" :title="$t('server')"/>
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
          <tr v-for="server in getServer(bundle.id)" :key="server.id" >
            <td colspan="10%" style="padding: 0; margin: 0">
              <v-icon :color="getStatusColor(server)" left>
                mdi-flash
              </v-icon>
              <span v-if="server.users_current != null">
                <a>
                  <span v-if="server.users_current != null">
                    {{ server.users_current }}
                  </span>
                  <span v-else>
                    ?
                  </span>
                  /
                  <span v-if="server.users_max != null">
                    {{ server.users_max }}
                  </span>
                  <span v-else>
                    ?
                  </span>
                </a>
              </span>
              <span class="font-italic text--disabled"  v-else>
                {{ $t('_server.labels.unknownStatus') }}
              </span>
            </td>
            <td style="">{{ server.name }}</td>
            <td style="padding: 0; margin: 0" class="text-right">
              <v-tooltip left :disabled="$vuetify.breakpoint.lgAndUp">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn small color="success" depressed v-bind="attrs" v-on="on"
                         :href="getConnectionLink(server)">
                    <v-icon :left="$vuetify.breakpoint.lgAndUp">
                      mdi-connection
                    </v-icon>
                    <span v-if="$vuetify.breakpoint.lgAndUp">Connect</span>
                  </v-btn>
                </template>
                <span>{{ $t('connect') }}</span>
              </v-tooltip>
            </td>
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
import HeadlineSidebar from '@/components/HomeComponents/HeadlineSidebar.vue';

export default {
  name: 'ServerStatus',
  components: { HeadlineSidebar },
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
    getStatusColor(server) {
      switch (server.status) {
        case 'UNKNOWN':
          return '';
        case 'ONLINE':
          return 'success';
        case 'OFFLINE':
          return 'error';
        default:
          return '';
      }
    },
    getConnectionLink(server) {
      // TODO Add New Servers here for proper functioning of the connection link
      switch (server.type) {
        case 'GMOD':
          return `steam://${server.address}:${server.port}`;
        case 'DISCORD':
          return server.extra?.inviteLink;
        default:
          console.log('Could not find server type to calculate server-connection-address');
          return '';
      }
    },
  },
};
</script>

<style scoped>

</style>
