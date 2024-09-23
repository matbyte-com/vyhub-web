<template>
  <v-app>
    <!--<VueNotification />-->
    <LinkAccountDialog />
    <TheHeader v-if="!$route.meta.noHeader" />

    <v-main :style="backgroundColor">
      <div
        v-if="$route.meta.noContainer"
        style="min-height: 70vh;"
      >
        <transition
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn animate__faster"
        >
          <router-view class="vh-router-view" />
        </transition>
      </div>
      <v-container v-else>
        <div
          style="min-height: 70vh;"
          class="mt-3"
        >
          <transition
            mode="out-in"
            enter-active-class="animate__animated animate__fadeIn animate__faster"
          >
            <router-view class="vh-router-view" />
          </transition>
        </div>
      </v-container>
    </v-main>

    <TheFooter />

    <!-- Welcome Overlay -->
    <v-overlay
      v-if="welcomeOverlay"
      light
    >
      <div
        class="d-flex align-center justify-center"
        style="width: 100vw; height: 100vh; position: relative"
      >
        <v-card
          light
          class="getStartedCard"
          :class="{ 'get-started-animation': welcomeAnimation }"
        >
          <v-card-text
            style="background-color: #FFFFFF"
            class="text-center"
          >
            <video
              loop
              autoplay
              muted
              width="200px"
            >
              <source
                src="https://cdn.vyhub.net/central/welcome-img/server-animated.mp4"
                type="video/mp4"
              >
              <img
                src="https://cdn.vyhub.net/central/welcome-img/server-fallback.png"
                alt="Fallback Server img"
              >
            </video>
            <div>
              Welcome to your new VyHub instance! <br>
              Follow the tutorial in the bottom right to get started. <br>
            </div>
            <v-btn
              class="mt-5"
              size="x-large"
              color="success"
              @click="closeOverlay()"
            >
              Get Started
              <v-icon size="large">
                mdi-chevron-right
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
        <v-img
          class="arrowBottomRight animate__animated animate__pulse animate__infinite
         animate__delay-2s"
          max-width="100px"
          max-height="100px"
          src="https://cdn.vyhub.net/central/welcome-img/arrow-right.png"
        />
      </div>
    </v-overlay>

    <!-- floating first steps button -->
    <v-fade-transition v-if="showCustomerJourney">
      <v-menu
        v-model="firstSteps"
        location="top"
        :close-on-content-click="false"
        persistent
      >
        <template #activator="{ props }">
          <v-btn
            fab
            dark
            size="x-large"
            style="background-color: rgba(255,255,255,0.7)"
            fixed
            location="right bottom"
            v-bind="props"
          >
            <v-btn
              fab
              size="large"
              class="bg-red-darken-2"
            >
              <v-icon dark>
                mdi-help
              </v-icon>
            </v-btn>
          </v-btn>
        </template>
        <CustomerJourney @close="firstSteps = false" />
      </v-menu>
    </v-fade-transition>

    <!-- Floating Alert to remember to set legal -->
    <router-link
      v-if="showLegalReminder"
      to="settings/legal"
      class="text-center"
    >
      <v-alert
        dark
        style="left: 50%; top: 10%; margin-left: -150px; position: fixed"
        width="300px"
        class="bg-red-darken-2"
        bottom
        to="settings/legal"
      >
        <v-icon
          dark
          start
        >
          mdi-alert
        </v-icon>
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
import i18n from '@/plugins/i18n';
import ForumService from '@/services/ForumService';
import CustomerJourney from '@/components/CustomerJourney.vue';
import VueGtag from 'vue-gtag';
import { register } from 'swiper/element';
import LinkAccountDialog from '@/components/LinkAccountDialog.vue';
import UserService from '@/services/UserService';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

Vue.mixin(AccessControlService);
Vue.mixin(UtilService);
Vue.mixin(ForumService);

/*Vue.use(VueGtag, {
  bootstrap: false,
});*/
register(); // register Swiper
export default Vue.extend({
  name: 'App',

  components: {
    CustomerJourney,
    TheHeader,
    TheFooter,
    LinkAccountDialog,
  },

  data: () => ({
    background: '#FAFAFA',
    backgroundImage: null,
    showLegalReminder1: false,
    firstSteps: false,
    welcomeAnimation: false,
  }),
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
    showCustomerJourney() {
      const { user } = this.$store.getters;
      const general = this.$store.getters.generalConfig;
      if (user && general) {
        if (user.admin && general.enable_customer_journey) {
          return true;
        }
      }
      return false;
    },
    welcomeOverlay() {
      if (this.showCustomerJourney && !this.$store.getters.hideWelcomeOverlay) {
        return true;
      }
      return false;
    },
  },
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
    this.getShopConfig();
    this.setLocale();
    this.background = this.$vuetify.theme.current.background;
    // watch global themeUpdated Event - emitted in /Components/SettingComponents/ThemeChanger
    // and /Components/SettingComponents/General
    emitter.on('themeUpdated', this.fetchData);
  },
  methods: {
    async fetchData() {
      await this.setTheme();
      await this.getGeneralConfig();
      await UserService.setUserMemberships();
    },
    async getGeneralConfig() {
      await this.utils.getGeneralConfig().then(() => {
        this.utils.enableGTag();
      });
      this.setLocale();
    },
    async getShopConfig() {
      await this.utils.getShopConfig();
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
          cachedTheme.light_header = theme.light_header;
          cachedTheme.header_container = theme.header_container;
          // set colors, logo and more
          this.$vuetify.theme.current.primary = theme.primary;
          this.$vuetify.theme.current.success = theme.success;
          this.$vuetify.theme.current.secondary = theme.secondary;
          this.$vuetify.theme.current.warning = theme.warning;
          this.$vuetify.theme.current.error = theme.error;
          this.$vuetify.theme.current.header = theme.header;
          this.$vuetify.theme.current.footer = theme.footer;
          this.createStyleTag(theme.custom_css);
          cachedTheme.primary = theme.primary;
          cachedTheme.secondary = theme.secondary;
          cachedTheme.success = theme.success;
          cachedTheme.warning = theme.warning;
          cachedTheme.error = theme.error;
          cachedTheme.header = theme.header;
          cachedTheme.footer = theme.footer;
          cachedTheme.logo = theme.logo;
          cachedTheme.show_community_name = theme.show_community_name;
          cachedTheme.logo_width = theme.logo_width;
          cachedTheme.custom_css = theme.custom_css;
          cachedTheme.enable_landingpage = theme.enable_landingpage;

          // save theme to VueX
          this.$store.commit('SET_THEME', cachedTheme);
          emitter.emit('themeUpdatedAfter');
        } catch (e) {
          this.$vuetify.theme.current.primary = '#3f51b5';
          console.log('Error While Setting Theme');
          throw e;
        }
      });
    },
    setThemeFromCache() {
      if (this.$store.getters.theme) {
        const obj = this.$store.getters.theme;
        this.backgroundImage = obj.image;
        this.background = obj.background;
        if (obj.dark === true) {
          this.$vuetify.theme.dark = true;
        } else {
          this.$vuetify.theme.dark = false;
        }
        this.createStyleTag(obj.custom_css);
        this.$vuetify.theme.current.primary = obj.primary;
        this.$vuetify.theme.current.success = obj.success;
        this.$vuetify.theme.current.warning = obj.warning;
        this.$vuetify.theme.current.error = obj.error;
        this.$vuetify.theme.current.header = obj.header;
        this.$vuetify.theme.current.footer = obj.footer;
        this.$vuetify.theme.current.secondary = obj.secondary;
        this.customCss = obj.custom_css;
      }
    },
    setLocale() {
      if (this.$store.getters.generalConfig) {
        i18n.locale = this.$store.getters.generalConfig.language;
      }
    },
    async setApiInterceptor() {
      const last_errors = {};
      const client = await openapi;
      client.interceptors.response.use((response) => response,
        (err) => {
          // Do not display error when same error was displayed within the last 3 seconds
          if (err.response.status in last_errors
            && Date.now() - last_errors[err.response.status] < 3000) {
            last_errors[err.response.status] = Date.now();
            return Promise.reject(err);
          }
          last_errors[err.response.status] = Date.now();

          const notificationObject = this.utils.formatErrorMessage(err);
          this.$notify({
            title: notificationObject.title,
            text: notificationObject.text,
            type: notificationObject.type,
          });
          return Promise.reject(err);
        });
    },
    closeOverlay() {
      this.welcomeAnimation = true;
      setTimeout(() => {
        this.$store.dispatch('setHideWelcomeOverlay', { hideWelcomeOverlay: true });
        this.firstSteps = true;
      }, 350);
    },
    createStyleTag(css) {
      const style = document.createElement('style');
      style.innerText = css;
      document.head.appendChild(style);
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

@keyframes closeAnimation
  0%
    background-color: #FFFFFF
  100%
    scale: 30%
    opacity: 10%

.get-started-animation
  animation: closeAnimation 0.5s ease-in-out

.getStartedCard
  position: absolute
  top: 30%
  left: 40%

.arrowBottomRight
  position: absolute
  bottom: 25px
  right: 120px

</style>
