<template>
  <div>
    <PageTitle :title="$t('settings.labels.title')" />
    <v-row
    no-gutters>
      <v-col
      cols="2">
        <v-card flat outlined>
          <v-tabs vertical>
            <v-tab v-for="tab in tabs"
                   :key="tab.id"
                   @click="$router.push({ name: 'Settings', params: { component: tab.component} })">
              <v-icon left>{{ tab.icon }}</v-icon>
              <span>{{ tab.name }}</span>
            </v-tab>
          </v-tabs>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mb-3 pa-3" flat outlined>
          <keep-alive>
            <component :is="componentInstance"></component>
          </keep-alive>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';

export default {
  components: {
    PageTitle,
  },
  watch: {
    /**
     * get active component from url and set tab accordingly
     * @param to
     * @param from
     */
    $route(to, from) {
      if (to.params.component === 0) {
        this.activeTab = this.tabs[0].component;
      }
      this.activeTab = to.params.component;
    },
  },
  data() {
    return {
      tabs: [
        {
          name: 'General', icon: 'mdi-cog', component: 'General',
        },
        {
          name: 'Theme', icon: 'mdi-format-color-fill', component: 'ThemeChanger',
        },
        {
          name: 'Groups', icon: 'mdi-account-multiple', component: 'Groups',
        },
      ],
      activeTab: null,
    };
  },
  methods: {
  },
  beforeMount() {
    if (!this.$route.params.component) {
      this.activeTab = this.tabs[0].component;
    }
  },
  computed: {
    componentInstance() {
      const type = this.activeTab;
      return () => import(`@/components/SettingComponents/${type}`);
    },
  },
};
</script>
