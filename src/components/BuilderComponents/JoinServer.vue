<template>
<div>
  <v-row justify="center">
    <v-col class="d-flex align-center justify-start" v-if="server1 && $vuetify.breakpoint.mdAndUp">
      <a :href="utils.getConnectionLink(server1)" class="text-decoration-none" target="_blank">
        <div class="d-flex align-center join-link pa-3" :class="{ 'white--text': whiteText }">
          <v-card color="primary"
                  class="pa-5 join-btn" flat style="border-radius: 15px">
            <v-icon :color="whiteText ? 'white' : 'black'"
                    size="40">{{ getServerIcon(server1) }}</v-icon>
          </v-card>
          <div class="ml-3" >
            <div class="text-h5">{{ server1.name }}</div>
            <div>{{ $t('_component.currentPlayers') }} {{ server1.users_current }}</div>
          </div>
        </div>
      </a>
    </v-col>
    <v-col v-if="server2 || !servers" class="text-center">
      <div v-if="!servers">
        {{ $t('_component.specifyServers') }}
      </div>
      <v-img height="200" contain :src="imageUrl ? imageUrl : this.$store.getters.theme.logo"
             :alt="$store.getters.theme.logo" />
    </v-col>
    <v-col class="d-flex align-center justify-end" v-if="server2 && $vuetify.breakpoint.mdAndUp">
      <a :href="utils.getConnectionLink(server2)" target="_blank"
         class="text-decoration-none">
        <div class="d-flex align-center justify-end join-link pa-3"
             :class="{ 'white--text': whiteText }">
          <div class="text-right mr-3">
            <div class="text-h5">{{ server2.name }}</div>
            <div>{{ $t('_component.currentPlayers') }} {{ server2.users_current }}</div>
          </div>
          <v-card color="primary"
                  class="pa-5 join-btn" flat style="border-radius: 15px">
            <v-icon :color="whiteText ? 'white' : 'black'"
                    size="40">{{ getServerIcon(server2) }}</v-icon>
          </v-card>
        </div>
      </a>
    </v-col>
  </v-row>
</div>
</template>

<script>
import openapiCached from '@/api/openapiCached';
import { features } from 'process';
import vuetify from '@/plugins/vuetify';

export default {
  name: 'JoinServer',
  props: ['imageUrl', 'servers', 'whiteText'],
  data() {
    return {
      fetchedServers: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  watch: {
    servers() {
      this.fetchData();
    },
  },
  methods: {
    vuetify() {
      return vuetify;
    },
    async fetchData() {
      (await openapiCached).server_getServers().then((rsp) => {
        this.fetchedServers = rsp.data;
      });
    },
    getServerIcon(server) {
      // TODO fix icons
      if (!server) return null;
      if (server.type === 'GMOD') {
        return 'mdi-account';
      }
      if (server.type === 'DISCORD') {
        return 'mdi-discord';
      }
      if (server.type === 'MINECRAFT') {
        return 'mdi-minecraft';
      }
      if (server.icon) {
        return server.icon;
      }
      return 'https://cdn.discordapp.com/icons/0/0.png';
    },
  },
  computed: {
    features() {
      return features;
    },
    server1() {
      if (!this.servers) return null;
      if (this.fetchedServers) {
        return this.fetchedServers.find((s) => s.id === this.servers[0]);
      }
      return null;
    },
    server2() {
      if (!this.servers) return null;
      if (this.servers.length < 2) {
        return this.server1;
      }
      if (this.fetchedServers) {
        return this.fetchedServers.find((s) => s.id === this.servers[1]);
      }
      return null;
    },
  },
};
</script>

<style scoped>
.join-link {
  transition: all .2s ease-in-out;
  border-radius: 15px;
}
.join-link:hover {
  background-color: var(--v-primary-lighten2);
}

.join-btn {
  filter: brightness(100%);
}

</style>
