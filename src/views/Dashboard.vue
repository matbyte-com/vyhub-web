<template>
  <div>
    <div v-if="error">
      Error, user not found:
      {{ error }}
    </div>
    <div v-if="user">
      <PageTitle :title="$t('_dashboard.labels.title', { usr: user.username })"/>
      <v-tabs @change="switchTab">
        <v-tab>
          <v-icon left>mdi-gamepad</v-icon>
          General
        </v-tab>
        <v-tab v-for="tab in tabs" :key="tab.id" :style="'color:' + tab.color">
          <v-icon v-if="tab.icon" left :color="tab.color">{{ tab.icon }}</v-icon>
          <span>{{ tab.name }}</span>
        </v-tab>
      </v-tabs>
      <div class="mt-2">
        <keep-alive>
          <component :is="componentInstance" :bundle-id="bundleId"
                     :server-bundles="tabs" :user="user">
          </component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import apiService from '@/api/api';

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      error: null,
      user: null,
      bundleId: 0,
      bundleType: 'General',
      tabs: [],
    };
  },
  methods: {
    switchTab(payload) {
      if (payload === 0) {
        this.bundleId = '';
        this.bundleType = 'General';
      } else {
        this.bundleId = this.tabs[payload - 1].id;
        this.bundleType = this.tabs[payload - 1].server_type;
      }
    },
    loadUser() {
      const userId = this.$route.params.id;
      // check if there is a user with the given id
      apiService.user.getUser(userId).then((rsp) => {
        this.user = rsp.data;
        if (this.user.type === 'CENTRAL') {
          this.$router.replace({ name: 'UserDashboard', params: { id: this.user.username } });
        }
      }).catch((error) => {
        this.error = error;
      });
    },
  },
  beforeMount() {
    this.loadUser();
  },
  mounted() {
    apiService.server.getBundles().then((rsp) => { (this.tabs = rsp.data); });
  },
  computed: {
    componentInstance() {
      const type = this.bundleType.charAt(0) + this.bundleType.slice(1).toLowerCase();
      return () => import(`@/components/DashboardComponents/Dashboards/${type}`);
    },
  },
  watch: {
    $route() {
      this.loadUser();
    },
  },
};

</script>
