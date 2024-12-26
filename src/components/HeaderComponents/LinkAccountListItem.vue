<script setup>
import { useRoute } from 'vue-router';
import UtilService from '@/services/UtilService';

// Vue Router
const route = useRoute();

// Method
function getReturnUrl() {
  return UtilService.data().utils.getFullUrl(route.path);
}
</script>

<template>
  <div>
    <v-list-item
      :to="{path: $route.path,
            query: { login: 'true', return_url: getReturnUrl() } }"
    >
      <v-list-item-title>
        <v-icon start>
          mdi-account-plus
        </v-icon>
        {{ $t('link_account') }}
      </v-list-item-title>
    </v-list-item>
  </div>
</template>

<style scoped>

</style>
