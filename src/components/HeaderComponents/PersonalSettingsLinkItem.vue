<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

// Vuex store and Vue Router
const store = useStore();
const router = useRouter();
const route = useRoute();

// Methods
function openPersonalSettings() {
  if (store.getters.generalConfig.shop_only) {
    router.push({ name: 'StorePersonalSettings' });
  } else {
    router.push({ path: route.path, query: { personal_settings: 'true' } });
  }
}
</script>

<template>
  <div>
    <v-list-item @click="openPersonalSettings">
      <v-list-item-title>
        <v-icon start>
          mdi-account
        </v-icon>
        {{ $t('personalSettings') }}
      </v-list-item-title>
    </v-list-item>
  </div>
</template>

<style scoped>

</style>
