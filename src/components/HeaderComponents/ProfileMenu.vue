<template>
  <div>
    <v-menu open-on-hover offset-y eager>
      <template v-slot:activator="{ on, attrs }">
        <v-chip pill v-bind="attrs" v-on="on" class="header lighten-2">
          <v-avatar left>
            <v-img :src="$store.getters.user.avatar"
                   lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png" />
          </v-avatar>
          <span class="ml-1 mr-1">
            {{ $store.getters.user.username }}
          </span>
        </v-chip>
      </template>
      <v-list dense>
        <LinkAccountListItem />
        <PersonalSettingsLinkItem />
        <v-list-item v-for="(link, index) in menuLinks"
                     :key="index"
                     :to="link.link">
          <v-icon left>{{ link.icon }}</v-icon>
          <v-list-item-title>
            {{ $t(link.title) }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-icon left>mdi-logout-variant</v-icon>
          <v-list-item-title>{{ $t('_header.labels.logout') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import LinkAccountListItem from '@/components/HeaderComponents/LinkAccountListItem.vue';
import PersonalSettingsLinkItem from '@/components/HeaderComponents/PersonalSettingsLinkItem.vue';

export default {
  name: 'ProfileMenu.vue',
  components: { PersonalSettingsLinkItem, LinkAccountListItem },
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

<style scoped>
</style>
