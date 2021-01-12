<template>
  <div>
    <PageTitle :title="$t('dashboard.labels.title', { usr: user.username })"/>
    <v-tabs @change="switchTab">
      <v-tab>General</v-tab>
      <v-tab v-for="tab in tabs" :key="tab.id">
        <span>{{ tab.name }}</span>
      </v-tab>
    </v-tabs>
    <v-card class="mt-3 mb-3 pa-3">
      <keep-alive>
        <component :is="componentInstance" :bundleId="bundleId"></component>
      </keep-alive>
    </v-card>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';

import axios from 'axios';

const customerURL = `${process.env.VUE_APP_BACKEND_CUSTOMER_URL}`;

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      // user: this.$store.getters.user,
      user: {
        username: 'Nutzer 1',
      },
      bundleId: 0,
      bundleType: 'General',
      tabs: null,
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
  },
  mounted() {
    axios.get(`${customerURL}/server/bundle/`).then((response) => { (this.tabs = response.data); });
  },
  computed: {
    componentInstance() {
      // need to get and return the correct bundle type for id e.G. GMOD, MINECRAFT
      const type = this.bundleType;
      return () => import(`@/components/DashboardComponents/Dashboards/${type}`);
    },
  },
};

</script>
