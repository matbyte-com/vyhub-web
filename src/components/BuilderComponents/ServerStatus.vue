<template>
  <div>
    <div class="d-flex flex-row flex-wrap justify-center">
      <v-card width="300px" v-for="s in servers" :key="s.id" class="ma-2" hover>
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
            <v-btn v-if="s.status === 'ONLINE'" outlined :href="utils.getConnectionLink(s)"
                   @click="utils.copyServerAddress(s)" class="vh-connect-btn">
              <div v-if="utils.getConnectionLink(s)" class="d-flex align-center">
                <v-icon left>mdi-connection</v-icon>
                <div>{{ $t('connect') }}</div>
              </div>
              <div v-else class="d-flex align-center">
                <v-icon left>mdi-content-copy</v-icon>
                <div>{{ $t('copy') }}</div>
              </div>
            </v-btn>
            <v-btn class="ml-1"
                   v-if="s.status === 'ONLINE' && !['DISCORD','TEAMSPEAK3'].includes(s.type)"
                   :to="{ name: 'ServerDashboard', params: { id: s.id } }"
                   outlined><v-icon>mdi-badge-account-horizontal</v-icon></v-btn>
            <v-chip v-if="s.status === 'OFFLINE'" color="error" outlined label>
              <v-icon small left>mdi-alert-circle</v-icon>
              __Offline
            </v-chip>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import openapiCached from '@/api/openapiCached';

export default {
  // TODO Improve small screen size
  name: 'ServerStatus',
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
        this.servers = rsp.data;
        this.servers[0].status = 'ONLINE';
        this.servers[0].map = null;
        this.servers[1].status = 'ONLINE';
        this.servers[0].type = 'MINECRAFT';
        this.servers[1].type = 'GMOD';
        this.servers[0].current_players = 1;
        // this.servers.push(rsp.data[0]);
      });
      (await openapiCached).server_getBundles().then((rsp) => {
        this.bundles = rsp.data;
      });
    },
    getImage(s) {
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
.vh-connect-btn {
  transition: all 0.2s ease-in-out;
}

.vh-connect-btn:hover i{
  text-decoration: none;
  color: var(--v-primary-base);
  transform: scale(1.1);
}
</style>