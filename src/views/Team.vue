<template>
  <div>
    <PageTitle icon="mdi-account-group">{{ $t('_team.title') }}</PageTitle>
    <v-card>
      <v-tabs
        v-model="tab"
      >
        <v-tab
          v-for="bundle in serverbundles"
          :key="bundle.id"
        >
          <v-icon left :color="bundle.color">
            {{ bundle.icon }}
          </v-icon>
          <span :style="`color: ${bundle.color}`">
            {{ bundle.name }}
          </span>
        </v-tab>
      </v-tabs>
    </v-card>

    <v-row v-for="group in getCurrentTabGroups" :key="group.id" class="justify-center mt-5">
      <v-col class="text-center" cols="12">
        <v-chip :color="group.color ? group.color : '#000000'" large
                :text-color="$vuetify.theme.dark ? 'black' : 'white'" label>
          <h2 class="display-h5">{{ group.name }}</h2>
        </v-chip>
      </v-col>
      <v-col cols="6" sm="4" lg="2"
             v-for="user in getUsersByGroup(group.id)" :key="user.id" class="text-center">
        <div style="position:relative;">
          <router-link :to="{ name: 'UserDashboard', params: { id: user.id } }">
            <v-avatar size="100%" style="border-style: solid;"
                      :style="{ borderColor: group.color }">
              <img
                :src="user.avatar"
                alt="User Avatar"
              >
            </v-avatar>
          </router-link>
          <div style="position: absolute; top: 92%; width: 100%; text-align: center;">
            <!--<v-spacer />{{ user.username }}<v-spacer />-->
            <v-chip :color="group.color ? group.color : '#000000'"
                    :text-color="$vuetify.theme.dark ? 'black' : 'white'">
              {{ user.username }}
            </v-chip>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue';
import openapi from '../api/openapi';

export default {
  name: 'Team',
  components: {
    PageTitle,
  },
  data() {
    return {
      tab: 0,
      serverbundles: [],
      memberships: [],
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).server_getBundles().then((rsp) => {
        this.serverbundles = rsp.data;
      });
      (await openapi).general_getTeamMember().then((rsp) => {
        this.memberships = rsp.data;
      });
    },
    getUsersByGroup(groupID) {
      const res = [];
      this.memberships.forEach((m) => {
        if (m.group.id === groupID && m.serverbundle_id === this.currentBundleId) {
          res.push(m.user);
        }
      });
      return res;
    },
  },
  computed: {
    currentBundleId() {
      return this.serverbundles[this.tab].id;
    },
    getCurrentTabMemberships() {
      return this.memberships.filter((m) => m.serverbundle_id === this.currentBundleId);
    },
    getCurrentTabGroups() {
      if (!this.getCurrentTabMemberships) { return []; }
      const res = [];
      this.getCurrentTabMemberships.forEach((m) => {
        res.push(m.group);
      });
      return res.sort((a, b) => b - a);
    },
  },
};
</script>

<style scoped>

</style>
