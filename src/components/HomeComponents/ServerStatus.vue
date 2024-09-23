<template>
  <div>
    <v-card v-if="nonEmpty"
            class="vh-server-status card-rounded mb-3" flat :border="outlined">
      <v-card-title class="pb-0">
        <CardTitle :title="$t('server')" icon="mdi-server" />
      </v-card-title>
      <v-card-text style="width: inherit">
        <div v-for="bundle in nonEmptyBundles" :key="bundle.id"
             class="mt-3" :class="`vh-bundle-${bundle.id}`">
          <v-icon v-if="bundle.icon" start size="small">{{ bundle.icon }}</v-icon>
          <span>{{ bundle.name }}</span>
          <v-divider class="mb-2"/>
          <v-row dense v-for="server in getServer(bundle.id)" :key="server.id"
                 align="center" :no-gutters="$vuetify.display.smAndDown"
                 class="mt-0">
            <v-col order="1" order-xl="1" cols="6" lg="6" xl="3">
              <v-icon :color="getStatusColor(server)" start>
                mdi-flash
              </v-icon>
              <span v-if="server.status !== 'UNKNOWN'">
                <router-link style="text-decoration: none" :disabled="true"
                             :to="{ name: (!['DISCORD', 'TEAMSPEAK3'].includes(server.type) ?
                              'ServerDashboard' : null),
                              params: { id: server.id }}">
                  <span v-if="server.type !== 'DISCORD'">
                    <span v-if="server.users_current != null && server.status === 'ONLINE'">
                      {{ server.users_current }}
                    </span>
                    <span v-else-if="server.status === 'OFFLINE'">0</span>
                    <span v-else>?</span>
                    /
                  </span>
                  <span v-if="server.users_max != null">{{ server.users_max }}</span>
                  <span v-else>?</span>
                </router-link>
              </span>
              <span class="font-italic text--disabled" v-if="server.status === 'UNKNOWN'">
                {{ $t('unknown') }}
              </span>
            </v-col>
            <v-col order="3" order-xl="2" cols="10" lg="6" xl="7">
              <router-link style="text-decoration: none;"
                           :to="{ name: (server.type !== 'DISCORD' && server.type
                           !== 'TEAMSPEAK3' ? 'ServerDashboard' : null),
                                params: { id: server.id }}">
                {{ server.name }}
              </router-link>
            </v-col>
            <v-col order="2" order-xl="3" cols="6" lg="6" xl="2" class="text-right">
              <v-btn icon size="small" color="info" variant="flat"
                     @click="currentServer = server; $refs.serverDetailsDialog.show()">
                <v-icon>
                  mdi-information
                </v-icon>
              </v-btn>
              <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn size="small" color="success" variant="flat" v-bind="props"
                         @click="utils.copyServerAddress(server)"
                         :href="getConnectionLink(server)"
                         class="ml-1">
                    <v-icon>
                      mdi-connection
                    </v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('connect') }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="card-rounded pa-3 mb-3" flat v-if="servers == null">
      <v-skeleton-loader type="paragraph"/>
    </v-card>
    <Dialog ref="serverDetailsDialog" :title="$t('_server.labels.details')" icon="mdi-server">
      <div v-if="currentServer">
        <v-table>
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
        </v-table>
      </div>
    </Dialog>
  </div>
</template>

<script>
import CardTitle from '@/components/CardTitle.vue';
import Dialog from '@/components/Dialog.vue';
import openapi from '@/api/openapi';

export default {
  name: 'ServerStatus',
  components: { Dialog, CardTitle },
  props: ['noIcon', 'noTitle', 'centerHeadline', 'outlined'],
  data() {
    return {
      servers: null,
      bundles: [],
      currentServer: null,
      bundlesLoaded: false,
      serversLoaded: false,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).server_getServers().then((rsp) => {
        this.servers = rsp.data.filter((s) => !s.hidden);
        this.serversLoaded = true;
      });
      (await openapi).server_getBundles().then((rsp) => {
        this.bundles = rsp.data;
        this.bundlesLoaded = true;
      });
    },
    getServer(bundleId) {
      return this.servers.filter((s) => s.serverbundle_id === bundleId)
        .sort((a, b) => a.name.localeCompare(b.name));
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
      return this.utils.getConnectionLink(server);
    },
  },
  computed: {
    nonEmptyBundles() {
      if (!this.servers) return null;
      if (this.servers.length === 0) return [];
      if (this.bundles.length === 0) return [];

      return this.bundles.filter(
        (b) => this.servers.filter((s) => s.serverbundle_id === b.id).length > 0,
      );
    },
    nonEmpty() {
      return this.servers && this.nonEmptyBundles.length > 0;
    },
  },
  watch: {
    serversLoaded() {
      if (this.bundlesLoaded && this.serversLoaded) {
        this.$emit('loaded', this.nonEmpty);
      }
    },
    bundlesLoaded() {
      if (this.bundlesLoaded && this.serversLoaded) {
        this.$emit('loaded', this.nonEmpty);
      }
    },
  },
};
</script>

<style scoped>

</style>
