<template>
  <div>
    <v-card :class="$vuetify.breakpoint.mdAndUp ? '' : 'transparent'" flat>
      <v-card-title class="pb-0">
        <v-row>
          <v-col cols="12" class="d-flex">
            <HeadlineSidebar icon="mdi-server" :title="$t('server')"/>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <div v-for="bundle in nonEmptyBundles" :key="bundle.id" class="mt-3">
          <v-icon v-if="bundle.icon" left small :color="bundle.color">{{ bundle.icon }}</v-icon>
          <span :style="'color:' + bundle.color">{{ bundle.name }}</span>
          <v-divider class="mb-2"/>
          <v-row v-for="server in getServer(bundle.id)" :key="server.id"
                 class="mt-0 d-flex align-center">
            <v-col>
              <v-icon :color="getStatusColor(server)" left>
                mdi-flash
              </v-icon>
              <span v-if="server.status !== 'UNKNOWN'">
                  <router-link style="text-decoration: none" :disabled="true"
                               :to="{ name: (server.type !== 'DISCORD' ? 'ServerDashboard' : null),
                                params: { id: server.id }}">
                    <span v-if="server.type !== 'DISCORD'">
                      <span v-if="server.users_current != null && server.status === 'ONLINE'">
                        {{ server.users_current }}
                      </span>
                      <span v-else-if="server.status === 'OFFLINE'">
                        0
                      </span>
                      <span v-else>
                        ?
                      </span>
                      /
                    </span>
                    <span v-if="server.users_max != null">
                      {{ server.users_max }}
                    </span>
                    <span v-else>
                      ?
                    </span>
                  </router-link>
                </span>
              <span class="font-italic text--disabled"  v-if="server.status === 'UNKNOWN'">
                  {{ $t('_server.labels.unknownStatus') }}
                </span>
            </v-col>
            <v-col>
              <router-link style="text-decoration: none" :disabled="true"
                           :to="{ name: (server.type !== 'DISCORD' && server.type !== 'TEAMSPEAK3'
                            ? 'ServerDashboard' : null),
                                params: { id: server.id }}">
                {{ server.name }}
              </router-link>
            </v-col>
            <v-col class="text-right d-flex justify-end">
              <v-btn icon small color="info" depressed
                     @click="currentServer = server; $refs.serverDetailsDialog.show()">
                <v-icon>
                  mdi-information
                </v-icon>
              </v-btn>
              <v-tooltip left :disabled="$vuetify.breakpoint.lgAndUp">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn small color="success" depressed v-bind="attrs" v-on="on"
                         v-if="getConnectionLink(server) != null"
                         :href="getConnectionLink(server)"
                         class="ml-1">
                    <v-icon :left="$vuetify.breakpoint.lgAndUp">
                      mdi-connection
                    </v-icon>
                    <span v-if="$vuetify.breakpoint.lgAndUp">Connect</span>
                  </v-btn>
                </template>
                <span>{{ $t('connect') }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
    <Dialog ref="serverDetailsDialog" :title="$t('_server.labels.details')" icon="mdi-server">
      <div v-if="currentServer">
        <v-simple-table>
          <tbody>
            <tr>
              <td><b>{{ $t('name') }}</b></td>
              <td>{{ currentServer.name }}</td>
            </tr>
            <tr>
              <td><b>{{ $t('type') }}</b></td>
              <td>{{ currentServer.type }}</td>
            </tr>
            <tr>
              <td><b>{{ $t('address') }}</b></td>
              <td>{{ currentServer.address }}:{{ currentServer.port }}</td>
            </tr>
            <tr v-if="currentServer.map != null">
              <td><b>{{ $t('map') }}</b></td>
              <td>{{ currentServer.map }}</td>
            </tr>
            <tr>
              <td><b>{{ $t('status') }}</b></td>
              <td>{{ currentServer.status }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </Dialog>
  </div>
</template>

<script>
import openapiCached from '@/api/openapiCached';
import HeadlineSidebar from '@/components/HomeComponents/HeadlineSidebar.vue';
import Dialog from '@/components/Dialog.vue';

export default {
  name: 'ServerStatus',
  components: { Dialog, HeadlineSidebar },
  data() {
    return {
      servers: [],
      bundles: [],
      currentServer: null,
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
          return `steam://connect/${server.address}:${server.port}`;
        case 'DISCORD':
          return server.extra?.inviteLink;
        case 'TEAMSPEAK3':
          return `ts3server://${server.address}?port=${server.port}`;
        default:
          console.log('Could not find server type to calculate server-connection-address');
          return null;
      }
    },
  },
  computed: {
    nonEmptyBundles() {
      return this.bundles.filter((b) => this.getServer(b.id).length > 0);
    },
  },
};
</script>

<style scoped>

</style>
