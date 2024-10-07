<template>
  <v-app>
    <Notifications position="bottom left" />
    <LinkAccountDialog />
    <TheHeader v-if="!$route.meta.noHeader" />

    <v-main :style="backgroundColor">
      <div
        v-if="$route.meta.noContainer"
        style="min-height: 70vh;"
      >
        <router-view v-slot="{ Component}">
          <transition
            mode="out-in"
            enter-active-class="animate__animated animate__fadeIn animate__faster"
          >
            <component
              :is="Component"
              class="vh-router-view"
            />
          </transition>
        </router-view>
      </div>
      <v-container v-else>
        <div
          style="min-height: 70vh;"
          class="mt-3"
        >
          <router-view v-slot="{ Component}">
            <transition
              mode="out-in"
              enter-active-class="animate__animated animate__fadeIn animate__faster"
            >
              <component
                :is="Component"
                class="vh-router-view"
              />
            </transition>
          </router-view>
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
            style="background-color: rgba(255,255,255,0.7)"
            size="60"
            class="mr-5 mb-5 rounded-circle"
            position="fixed"
            location="right bottom"
            v-bind="props"
          >
            <v-btn
              size="50"
              class="bg-red-darken-2 rounded-circle"
            >
              <v-icon>
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
      v-if="showLegalReminder && $route.path !== '/settings/legal'"
      to="/settings/legal"
      class="text-center"
    >
      <v-alert
        style="left: 50%; top: 10%; margin-left: -150px; position: fixed"
        width="350px"
        elevation="3"
        class="bg-red-darken-2"
        bottom
        to="settings/legal"
      >
        <div class="d-flex justify-center align-center">
          <v-icon
            start
          >
            mdi-alert
          </v-icon>
          {{ $t('_legal.showLegalReminder') }}
          <v-icon
            class="animate__animated animate__heartBeat animate__infinite animate__slow"
            end
          >
            mdi-cursor-default-click
          </v-icon>
        </div>
      </v-alert>
    </router-link>
  </v-app>
</template>

<script>
import emitter from '@/services/EventBus';
import AuthService from '@/services/AuthService';
import SessionService from '@/services/SessionService';
import openapi from '@/api/openapi';
import i18n from '@/plugins/i18n';
import { register } from 'swiper/element';
import UserService from '@/services/UserService';
import { Notifications } from '@kyvg/vue3-notification';
import 'ckeditor5/ckeditor5.css';

register(); // register Swiper

export default {
  name: 'App',
  components: {
    Notifications,
  },
  data: () => ({
    background: '#FAFAFA',
    backgroundImage: null,
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
    this.background = this.$vuetify.theme.current.colors.background;
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
          } else {
            this.backgroundImage = null;
          }
          if (theme.background) {
            this.background = theme.background;
          }
          if (theme.dark === true) {
            this.$vuetify.theme.themes.light.dark = true;
          } else {
            this.$vuetify.theme.themes.light.dark = false;
          }
          cachedTheme.light_header = theme.light_header;
          cachedTheme.header_container = theme.header_container;
          // set colors, logo and more
          const colorsToUpdate = ['primary', 'success', 'secondary', 'warning', 'error', 'header', 'footer'];
          colorsToUpdate.forEach((color) => {
            if (theme[color]) {
              this.$vuetify.theme.themes.light.colors[color] = theme[color];
            }
          });
          this.createStyleTag(theme.custom_css);

          // Cache theme and save it to VueX
          Object.assign(cachedTheme, theme);
          this.$store.commit('SET_THEME', cachedTheme);

          emitter.emit('themeUpdatedAfter');
        } catch (e) {
          this.$vuetify.theme.themes.light.colors.primary = '#3f51b5';
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
          this.$vuetify.theme.themes.light.dark = true;
        } else {
          this.$vuetify.theme.themes.light.dark = false;
        }
        this.createStyleTag(obj.custom_css);
        const colorsToUpdate = ['primary', 'success', 'secondary', 'warning', 'error', 'header', 'footer'];
        colorsToUpdate.forEach((color) => {
          if (obj[color]) {
            this.$vuetify.theme.themes.light.colors[color] = obj[color];
          }
        });
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
};
</script>

<style lang="sass">
@import "assets/css/light.sass"
@import 'assets/css/quill.snow.css' // Needed for legacy Vue 2 Editor

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
