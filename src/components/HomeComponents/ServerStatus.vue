<template>
  <div>
    <v-card
      v-if="nonEmpty"
      class="vh-server-status card-rounded mb-3"
      flat
      :border="outlined"
    >
      <v-card-title class="pb-0 pt-3">
        <CardTitle
          :title="$t('server')"
          icon="mdi-server"
        />
      </v-card-title>
      <v-card-text style="width: inherit">
        <div
          v-for="bundle in nonEmptyBundles"
          :key="bundle.id"
          class="mt-4"
          :class="`vh-bundle-${bundle.id}`"
        >
          <div class="d-flex align-center mb-2">
            <v-icon
              v-if="bundle.icon"
              start
              size="small"
              class="text-medium-emphasis"
            >
              {{ bundle.icon }}
            </v-icon>
            <span class="text-subtitle-2 font-weight-medium">{{ bundle.name }}</span>
          </div>
          <v-divider />
          <div
            v-for="server in getServer(bundle.id)"
            :key="server.id"
            class="d-flex align-center flex-wrap py-2 vh-server-row"
          >
            <!-- Flash icon + server name: stay together, name ellipses -->
            <div class="d-flex align-center vh-server-name-group">
              <v-icon
                :color="getStatusColor(server)"
                size="small"
                class="flex-shrink-0"
              >
                mdi-flash
              </v-icon>
              <router-link
                :ref="(el) => setNameRef(server.id, el)"
                style="text-decoration: none; color: inherit"
                class="font-weight-medium text-truncate vh-server-name-link"
                :to="{ name: (server.type !== 'DISCORD' && server.type
                         !== 'TEAMSPEAK3' ? 'ServerDashboard' : null),
                       params: { id: server.id }}"
              >
                {{ server.name }}
                <v-tooltip
                  activator="parent"
                  location="top"
                  :text="server.name"
                  :disabled="!truncated[server.id]"
                />
              </router-link>
            </div>
            <!-- Player count + actions: wrap to a second line together -->
            <div class="d-flex align-center vh-server-actions">
              <span
                v-if="server.status === 'UNKNOWN'"
                class="font-italic text-disabled text-caption vh-server-count"
              >
                {{ $t('unknown') }}
              </span>
              <span
                v-else
                class="text-caption text-medium-emphasis vh-server-count"
              >
                <template v-if="server.type !== 'DISCORD'">
                  <span v-if="server.users_current != null && server.status === 'ONLINE'">{{ server.users_current }}</span>
                  <span v-else-if="server.status === 'OFFLINE'">0</span>
                  <span v-else>?</span>
                  /
                </template>
                {{ server.users_max ? server.users_max : '?' }}
              </span>
              <v-btn
                icon="mdi-information-symbol"
                size="x-small"
                color="info"
                variant="outlined"
                @click="currentServer = server; $refs.serverDetailsDialog.show()"
              />
              <v-tooltip location="bottom">
                <template #activator="{ props }">
                  <v-btn
                    size="small"
                    color="success"
                    variant="flat"
                    v-bind="props"
                    :href="getConnectionLink(server)"
                    @click="utils.copyServerAddress(server)"
                  >
                    <v-icon>
                      mdi-connection
                    </v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('connect') }}</span>
              </v-tooltip>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-card
      v-if="servers == null"
      class="card-rounded pa-3 mb-3"
      flat
    >
      <v-skeleton-loader type="paragraph" />
    </v-card>
    <Dialog
      ref="serverDetailsDialog"
      :title="$t('_server.labels.details')"
      icon="mdi-server"
    >
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
import openapi from '@/api/openapi';

export default {
  props: {
    noIcon: { type: Boolean },
    noTitle: { type: Boolean },
    centerHeadline: { type: Boolean },
    outlined: { type: Boolean },
  },
  emits: ['loaded'],
  data() {
    return {
      servers: null,
      bundles: [],
      currentServer: null,
      bundlesLoaded: false,
      serversLoaded: false,
      truncated: {},
    };
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
  created() {
    this.nameEls = {};
  },
  beforeMount() {
    this.fetchData();
  },
  mounted() {
    window.addEventListener('resize', this.measureTruncation);
  },
  updated() {
    this.measureTruncation();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.measureTruncation);
  },
  methods: {
    setNameRef(id, el) {
      if (el) {
        this.nameEls[id] = el.$el ?? el;
      } else {
        delete this.nameEls[id];
      }
    },
    measureTruncation() {
      Object.entries(this.nameEls).forEach(([id, el]) => {
        if (!el) return;
        const isTruncated = el.scrollWidth > el.clientWidth;
        if (this.truncated[id] !== isTruncated) {
          this.truncated[id] = isTruncated;
        }
      });
    },
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
};
</script>

<style scoped>
.vh-server-row {
  column-gap: 10px;
  row-gap: 4px;
}

/* Flash + name grow to fill the row and drop the actions group to a second
   line (via flex-basis) once the name would otherwise be squeezed too far.
   min-width: 0 lets the name ellipsis within whatever width remains. */
.vh-server-name-group {
  flex: 1 1 16rem;
  min-width: 0;
  gap: 6px;
  overflow: hidden;
}

.vh-server-name-link {
  min-width: 0;
}

.vh-server-actions {
  flex: 1 1 auto;
  gap: 6px 8px;
}

.vh-server-count {
  margin-right: auto;
}
</style>
