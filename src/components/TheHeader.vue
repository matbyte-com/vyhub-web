<script setup>
import {useStore} from "vuex";
import {useDisplay} from "vuetify";
import {useRoute, useRouter} from "vue-router";
import {computed, onBeforeMount, onMounted, ref, useTemplateRef, watch} from "vue";
import AuthService from '@/services/AuthService';
import UtilService from '@/services/UtilService';
import AccessControlService from "@/services/AccessControlService";
import {useI18n} from "vue-i18n";

const store = useStore();
const display = ref(useDisplay())
const router = useRouter()
const route = useRoute()
const i18n = useI18n()

const communityName = ref(null)
const logo_width = ref(50)
const linksRight = ref([])

const userSelfSettings = useTemplateRef('userSelfSettings')

onBeforeMount(() => {
  getNavItemsFromCache()
})

onMounted(() => {
  if (store.getters.isLoggedIn && display.value.xs) {
    linksRight.value.push({
      title: 'personalSettings',
      icon: 'mdi-account',
      link: `${route.path}?personal_settings=true`,
    });
  }
})

watch(route, (to) => {
  if (store.getters.isLoggedIn) {
    if (to.query.personal_settings === 'true') {
      userSelfSettings.value.show();
    } else {
      userSelfSettings.value.close();
    }
  }
})

watch(display, () => {
    if (display.value.xs && store.getters.isLoggedIn) {
      linksRight.value.push({
        title: 'personalSettings',
        icon: 'mdi-account',
        link: `${route.path}?personal_settings=true`,
      });
    } else {
      linksRight.value = linksRight.value.filter((l) => l.title !== 'personalSettings');
    }
})

const allowedLinks = computed(() => {
  if (store.getters.generalConfig?.shop_only) {
    return [{
      "title": i18n.t('shop'),
      "icon": "mdi-store",
      "link": "/store",
      "default": true
    }, {
      "title": "Admin",
      "icon": "mdi-shield-star",
      "req_prop": "admin_menu",
      "link": null,
      "id": "d06a64d2-7da0-4fd2-97e4-62aba67d9a6c",
      "sublinks": [{
        "title": i18n.t('_pageTitle.shop'),
        "icon": "mdi-sack",
        "enabled": true,
        "req_prop": "purchase_show",
        "link": "/admin/shop",
        "parent_navigation_link_id": "d06a64d2-7da0-4fd2-97e4-62aba67d9a6c",
        "id": "1be71279-8887-4763-b302-a27190b9b588",
        "default": true
      }, {
        "title": i18n.t('_pageTitle.log'),
        "icon": "mdi-format-list-bulleted",
        "req_prop": "log_show",
        "link": "/log",
        "enabled": true,
        "parent_navigation_link_id": "d06a64d2-7da0-4fd2-97e4-62aba67d9a6c",
        "id": "2643e77e-04b0-4580-8e07-d163bec534f9",
        "default": true
      }, {
        "title": i18n.t('_pageTitle.settings'),
        "icon": "mdi-cog-outline",
        "req_prop": "admin_menu",
        "link": "/settings",
        "parent_navigation_link_id": "d06a64d2-7da0-4fd2-97e4-62aba67d9a6c",
        "id": "cdc914f8-369d-4db0-b932-adcfd2a5d202",
        "default": true,
        "enabled": true,
      }]
    }, {
      "title": i18n.t('_pageTitle.search'),
      "icon": "mdi-magnify",
      "link": "/search",
      "default": true
    }];
  }
  if (!links.value) return [];
  return links.value
    .filter((l) => l.enabled && l.location === 'HEADER' && (!l.req_prop || AccessControlService.methods.$checkProp(l.req_prop)));
})

const allowedHelpCircleLinks = computed(() => {
  if (!links.value) return [];
  return links.value
    .filter((l) => l.enabled && l.location === 'HELP' && (!l.req_prop || AccessControlService.methods.$checkProp(l.req_prop)));
})

const links = computed(() => {
  return store.getters.navItems;
})

function logout() {
  AuthService.logout();
  router.push('/');
}

function refreshUser() {
  AuthService.refreshUser();
}

function getNavItemsFromCache() {
  if (store.getters.navItems) links.value = store.getters.navItems;
}

function showLoginDialog() {
  router.push({
    path: route.path,
    query: {login: 'true', return_url: UtilService.data().utils.getFullUrl(route.path)},
  });
}
</script>

<template>
  <div>
    <v-app-bar
      color="header"
      style="z-index: 200;"
      class=""
    >
      <div
        class="d-flex align-center mx-auto px-3"
        style="width: 100%"
        :class="{ 'v-container' : store.getters.theme && store.getters.theme.header_container
          && display.xxl }"
      >
        <!-- burger menu on the left-->
        <div v-if="display.mdAndDown">
          <BurgerMenu
            :nav-links="allowedLinks"
            :help-links="allowedHelpCircleLinks"
            :menu-links="linksRight"
            @logout="logout"
            @login="showLoginDialog"
          />
        </div>

        <!-- Logo -->
        <div>
          <v-img
            v-if="store.state.theme"
            alt="Community Logo"
            class="shrink"
            :src="store.state.theme.logo"
            style="cursor: pointer"
            transition="scale-transition"
            :width="store.state.theme?.logo_width"
            height="50"
            @click="router.push('/')"
          />
        </div>
        <!-- Do not overflow on bigger screens -->
        <div
          v-if="display.lgAndUp"
          class="mr-1"
        >
          <v-toolbar-title
            v-if="store.state.theme?.show_community_name"
            class="ml-3"
            style="cursor: pointer"
            @click="router.push('/')"
          >
            {{ store.getters.generalConfig?.community_name }}
          </v-toolbar-title>
        </div>
        <!-- Overflow ellipsis (...) on smaller screens -->
        <v-toolbar-title
          v-else
          class="ml-3"
          style="cursor: pointer"
          @click="router.push('/')"
        >
          {{ communityName }}
        </v-toolbar-title>

        <!-- navigation links-->
        <div
          v-if="display.lgAndUp"
          style="overflow-x: auto; min-width: 50%"
          class="top-scrollbar d-flex ml-3 flex-grow-1"
        >
          <NavigationLink
            v-for="(link, index) in allowedLinks"
            :key="index"
            :link="link"
            class="ml-1"
          />
        </div>

        <v-spacer />
        <HeaderSearch />
        <div v-if="display.lgAndUp">
          <HelpCircle
            :menu-links="allowedHelpCircleLinks"
            class="ml-1"
          />
        </div>
        <!-- profile icon with dropdown or login-->
        <div>
          <div
            v-if="store.getters.isLoggedIn"
            class="d-flex align-center"
          >
            <HeaderCredits
              v-if="display.smAndUp"
              class="ml-1 mr-1"
            />
            <HeaderShoppingCart />
            <ProfileMenu
              v-if="display.smAndUp"
              class="ml-5"
              :menu-links="linksRight"
              @logout="logout"
            />
            <Notification
              v-if="display.smAndUp && store.getters.isLoggedIn"
              class="ml-1"
            />
          </div>
          <div v-else>
            <v-chip
              style="height: 32px"
              class="header ml-1"
              data-cy="login-button"
              @click="showLoginDialog"
            >
              {{ $t("_header.labels.login") }}
            </v-chip>
          </div>
        </div>
      </div>
    </v-app-bar>
    <PersonalSettings
      v-if="store.getters.isLoggedIn"
      ref="userSelfSettings"
      :user="store.getters.user"
      @user-changed="refreshUser"
    />
  </div>
</template>

<style scoped>
</style>
