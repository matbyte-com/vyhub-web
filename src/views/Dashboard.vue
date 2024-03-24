<template>
  <div>
    <div v-if="user">
      <PageTitleFlat :title="user.username" :no-bottom-border-radius="true">
        <template v-slot:end>
          <span class="d-flex justify-end mr-1" v-if="$checkAdmin()">
            <v-btn icon @click="$refs.deleteDialog.show()" small outlined depressed>
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </span>
        </template>
      </PageTitleFlat>
      <v-card class="vh-dashboard-tabs card-rounded-bottom no-top-border-radius" flat>
        <v-card-text>
          <v-tabs v-model="activeTabIndex">
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
            <v-tab v-for="bundle in getBundles" :key="bundle.id" :class="`vh-bundle-${bundle.id}`"
                   @click="switchTab('Bundle', bundle)">
              <v-icon v-if="bundle.icon" left>{{ bundle.icon }}</v-icon>
              <span>{{ bundle.name }}</span>
            </v-tab>
          </v-tabs>
        </v-card-text>
      </v-card>
      <div class="mt-5">
        <keep-alive>
          <component :is="componentInstance" :bundle="activeBundle" :user="user"
                     @user-updated="fetchData">
          </component>
        </keep-alive>
      </div>
    </div>
    <!-- Skeleton Loaders -->
    <div v-else>
      <PageTitleFlat :no-bottom-border-radius="true"/>
      <v-card class="no-top-border-radius card-rounded-bottom" flat>
        <v-card-text>
          <v-skeleton-loader type="heading" />
        </v-card-text>
      </v-card>
      <v-row class="mt-3">
        <v-col cols="3">
          <v-card class="pa-3 card-rounded" flat>
            <v-skeleton-loader type="list-item-avatar" />
          </v-card>
          <v-card class="pa-3 mt-3 card-rounded" flat>
            <v-skeleton-loader type="list-item-avatar" />
          </v-card>
          <v-card class="pa-3 mt-3 card-rounded" flat>
            <v-skeleton-loader type="list-item-avatar" />
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="pa-3 card-rounded" flat>
            <v-skeleton-loader type="paragraph@2" />
          </v-card>
          <v-card class="pa-3 card-rounded mt-3" flat>
            <v-skeleton-loader type="paragraph" />
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card class="pa-3 card-rounded" flat>
            <v-row>
              <v-col><v-skeleton-loader type="card" /></v-col>
              <v-col><v-skeleton-loader type="card" /></v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <DeleteConfirmationDialog ref="deleteDialog" countdown
                              @submit="deleteUser"
                              :text="$t('_dashboard.messages.deleteUserText')" />
  </div>
</template>

<script>
import openapiCached from '@/api/openapiCached';
import openapi from '@/api/openapi';
import i18n from '@/plugins/i18n';
import PageTitleFlat from '@/components/PageTitleFlat.vue';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';

export default {
  components: {
    DeleteConfirmationDialog,
    PageTitleFlat,
  },
  data() {
    return {
      error: null,
      user: null,
      activeBundle: null,
      activeTab: 'General',
      activeTabIndex: 0,
      bundles: [],
    };
  },
  methods: {
    switchTab(name, bundle = null) {
      this.activeBundle = bundle;
      this.activeTab = name;
      this.$router.replace({ name: 'UserDashboard', params: { component: name.toLowerCase(), id: this.user.id }, query: this.$route.query });
    },
    async fetchData() {
      const userId = this.$route.params.id;
      // check if there is a user with the given id
      (await openapi).user_getUser(userId).then((rsp) => {
        this.user = rsp.data;
        document.title = `${i18n.t('_pageTitle.dashboard')} ${this.user.username}`;
        if (this.user.type === 'CENTRAL') {
          this.$router.replace({ name: 'UserDashboard', params: { id: this.user.username }, query: this.$route.query });
        }
      }).catch(() => {
        this.$router.push('/');
      });

      (await openapiCached).server_getBundles().then((rsp) => { (this.bundles = rsp.data); });
    },
    setActiveTab() {
      if (this.$route.params.component) {
        this.activeTab = this.$route.params.component[0].toUpperCase()
          + this.$route.params.component.slice(1);
        if (this.activeTab === 'General') {
          this.activeTabIndex = 0;
        }
        if (this.activeTab === 'Purchases') {
          this.activeTabIndex = 1;
        }
      }
    },
    async deleteUser() {
      (await openapi).user_deleteUser(this.user.id).then(() => {
        this.$router.push('/');
      }).catch((err) => {
        this.$refs.deleteDialog.setError(err);
        this.$notify({
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
      });
    },
  },
  beforeMount() {
    this.fetchData();
    this.setActiveTab();
  },
  computed: {
    componentInstance() {
      if (this.activeTab === 'Bundle' && this.activeBundle) {
        return () => import(`@/components/DashboardComponents/Dashboards/Bundle/${this.activeBundle.server_type}`);
      }
      if (this.activeTab === 'Bundle') {
        return () => import('@/components/DashboardComponents/Dashboards/General.vue');
      }
      return () => import(`@/components/DashboardComponents/Dashboards/${this.activeTab}`);
    },
    getBundles() {
      return this.bundles.filter((b) => b.server_type !== 'DISCORD' && b.server_type !== 'TEAMSPEAK3');
    },
  },
  watch: {
    $route(to, from) {
      if (to.params.id !== from.params.id) {
        this.fetchData();
      }
      this.setActiveTab();
    },
  },
};

</script>
