<template>
  <div>
    <PageTitle :title="$t('settings.labels.title')" />
    <v-row
    no-gutters>
      <v-col sm="3" md="3" class="hidden-md-and-down mr-2">
        <v-card flat class="fill-height">
          <v-card-text>
            <v-list shaped>
              <v-list-item-group color="primary">
                <span v-for="tab in allowedTabs" :key="tab.id">
                  <v-list-item v-if="!('tabs' in tab)"
                               link
                               :class="tab.name === activeTab.name
                               ? 'active v-list-item--active' : ''"
                               @click="$router.push({ name: 'Settings',
                                                    params: { component: tab.name} })">
                    <v-list-item-icon>
                      <v-icon>{{ tab.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>{{ tab.title }}</v-list-item-title>
                  </v-list-item>
                  <v-list-group no-action :prepend-icon="tab.icon" v-else :value="true">
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title>{{ tab.title }}</v-list-item-title>
                      </v-list-item-content>
                    </template>

                    <v-list-item v-for="subtab in tab.tabs" :key="subtab.id"
                                 link
                                 :class="subtab.name === activeTab.name
                                 ? 'active v-list-item--active' : ''"
                                 @click="$router.push({ name: 'Settings',
                                                        params: { component: subtab.name} })">
                      <v-list-item-icon>
                        <v-icon>{{ subtab.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-title>{{ subtab.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list-group>
                </span>
              </v-list-item-group>
            </v-list>
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
    $route() {
      this.init();
    },
  },
  data() {
    return {
      tabs: [
        {
          name: 'general',
          icon: 'mdi-cog',
          component: 'General',
          title: this.$t('general'),
        },
        {
          name: 'navigation',
          icon: 'mdi-navigation-outline',
          component: 'Navigation',
          reqProp: 'navigation_edit',
          title: this.$t('navigation'),
        },
        {
          name: 'theme',
          icon: 'mdi-format-color-fill',
          component: 'ThemeChanger',
          reqProp: 'theme_show',
          title: this.$t('theme'),
        },
        {
          name: 'groups',
          icon: 'mdi-account-multiple',
          component: 'Groups',
          reqProp: 'group_show',
          title: this.$t('groups'),
        },
        {
          name: 'serverbundles',
          icon: 'mdi-server',
          component: 'Server',
          reqProp: 'server_show',
          title: this.$t('servers'),
        },
        {
          name: 'requirements',
          icon: 'mdi-greater-than-or-equal',
          component: 'Requirements',
          reqProp: 'requirements_show',
          title: this.$t('requirements'),
        },
        {
          icon: 'mdi-cart',
          reqProp: 'shop_show',
          title: this.$t('shop'),
          tabs: [
            {
              name: 'shop-general',
              icon: 'mdi-cog',
              component: 'Shop',
              title: this.$t('general'),
            },
            {
              name: 'shop-tax',
              icon: 'mdi-credit-card-plus',
              component: 'ShopTax',
              title: this.$t('tax'),
            },
            {
              name: 'shop-gateways',
              icon: 'mdi-currency-usd',
              component: 'ShopGateways',
              title: this.$t('paymentGateways'),
            },
            {
              name: 'packet-categories',
              icon: 'mdi-star',
              component: 'PacketCategories',
              title: this.$t('categories'),
            },
            {
              name: 'packets',
              icon: 'mdi-gift-open',
              component: 'Packets',
              reqProp: 'packet_show',
              title: this.$t('packets'),
            },
            {
              name: 'rewards',
              icon: 'mdi-star-shooting',
              component: 'Rewards',
              reqProp: 'reward_show',
              title: this.$t('rewards'),
            },
          ],
        },
      ],
      activeTabName: 'general',
    };
  },
  methods: {
    init() {
      //
    },
    findTabByName(name) {
      let found = null;

      this.tabs.forEach((tab) => {
        if ('tabs' in tab) {
          tab.tabs.forEach((stab) => {
            if (stab.name === name) {
              found = stab;
            }
          });
        } else if (tab.name === name) {
          found = tab;
        }
      });

      return found;
    },
  },
  beforeMount() {
    this.init();
  },
  computed: {
    componentInstance() {
      const type = this.activeTab.component;
      return () => import(`@/components/SettingComponents/${type}`);
    },
    allowedTabs(includeGroups = false) {
      const allowed = [];

      this.tabs.forEach((tab) => {
        if ('tabs' in tab) {
          const stabsAllowed = [];

          tab.tabs.forEach((stab) => {
            if (!stab.reqProp || this.$checkProp(stab.reqProp) === true) {
              if (!includeGroups) {
                allowed.push(stab);
              }

              stabsAllowed.push(stab);
            }
          });

          if (stabsAllowed.length > 0 && includeGroups) {
            const newTab = { ...tab };
            newTab.tabs = stabsAllowed;
            allowed.push(newTab);
          }
        } else if (!tab.reqProp || this.$checkProp(tab.reqProp) === true) {
          allowed.push(tab);
        }
      });

      return allowed;
    },
    activeTab() {
      if (this.$route.params.component) {
        return this.findTabByName(this.$route.params.component);
      }
      return this.allowedTabs[0];
    },
  },
};
</script>
