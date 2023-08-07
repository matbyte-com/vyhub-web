<template>
<div>
  <v-row justify="center">
    <v-col class="d-flex align-center justify-start" v-if="server1">
      <a :href="utils.getConnectionLink(server1)" class="text-decoration-none" target="_blank">
        <div class="d-flex align-center join-link pa-3 white--text">
          <v-card :color="backgroundColor ? backgroundColor : 'primary'"
                  class="pa-5 join-btn" flat style="border-radius: 15px">
            <v-icon color="white" size="40">{{ getServerIcon(server1) }}</v-icon>
          </v-card>
          <div class="ml-3">
            <div class="text-h5">{{ server1.name }}</div>
            <div>{{ server1.users_current }} __active players</div>
          </div>
        </div>
      </a>
    </v-col>
    <v-col v-if="server2 || !servers" class="text-center">
      <div v-if="!servers">
        __Specify up to two servers in the component settings__
      </div>
      <v-img height="200" contain :src="imageUrl ? imageUrl : this.$store.getters.theme.logo"
             :alt="$store.getters.theme.logo" />
    </v-col>
    <v-col class="d-flex align-center justify-end" v-if="server2">
      <a :href="utils.getConnectionLink(server2)" target="_blank"
         class="text-decoration-none">
        <div class="d-flex align-center justify-end join-link pa-3 white--text">
          <div class="text-right mr-3">
            <div class="text-h5">{{ server2.name }}</div>
            <div>{{ server2.users_current }} __active users</div>
          </div>
          <v-card :color="backgroundColor ? backgroundColor : 'primary'"
                  class="pa-5 join-btn" flat style="border-radius: 15px">
            <v-icon color="white" size="40">{{ getServerIcon(server2) }}</v-icon>
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

export default {
  name: 'JoinServer',
  props: ['imageUrl', 'servers', 'backgroundColor'],
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
        return this.fetchedServers[0];
      }
      return null;
    },
    server2() {
      if (!this.servers) return null;
      if (this.servers.length < 2) {
        return this.server1;
      }
      if (this.fetchedServers) {
        // TODO find right server from id
        return this.fetchedServers[1];
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
  fillter: brightness(130%);
  background-color: var(--v-primary-lighten5);
}

.join-btn {
  filter: brightness(100%);
}

</style>
