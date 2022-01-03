<template>
  <div>
    <div v-if="user">
      <PageTitle icon="mdi-account" :title="$t('_dashboard.labels.title', { usr: user.username })"/>
      <v-card>
        <v-card-text>
          <v-tabs>
            <v-tab @click="switchTab('General')">
              <v-icon left>mdi-gamepad</v-icon>
              General
            </v-tab>
            <v-tab @click="switchTab('Purchases')"
                   v-if="$store.getters.isLoggedIn &&
                   (user.id === $store.getters.user.id || $checkProp('purchase_show'))">
              <v-icon left>mdi-cart-check</v-icon>
              <span>{{ $t('purchases') }}</span>
            </v-tab>
            <v-tab v-for="bundle in bundles" :key="bundle.id" :style="'color:' + bundle.color"
                   @click="switchTab('Bundle', bundle)">
              <v-icon v-if="bundle.icon" left :color="bundle.color">{{ bundle.icon }}</v-icon>
              <span>{{ bundle.name }}</span>
            </v-tab>
          </v-tabs>
        </v-card-text>
      </v-card>
      <div class="mt-2">
        <keep-alive>
          <component :is="componentInstance" :bundle="activeBundle" :user="user">
          </component>
        </keep-alive>
      </div>
    </div>
    <div v-else>
      <v-row>
        <v-col>
          <v-skeleton-loader type="heading"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-skeleton-loader type="article"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-skeleton-loader type="list-item-avatar-three-line, image, article, article">

          </v-skeleton-loader>
        </v-col>
        <v-col cols="3">
          <v-skeleton-loader type="list-item-avatar, divider, list-item-three-line, card-heading,
          image, actions"></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import openapiCached from '@/api/openapiCached';
import openapi from '@/api/openapi';
import i18n from '@/plugins/i18n';

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      error: null,
      user: null,
      activeBundle: null,
      activeTab: 'General',
      bundles: [],
    };
  },
  methods: {
    switchTab(name, bundle = null) {
      this.activeBundle = bundle;
      this.activeTab = name;
    },
    async fetchData() {
      const userId = this.$route.params.id;
      // check if there is a user with the given id
      (await openapi).user_getData(userId).then((rsp) => {
        this.user = rsp.data;
        document.title = `${i18n.t('pageTitle.dashboard')} ${this.user.username}`;
        if (this.user.type === 'CENTRAL') {
          this.$router.replace({ name: 'UserDashboard', params: { id: this.user.username }, query: this.$route.query });
        }
      }).catch(() => {
        this.$router.push('/');
      });

      (await openapiCached).server_getBundles().then((rsp) => { (this.bundles = rsp.data); });
    },
  },
  beforeMount() {
    this.fetchData();
  },
  computed: {
    componentInstance() {
      if (this.activeTab === 'Bundle') {
        return () => import(`@/components/DashboardComponents/Dashboards/Bundle/${this.activeBundle.server_type}`);
      }
      return () => import(`@/components/DashboardComponents/Dashboards/${this.activeTab}`);
    },
  },
  watch: {
    $route() {
      this.fetchData();
    },
  },
};

</script>
