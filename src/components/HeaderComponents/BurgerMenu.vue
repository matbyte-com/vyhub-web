<template>
  <v-menu>
    <template #activator="{ props }">
      <v-app-bar-nav-icon v-bind="props" />
    </template>
    <v-list
      density="compact"
    >
      <!-- render navlinks -->
      <div
        v-for="(navLink, index) in navLinks"
        :key="index"
      >
        <ListItemLink :link="navLink" />
      </div>
      <!-- render helpMenu -->
      <v-list-group>
        <template #activator="{ props }">
          <v-list-item v-bind="props">
            <v-list-item-title>
              <v-icon
                icon="mdi-account-circle"
                start
              />
              {{ $t('help') }}
            </v-list-item-title>
          </v-list-item>
        </template>
        <ListItemLink
          v-for="helpLink in helpLinks"
          :key="helpLink.id"
          :sub-sub-link="true"
          :link="helpLink"
        />
      </v-list-group>
      <v-divider />
      <div v-if="$store.getters.isLoggedIn">
        <HeaderShoppingCart :list-item="true" />
        <HeaderCredits :list-item="true" />
      </div>
      <v-divider />
      <!-- render menuTabs + Logout-->
      <div v-if="$store.getters.isLoggedIn">
        <LinkAccountListItem />
        <v-list-item
          v-for="(menuLink, index) in menuLinks"
          :key="index"
          :to="menuLink.link"
        >
          <v-icon start>
            {{ menuLink.icon }}
          </v-icon>
          <v-list-item-title>{{ $t(menuLink.title) }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="emitLogout">
          <v-list-item-title>
            <v-icon start>
              mdi-logout-variant
            </v-icon>
            {{ $t('_header.labels.logout') }}
          </v-list-item-title>
        </v-list-item>
      </div>
      <div v-else>
        <v-list-item @click="emitLogin">
          <v-list-item-title>
            <v-icon start>
              mdi-login
            </v-icon>
            {{ $t('_header.labels.login') }}
          </v-list-item-title>
        </v-list-item>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
export default {
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
