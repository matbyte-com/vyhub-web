<template>
  <v-app>
    <VueNotification />
    <LinkAccountDialog />
    <TheHeader v-if="!$route.meta.noHeader && $route.path !== '/'" />

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

    <TheFooter v-if="$route.path !== '/'" />

    <!-- Welcome Overlay -->
    <WelcomeOverlay
      :welcome-overlay="welcomeOverlay"
      :welcome-animation="welcomeAnimation"
      @close-overlay="closeOverlay"
    />

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

<script setup>
import emitter from '@/services/EventBus';
import AuthService from '@/services/AuthService';
import SessionService from '@/services/SessionService';
import openapi from '@/api/openapi';
import i18n from '@/plugins/i18n';
import {register} from 'swiper/element';
import UserService from '@/services/UserService';
import 'ckeditor5/ckeditor5.css';
import {computed, onBeforeMount, ref} from "vue";
import {useStore} from "vuex";
import {useTheme} from "vuetify";
import {notify} from "@kyvg/vue3-notification";
import { useUtils} from "@/services/useUtils";

register(); // register Swiper

const background = ref('#FAFAFA');
const backgroundImage = ref(null);
const firstSteps = ref(false);
const welcomeAnimation = ref(false);
const store = useStore();
const theme = useTheme();
const utils = useUtils().data().utils;

onBeforeMount(() => {
  setThemeFromCache();
  setApiInterceptor();
  AuthService.setAuthTokens();
  AuthService.setProperties();
  SessionService.registerSessionService();
  getNavItems();
  setTheme();
  getGeneralConfig();
  getShopConfig();
  setLocale();
  // background.value = theme.global.current.value.colors.background;
  // watch global themeUpdated Event - emitted in /Components/SettingComponents/ThemeChanger
  // and /Components/SettingComponents/General
  emitter.on('themeUpdated', fetchData);
  // Event Emitted in Components/Settings/Navigation.vue
  emitter.on('navUpdated', getNavItems);
})

const backgroundColor = computed(() => {
  if (backgroundImage.value && (store.state.generalConfig && !store.state.generalConfig.shop_only)) {
    return `background: url(${backgroundImage.value}) no-repeat center fixed !important; background-size: cover;`;
  }
  return `background-color: ${background.value}`;
})
const showLegalReminder = computed(() => {
  const {user} = store.state;
  const general = store.state.generalConfig;
  if (user && general) {
    if (user.admin && !general.legal_exists) {
      return true;
    }
  }
  return false;
})
const showCustomerJourney = computed(() => {
  const {user} = store.state;
  const general = store.state.generalConfig;
  if (user && general) {
    if (user.admin && general.enable_customer_journey) {
      return true;
    }
  }
  return false;
})
const welcomeOverlay = computed(() => {
  if (showCustomerJourney.value && !store.state.hideWelcomeOverlay) {
    return true;
  }
  return false;
})

async function fetchData() {
  await setTheme();
  await getGeneralConfig();
  await getNavItems();
  await UserService.setUserMemberships();
}

async function getGeneralConfig() {
  await utils.getGeneralConfig();
  utils.enableGTag();
  setLocale();
}

async function getShopConfig() {
  await utils.getShopConfig();
}

async function setTheme() {
  (await openapi).general_getTheme().then((response) => {
    const cachedTheme = {};
    try {
      const rsp = response.data;
      backgroundImage.value = rsp.image || null;
      background.value = rsp.background || '#FAFAFA';

      if (rsp.dark) {
        theme.global.name.value = 'dark';
        import('./assets/css/dark.sass')
      } else {
        theme.global.name.value = 'light';
        import('./assets/css/light.sass')
      }


      cachedTheme.light_header = rsp.light_header;
      cachedTheme.header_container = rsp.header_container;

      // set colors, logo and more
      const colorsToUpdate = ['primary', 'success', 'secondary', 'warning', 'error', 'header', 'footer'];
      colorsToUpdate.forEach((color) => {
        if (rsp[color]) {
          theme.themes.value.light.colors[color] = rsp[color];
          theme.themes.value.dark.colors[color] = rsp[color];
        }
      });

      createStyleTag(rsp.custom_css);

      // Cache theme and save it to VueX
      Object.assign(cachedTheme, rsp);
      store.commit('SET_THEME', cachedTheme);

      emitter.emit('themeUpdatedAfter');
    } catch (e) {
      theme.themes.value.light.colors.primary = '#3f51b5';
      theme.themes.value.dark.colors.primary = '#3f51b5';
      console.log('Error While Setting Theme');
      throw e;
    }
  });
}

function closeOverlay() {
  welcomeAnimation.value = true;
  setTimeout(() => {
    store.dispatch('setHideWelcomeOverlay', {hideWelcomeOverlay: true});
    firstSteps.value = true;
  }, 350);
}

function createStyleTag(css) {
  const style = document.createElement('style');
  style.innerText = css;
  document.head.appendChild(style);
}

function setLocale() {
  if (store.state.generalConfig) {
    i18n.global.locale = store.state.generalConfig.language;
  }
}

function setThemeFromCache() {
  const cachedTheme = store.state.theme;
  if (cachedTheme) {
    backgroundImage.value = cachedTheme.image;
    background.value = cachedTheme.background;

    // Set theme mode
    if (cachedTheme.dark) {
      theme.global.name.value = 'dark';
      import('./assets/css/dark.sass')
    } else {
      theme.global.name.value = 'light';
      import('./assets/css/light.sass')
    }
    createStyleTag(cachedTheme.custom_css);

    const colorsToUpdate = ['primary', 'success', 'secondary', 'warning', 'error', 'header', 'footer'];
    colorsToUpdate.forEach((color) => {
      if (cachedTheme[color]) {
        theme.themes.value.light.colors[color] = cachedTheme[color];
        theme.themes.value.dark.colors[color] = cachedTheme[color];
      }
    });
  }
}

async function getNavItems() {
  const api = await openapi;

  api.navigation_getNavigationLinks().then((rsp) => {
    store.commit('SET_NAV_ITEMS', rsp.data);
  }).catch((err) => console.log(`Could not query nav ${err}`));
}


async function setApiInterceptor() {
  const last_errors = {};
  const client = await openapi;
  client.interceptors.response.use((response) => response,
    (err) => {
      if (err.response) {
        // Do not display error when same error was displayed within the last 3 seconds
        if (err.response.status in last_errors
          && Date.now() - last_errors[err.response.status] < 3000) {
          last_errors[err.response.status] = Date.now();
          return Promise.reject(err);
        }
        last_errors[err.response.status] = Date.now();
      }

      const notificationObject = utils.formatErrorMessage(err);
      notify({
        title: notificationObject.title,
        text: notificationObject.text,
        type: notificationObject.type,
      });
      return Promise.reject(err);
    });
}
</script>

<style lang="sass">
// @import "assets/css/light.sass"
@import 'assets/css/quill.snow.css' // Needed for legacy Vue 2 Editor

.v-main
  min-height: calc(100vh - 108px)

.arrowBottomRight
  position: absolute
  bottom: 25px
  right: 120px

</style>
