<template>
  <div>
    <PageTitle :title="$t('settings.labels.title')" />
    <v-row
    no-gutters>
      <v-col cols="2">
        <v-card flat class="fill-height">
          <v-card-text>
            <v-tabs vertical v-model="tabModel">
              <v-tab v-for="tab in tabs"
                     :key="tab.id"
                     class="justify-start"
                     @click="$router.push({ name: 'Settings',
                                            params: { component: tab.component} })">
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
        const tab = this.tabs.find((t) => t.component === this.$route.params.component);
        this.tabModel = this.tabs.indexOf(tab);
      }
      this.activeComponent = to.params.component;
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
        {
          name: 'Serverbundles', icon: 'mdi-server', component: 'Server',
        },
        {
          name: 'Packets', icon: 'mdi-gift-open', component: 'Packets',
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
      const tab = this.tabs.find((t) => t.component === this.$route.params.component);
      this.tabModel = this.tabs.indexOf(tab);
      this.activeComponent = tab.component;
    } else {
      this.activeComponent = this.tabs[0].component;
    }
  },
  computed: {
    componentInstance() {
      const type = this.activeComponent;
      return () => import(`@/components/SettingComponents/${type}`);
    },
  },
};
</script>
