<template>
  <div v-if="server">
    <v-menu offset-y max-width="100%">
      <template v-slot:activator="{ on, attrs }">
        <PageTitle icon="mdi-server">
          <span v-bind="attrs"
                v-on="on">{{ server.name }} <v-icon>mdi-triangle mdi-rotate-180</v-icon></span>
        </PageTitle>
      </template>
      <v-card>
        <v-list>
          <v-list-item v-for="server in availableServerDashboards" :key="server.id"
                       @click="serverChanged(server)"
                       :input-value="$route.params.id === server.id">
            <v-icon left>{{ server.serverbundle.icon }}</v-icon>{{ server.name }}
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <v-card>
      <v-row align="center">
        <v-col class="ml-1">
          <v-icon :color="getStatusColor" left>
            mdi-flash
          </v-icon>
          <span v-if="server.status !== 'UNKNOWN'">
                <a>
                  <span v-if="server.type !== 'DISCORD'">
                    <span v-if="server.users_current != null">
                    {{ server.users_current }}
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
                </a>
              </span>
        </v-col>
        <v-col class="text-center text-h6">{{ server.name }}</v-col>
        <v-col class="text-right mr-1">{{ $t(`_server.type.${server.type}`) }}</v-col>
      </v-row>
    </v-card>
    <v-row class="mt-6" no-gutters>
      <v-col cols="12" lg="4" class="d-flex" :class="$vuetify.breakpoint.lgAndUp ? 'pr-3' : 'mb-3'">
        <v-card class="flex-grow-1">
          <v-card-text>
            <v-text-field
              v-model="userSearchModel"
              :label="$t('search')"
              hide-details
              outlined
              dense>
              <template v-slot:prepend-inner>
                <v-icon>
                  mdi-magnify
                </v-icon>
              </template>
            </v-text-field>
            <v-list dense max-height="60vh" class="overflow-y-auto">
              <v-list-item v-if="!returnUsers ||
               returnUsers.length === 0" class="text--disabled">
                {{ $t('_serverDashboard.noUsersFound') }}
              </v-list-item>
              <v-list-item v-for="user in returnUsers" :key="user.id"
                           @click="currentUser=user" :input-value="listActive(user)">
                <v-avatar class="mt-1 mb-1" size="40">
                  <v-img v-if="user.avatar" :src="user.avatar"/>
                </v-avatar>
                <span class="ml-3 text-h6" :style="{ color: getColor(user) }">
                  {{ user.username }}
                </span>
                <v-spacer />
                <div class="d-flex flex-column mt-1 mb-1">
                  <v-chip v-if="user.warnings.length > 0"
                          color="warning darken-2"
                          outlined small :class="user.bans.length > 0 ? 'mb-1' : ''">
                    <v-icon left>
                      mdi-account-alert
                    </v-icon>
                    <span class="mr-1">
                      {{ user.warnings.length }}
                    </span>
                    {{ $t('warnings') }}
                  </v-chip>
                  <!-- TODO $checkProp: Elemente verstecken, wenn keine Berechtigungen für Bundle-->
                  <v-chip v-if="user.bans.length > 0"
                          outlined small color="error darken-2">
                    <v-icon left>
                      mdi-account-cancel
                    </v-icon>
                    <span class="mr-1">
                       {{ user.bans.length }}
                    </span>
                    {{ $t('bans') }}
                  </v-chip>
                </div>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="8" class="d-flex">
        <v-card class="flex-grow-1">
          <v-card-text v-if="!currentUser">Select user</v-card-text>
          <v-card-text v-else>
            <v-row>
              <v-col>
                <UserLink :user="currentUser"/>
              </v-col>
              <v-col v-if="currentUser.memberships" class="text-right">
                <v-chip v-for="membership in currentUser.memberships" :key="membership.id"
                        :color="membership.group.color" class="ml-1">
                  {{ membership.group.name }}
                </v-chip>
              </v-col>
            </v-row>
            <WarningTable v-if="$checkProp('warning_show') ||
             ($store.getters.isLoggedIn && $checkLinked(currentUser, $store.getters.isLoggedIn))"
                          :warnings="currentUser.warnings"
                          :total-items="currentUser.warnings.length"
                          :user="currentUser"
                          :serverbundle="server.serverbundle"
                          @edit="reloadcurrentUserWarnings; reloadcurrentUserBans"/>
            <v-divider />
            <BanTable v-if="$checkProp('ban_show') ||
             ($store.getters.isLoggedIn && $checkLinked(currentUser, $store.getters.isLoggedIn))"
                      :bans="currentUser.bans"
                      :total-items="currentUser.bans.length"
                      :user="currentUser"
                      :serverbundle="server.serverbundle"
                      @edit="reloadcurrentUserBans"/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import openapi from '@/api/openapi';
import UserLink from '@/components/UserLink.vue';
import WarningTable from '@/components/ServerDashboard/WarningTable.vue';
import BanTable from '@/components/ServerDashboard/BanTable.vue';
import SessionService from '@/services/SessionService';

export default {
  name: 'ServerDashboard',
  components: {
    WarningTable, UserLink, PageTitle, BanTable,
  },
  data() {
    return {
      servers: null,
      users: null,
      userSearchModel: null,
      currentUser: null,
      banHeaders: [
        { text: this.$t('user'), value: 'user', sortable: false },
        { text: this.$t('reason'), value: 'reason' },
        { text: this.$t('bundle'), value: 'serverbundle.name', sortable: false },
        { text: this.$t('length'), value: 'length' },
        { text: this.$t('creator'), value: 'creator', sortable: false },
        { text: this.$t('createdOn'), value: 'created_on' },
        {
          text: this.$t('actions'), value: 'actions', align: 'right', sortable: false,
        },
      ],
    };
  },
  beforeMount() {
    this.fetchServers();
    this.fetchUserActivity();
    this.startTimer();
  },
  beforeDestroy() {
    this.stopTimer();
  },
  methods: {
    fetchData() {
      if (!SessionService.lastActiveWindow()) {
        return;
      }
      this.fetchServers();
      this.fetchUserActivity();
    },
    startTimer() {
      this.fetchData();
      this.timer = setInterval(this.fetchData, 30000); // 30s
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    async fetchServers() {
      (await openapi).server_getServers().then((rsp) => {
        this.servers = rsp.data;
      });
    },
    async fetchUserActivity() {
      (await openapi).server_getServerUserActivity(this.$route.params.id).then((rsp) => {
        this.users = rsp.data;
      });
    },
    listActive(item) {
      if (!this.currentUser) return false;
      return item.id === this.currentUser.id;
    },
    async reloadcurrentUserWarnings() {
      (await openapi).warning_getWarnings({ user_id: this.currentUser.id, size: 100 })
        .then((rsp) => {
          this.currentUser.warnings = rsp.data.items;
        });
    },
    async reloadcurrentUserBans() {
      (await openapi).ban_getBans({ user_id: this.currentUser.id, size: 100 }).then((rsp) => {
        this.currentUser.bans = rsp.data.items;
      });
    },
    serverChanged(server) {
      this.$router.push({ name: 'ServerDashboard', params: { id: server.id } });
      this.fetchUserActivity();
      this.currentUser = null;
    },
    getColor(user) {
      if (user.memberships.length === 0) return null;
      // return color of group with highest permission_level
      // eslint-disable-next-line max-len
      const membership = user.memberships.reduce((prev, current) => ((prev.group.permission_level > current.group.permission_level) ? prev : current));
      return membership.group.color;
    },
  },
  computed: {
    getStatusColor() {
      switch (this.server.status) {
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
    returnUsers() {
      if (this.userSearchModel === null || this.userSearchModel === '') {
        return this.users;
      }
      return this.users.filter((u) => u.username.toLowerCase()
        .includes(this.userSearchModel.toLowerCase()));
    },
    server() {
      if (!this.servers) return null;
      return this.servers.find((s) => s.id === this.$route.params.id);
    },
    availableServerDashboards() {
      if (!this.servers) return null;
      return this.servers.filter((s) => s.type !== 'DISCORD');
    },
  },
};
</script>

<style scoped>

</style>
