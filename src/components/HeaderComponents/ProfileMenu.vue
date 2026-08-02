<script setup>
import {useStore} from "vuex";
import {onBeforeMount} from "vue";
import {useRouter} from "vue-router";
import AuthService from "@/services/AuthService";

const store = useStore();
const router = useRouter();

defineProps({
  menuLinks: {
    type: Array,
    default: () => [],
  },
  tile: {
    type: Boolean,
    default: false,
  },
  shopOnly: {
    type: Boolean,
    default: false,
  },
});

onBeforeMount(() => {
  AuthService.refreshUser(true);
});

// Methods
function logout() {
  AuthService.logout();
  router.push('/');
}
</script>

<template>
  <div>
    <v-menu
      open-on-hover
      location="bottom"
      eager
      offset="12"
    >
      <template #activator="{ props }">
        <v-chip
          :pill="!tile"
          :tile="tile"
          v-bind="props"
          :style="tile ? `height: 36px` : ''"
          class="chip"
        >
          <v-avatar
            :size="tile ? 30 : undefined"
            start
            :class="{ 'rounded-lg' : tile, 'margin-sides' : tile }"
          >
            <v-img
              :src="store.state.user.avatar"
              lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png"
            />
          </v-avatar>
          <span class="ml-1 mr-1">
            {{ store.state.user.username }}
          </span>
        </v-chip>
      </template>
      <v-card flat>
        <v-list density="compact">
          <LinkAccountListItem class="no-active" />
          <PersonalSettingsLinkItem
            :shop-only="shopOnly"
            class="no-active"
          />
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

<style scoped>
.no-active :deep(.v-list-item__overlay) {
  opacity: 0 !important;
}

.chip {
  cursor: pointer;
}
</style>
