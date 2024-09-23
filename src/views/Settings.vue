<template>
  <div>
    <v-row
      dense
      no-gutters
    >
      <v-col
        cols="12"
        lg="3"
        class="mb-2 mb-lg-0"
      >
        <v-card
          v-if="$vuetify.display.mdAndDown"
          class="mt-2"
          flat
          tile
          @click="navigationDrawer = !navigationDrawer"
        >
          <v-card-text class="d-flex align-center text-capitalize text-h5">
            <v-icon start>
              {{ activeTab.icon }}
            </v-icon>
            {{ activeTab.name }}
            <v-spacer />
            <v-icon>mdi-unfold-more-horizontal</v-icon>
          </v-card-text>
        </v-card>
        <v-navigation-drawer
          v-model="navigationDrawer"
          :permanent="!$vuetify.display.mdAndDown"
          :app="$vuetify.display.mdAndDown"
          location="bottom"
          flat
          outlined
          tile
          class="fill-height"
          style="width: 100%"
          :class="{ 'lighten-3': !$vuetify.theme.dark, 'darken-4': $vuetify.theme.dark }"
          :color="$vuetify.theme.dark ? 'grey' : 'grey'"
        >
          <v-card-text>
            <v-list>
              <v-list-item-group color="primary">
                <span
                  v-for="tab in allowedTabs"
                  :key="tab.id"
                >
                  <v-list-item
                    v-if="!('tabs' in tab)"
                    style="height: 48px"
                    link
                    :disabled="tab.disabled"
                    :class="{ 'active v-list-item--active' :
                                tab.name === activeTab.name,
                              'glow-effect': utils.customerJourneyActive(tab.customerJourney) }"
                    :to="{ name: 'Settings', params: { component: tab.name} }"
                  >
                    <v-list-item-icon>
                      <v-icon>{{ tab.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title
                      :class="!utils.showAdvancedSettings()
                        && tab.advanced ? 'text--disabled' : ''"
                    >
                      {{ tab.title }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-group
                    v-else
                    no-action
                    :prepend-icon="tab.icon"
                    :value="$vuetify.display.lgAndUp"
                  >
                    <template #activator>
                      <v-list-item-content
                        :class="{'glow-effect':
                          utils.customerJourneyActive(tab.customerJourney)}"
                        style="height: 48px"
                      >
                        <v-list-item-title>{{ tab.title }}</v-list-item-title>
                      </v-list-item-content>
                    </template>

                    <v-list-item
                      v-for="subtab in tab.tabs"
                      :key="subtab.id"
                      link
                      style="height: 48px"
                      :class="{ 'active v-list-item--active':
                                  subtab.name === activeTab.name,
                                'glow-effect':
                                  utils.customerJourneyActive(subtab.customerJourney) }"
                      :to="{ name: 'Settings', params: { component: subtab.name} }"
                    >
                      <v-list-item-icon>
                        <v-icon>{{ subtab.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-title>{{ subtab.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list-group>
                </span>
              </v-list-item-group>
            </v-list>
            <AdvancedSettingsSwitch />
          </v-card-text>
        </v-navigation-drawer>
      </v-col>
      <v-col
        cols="12"
        lg="9"
      >
        <v-card
          class="fill-height"
          style="min-height: 75vh"
          flat
          border
          tile
          width="100%"
        >
          <v-card-text :key="key">
            <keep-alive>
              <component
                :is="componentInstance"
                class="mt-3"
                :class="{ 'mr-10' : $vuetify.display.lgAndUp }"
              />
            </keep-alive>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AdvancedSettingsSwitch from '@/components/SettingComponents/AdvancedSettingsSwitch.vue';
import EventBus from '@/services/EventBus';

export default {
  components: {
    AdvancedSettingsSwitch,
  },
  data() {
    return {
      key: 0,
      navigationDrawer: false,
      tabs: [
        {
          name: 'general',
          icon: 'mdi-cog',
          component: 'General',
          title: this.$t('general'),
          customerJourney: 'set-community-name',
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
          customerJourney: 'add-group',
        },
        {
          name: 'bans',
          icon: 'mdi-account-cancel',
          component: 'Bans',
          reqProp: 'ban_config_edit',
          title: this.$t('bans'),
          advanced: true,
        },
        {
          name: 'warnings',
          icon: 'mdi-account-alert',
          component: 'Warnings',
          reqProp: 'warning_config_show',
          title: this.$t('warnings'),
          advanced: true,
        },
        {
          name: 'server',
          icon: 'mdi-server',
          component: 'Server',
          reqProp: 'server_show',
          title: this.$t('servers'),
          customerJourney: ['add-server', 'add-bundle', 'connect-server'],
        },
        {
          name: 'adverts',
          icon: 'mdi-bullhorn-variant',
          component: 'Adverts',
          reqProp: 'advert_show',
          title: this.$t('adverts'),
        },
        {
          name: 'requirements',
          icon: 'mdi-greater-than-or-equal',
          component: 'Requirements',
          reqProp: 'requirement_show',
          title: this.$t('requirements'),
          advanced: true,
        },
        {
          icon: 'mdi-cart',
          reqProp: 'shop_show',
          title: this.$t('shop'),
          customerJourney: ['add-packet', 'add-category', 'add-pm-gateway', 'add-reward'],
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
              customerJourney: 'add-pm-gateway',
            },
            {
              name: 'packet-categories',
              icon: 'mdi-star',
              component: 'PacketCategories',
              reqProp: 'packet_show',
              title: this.$t('categories'),
              customerJourney: 'add-category',
            },
            {
              name: 'packets',
              icon: 'mdi-gift-open',
              component: 'Packets',
              reqProp: 'packet_show',
              title: this.$t('packets'),
              customerJourney: 'add-packet',
            },
            {
              name: 'rewards',
              icon: 'mdi-star-shooting',
              component: 'Rewards',
              reqProp: 'packet_show',
              title: this.$t('rewards'),
              customerJourney: 'add-reward',
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
          advanced: true,
        },
        {
          name: 'api',
          icon: 'mdi-code-json',
          component: 'API',
          reqProp: 'apikey_edit',
          title: this.$t('api'),
          advanced: true,
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

      if (!this.utils.showAdvancedSettings()) {
        return allowed.sort((a, b) => {
          if (a.advanced && !b.advanced) {
            return 1;
          }
          if (!a.advanced && b.advanced) {
            return -1;
          }
          return 0;
        });
      }
      return allowed;
    },
    activeTab() {
      if (this.$route.params.component) {
        return this.findTabByName(this.$route.params.component);
      }
      return this.allowedTabs[0];
    },
  },
  mounted() {
    EventBus.on('advancedSettingsUpdated', this.rerenderComponents);
  },
  methods: {
    rerenderComponents() {
      this.key += 1;
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
};
</script>
