<script lang="ts" setup>

import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();

const background = computed(() => {
  if (store.state.theme) {
    return store.state.theme.image;
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
          :servers="store.state.theme.shop_only_servers"
          :logo-url="store.state.theme.logo"
          :white-text="true"
          :link="{ name: 'Store' }"
        />
      </v-col>
    </v-row>
  </v-img>
  <v-divider />
</template>

<style scoped>

</style>
