<template>
  <v-card class="card-rounded vh-home-shop-stats" :img="imageCardUrl" flat>
    <v-card-text>
      <v-row :justify="$vuetify.breakpoint.smAndDown ? 'center' : ''">
        <v-col cols="11" sm="9" md="6" Lg="5">
          <div class="text-h4 mb-2" :class="{ 'white--text' : whiteText }">
            {{ $t('server') }}
          </div>
          <div v-for="server in servers" :key="server.id" class="mb-8">
            <div class="d-flex align-center flex-wrap" :class="{ 'white--text' : whiteText }">
              {{ $t(`_server.type.${server.type}`) }}
              <v-divider class="mx-3"/>
              <router-link style="text-decoration: none; color: inherit"
                           :to="{ name: (server.type !== 'DISCORD' && server.type
                         !== 'TEAMSPEAK3' ? 'ServerDashboard' : null),
                              params: { id: server.id }}">
                <b>{{ server.name }}</b>
              </router-link>
            </div>
            <v-card class="mt-6 px-2" flat>
              <v-row class="justify-center align-center">
                <v-col>
                  <v-card flat class="pa-1 d-inline-block pr-2">
                    <v-icon :color="utils.getStatusColor(server)" left>
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
                  <span v-else>?</span>/
                </span>
                <span v-if="server.users_max != null">{{ server.users_max }}</span>
                <span v-else>?</span>
              </router-link>
            </span>
                    <span class="font-italic text--disabled" v-if="server.status === 'UNKNOWN'">
              {{ $t('unknown') }}
            </span>
                  </v-card>
                </v-col>
                <!-- Map -->
                <v-col v-if="server.map" class="text-center">
                  <v-icon left>mdi-map</v-icon>{{ server.map }}
                </v-col>
                <!-- Connection Link -->
                <v-col class="text-right">
                  <v-btn class="mr-1 cta-btn"
                         v-if="server.status === 'ONLINE' && !['DISCORD','TEAMSPEAK3']
                     .includes(server.type)"
                         :to="{ name: 'ServerDashboard', params: { id: server.id } }" outlined>
                    <v-icon :left="$vuetify.breakpoint.smAndDown">
                      mdi-badge-account-horizontal
                    </v-icon>
                    <span v-if="$vuetify.breakpoint.smAndDown">{{ $t('dashboard') }}</span>
                  </v-btn>
                  <v-btn v-if="server.status === 'ONLINE' && $vuetify.breakpoint.mdAndUp"
                         outlined :href="utils.getConnectionLink(server)" color="primary"
                         @click="utils.copyServerAddress(server)" class="cta-btn">
                    <div v-if="utils.getConnectionLink(server)" class="d-flex align-center">
                      <v-icon left>mdi-connection</v-icon>
                      <div>{{ $t('connect') }}</div>
                    </div>
                    <div v-else class="d-flex align-center">
                      <v-icon left>mdi-content-copy</v-icon>
                      <div>{{ $t('copy') }}</div>
                    </div>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </div>

        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import openapiCached from '@/api/openapiCached';

export default {
  name: 'ServerStatus2',
  components: { },
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
        this.servers = rsp.data;
      });
    },
  },
};
</script>

<style scoped>

</style>
