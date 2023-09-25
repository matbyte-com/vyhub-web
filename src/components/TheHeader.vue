<template>
  <div>
    <v-app-bar app color="header"
               :light="$store.getters.theme && $store.getters.theme.light_header"
               :dark="$store.getters.theme && !$store.getters.theme.light_header"
               style="z-index: 200;">
      <div class="d-flex align-center grow" style="width: 100%"
           :class="{ 'container' : $store.getters.theme && $store.getters.theme.header_container
            && $vuetify.breakpoint.mdAndUp }">
        <!-- burger menu on the left-->
        <div v-if="$vuetify.breakpoint.mdAndDown">
          <BurgerMenu
            :nav-links="allowedLinks"
            :help-links="allowedHelpCircleLinks"
            :menu-links="linksRight"
            @logout="logout"
            @login="showLoginDialog()"/>
        </div>

        <!-- Logo -->
        <div>
          <v-img alt="Community Logo" class="shrink" contain v-if="imgSrc" :src="imgSrc"
                 @click="$router.push('/')" style="cursor: pointer"
                 transition="scale-transition" :width="logo_width" height="50"/>
        </div>
        <!-- Do not overflow on bigger screens -->
        <div v-if="$vuetify.breakpoint.lgAndUp" class="mr-1">
          <v-toolbar-title class="ml-3" @click="$router.push('/')" style="cursor: pointer">
            {{ communityName }}
          </v-toolbar-title>
        </div>
        <!-- Overflow ellipsis (...) on smaller screens -->
        <v-toolbar-title v-else class="ml-3" @click="$router.push('/')" style="cursor: pointer">
          {{ communityName }}
        </v-toolbar-title>

        <!-- navigation links-->
        <div style="overflow-x: auto; min-width: 50%" class="d-flex top-scrollbar ml-3 flex-grow-1"
             v-if="$vuetify.breakpoint.lgAndUp">
          <NavigationLink
            :link="link"
            class="ml-1"
            v-for="(link, index) in allowedLinks"
            :key="index">
          </NavigationLink>
        </div>

        <v-spacer />
        <Search />
        <div v-if="$vuetify.breakpoint.lgAndUp">
          <HelpCircle :menu-links="allowedHelpCircleLinks" class="ml-1"/>
        </div>
        <!-- profile icon with dropdown or login-->
        <div>
          <div v-if="$store.getters.isLoggedIn" class="d-flex align-center">
            <Credits class="ml-1 mr-1" v-if="$vuetify.breakpoint.smAndUp"/>
            <ShoppingCart/>
            <ProfileMenu
              v-if="$vuetify.breakpoint.smAndUp"
              class="ml-5"
              :menu-links="linksRight"
              @logout="logout"/>
            <Notification v-if="$vuetify.breakpoint.smAndUp && $store.getters.isLoggedIn"
                          class="ml-1"/>
          </div>
          <div v-else>
            <v-chip style="height: 32px" class="lighten-2 header ml-1" data-cy="login-button"
                   @click="showLoginDialog"
                   :class="{ 'glow-effect':utils.customerJourneyActive('login') }">
              {{ $t("_header.labels.login") }}
            </v-chip>
          </div>
        </div>
      </div>
    </v-app-bar>
    <PersonalSettings ref="userSelfSettings" :user="$store.getters.user"
                      @user-changed="refreshUser"
                      v-if="$store.getters.isLoggedIn">
    </PersonalSettings>
  </div>
</template>

<script>
import ProfileMenu from '@/components/HeaderComponents/ProfileMenu.vue';
import BurgerMenu from '@/components/HeaderComponents/BurgerMenu.vue';
import NavigationLink from '@/components/HeaderComponents/NavigationLink.vue';
import Search from '@/components/HeaderComponents/Search.vue';
import Notification from '@/components/HeaderComponents/Notification.vue';
import AuthService from '@/services/AuthService';
import ShoppingCart from '@/components/HeaderComponents/ShoppingCart.vue';
import EventBus from '@/services/EventBus';
import Credits from '@/components/HeaderComponents/Credits.vue';
import openapi from '@/api/openapi';
import UtilService from '@/services/UtilService';
import PersonalSettings from '@/components/PersonalSettings.vue';
import HelpCircle from '@/components/HeaderComponents/HelpCircle.vue';

export default {
  components: {
    PersonalSettings,
    ShoppingCart,
    ProfileMenu,
    BurgerMenu,
    NavigationLink,
    Search,
    Credits,
    Notification,
    HelpCircle,
  },
  data() {
    return {
      links: [],
      imgSrc: null,
      communityName: null,
      logo_width: 50,
      linksRight: [],
    };
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push('/');
    },
    refreshUser() {
      AuthService.refreshUser();
    },
    async getNavItems() {
      const api = await openapi;

      api.navigation_getNavigationLinks().then((rsp) => {
        this.$store.commit('SET_NAV_ITEMS', rsp.data);
        this.links = rsp.data;
        // Caught in Footer
        EventBus.emit('navItemsUpdated');
      }).catch((err) => console.log(`Could not query nav ${err}`));
    },
    getNavItemsFromCache() {
      if (this.$store.getters.navItems) this.links = this.$store.getters.navItems;
    },
    showLoginDialog() {
      this.$router.push({
        path: this.$route.path,
        query: { login: 'true', return_url: UtilService.data().utils.getFullUrl(this.$route.path) },
      });
    },
    getLogo() {
      if (this.$store.getters.theme) {
        // Theme queried in App.vue
        const obj = this.$store.getters.theme;
        this.imgSrc = obj.logo;
        if (obj.logo_width) this.logo_width = obj.logo_width;
        if (obj.show_community_name) {
          if (!this.$store.getters.generalConfig) {
            this.communityName = null;
          } else {
            this.communityName = this.$store.getters.generalConfig.community_name;
          }
        } else {
          this.communityName = null;
        }
      }
    },
  },
  computed: {
    allowedLinks() {
      return this.links
        .filter((l) => l.enabled && l.location === 'HEADER' && (!l.req_prop || this.$checkProp(l.req_prop)));
    },
    allowedHelpCircleLinks() {
      return this.links
        .filter((l) => l.enabled && l.location === 'HELP' && (!l.req_prop || this.$checkProp(l.req_prop)));
    },
  },
  watch: {
    $route(to) {
      if (this.$store.getters.isLoggedIn) {
        if (to.query.personal_settings === 'true') {
          this.$refs.userSelfSettings.show();
        } else {
          this.$refs.userSelfSettings.close();
        }
      }
    },
  },
  beforeMount() {
    this.getNavItems();
    this.getLogo();
    // Event Emitted in Components/Settings/Navigation.vue
    EventBus.on('navUpdated', this.getNavItems);
    // Event Emitted in App.vue after Theme was updated
    EventBus.on('themeUpdatedAfter', this.getLogo);
    EventBus.on('themeUpdated', this.getNavItems);
  },
  created() {
    this.getNavItemsFromCache();
  },
};
</script>

<style scoped>
div.top-scrollbar {
  transform: rotateX(180deg);
}
div.top-scrollbar * {
  transform: rotateX(180deg);
}
</style>
