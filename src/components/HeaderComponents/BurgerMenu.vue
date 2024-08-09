<template>
  <v-menu offset-y>
    <template v-slot:activator="{ props }">
      <v-app-bar-nav-icon v-bind="props"></v-app-bar-nav-icon>
    </template>
    <v-list density="compact">
      <!-- render navlinks -->
      <div v-for="(navLink, index) in navLinks" :key="index">
        <ListItemLink :link="navLink"/>
      </div>
      <!-- render helpMenu -->
      <v-list-group v-on:click.stop="">
        <template v-slot:activator>
          <v-icon start>mdi-account-circle</v-icon>
          <v-list-item-title>{{$t('help')}}</v-list-item-title>
        </template>
        <div v-for="helpLink in helpLinks" :key="helpLink.id">
          <ListItemLink :sub-sub-link="true" :link="helpLink" />
        </div>
      </v-list-group>
      <v-divider />
      <div v-if="$store.getters.isLoggedIn">
        <ShoppingCart :list-item="true"/>
        <Credits :list-item="true"/>
      </div>
      <v-divider />
      <!-- render menuTabs + Logout-->
      <div v-if="$store.getters.isLoggedIn">
        <LinkAccountListItem />
        <v-list-item v-for="(menuLink, index) in menuLinks"
                     :key="index" :to="menuLink.link">
          <v-icon start>{{ menuLink.icon }}</v-icon>
          <v-list-item-title>{{ $t(menuLink.title) }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="emitLogout">
          <v-icon start>mdi-logout-variant</v-icon>
          <v-list-item-title>{{ $t('_header.labels.logout') }}</v-list-item-title>
        </v-list-item>
      </div>
      <div v-else>
        <v-list-item @click="emitLogin">
          <v-icon start>
            mdi-login
          </v-icon>
          <v-list-item-title>{{ $t('_header.labels.login') }}</v-list-item-title>
        </v-list-item>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
import ShoppingCart from '@/components/HeaderComponents/ShoppingCart.vue';
import Credits from '@/components/HeaderComponents/Credits.vue';
import LinkAccountListItem from '@/components/HeaderComponents/LinkAccountListItem.vue';
import ListItemLink from '@/components/HeaderComponents/ListItemLink.vue';

export default {
  name: 'BurgerMenu.vue',
  components: {
    LinkAccountListItem, Credits, ShoppingCart, ListItemLink,
  },
  props: {
    navLinks: Array,
    helpLinks: Array,
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
