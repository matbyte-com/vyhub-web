<template>
  <v-menu open-on-hover offset-y eager>
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">
        {{ $store.getters.user.username }}
        <v-icon right>mdi-account-circle</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item
        v-for="(link, index) in menuLinks"
        :key="index"
        @click="$router.push(link.link)"
        >
          <v-icon left>{{ link.icon }}</v-icon>
          <v-list-item-title>
            {{ link.title }}
          </v-list-item-title>
      </v-list-item>
      <v-list-item @click="logout">
        <v-icon left>mdi-logout-variant</v-icon>
        <v-list-item-title>{{ $t('header.labels.logout') }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
  name: 'ProfileMenu.vue',
  props: {
    menuLinks: Array,
  },
  data() {
    return {
    };
  },
  beforeMount() {
    AuthService.refreshUser(true);
  },
  methods: {
    logout() {
      AuthService.logout();
    },
    emitLogout() {
      this.$emit('logout');
    },
  },
};

</script>
