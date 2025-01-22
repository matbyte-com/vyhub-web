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
        <!-- Small Screens -->
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
          v-if="$vuetify.display.mdAndDown"
          v-model="navigationDrawer"
          location="bottom"
          :class="{ 'lighten-3': !$vuetify.theme.current.dark, 'darken-4': $vuetify.theme.current.dark }"
          :color="navigationDrawerColor"
        >
          <v-card-text>
            <SettingsNavigation
              :active-tab="activeTab"
              :allowed-tabs="allowedTabs"
            />
            <AdvancedSettingsSwitch />
          </v-card-text>
        </v-navigation-drawer>

        <!-- Large Screens -->
        <v-card
          v-if="$vuetify.display.lgAndUp"
          class="fill-height"
          flat
          tile
          :class="{ 'bg-grey-lighten-3': !$vuetify.theme.current.dark, 'bg-grey-darken-4': $vuetify.theme.current.dark }"
        >
          <v-card-text>
            <SettingsNavigation
              :active-tab="activeTab"
              :allowed-tabs="allowedTabs"
            />
            <AdvancedSettingsSwitch />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="9"
      >
        <v-card
          class="fill-height"
          style="min-height: 82vh"
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
import EventBus from '@/services/EventBus';
import {defineAsyncComponent} from "vue";

export default {

  data() {
    return {
      key: 0,
      navigationDrawer: false,
      tabs: [
        {
          name: 'general',
          icon: 'mdi-cog',
          component: 'GeneralSettingsView',
          title: this.$t('general'),
          customerJourney: 'set-community-name',
        },
        {
          name: 'navigation',
          icon: 'mdi-navigation-outline',
          component: 'NavigationSettingsView',
          reqProp: 'nav_show',
          title: this.$t('navigation'),
          shopOnly: 'hidden'
        },
        {
          name: 'theme',
          icon: 'mdi-format-color-fill',
          component: 'ThemeSettingsView',
          reqProp: 'theme_show',
          title: this.$t('theme'),
        },
        {
          name: 'groups',
          icon: 'mdi-account-multiple',
          component: 'GroupSettingsView',
          reqProp: 'group_edit',
          title: this.$t('groups'),
          customerJourney: 'add-group',
          shopOnly: 'disabled'
        },
        {
          name: 'bans',
          icon: 'mdi-account-cancel',
          component: 'BanSettingsView',
          reqProp: 'ban_config_edit',
          title: this.$t('bans'),
          advanced: true,
          shopOnly: 'hidden'
        },
        {
          name: 'warnings',
          icon: 'mdi-account-alert',
          component: 'WarningSettingsView',
          reqProp: 'warning_config_show',
          title: this.$t('warnings'),
          advanced: true,
          shopOnly: 'hidden'
        },
        {
          name: 'server',
          icon: 'mdi-server',
          component: 'ServerSettingsView',
          reqProp: 'server_show',
          title: this.$t('servers'),
          customerJourney: ['add-server', 'add-bundle', 'connect-server'],
        },
        {
          name: 'adverts',
          icon: 'mdi-bullhorn-variant',
          component: 'AdvertSettingsView',
          reqProp: 'advert_show',
          title: this.$t('adverts'),
          shopOnly: 'hidden',
        },
        {
          name: 'requirements',
          icon: 'mdi-greater-than-or-equal',
          component: 'RequirementSettingsView',
          reqProp: 'requirement_show',
          title: this.$t('requirements'),
          advanced: true,
          shopOnly: 'disabled'
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
              component: 'ShopSettingsView',
              reqProp: 'shop_show',
              title: this.$t('general'),
            },
            {
              name: 'shop-tax',
              icon: 'mdi-credit-card-plus',
              component: 'ShopTaxSettingsView',
              reqProp: 'shop_show',
              title: this.$t('tax'),
            },
            {
              name: 'shop-gateways',
              icon: 'mdi-currency-usd',
              component: 'ShopGatewaysSettingsView',
              reqProp: 'gateway_show',
              title: this.$t('paymentGateways'),
              customerJourney: 'add-pm-gateway',
            },
            {
              name: 'packet-categories',
              icon: 'mdi-star',
              component: 'PacketCategoriesSettingsView',
              reqProp: 'packet_show',
              title: this.$t('categories'),
              customerJourney: 'add-category',
            },
            {
              name: 'packets',
              icon: 'mdi-gift-open',
              component: 'PacketSettingsView',
              reqProp: 'packet_show',
              title: this.$t('packets'),
              customerJourney: 'add-packet',
            },
            {
              name: 'rewards',
              icon: 'mdi-star-shooting',
              component: 'RewardSettingsView',
              reqProp: 'packet_show',
              title: this.$t('rewards'),
              customerJourney: 'add-reward',
            },
          ],
        },
        {
          name: 'authorization',
          icon: 'mdi-login',
          component: 'AuthorizationSettingsView',
          reqProp: 'authorization_show',
          title: this.$t('_authorization.title'),
          shopOnly: 'hidden'
        },
        {
          name: 'import',
          icon: 'mdi-database-import',
          component: 'ImportSettingsView',
          reqProp: 'admin',
          title: this.$t('_import.title'),
          advanced: true,
          shopOnly: 'hidden'
        },
        {
          name: 'api',
          icon: 'mdi-code-json',
          component: 'APISettingsView',
          reqProp: 'apikey_edit',
          title: this.$t('api'),
          advanced: true,
          shopOnly: 'disabled'
        },
        {
          name: 'legal',
          icon: 'mdi-scale-balance',
          component: 'LegalSettingsView',
          reqProp: 'legal_edit',
          title: this.$t('legal'),
        },
      ],
      componentImports: {},
    };
  },
  computed: {
    navigationDrawerColor() {
      if (this.$vuetify.display.mdAndDown) {
        return; // no special color on mobile devices
      }
      return $vuetify.theme.current.dark ? 'grey' : 'grey'
    },
    componentInstance() {
      const type = this.activeTab.component;
      return this.componentImports[type];
    },
    activeTab() {
      if (this.$route.params.component) {
        return this.findTabByName(this.$route.params.component);
      }
      return this.allowedTabs[0];
    },
    allowedTabs(includeGroups = false) {
      let allowed = [];

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

      // Reorder when advanced settings not enabled
      if (!this.utils.showAdvancedSettings()) {
        allowed = allowed.sort((a, b) => {
          if (a.advanced && !b.advanced) {
            return 1;
          }
          if (!a.advanced && b.advanced) {
            return -1;
          }
          return 0;
        });
      }

      // Filter out hidden options when shop only
      if (this.$store.getters.generalConfig.shop_only) {
        allowed = allowed.filter((l) => l.shopOnly !== 'hidden')
      }

      return allowed;
    },
  },
  mounted() {
    EventBus.on('advancedSettingsUpdated', this.rerenderComponents);
  },
  beforeMount() {
    this.importComponents();
  },
  methods: {
    importComponents() {
      this.tabs.forEach((tab) => {
        if ('tabs' in tab) {
          tab.tabs.forEach((stab) => {
            this.componentImports[stab.component] = defineAsyncComponent(() => import(`../components/SettingComponents/${stab.component}.vue`));
          });
        } else {
          this.componentImports[tab.component] = defineAsyncComponent(() => import(`../components/SettingComponents/${tab.component}.vue`));
        }
      });
    },
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

<script setup lang="ts">
</script>
