<script lang="ts" setup>

import { useVyHubStore } from '@/store';
import {computed} from "vue";

const store = useVyHubStore();

const background = computed(() => {
  if (store.theme) {
    return store.theme.image;
  } else {
    return '';
  }
});

</script>

<template>
  <v-img
    height="30vh"
    class="vh-store-header-img"
    cover
    :src="background"
  >
    <v-row
      justify="center"
      align="center"
      style="height: 100%"
    >
      <v-col
        cols="12"
        md="10"
      >
        <BuilderJoinServer
          :servers="store.theme.shop_only_servers"
          :logo-url="store.theme.logo"
          :white-text="true"
          :link="{ name: 'Store' }"
        />
      </v-col>
    </v-row>
  </v-img>
  <v-divider v-if="background" />
</template>

<style scoped>

</style>
