<template>
  <v-app>

    <TheHeader/>

    <v-main class="grey lighten-5">
      <v-container>
        <v-card
          min-height="70vh"
        >
          <v-card-text>
            <router-view></router-view>
          </v-card-text>
        </v-card>
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
