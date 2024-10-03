<template>
  <div>
    <v-menu
      open-on-hover
      location="bottom"
      eager
    >
      <template #activator="{ props }">
        <v-chip
          pill
          v-bind="props"
          class="header"
        >
          <v-avatar start>
            <v-img
              :src="$store.getters.user.avatar"
              lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png"
            />
          </v-avatar>
          <span class="ml-1 mr-1">
            {{ $store.getters.user.username }}
          </span>
        </v-chip>
      </template>
      <v-card flat>
        <v-list density="compact">
          <LinkAccountListItem class="no-active" />
          <PersonalSettingsLinkItem class="no-active" />
          <v-list-item
            v-for="(link, index) in menuLinks"
            :key="index"
            :to="link.link"
            class="d-flex"
          >
            <v-list-item-title>
              <v-icon start>
                {{ link.icon }}
              </v-icon>
              {{ $t(link.title) }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>
              <v-icon start>
                mdi-logout-variant
              </v-icon>
              {{ $t('_header.labels.logout') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
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
  },
};

</script>

<style scoped>
.no-active :deep(.v-list-item__overlay) {
  opacity: 0 !important;
}
</style>
