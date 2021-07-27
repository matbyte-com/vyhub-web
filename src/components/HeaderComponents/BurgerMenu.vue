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
          v-if="(navLink.tabs || []).length > 0"
          v-on:click.stop="">
          <template v-slot:activator>
              <v-icon left>{{ navLink.icon }}</v-icon>
              <v-list-item-title>{{ navLink.title }}</v-list-item-title>
          </template>
          <div v-for="(tab, index) in navLink.tabs" :key="index">
            <v-list-item class="ml-3"
            v-if="tab.enabled === true && $checkProp(tab.reqProp)"
            :to="tab.link"
            link>
              <v-icon left>{{ tab.icon }}</v-icon>
              <v-list-item-title>{{ tab.title }}</v-list-item-title>
            </v-list-item>
          </div>
        </v-list-group>
        <!-- if no tabs are existent -->
        <v-list-item v-if="(navLink.tabs || []).length === 0"
                     :to="navLink.link">
          <v-icon left>{{ navLink.icon }}</v-icon>
          <v-list-item-title>{{ navLink.title }}</v-list-item-title>
        </v-list-item>
      </div>
      <v-divider />
      <div v-if="$store.getters.isLoggedIn">
        <ShoppingCart :list-item="true"/>
        <Credits :list-item="true"/>
      </div>
      <v-divider />
      <!-- render menuTabs + Logout-->
      <div v-if="$store.getters.isLoggedIn">
        <v-list-item v-for="(menuLink, index) in menuLinks"
                     :key="index" :to="menuLink.link">
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
          <v-icon left>
            mdi-login
          </v-icon>
          <v-list-item-title>{{ $t('header.labels.login') }}</v-list-item-title>
        </v-list-item>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
import ShoppingCart from '@/components/HeaderComponents/ShoppingCart.vue';
import Credits from '@/components/HeaderComponents/Credits.vue';

export default {
  name: 'BurgerMenu.vue',
  components: { Credits, ShoppingCart },
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
