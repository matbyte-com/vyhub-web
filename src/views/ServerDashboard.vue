<template>
  <div v-if="server">
    <PageTitle icon="mdi-server" :title="server.name" />
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
      <v-col cols="4" class="mr-3 d-flex">
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
                           @click="userView=user">
                <v-avatar class="mt-1 mb-1" size="40">
                  <v-img v-if="user.avatar" :src="user.avatar"/>
                </v-avatar>
                <span class="ml-3 text-h6">
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
      <v-col class="d-flex">
        <v-card class="flex-grow-1">
          <v-card-text v-if="!userView">Select user</v-card-text>
          <v-card-text v-else>
            <UserLink :user="userView"/>
            <WarningTable :warnings="userView.warnings"
                          :total-items="userView.warnings.length"
                          :user="userView"
                          :serverbundle="server.serverbundle"/>
            <v-divider />
            <BanTable :bans="userView.bans"
                      :total-items="userView.bans.length"
                      :user="userView"
                      :serverbundle="server.serverbundle"/>
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

export default {
  name: 'ServerDashboard',
  components: {
    WarningTable, UserLink, PageTitle, BanTable,
  },
  data() {
    return {
      server: null,
      users: null,
      userSearchModel: null,
      userView: null,
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
    this.fetchServer();
    this.fetchUserActivity();
  },
  methods: {
    async fetchServer() {
      (await openapi).server_getServer(this.$route.params.id).then((rsp) => {
        this.server = rsp.data;
      });
    },
    async fetchUserActivity() {
      (await openapi).server_getServerUserActivity(this.$route.params.id).then((rsp) => {
        this.users = rsp.data;
      });
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
  },
};
</script>

<style scoped>

</style>
