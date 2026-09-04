<script setup>
import {useRouter, useRoute} from 'vue-router';
import { useVyHubStore } from '@/store';

// Vuex store and Vue Router
const store = useVyHubStore();
const router = useRouter();
const route = useRoute();

const props = defineProps({
  shopOnly: {
    type: Boolean,
    default: false,
  },
})

// Methods
function openPersonalSettings() {
  if (!props.shopOnly) {

    router.push({path: route.path, query: {personal_settings: 'true'}});
  }
}
</script>

<template>
  <div>
    <v-list-item
      :to="shopOnly ? {name: 'StorePersonalSettings'} : undefined"
      @click="openPersonalSettings"
    >
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
