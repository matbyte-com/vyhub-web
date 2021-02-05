<template>
  <v-app>

    <TheHeader/>

    <v-main :style="backgroundColor">
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

<script>
import Vue from 'vue';
import apiService from '@/api/api';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

export default Vue.extend({
  name: 'App',

  components: {
    TheHeader,
    TheFooter,
  },

  data: () => ({
    background: '#FAFAFA',
  }),
  beforeMount() {
    this.setTheme();
    this.background = this.$vuetify.theme.currentTheme.background;
  },
  methods: {
    setTheme() {
      apiService.design.getTheme().then((rsp) => {
        const theme = JSON.parse(rsp.data);
        if (theme.background) {
          this.background = theme.background;
        }
        if (theme.dark === true) {
          this.$vuetify.theme.dark = true;
          this.$vuetify.theme.dark.primary = theme.primary;
        } else {
          this.$vuetify.theme.currentTheme.primary = theme.primary;
        }
      });
    },
  },
  computed: {
    backgroundColor() {
      return `background-color: ${this.background}`;
    },
  },
});
</script>
