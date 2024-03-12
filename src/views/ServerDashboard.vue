<template>
  <div v-if="server">
    <div>
      <v-menu offset-y width="100%" v-model="menuOpen">
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <PageTitleFlat :title="server.name" :hide-triangle="true" :is-menu="true"
                           :no-bottom-border-radius="$vuetify.breakpoint.mdAndDown">
              <template v-slot:start>
                <v-card class="pa-1" flat style="width: 100px; background-color: green"
                        v-if="server.status === 'ONLINE'">
                  <v-progress-linear rounded :value="getPlayerOnlineProgress(server)" height="18"
                                     class="white--text">
                    <strong v-if="server.status === 'ONLINE'">
                      <span v-if="server.users_current != null">
                        {{ server.users_current }}
                      </span>
                          <span v-else>
                        ?
                      </span>
                          /
                          <span v-if="server.users_max != null">
                        {{ server.users_max }}
                      </span>
                          <span v-else>
                        ?
                      </span>
                    </strong>
                  </v-progress-linear>
                </v-card>
                <div v-else/>
              </template>
              <template v-slot:end>
                <div class="text-right">
                  <v-icon color="white">mdi-unfold-more-horizontal</v-icon>
                </div>
              </template>
            </PageTitleFlat>
          </div>
        </template>
        <v-card style="width: 100%;" class="card-rounded-bottom">
          <v-list>
            <v-list-item v-for="server in availableServerDashboards" :key="server.id"
                         @click="serverChanged(server)"
                         :input-value="$route.params.id === server.id">
              <v-icon left>{{ server.serverbundle.icon }}</v-icon>{{ server.name }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
    <v-row dense :class="{ 'mt-3': !$vuetify.breakpoint.mdAndDown }">
      <v-col cols="12" lg="4" class="d-flex">
        <v-card :class="{ 'card-rounded-top':!$vuetify.breakpoint.mdAndDown,
           'no-top-border-radius': $vuetify.breakpoint.mdAndDown,}"
                class="flex-grow-1 vh-server-dashboard-users card-rounded" flat>
          <v-card-text>
            <div class="d-flex align-center">
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
              <transition enter-active-class="animate__fadeIn" mode="out-in"
                          leave-active-class="animate__rotateOut">
                <div v-if="!reloading" style="width: 56px"
                     class="animate__animated animate__faster text-center">
                  <v-icon color="info" @click="fetchData" key="1">
                    mdi-sync
                  </v-icon>
                </div>
                <v-progress-circular indeterminate v-else
                                     class="animate__animated animate__faster ml-3 mr-3" key="2"/>
              </transition>
            </div>
            <v-list max-height="60vh" class="overflow-y-auto">
              <div v-if="returnUsers == null">
                <v-skeleton-loader type="list-item-avatar"
                                   :key="i"
                                   v-for="i in Array(5)">
                </v-skeleton-loader>
              </div>
              <v-list-item v-else-if="returnUsers.length === 0"
                           class="text--disabled">
                {{ $t('_serverDashboard.noUsersFound') }}
              </v-list-item>
              <v-list-item v-for="user in returnUsers" :key="user.id"
                           @click="currentUser=user" :input-value="listActive(user)">
                <v-avatar size="35">
                  <v-img v-if="user.avatar" :src="user.avatar"/>
                </v-avatar>
                <span class="ml-3 text-h6" :style="{ color: getColor(user) }">
                  {{ user.username }}
                </span>
                <v-spacer/>
                <div>
                  <v-chip v-if="user.warnings.length > 0"
                          color="warning darken-1"
                          small>
                    <v-icon left>
                      mdi-account-alert
                    </v-icon>
                    <span>
                      {{ user.warnings.length }}
                    </span>
                  </v-chip>
                  <v-chip v-if="user.bans.length > 0"
                          class="ml-2"
                          small color="error darken-2">
                    <v-icon left>
                      mdi-account-cancel
                    </v-icon>
                    <span>
                       {{ user.bans.length }}
                    </span>
                  </v-chip>
                </div>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="8" class="d-flex">
        <v-card class="flex-grow-1 vh-server-status-selected-user card-rounded" flat>
          <v-card-text v-if="!currentUser">{{ $t('_serverDashboard.selectAUser') }}</v-card-text>
          <v-card-text v-else>
            <v-row>
              <v-col>
                <UserLink :user="currentUser"/>
              </v-col>
              <v-col v-if="currentUser.memberships" class="text-right">
                <v-chip v-for="membership in currentUser.memberships" :key="membership.id"
                        :color="membership.group.color" class="ml-1" text-color="white">
                  {{ membership.group.name }}
                </v-chip>
              </v-col>
            </v-row>
            <v-divider class="my-4"></v-divider>
            <div v-if="extra != null">
              <v-chip class="mr-2" v-for="(value, key) in extra" v-bind:key="key">
                {{ key }}: {{ value }}
              </v-chip>
              <v-divider class="my-4"></v-divider>
            </div>
            <div>
              <WarningTable v-if="$checkProp('warning_show') ||
             ($store.getters.isLoggedIn && $checkLinked(currentUser, $store.getters.user))"
                            :warnings="currentUser.warnings"
                            :total-items="currentUser.warnings.length"
                            :user="currentUser"
                            :serverbundle="server.serverbundle"
                            @edit="fetchUserActivity"/>
            </div>
            <div class="mt-4">
              <BanTable v-if="$checkProp('ban_show') ||
             ($store.getters.isLoggedIn && $checkLinked(currentUser, $store.getters.user))"
                        :bans="currentUser.bans"
                        :total-items="currentUser.bans.length"
                        :user="currentUser"
                        :serverbundle="server.serverbundle"
                        @edit="fetchUserActivity"/>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import UserLink from '@/components/UserLink.vue';
import WarningTable from '@/components/ServerDashboard/WarningTable.vue';
import BanTable from '@/components/ServerDashboard/BanTable.vue';
import SessionService from '@/services/SessionService';
import PageTitleFlat from '@/components/PageTitleFlat.vue';

export default {
  name: 'ServerDashboard',
  components: {
    PageTitleFlat,
    WarningTable,
    UserLink,
    BanTable,
  },
  data() {
    return {
      servers: null,
      users: null,
      userSearchModel: null,
      currentUser: null,
      menuOpen: false,
      reloading: false,
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
      this.reloading = true;
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
        setTimeout(() => {
          this.reloading = false;
        }, 1000);

        if (this.currentUser != null) {
          this.currentUser = this.users.find((u) => u.id === this.currentUser.id);
        }
      });
    },
    listActive(item) {
      if (!this.currentUser) return false;
      return item.id === this.currentUser.id;
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
    getPlayerOnlineProgress(server) {
      if (server.users_max == null || server.users_current == null) return 0;
      return (server.users_current / server.users_max) * 100;
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
      return this.servers.filter((s) => s.type !== 'DISCORD' && s.type !== 'TEAMSPEAK3');
    },
    extra() {
      if (this.currentUser == null) {
        return null;
      }

      if (this.currentUser.activities.length > 0) {
        return this.currentUser.activities[0].extra;
      }

      return null;
    },
  },
};
</script>

<style scoped>

</style>
