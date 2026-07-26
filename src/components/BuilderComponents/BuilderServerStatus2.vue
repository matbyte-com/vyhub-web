<template>
  <v-card
    class="card-rounded vh-home-shop-stats"
    :image="imageCardUrl"
    flat
  >
    <v-card-text>
      <v-row :justify="$vuetify.display.smAndDown ? 'center' : 'start'">
        <v-col
          cols="11"
          sm="9"
          md="6"
          lg="5"
        >
          <div
            class="text-h4 mb-2"
            :class="{ 'text-white' : whiteText }"
          >
            {{ $t('server') }}
          </div>
          <v-card
            v-for="server in servers"
            :key="server.id"
            class="card-rounded pa-4 mb-4"
            elevation="2"
          >
            <div
              class="d-flex align-center flex-wrap mb-3"
              style="gap: 8px"
            >
              <v-icon
                v-if="server.serverbundle && server.serverbundle.icon"
                size="small"
                class="text-medium-emphasis"
              >
                {{ server.serverbundle.icon }}
              </v-icon>
              <div class="text-body-2 text-medium-emphasis">
                {{ $t(`_server.type.${server.type}`) }}
              </div>
              <v-spacer />
              <v-icon size="small">
                {{ serverTypeIcon(server.type) }}
              </v-icon>
              <router-link
                style="text-decoration: none; color: inherit"
                :to="{ name: (server.type !== 'DISCORD' && server.type
                         !== 'TEAMSPEAK3' ? 'ServerDashboard' : null),
                       params: { id: server.id }}"
              >
                <span class="text-h6 font-weight-bold">{{ server.name }}</span>
              </router-link>
            </div>
            <div
              class="d-flex align-center flex-wrap"
              style="gap: 12px"
            >
              <v-icon
                :color="utils.getStatusColor(server)"
                start
              >
                mdi-flash
              </v-icon>
              <router-link
                v-if="server.status !== 'UNKNOWN'"
                style="text-decoration: none; color: inherit"
                :to="{ name: (!['DISCORD', 'TEAMSPEAK3'].includes(server.type) ?
                         'ServerDashboard' : null),
                       params: { id: server.id }}"
              >
                <template v-if="server.type !== 'DISCORD'">
                  <span v-if="server.users_current != null && server.status === 'ONLINE'">{{ server.users_current }}</span>
                  <span v-else-if="server.status === 'OFFLINE'">0</span>
                  <span v-else>?</span>
                  <span class="mx-1">/</span>
                </template>
                <span v-if="server.users_max != null">{{ server.users_max }}</span>
                <span v-else>?</span>
              </router-link>
              <span
                v-else
                class="font-italic text-disabled"
              >
                {{ $t('unknown') }}
              </span>
              <template v-if="server.map">
                <v-divider
                  vertical
                  class="mx-1"
                  style="height: 20px; align-self: center"
                />
                <v-icon start>
                  mdi-map
                </v-icon>{{ server.map }}
              </template>
              <v-spacer />
              <div class="text-right">
                <v-btn
                  v-if="server.status === 'ONLINE' && !['DISCORD','TEAMSPEAK3']
                    .includes(server.type)"
                  class="mr-1 cta-btn"
                  variant="flat"
                  :to="{ name: 'ServerDashboard', params: { id: server.id } }"
                >
                  <v-icon :start="$vuetify.display.smAndDown">
                    mdi-badge-account-horizontal
                  </v-icon>
                  <span v-if="$vuetify.display.smAndDown">{{ $t('dashboard') }}</span>
                </v-btn>
                <v-btn
                  v-if="server.status === 'ONLINE' && $vuetify.display.mdAndUp"
                  variant="flat"
                  :href="utils.getConnectionLink(server)"
                  color="primary"
                  class="cta-btn"
                  @click="utils.copyServerAddress(server)"
                >
                  <div
                    v-if="utils.getConnectionLink(server)"
                    class="d-flex align-center"
                  >
                    <v-icon start>
                      mdi-connection
                    </v-icon>
                    <div>{{ $t('connect') }}</div>
                  </div>
                  <div
                    v-else
                    class="d-flex align-center"
                  >
                    <v-icon start>
                      mdi-content-copy
                    </v-icon>
                    <div>{{ $t('copy') }}</div>
                  </div>
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import openapiCached from '@/api/openapiCached';

export default {
  props: ['imageCardUrl', 'whiteText'],
  data() {
    return {
      servers: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapiCached).server_getServers().then((rsp) => {
        this.servers = rsp.data.filter((s) => !s.hidden);
      });
    },
    serverTypeIcon(type) {
      const icons = {
        DISCORD: 'mdi-discord',
        TEAMSPEAK3: 'mdi-teamspeak',
        MINECRAFT: 'mdi-minecraft',
        GMOD: 'mdi-steam',
        SOURCE: 'mdi-steam',
        FIVEM: 'mdi-gamepad-variant',
        RUST: 'mdi-gamepad-variant',
        SEVEN_DAYS: 'mdi-gamepad-variant',
        ASA: 'mdi-gamepad-variant',
      };
      return icons[type] || 'mdi-server';
    },
  },
};
</script>

<style scoped>

</style>
