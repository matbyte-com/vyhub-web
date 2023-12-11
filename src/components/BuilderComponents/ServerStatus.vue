<template>
  <div class="vh-home-server-status">
    <v-row justify="center" v-if="$vuetify.breakpoint.smAndUp">
      <v-col cols="12" sm="4" md="4" lg="3" xl="2" v-for="s in servers" :key="s.id" >
        <v-card class="card-rounded" hover>
          <v-img :src="getImage(s)" :alt="s.name"/>
          <v-card-text class="d-flex flex-column" style="min-height: 172px" >
            <div class="text-center text-h6 mb-3">
              {{ s.name }}
            </div>
            <v-spacer />
            <div v-if="s.users_current != null && s.status === 'ONLINE'">
              <div class="d-flex align-center">
                <v-icon left>mdi-account-multiple</v-icon>
                <v-progress-linear rounded :value="getPlayerOnlineProgress(s)" height="18"
                                   class="white--text">
                  <strong>
                  <span v-if="s.users_current != null && s.status === 'ONLINE'">
                    {{ s.users_current }}
                  </span>
                    <span v-else>
                    ?
                  </span>
                    /
                    <span v-if="s.users_max != null">
                    {{ s.users_max }}
                  </span>
                    <span v-else>
                    ?
                  </span>
                  </strong>
                </v-progress-linear>
              </div>
            </div>
            <div>
              <v-icon v-if="s.map" left>mdi-map</v-icon>{{ s.map }}
            </div>
            <v-spacer />
            <div class="d-flex justify-center align-center mt-3">
              <v-btn v-if="s.status === 'ONLINE' && $vuetify.breakpoint.mdAndUp"
                     depressed :href="utils.getConnectionLink(s)" color="primary"
                     @click="utils.copyServerAddress(s)" class="cta-btn">
                <div v-if="utils.getConnectionLink(s)" class="d-flex align-center">
                  <v-icon left>mdi-connection</v-icon>
                  <div>{{ $t('connect') }}</div>
                </div>
                <div v-else class="d-flex align-center">
                  <v-icon left>mdi-content-copy</v-icon>
                  <div>{{ $t('copy') }}</div>
                </div>
              </v-btn>
              <v-btn class="ml-1 cta-btn"
                     v-if="s.status === 'ONLINE' && !['DISCORD','TEAMSPEAK3'].includes(s.type)"
                     :to="{ name: 'ServerDashboard', params: { id: s.id } }" depressed>
                <v-icon :left="$vuetify.breakpoint.smAndDown">mdi-badge-account-horizontal</v-icon>
                <span v-if="$vuetify.breakpoint.smAndDown">{{ $t('dashboard') }}</span>
              </v-btn>
              <v-chip v-if="s.status === 'OFFLINE'" color="error" outlined label>
                <v-icon small left>mdi-alert-circle</v-icon>
                {{ $t('_server.labels.offline') }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <Swiper v-else :number-of-elements="servers.length" :per-page-custom="[1,2,3,4,5]">
      <swiper-slide v-for="s in servers" :key="s.id">
        <v-card class="card-rounded" hover>
          <v-img :src="getImage(s)" :alt="s.name"/>
          <v-card-text class="d-flex flex-column" style="min-height: 172px" >
            <div class="text-center text-h6 mb-3">
              {{ s.name }}
            </div>
            <v-spacer />
            <div v-if="s.users_current != null && s.status === 'ONLINE'">
              <div class="d-flex align-center">
                <v-icon left>mdi-account-multiple</v-icon>
                <v-progress-linear rounded :value="getPlayerOnlineProgress(s)" height="18"
                                   class="white--text">
                  <strong>
                  <span v-if="s.users_current != null && s.status === 'ONLINE'">
                    {{ s.users_current }}
                  </span>
                    <span v-else>
                    ?
                  </span>
                    /
                    <span v-if="s.users_max != null">
                    {{ s.users_max }}
                  </span>
                    <span v-else>
                    ?
                  </span>
                  </strong>
                </v-progress-linear>
              </div>
            </div>
            <div>
              <v-icon v-if="s.map" left>mdi-map</v-icon>{{ s.map }}
            </div>
            <v-spacer />
            <div class="d-flex justify-center align-center mt-3">
              <v-btn v-if="s.status === 'ONLINE' && $vuetify.breakpoint.mdAndUp" depressed
                     :href="utils.getConnectionLink(s)" color="primary"
                     @click="utils.copyServerAddress(s)" class="cta-btn">
                <div v-if="utils.getConnectionLink(s)" class="d-flex align-center">
                  <v-icon left>mdi-connection</v-icon>
                  <div>{{ $t('connect') }}</div>
                </div>
                <div v-else class="d-flex align-center">
                  <v-icon left>mdi-content-copy</v-icon>
                  <div>{{ $t('copy') }}</div>
                </div>
              </v-btn>
              <v-btn class="ml-1 cta-btn"
                     v-if="s.status === 'ONLINE' && !['DISCORD','TEAMSPEAK3'].includes(s.type)"
                     :to="{ name: 'ServerDashboard', params: { id: s.id } }" depressed>
                <v-icon :left="$vuetify.breakpoint.smAndDown">mdi-badge-account-horizontal</v-icon>
                <span v-if="$vuetify.breakpoint.smAndDown">{{ $t('dashboard') }}</span>
              </v-btn>
              <v-chip v-if="s.status === 'OFFLINE'" color="error" label>
                <v-icon small left>mdi-alert-circle</v-icon>
                {{ $t('_server.labels.offline') }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </swiper-slide>
    </Swiper>
  </div>
</template>

<script>
import openapiCached from '@/api/openapiCached';
import Swiper from '@/components/Swiper.vue';

export default {
  name: 'ServerStatus',
  components: { Swiper },
  data() {
    return {
      servers: null,
      bundles: null,
      currentServer: null,
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
      (await openapiCached).server_getBundles().then((rsp) => {
        this.bundles = rsp.data;
      });
    },
    getImage(s) {
      // TODO Put Pictures into cdn
      if (s.imageUrl != null) return s.imageUrl;
      switch (s.type) {
        case 'MINECRAFT':
          return 'https://steam.cryotank.net/wp-content/gallery/minecraft/Minecraft-07-HD.png';
        case 'GMOD':
          return 'https://cdn.steamstatic.com/steam/apps/4000/header.jpg';
        case 'TEAMSPEAK3':
          return 'https://cdn.vyhub.net/central/games/teamspeak.jpeg';
        case 'DISCORD':
          return 'https://cdn.vyhub.net/central/games/discord.png';
        case 'RUST':
          return 'https://cdn.steamstatic.com/steam/apps/252490/header.jpg';
        case 'FiveM':
          return 'https://cdn.steamstatic.com/steam/apps/252490/header.jpg';
        default:
          return 'https://cdn.vyhub.net/central/games/teamspeak.jpeg';
      }
    },
    getPlayerOnlineProgress(server) {
      if (server.users_max == null || server.users_current == null) return 0;
      return (server.users_current / server.users_max) * 100;
    },
  },
  computed: {
  },
};
</script>

<style scoped>
</style>
