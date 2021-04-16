<template>
  <div>
    <PageTitle :title="$t('settings.labels.title')" />
    <v-row
    no-gutters>
      <v-col sm="3" md="3" class="hidden-md-and-down">
        <v-card flat class="fill-height">
          <v-card-text>
            <v-tabs vertical v-model="tabModel">
              <v-tab v-for="tab in allowedTabs"
                     :key="tab.id"
                     class="justify-start"
                     @click="$router.push({ name: 'Settings',
                                            params: { component: tab.name} })">
                <v-icon left>{{ tab.icon }}</v-icon>
                <span>{{ tab.name }}</span>
              </v-tab>
            </v-tabs>
          </v-card-text>
        </v-card>
      </v-col>
      <v-divider vertical/>
      <v-col>
        <v-card class="fill-height" flat>
          <v-card-text>
            <keep-alive>
              <component :is="componentInstance"></component>
            </keep-alive>
          </v-card-text>
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
    $route(to) {
      if (this.$route.params.component) {
        const tab = this.allowedTabs.find((t) => t.name === this.$route.params.component);
        this.tabModel = this.allowedTabs.indexOf(tab);
        this.activeComponent = tab.component;
      } else {
        this.tabModel = this.allowedTabs.indexOf(0);
        this.activeComponent = 'General';
      }
    },
  },
  data() {
    return {
      tabs: [
        {
          name: 'general', icon: 'mdi-cog', component: 'General',
        },
        {
          name: 'navigation', icon: 'mdi-navigation-outline', component: 'Navigation', reqProp: 'navigation_edit',
        },
        {
          name: 'theme', icon: 'mdi-format-color-fill', component: 'ThemeChanger', reqProp: 'theme_show',
        },
        {
          name: 'groups', icon: 'mdi-account-multiple', component: 'Groups', reqProp: 'group_show',
        },
        {
          name: 'serverbundles', icon: 'mdi-server', component: 'Server', reqProp: 'server_show',
        },
        {
          name: 'shop', icon: 'mdi-cart', component: 'Shop', reqProp: 'shop_show',
        },
        {
          name: 'packets', icon: 'mdi-gift-open', component: 'Packets', reqProp: 'packet_show',
        },
        {
          name: 'Rewards', icon: 'mdi-star-shooting', component: 'Rewards', reqProp: 'reward_show',
        },
      ],
      activeComponent: 'General',
      tabModel: null,
    };
  },
  methods: {
  },
  beforeMount() {
    if (this.$route.params.component) {
      const tab = this.tabs.find((t) => t.name === this.$route.params.component);
      this.tabModel = this.allowedTabs.indexOf(tab);
      this.activeComponent = tab.component;
    } else {
      this.activeComponent = this.allowedTabs[0].component;
    }
  },
  computed: {
    componentInstance() {
      const type = this.activeComponent;
      return () => import(`@/components/SettingComponents/${type}`);
    },
    allowedTabs() {
      return this.tabs.filter((t) => !t.reqProp || this.$checkProp(t.reqProp) === true);
    },
  },
};
</script>
