<template>
  <v-app>

    <TheHeader/>

    <v-main>
      <v-container class="">
        <router-view></router-view>
      </v-container>
    </v-main>

    <TheFooter/>

  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

export default Vue.extend({
  name: 'App',

  components: {
    TheHeader,
    TheFooter,
  },

  data: () => ({
    //
  }),
});
</script>
