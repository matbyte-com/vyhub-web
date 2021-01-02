<template>
  <v-menu open-on-hover offset-y eager>
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed color="primary" v-bind="attrs" v-on="on">
        {{ $store.getters.user.attributes.username }}
        <v-icon right>mdi-account-circle</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(link, index) in menuLinks"
        :key="index"
        @click="$router.push(link.link)">
        <v-list-item-title>
          <v-icon left>{{ link.icon }}</v-icon>
          <span>{{ link.title }}</span>
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-title>
          <v-icon left>mdi-logout-variant</v-icon>
          <span>{{ $t('Logout') }}</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'ProfileMenu.vue',
  props: {
    menuLinks: Array,
  },
  data() {
    return {
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    emitLogout() {
      this.$emit('logout');
    },
  },
};

</script>
