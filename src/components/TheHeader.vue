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
    <div class="d-flex align-center pr-5">
      <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"/>
      <v-toolbar-title>NyX</v-toolbar-title>
    </div>

    <!-- navigation links-->
    <div class="hidden-xs-only">
      <v-menu open-on-hover offset-y v-for="(link, index) in links" :key="index">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" class="ml-1" depressed dark v-bind="attrs" v-on="on">
            <v-icon left>{{ link.icon }}</v-icon>
            <span>{{ link.title }}</span>
          </v-btn>
        </template>
        <v-list dense v-if="link.tabs.length > 0">
          <v-list-item v-for="(tab, index) in link.tabs" :key="index">
            <v-list-item-title>
              <v-icon left>{{ tab.icon }}</v-icon>
              <span>{{ tab.title }}</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-spacer></v-spacer>
    <!-- profile icon with dropdown or login-->
    <div class="hidden-xs-only">
      <ProfileMenu
        v-if="$store.getters.isLoggedIn"
        :menu-links="linksRight"
        @logout="logout"/>
      <div v-else>
        <v-btn outlined class="mr-1 lighten-1 white--text"
               @click="showLoginDialog">
          {{ $t("login") }}
        </v-btn>
        <v-btn color="primary" depressed class="mr-1">
          {{ $t("register") }}
        </v-btn>
      </div>

    </div>
  </v-app-bar>
</template>

<script>
import Login from '@/components/HeaderComponents/Login.vue';
import ProfileMenu from '@/components/HeaderComponents/ProfileMenu.vue';
import BurgerMenu from '@/components/HeaderComponents/BurgerMenu.vue';

export default {
  components: {
    Login,
    ProfileMenu,
    BurgerMenu,
  },
  data() {
    return {
      links: [
        {
          title: 'Dashboard', icon: 'mdi-home', link: '/home', tabs: [{ title: 'Edit', icon: 'mdi-home-edit-outline', link: '/home' }, { title: 'Edit', icon: 'mdi-home-edit-outline', link: '/home' }],
        },
        {
          title: 'Announcements', icon: 'mdi-exclamation-thick', link: '/announcement', tabs: [],
        },
        {
          title: 'Bans', icon: 'mdi-account-cancel', tabs: [],
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
