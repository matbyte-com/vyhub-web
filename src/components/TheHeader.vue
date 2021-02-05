<template>
  <v-app-bar app color="primary" dark>
    <Login ref="login"/>
    <!-- burger menu on the left-->
    <div class="hidden-sm-and-up">
      <BurgerMenu
        :nav-links="links"
        :menu-links="linksRight"
        @logout="logout"
        @login="showLoginDialog"
        @register="showRegisterDialog"/>
    </div>

    <!-- Logo -->
    <div class="d-flex align-center pr-5" @click="$router.push('/')">
      <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"/>
      <v-toolbar-title>NyX</v-toolbar-title>
    </div>

    <!-- navigation links-->
    <NavigationLink
      class="hidden-xs-only"
      :link="link"
      v-for="(link, index) in links"
      :key="index">
    </NavigationLink>

    <v-spacer></v-spacer>
    <Search />
    <!-- profile icon with dropdown or login-->
    <div class="hidden-xs-only">
      <ProfileMenu
        v-if="$store.getters.isLoggedIn"
        :menu-links="linksRight"
        @logout="logout"/>
      <div v-else>
        <v-btn outlined class="mr-1 lighten-1 white--text"
               @click="showLoginDialog">
          {{ $t("header.labels.login") }}
        </v-btn>
        <v-btn color="primary" depressed class="mr-1">
          {{ $t("header.labels.register") }}
        </v-btn>
      </div>

    </div>
  </v-app-bar>
</template>

<script>
import Login from '@/components/HeaderComponents/Login.vue';
import ProfileMenu from '@/components/HeaderComponents/ProfileMenu.vue';
import BurgerMenu from '@/components/HeaderComponents/BurgerMenu.vue';
import NavigationLink from '@/components/HeaderComponents/NavigationLink.vue';
import Search from '@/components/HeaderComponents/Search.vue';

export default {
  components: {
    Login,
    ProfileMenu,
    BurgerMenu,
    NavigationLink,
    Search,
  },
  data() {
    return {
      links: [
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
          title: 'Shop', icon: 'mdi-cash-multiple', link: '/shop', tabs: [],
        },
        {
          title: 'Bans', icon: 'mdi-account-cancel', link: '/ban', tabs: [],
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
    showLoginDialog() {
      this.$refs.login.showLoginDialog();
    },
    showRegisterDialog() {
      this.$refs.login.showLoginDialog();
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
  },
};
</script>
