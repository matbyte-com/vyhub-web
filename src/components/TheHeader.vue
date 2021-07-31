<template>
  <v-app-bar app color="primary" dark>
    <!-- burger menu on the left-->
    <div class="hidden-md-and-up">
      <BurgerMenu
        :nav-links="allowedLinks"
        :menu-links="linksRight"
        @logout="logout"
        @login="showLoginDialog()"/>
    </div>

    <!-- Logo -->
    <div class="d-flex align-center pr-5" @click="$router.push('/')" v-if="imgSrc">
      <v-img alt="Community Logo" class="shrink" contain :src="imgSrc"
             transition="scale-transition" :width="logo_width" height="50"/>
      <v-toolbar-title class="ml-3" v-if="communityName">{{ communityName }}</v-toolbar-title>
    </div>
    <!-- navigation links-->
    <NavigationLink
      class="hidden-sm-and-down"
      :link="link"
      v-for="(link, index) in allowedLinks"
      :key="index">
    </NavigationLink>

    <v-spacer></v-spacer>
    <Notification v-if="$store.getters.isLoggedIn"/>
    <Search />
    <!-- profile icon with dropdown or login-->
    <div class="hidden-xs-only">
      <div v-if="$store.getters.isLoggedIn" class="d-flex align-center">
        <Credits />
        <ShoppingCart />
        <ProfileMenu
          :menu-links="linksRight"
          @logout="logout"/>
      </div>
      <div v-else>
        <v-btn outlined class="mr-1 lighten-1 white--text" data-cy="login-button"
               @click="showLoginDialog">
          {{ $t("header.labels.login") }}
        </v-btn>
      </div>
    </div>
    <LinkAccountDialog ref="linkAccountDialog" v-if="!$store.getters.isLoggedIn">
    </LinkAccountDialog>
  </v-app-bar>
</template>

<script>
import ProfileMenu from '@/components/HeaderComponents/ProfileMenu.vue';
import BurgerMenu from '@/components/HeaderComponents/BurgerMenu.vue';
import NavigationLink from '@/components/HeaderComponents/NavigationLink.vue';
import Search from '@/components/HeaderComponents/Search.vue';
import LinkAccountDialog from '@/components/LinkAccountDialog.vue';
import Notification from '@/components/HeaderComponents/Notification.vue';
import AuthService from '@/services/AuthService';
import ShoppingCart from '@/components/HeaderComponents/ShoppingCart.vue';
import EventBus from '@/services/EventBus';
import Credits from '@/components/HeaderComponents/Credits.vue';
import openapi from '@/api/openapi';
import UtilService from '@/services/UtilService';

export default {
  components: {
    ShoppingCart,
    ProfileMenu,
    BurgerMenu,
    NavigationLink,
    Search,
    Credits,
    LinkAccountDialog,
    Notification,
  },
  data() {
    return {
      links: [],
      imgSrc: null,
      communityName: null,
      logo_width: 50,
      linksRight: [
        /* {
          title: 'Settings', icon: 'mdi-cog', link: '/settings',
        }, */
      ],
    };
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push('/');
    },
    async getNavItems() {
      const api = await openapi;

      api.design_getNavItems().then((rsp) => {
        this.$store.commit('SET_NAV_ITEMS', rsp.data);
        this.links = rsp.data;
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
          this.communityName = obj.community_name;
        } else {
          this.communityName = null;
        }
      }
    },
  },
  computed: {
    allowedLinks() {
      return this.links
        .filter((l) => l.enabled && (!l.reqProp || this.$checkProp(l.reqProp) === true));
    },
  },
  beforeMount() {
    this.getNavItems();
    this.getLogo();
    // Event Emitted in Components/Settings/Navigation.vue
    EventBus.on('navUpdated', this.getNavItems);
    // Event Emitted in App.vue after Theme was updated
    EventBus.on('themeUpdatedAfter', this.getLogo);
  },
  created() {
    this.getNavItemsFromCache();
  },
};
</script>
