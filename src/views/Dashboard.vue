<template>
  <div>
    <div v-if="error">
      Error, user not found:
      {{ error }}
    </div>
    <div v-if="user">
      <PageTitle :title="$t('dashboard.labels.title', { usr: user.username })"/>
      <v-tabs @change="switchTab">
        <v-tab>General</v-tab>
        <v-tab v-for="tab in tabs" :key="tab.id">
          <span>{{ tab.name }}</span>
        </v-tab>
      </v-tabs>
      <div class="mt-2">
        <keep-alive>
          <component :is="componentInstance" :bundleId="bundleId" :serverBundles="tabs"></component>
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
  beforeMount() {
    const username = this.$route.params.id;
    // check if there is a user with the given id
    apiService.user.getUser(username).then((rsp) => {
      this.user = rsp.data;
    }).catch((error) => {
      this.error = error;
    });
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
  },
  mounted() {
    apiService.server.getBundles().then((rsp) => { (this.tabs = rsp.data); });
  },
  computed: {
    componentInstance() {
      // TODO need to get and return the correct bundle type for id e.G. GMOD, MINECRAFT
      const type = this.bundleType.charAt(0) + this.bundleType.slice(1).toLowerCase();
      return () => import(`@/components/DashboardComponents/Dashboards/${type}`);
    },
  },
};

</script>
