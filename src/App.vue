<template>
  <v-app>

    <VueNotification />
    <TheHeader/>

    <v-main :style="backgroundColor">
      <v-container>
        <v-card class="transparent" flat
          min-height="70vh"
        >
          <v-card-text>
            <transition mode="out-in"
                        enter-active-class="animate__animated animate__fadeIn animate__faster"
                        >
              <router-view>
              </router-view>
            </transition>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>

    <TheFooter/>
    <!-- floating button to show help-->
    <v-fade-transition v-if="showInformationFab">
      <v-menu top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab dark x-large style="background-color: rgba(255,255,255,0.7)"
                 fixed right bottom v-bind="attrs" v-on="on">
            <v-btn fab large class="red darken-2">
              <v-icon dark>mdi-help</v-icon>
            </v-btn>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="red lighten-1">
            Question, Bugs, Feature Requests?
          </v-card-title>
          <v-card-text class="mt-4">
            Please check the documentation or contact us!
          </v-card-text>
          <v-card-actions>
            <v-btn class="red lighten-2" href="https://docs.vyhub.net" target="_blank">
              <v-icon left>
                mdi-help-circle-outline
              </v-icon>
              <span>Docs</span>
            </v-btn>
            <v-btn class="red lighten-2" href="https://discord.gg/QycQpd2AQP" target="_blank">
              <v-icon left>
                mdi-discord
              </v-icon>
              <span>Discord</span>
            </v-btn>
            <v-btn class="red lighten-2"
                   :href="`mailto:support@matbyte.com?subject=Feedback Demo Route: ${$route.path}`">
              <v-icon left>
                mdi-email
              </v-icon>
              <span>Contact</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-fade-transition>

    <!-- floating button to show help-->
    <router-link to="settings/legal" class="text-center" v-if="showLegalReminder">
      <v-alert dark style="left: 50%; top: 10%; margin-left: -150px; position: fixed"
               width="300px" class="red darken-2"
               bottom to="settings/legal">
        <v-icon dark left>mdi-alert</v-icon>
        {{ $t('_legal.showLegalReminder') }}
      </v-alert>
    </router-link>
  </v-app>
</template>

<script>
import Vue from 'vue';
import emitter from '@/services/EventBus';
import AuthService from '@/services/AuthService';
import SessionService from '@/services/SessionService';
import AccessControlService from '@/services/AccessControlService';
import UtilService from '@/services/UtilService';
import openapi from '@/api/openapi';
import VueNotification from '@/components/VueNotification.vue';
import i18n from '@/plugins/i18n';
import ForumService from '@/services/ForumService';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

Vue.mixin(AccessControlService);
Vue.mixin(UtilService);
Vue.mixin(ForumService);

export default Vue.extend({
  name: 'App',

  components: {
    VueNotification,
    TheHeader,
    TheFooter,
  },

  data: () => ({
    background: '#FAFAFA',
    backgroundImage: null,
    showInformationFab: false,
    showLegalReminder1: false,
  }),
  created() {
    this.setThemeFromCache();
    this.setApiInterceptor();
  },
  beforeMount() {
    AuthService.setAuthTokens();
    AuthService.setProperties();
    SessionService.registerSessionService();
    this.setTheme();
    this.getGeneralConfig();
    this.setLocale();
    this.background = this.$vuetify.theme.currentTheme.background;
    // watch global themeUpdated Event - emitted in /Components/SettingComponents/ThemeChanger
    // and /Components/SettingComponents/General
    emitter.on('themeUpdated', this.fetchData);
  },
  methods: {
    async fetchData() {
      await this.setTheme();
      await this.getGeneralConfig();
    },
    async getGeneralConfig() {
      await this.utils.getGeneralConfig();
      this.setLocale();
      this.setDescriptionMetaTag();
    },
    async setTheme() {
      (await openapi).general_getTheme().then((rsp) => {
        const cachedTheme = {};
        try {
          const theme = rsp.data;
          if (theme.image) {
            this.backgroundImage = theme.image;
            cachedTheme.image = theme.image;
          } else {
            this.backgroundImage = null;
          }
          if (theme.background) {
            this.background = theme.background;
            cachedTheme.background = theme.background;
          }
          if (theme.dark === true) {
            this.$vuetify.theme.dark = true;
            cachedTheme.dark = true;
          } else {
            this.$vuetify.theme.dark = false;
            cachedTheme.dark = false;
          }
          // set colors, logo and more
          this.$vuetify.theme.currentTheme.primary = theme.primary;
          this.$vuetify.theme.currentTheme.success = theme.success;
          this.$vuetify.theme.currentTheme.secondary = theme.secondary;
          this.$vuetify.theme.currentTheme.warning = theme.warning;
          this.$vuetify.theme.currentTheme.error = theme.error;
          this.$vuetify.theme.currentTheme.header = theme.header;
          this.showInformationFab = theme.show_information_fab;
          cachedTheme.primary = theme.primary;
          cachedTheme.secondary = theme.secondary;
          cachedTheme.success = theme.success;
          cachedTheme.warning = theme.warning;
          cachedTheme.error = theme.error;
          cachedTheme.header = theme.header;
          cachedTheme.logo = theme.logo;
          cachedTheme.show_community_name = theme.show_community_name;
          cachedTheme.logo_width = theme.logo_width;
          cachedTheme.show_information_fab = theme.show_information_fab;
          cachedTheme.favicon = theme.favicon;
          // save theme to VueX
          this.$store.commit('SET_THEME', cachedTheme);
          emitter.emit('themeUpdatedAfter');
          this.setIcon();
        } catch (e) {
          this.$vuetify.theme.currentTheme.primary = '#3f51b5';
          console.log('Error While Setting Theme');
          throw e;
        }
      });
    },
    setThemeFromCache() {
      if (this.$store.getters.theme) {
        this.setIcon();
        const obj = this.$store.getters.theme;
        this.backgroundImage = obj.image;
        this.background = obj.background;
        if (obj.dark === true) {
          this.$vuetify.theme.dark = true;
        } else {
          this.$vuetify.theme.dark = false;
        }
        this.$vuetify.theme.currentTheme.primary = obj.primary;
        this.$vuetify.theme.currentTheme.success = obj.success;
        this.$vuetify.theme.currentTheme.warning = obj.warning;
        this.$vuetify.theme.currentTheme.error = obj.error;
        this.$vuetify.theme.currentTheme.header = obj.header;
        this.$vuetify.theme.currentTheme.secondary = obj.secondary;
        this.showInformationFab = obj.show_information_fab;
      }
    },
    setIcon() {
      if (this.$store.getters.theme.favicon) {
        const favicon = document.getElementById('favicon');
        favicon.href = this.$store.getters.theme.favicon;
      }
    },
    setLocale() {
      if (this.$store.getters.generalConfig) {
        i18n.locale = this.$store.getters.generalConfig.language;
      }
    },
    async setApiInterceptor() {
      const client = await openapi;
      client.interceptors.response.use((response) => response,
        (err) => {
          const notificationObject = this.utils.formatErrorMessage(err);
          this.$notify({
            title: notificationObject.title,
            text: notificationObject.text,
            type: notificationObject.type,
          });
          return Promise.reject(err);
        });
    },
    setDescriptionMetaTag() {
      const description = this.$store.getters.generalConfig?.community_description;

      document.querySelector('meta[name="description"]')
        .setAttribute('content', description);
    },
  },
  computed: {
    backgroundColor() {
      if (this.backgroundImage) {
        return `background: url(${this.backgroundImage}) no-repeat center fixed !important; background-size: cover;`;
      }
      return `background-color: ${this.background}`;
    },
    showLegalReminder() {
      const { user } = this.$store.getters;
      const general = this.$store.getters.generalConfig;
      if (user && general) {
        if (user.admin && !general.legal_exists) {
          return true;
        }
      }
      return false;
    },
  },
});
</script>

<style lang="sass">
@import "assets/css/light.sass"
@import '../node_modules/quill/dist/quill.snow.css'
@import '../node_modules/@fontsource/roboto/latin.css'

.theme--dark
  @import "assets/css/dark.sass"

.img-fluid
  max-width: 100%
  height: auto
</style>
