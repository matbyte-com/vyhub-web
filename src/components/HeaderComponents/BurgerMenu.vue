<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-app-bar-nav-icon v-on="on" v-bind="attrs"></v-app-bar-nav-icon>
    </template>
    <v-list dense>
      <!-- render navlinks -->
      <div v-for="(navLink, index) in navLinks" :key="index">
        <!-- if tabs are existent -->
        <v-list-group
          v-if="navLink.tabs.length > 0" v-on:click.stop="">
          <template v-slot:activator>
              <v-icon left>{{ navLink.icon }}</v-icon>
              <v-list-item-title>{{ navLink.title }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="(tab, index) in navLink.tabs" :key="index"
            @click="$router.push(tab.link)"
            link>
            <v-icon left>{{ tab.icon }}</v-icon>
            <v-list-item-title>{{ tab.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <!-- if no tabs are existent -->
        <v-list-item v-if="navLink.tabs.length == 0" @click="$router.push(navLink.link)">
          <v-icon left>{{ navLink.icon }}</v-icon>
          <v-list-item-title>{{ navLink.title }}</v-list-item-title>
        </v-list-item>
      </div>
      <v-divider />
      <!-- render menuTabs + Logout-->
      <div v-if="$store.getters.isLoggedIn">
        <v-list-item v-for="(menuLink, index) in menuLinks"
                     :key="index"
                     @click="$router.push(menuLink.link)"
                      >
          <v-icon left>{{ menuLink.icon }}</v-icon>
          <v-list-item-title>{{ menuLink.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="emitLogout">
          <v-icon left>mdi-logout-variant</v-icon>
          <v-list-item-title>{{ $t('header.labels.logout') }}</v-list-item-title>
        </v-list-item>
      </div>
      <div v-else>
        <v-list-item @click="emitLogin">
          <v-list-item-title>{{ $t('header.labels.login') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="emitRegister">
          <v-list-item-title>{{ $t('header.labels.register') }}</v-list-item-title>
        </v-list-item>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'BurgerMenu.vue',
  props: {
    navLinks: Array,
    menuLinks: Array,
  },
  data() {
    return {
    };
  },
  methods: {
    emitLogin() {
      this.$emit('login');
    },
    emitRegister() {
      this.$emit('register');
    },
    emitLogout() {
      this.$emit('logout');
    },
  },
};
</script>
