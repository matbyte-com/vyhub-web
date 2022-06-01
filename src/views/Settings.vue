<template>
  <div>
    <PageTitle icon="mdi-cog" :title="$t('_settings.labels.title')" />
    <v-row
    no-gutters>
      <v-col cols="12" xs="12" sm="12" md="12" lg="3" class="mb-2 mb-lg-0 mr-xl-2 mr-lg-2">
        <v-card flat class="fill-height">
          <v-card-text>
            <v-list shaped>
              <v-list-item-group color="primary">
                <span v-for="tab in allowedTabs" :key="tab.id">
                  <v-list-item v-if="!('tabs' in tab)"
                               link :disabled="tab.disabled"
                               :class="tab.name === activeTab.name
                               ? 'active v-list-item--active' : ''"
                               :to="{ name: 'Settings',  params: { component: tab.name} }">
                    <v-list-item-icon>
                      <v-icon>{{ tab.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>{{ tab.title }}</v-list-item-title>
                  </v-list-item>
                  <v-list-group no-action :prepend-icon="tab.icon" v-else
                                :value="$vuetify.breakpoint.lgAndUp">
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title>{{ tab.title }}</v-list-item-title>
                      </v-list-item-content>
                    </template>

                    <v-list-item v-for="subtab in tab.tabs" :key="subtab.id"
                                 link
                                 :class="subtab.name === activeTab.name
                                 ? 'active v-list-item--active' : ''"
                                 :to="{ name: 'Settings', params: { component: subtab.name} }">
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
      <v-divider :vertical="$vuetify.breakpoint.lgAndUp"/>
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
          reqProp: 'nav_show',
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
          reqProp: 'group_edit',
          title: this.$t('groups'),
        },
        {
          name: 'warnings',
          icon: 'mdi-account-alert',
          component: 'Warnings',
          reqProp: 'warning_config_show',
          title: this.$t('warnings'),
        },
        {
          name: 'serverbundles',
          icon: 'mdi-server',
          component: 'Server',
          reqProp: 'server_show',
          title: this.$t('servers'),
        },
        {
          name: 'faq',
          icon: 'mdi-chat-question',
          component: 'FAQ',
          title: this.$t('faq'),
        },
        {
          name: 'requirements',
          icon: 'mdi-greater-than-or-equal',
          component: 'Requirements',
          reqProp: 'requirement_show',
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
              reqProp: 'shop_show',
              title: this.$t('general'),
            },
            {
              name: 'shop-tax',
              icon: 'mdi-credit-card-plus',
              component: 'ShopTax',
              reqProp: 'shop_show',
              title: this.$t('tax'),
            },
            {
              name: 'shop-gateways',
              icon: 'mdi-currency-usd',
              component: 'ShopGateways',
              reqProp: 'gateway_show',
              title: this.$t('paymentGateways'),
            },
            {
              name: 'packet-categories',
              icon: 'mdi-star',
              component: 'PacketCategories',
              reqProp: 'packet_show',
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
              reqProp: 'packet_show',
              title: this.$t('rewards'),
            },
          ],
        },
        {
          name: 'authorization',
          icon: 'mdi-login',
          component: 'Authorization',
          reqProp: 'authorization_show',
          title: this.$t('_authorization.title'),
        },
        {
          name: 'import',
          icon: 'mdi-database-import',
          component: 'Import',
          reqProp: 'admin',
          title: this.$t('import'),
        },
        {
          name: 'api',
          icon: 'mdi-code-json',
          component: 'API',
          reqProp: 'apikey_edit',
          title: this.$t('api'),
        },
        {
          name: 'legal',
          icon: 'mdi-scale-balance',
          component: 'Legal',
          reqProp: 'legal_edit',
          title: this.$t('legal'),
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
