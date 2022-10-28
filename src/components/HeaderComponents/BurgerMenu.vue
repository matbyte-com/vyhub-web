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
          v-if="(navLink.sublinks || []).length > 0"
          v-on:click.stop="">
          <template v-slot:activator>
              <v-icon left>{{ navLink.icon }}</v-icon>
              <v-list-item-title>{{ navLink.title }}</v-list-item-title>
          </template>
          <div v-for="(tab, index) in navLink.sublinks" :key="index">
            <v-list-item class="ml-3"
            v-if="tab.enabled === true && $checkProp(tab.reqProp)"
            :href="tab.cms_page_id === null && !localLink(tab) ? tab.link : null"
            :to="tab.cms_page_id || localLink(tab) ? getLocalLink(tab) : null"
            link>
              <v-icon left>{{ tab.icon }}</v-icon>
              <v-list-item-title>{{ tab.title }}</v-list-item-title>
              {{ localLink(tab) }}
            </v-list-item>
          </div>
        </v-list-group>
        <!-- if no tabs are existent -->
        <v-list-item v-if="(navLink.sublinks || []).length === 0"
                     :href="(navLink.cms_page_id === null && !localLink(navLink) ?
                      navLink.link : null)"
                     :to="(navLink.cms_page_id || localLink(navLink) ?
                      getLocalLink(navLink) : null)">
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
        <LinkAccountListItem />
        <v-list-item v-for="(menuLink, index) in menuLinks"
                     :key="index" :to="menuLink.link">
          <v-icon left>{{ menuLink.icon }}</v-icon>
          <v-list-item-title>{{ $t(menuLink.title) }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="emitLogout">
          <v-icon left>mdi-logout-variant</v-icon>
          <v-list-item-title>{{ $t('_header.labels.logout') }}</v-list-item-title>
        </v-list-item>
      </div>
      <div v-else>
        <v-list-item @click="emitLogin">
          <v-icon left>
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

export default {
  name: 'BurgerMenu.vue',
  components: { LinkAccountListItem, Credits, ShoppingCart },
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
    getLocalLink(link) {
      if (!link.link) return '';
      if (this.localLink(link)) { return link.link.substring(window.location.origin.length); }
      return link.link;
    },
    localLink(link) {
      if (!link.link) return false;
      if (window) {
        return !!link.link.includes(window.location.hostname);
      }
      return false;
    },
  },
};
</script>
