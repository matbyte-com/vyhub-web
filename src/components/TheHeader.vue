<template>
  <v-app-bar app color="primary" dark>
    <!-- burger menu on the left-->
    <div class="hidden-md-and-up">
      <BurgerMenu
        :nav-links="links"
        :menu-links="linksRight"
        @logout="logout"
        @login="$refs.linkAccountDialog.show()"/>
    </div>

    <!-- Logo -->
    <div class="d-flex align-center pr-5" @click="$router.push('/')">
      <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"/>
      <v-toolbar-title>VyHub</v-toolbar-title>
    </div>

    <!-- navigation links-->
    <NavigationLink
      class="hidden-sm-and-down"
      :link="link"
      v-for="(link, index) in allowedLinks"
      :key="index">
    </NavigationLink>

    <v-spacer></v-spacer>
    <Search />
    <!-- profile icon with dropdown or login-->
    <div class="hidden-xs-only">
      <div v-if="$store.getters.isLoggedIn">
        <ShoppingCart></ShoppingCart>
        <ProfileMenu
          :menu-links="linksRight"
          @logout="logout"/>
      </div>
      <div v-else>
        <v-btn outlined class="mr-1 lighten-1 white--text"
               @click="$refs.linkAccountDialog.show()">
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
import AuthService from '@/services/AuthService';
import ShoppingCart from '@/components/HeaderComponents/ShoppingCart.vue';
import api from '@/api/api';
import EventBus from '@/services/EventBus';

export default {
  components: {
    ShoppingCart,
    ProfileMenu,
    BurgerMenu,
    NavigationLink,
    Search,
    LinkAccountDialog,
  },
  data() {
    return {
      links: [],
      'links-depracated': [
        {
          title: 'News', icon: 'mdi-newspaper', link: '/news', tabs: [],
        },
        {
          title: 'Dashboard', icon: 'mdi-account', link: '/dashboard',
          // title: 'Dashboard', icon: 'mdi-account', link: '/home', tabs: [{ title: 'Edit', icon:
          // 'mdi-home-edit-outline', link: '/dashboard' }, { title: 'Edit', icon:
          // 'mdi-home-edit-outline', link: '/dashboard' }],
        },
        {
          title: 'Shop', icon: 'mdi-sack', link: '/shop', tabs: [],
        },
        {
          title: 'Bans', icon: 'mdi-account-cancel', link: '/ban', reqProp: 'ban_show', tabs: [],
        },
        {
          title: 'Settings', icon: 'mdi-cog-outline', link: '/settings', tabs: [],
        },
      ],
      linksRight: [
        {
          title: 'Profil', icon: 'mdi-account-circle', link: '/',
        },
        {
          title: 'Settings', icon: 'mdi-cog', link: '/settings',
        },
      ],
    };
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push('/');
    },
    getNavItems() {
      api.design.getNavItems().then((rsp) => {
        this.links = rsp.data;
        localStorage.setItem('navItems', JSON.stringify(rsp.data));
      }).catch((err) => console.log(`Could not query nav ${err}`));
    },
    getNavItemsFromCache() {
      if (localStorage.getItem('navItems')) {
        this.links = JSON.parse(localStorage.getItem('navItems'));
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
    // Event Emitted in Components/Settings/Navigation.vue
    EventBus.on('navUpdated', this.getNavItems);
  },
  created() {
    this.getNavItemsFromCache();
  },
};
</script>
