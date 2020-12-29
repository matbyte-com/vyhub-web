<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-app-bar-nav-icon v-on="on" v-bind="attrs"></v-app-bar-nav-icon>
    </template>
    <v-list dense>
      <!-- render tabs-->
      <v-menu offset-x v-for="(navLink, index) in navLinks" :key="index">
        <template v-slot:activator="{ on, attrs }">
          <v-list-item v-on="on" v-bind="attrs">
            <v-icon left>{{ navLink.icon }}</v-icon>
            <v-list-item-title>{{ navLink.title }}</v-list-item-title>
          </v-list-item>
        </template>
        <v-list dense v-if="navLink.tabs.length > 0">
          <v-list-item v-for="(tab, index) in navLink.tabs" :key="index">
            <v-icon left>{{ tab.icon }}</v-icon>
            <v-list-item-title>{{ tab.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-divider />
      <!-- render menuTabs + Logout-->
      <v-list-item v-for="(menuLink, index) in menuLinks" :key="index">
        <v-icon left>{{ menuLink.icon }}</v-icon>
        <v-list-item-title>{{ menuLink.title }}</v-list-item-title>
      </v-list-item>
      <div v-if="$store.getters.isLoggedIn">
        <v-list-item @click="emitLogout">
          <v-icon left>mdi-logout-variant</v-icon>
          <v-list-item-title>{{ $t('logout') }}</v-list-item-title>
        </v-list-item>
      </div>
      <div v-else>
        <v-list-item @click="emitLogin">
          <v-list-item-title>{{ $t('login') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="emitRegister">
          <v-list-item-title>{{ $t('register') }}</v-list-item-title>
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
