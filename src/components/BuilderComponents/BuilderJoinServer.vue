<template>
  <div class="vh-home-join-server">
    <v-row justify="center">
      <v-col
        v-if="server1 && $vuetify.display.mdAndUp"
        cols="5"
        lg="4"
        class="d-flex align-center justify-start"
      >
        <div
          class="d-flex align-center join-link pa-3 cursor-pointer"
          :class="{ 'text-white': whiteText }"
          @click="connect(server1)"
        >
          <v-card
            color="primary"
            class="pa-5 join-btn"
            flat
            style="border-radius: 15px"
          >
            <v-icon
              :color="whiteText ? 'white' : ''"
              size="40"
            >
              {{ getServerIcon(server1) }}
            </v-icon>
          </v-card>
          <div class="ml-3 server-text">
            <div class="text-h5 server-name">
              {{ server1.name }}
            </div>
            <div>{{ $t('_component.currentPlayers') }} {{ server1.users_current }}</div>
          </div>
        </div>
      </v-col>
      <v-col
        v-if="server2 || !servers"
        cols="11"
        md="2"
        lg="4"
        class="text-center"
      >
        <div v-if="!servers">
          {{ $t('_component.specifyServers') }}
        </div>
        <router-link
          v-if="logoUrl"
          :to="$props.link"
        >
          <v-img
            height="200"
            :src="logoUrl ? logoUrl : store.theme.logo"
            :alt="store.theme.logo"
          />
        </router-link>
        <div
          v-else
          style="height: 200px"
          class="text-h3 d-flex align-center justify-center vh-headline"
          :class="{ 'text-white': whiteText }"
        >
          {{ store.generalConfig.community_name }}
        </div>
      </v-col>
      <v-col
        v-if="server2 && $vuetify.display.mdAndUp"
        cols="5"
        lg="4"
        class="d-flex align-center justify-end"
      >
        <div
          class="d-flex align-center justify-end join-link pa-3 cursor-pointer"
          :class="{ 'text-white': whiteText }"
          @click="connect(server2)"
        >
          <div class="text-right mr-3 server-text">
            <div class="text-h5 server-name">
              {{ server2.name }}
            </div>
            <div>{{ $t('_component.currentPlayers') }} {{ server2.users_current }}</div>
          </div>
          <v-card
            color="primary"
            class="pa-5 join-btn"
            flat
            style="border-radius: 15px"
          >
            <v-icon
              :color="whiteText ? 'white' : ''"
              size="40"
            >
              {{ getServerIcon(server2) }}
            </v-icon>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import openapiCached from '@/api/openapiCached';
import { useVyHubStore } from '@/store';

export default {
  name: 'JoinServer',
  props: {
    logoUrl: {
      type: String,
      default: ''
    },
    servers: {
      type: Array,
      default: null
    },
    whiteText: {
      type: Boolean
    },
    link: {
      type: Object,
      default: () => ({
        name: 'Home'
      })
    }
  },
  data() {
    return {
      fetchedServers: null,
    };
  },
  computed: {
    store() {
      return useVyHubStore();
    },
    server1() {
      if (!this.servers || this.servers.length === 1) return null;
      if (this.fetchedServers) {
        return this.fetchedServers.find((s) => s.id === this.servers[0]);
      }
      return null;
    },
    server2() {
      if (!this.servers) return null;
      if (this.servers.length < 2 && this.fetchedServers) {
        // Return Server 1
        return this.fetchedServers.find((s) => s.id === this.servers[0]);
      }
      if (this.fetchedServers) {
        return this.fetchedServers.find((s) => s.id === this.servers[1]);
      }
      return null;
    },
  },
  watch: {
    servers() {
      this.fetchData();
    },
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async connect(server) {
      if (this.utils.getConnectionLink(server) != null) {
        window.open(this.utils.getConnectionLink(server), '_blank');
      } else {
        this.utils.copyServerAddress(server);
      }
    },
    async fetchData() {
      (await openapiCached).server_getServers().then((rsp) => {
        this.fetchedServers = rsp.data;
      });
    },
    getServerIcon(server) {
      if (!server) return null;
      if (server.type === 'GMOD') {
        return 'custom:gmod';
      }
      if (server.type === 'DISCORD') {
        return 'custom:discord';
      }
      if (server.type === 'MINECRAFT') {
        return 'custom:minecraft';
      }
      if (server.type === 'ASA') {
        return 'custom:asa';
      }
      if (server.type === 'FIVEM') {
        return 'custom:fivem';
      }
      if (server.type === 'TEAMSPEAK3') {
        return 'custom:teamspeak';
      }
      if (server.type === 'RUST') {
        return 'custom:rust';
      }
      if (server.type === 'SEVEN_DAYS') {
        return 'custom:sevenDays';
      }
      if (server.icon) {
        return server.icon;
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
  background-color: rgb(var(--v-theme-primary-lighten-2)) !important;
}

.join-btn {
  filter: brightness(100%);
  /* Flex items shrink by default, so a long server name next to this squeezed the icon tile into a
     narrow sliver instead of wrapping the name. */
  flex-shrink: 0;
}

/* Without this the name cannot wrap below the flex item's content width. */
.server-text {
  min-width: 0;
}

/* A name long enough to wrap past two lines would otherwise grow the block out of the header. */
.server-name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: anywhere;
}

a {
  color: inherit;
}

</style>
