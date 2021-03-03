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
            {{ this.$route.query.refresh_token }}
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
import AuthService from '@/services/AuthService';
import AccessControlService from '@/services/AccessControlService';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

Vue.mixin(AccessControlService);

export default Vue.extend({
  name: 'App',

  components: {
    TheHeader,
    TheFooter,
  },

  data: () => ({
    background: '#FAFAFA',
    backgroundImage: null,
  }),
  beforeMount() {
    AuthService.setAuthTokens();
    AuthService.setProperties();
    this.setTheme();
    this.background = this.$vuetify.theme.currentTheme.background;
  },
  watch: {
    $route() {
      this.checkLogin();
    },
  },
  methods: {
    setTheme() {
      apiService.design.getTheme().then((rsp) => {
        try {
          const theme = rsp.data;
          if (theme.image) {
            this.backgroundImage = theme.image;
          }
          if (theme.background) {
            this.background = theme.background;
          }
          if (theme.dark === true) {
            this.$vuetify.theme.dark = true;
            this.$vuetify.theme.currentTheme.primary = theme.primary;
          } else {
            this.$vuetify.theme.currentTheme.primary = theme.primary;
          }
        } catch (e) {
          this.$vuetify.theme.currentTheme.primary = '#3f51b5';
          throw e;
        }
      });
    },
    checkLogin() {
      const refreshToken = this.$route.query.refresh_token;

      if (refreshToken != null) {
        this.$router.push({ query: {} });

        if (!this.$store.getters.isLoggedIn) {
          AuthService.login(refreshToken, (user) => {
            //
          }, (err) => {
            //
          });
        }
      }
    },
  },
  computed: {
    backgroundColor() {
      if (this.backgroundImage) {
        return `background: url(${this.backgroundImage}) no-repeat center fixed !important; background-size: cover;`;
      }
      return `background-color: ${this.background}`;
    },
  },
});
</script>
