<template>
  <v-app>
    <notifications position="bottom left" :duration="8000" :width="400"
                   classes="vue-notification vuetify-notification">
      <template slot="body" slot-scope="{ item }">
        <div :class="'vue-notification vuetify-notification ' + item.type">
          <div class="body-2">
            <v-row>
              <v-col cols="1" align-self="center">
                <v-icon v-if="item.data && item.data.icon" class="white--text">
                  {{ item.data.icon }}
                </v-icon>
                <div v-else>
                  <v-icon v-if="item.type === 'error'" class="white--text">
                    mdi-alert-circle
                  </v-icon>
                  <v-icon v-else-if="item.type === 'warn'" class="white--text">
                    mdi-alert
                  </v-icon>
                  <v-icon v-else-if="item.type === 'success'" class="white--text">
                    mdi-check
                  </v-icon>
                  <v-icon v-else class="white--text">
                    mdi-information
                  </v-icon>
                </div>
              </v-col>
              <v-col>
                <div class="font-weight-bold">
                  {{ item.title }}
                </div>
                {{ item.text }}
              </v-col>
            </v-row>
          </div>
        </div>
      </template>
    </notifications>

    <TheHeader/>

    <v-main :style="backgroundColor">
      <v-container>
        <v-card class="transparent" flat
          min-height="70vh"
        >
          <v-card-text>
            <transition mode="out-in"
                        enter-active-class="animate__animated animate__fadeIn animate__faster"
                        >
              <router-view :class="{ 'dark-theme' : $vuetify.theme.dark }">
              </router-view>
            </transition>
            {{ this.$route.query.refresh_token }}
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>

    <TheFooter/>

  </v-app>
</template>

<script>
import emitter from '@/services/EventBus';
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
  created() {
    this.setThemeFromCache();
  },
  beforeMount() {
    AuthService.setAuthTokens();
    AuthService.setProperties();
    this.setTheme();
    this.background = this.$vuetify.theme.currentTheme.background;
    // watch global themeUpdated Event - emitted in /Components/SettingComponents/ThemeChanger
    emitter.on('themeUpdated', this.setTheme);
  },
  watch: {
    $route() {
      this.checkLogin();
    },
  },
  methods: {
    setTheme() {
      apiService.design.getTheme().then((rsp) => {
        const cachedTheme = {};
        try {
          const theme = rsp.data;
          if (theme.image) {
            this.backgroundImage = theme.image;
            cachedTheme.image = theme.image;
          } else {
            this.backgroundImage = null;
          }
          if (theme.background) {
            this.background = theme.background;
            cachedTheme.background = theme.background;
          }
          if (theme.dark === true) {
            this.$vuetify.theme.dark = true;
            cachedTheme.dark = true;
          } else {
            this.$vuetify.theme.dark = false;
            cachedTheme.dark = false;
          }
          this.$vuetify.theme.currentTheme.primary = theme.primary;
          cachedTheme.primary = theme.primary;
          localStorage.setItem('theme', JSON.stringify(cachedTheme));
        } catch (e) {
          this.$vuetify.theme.currentTheme.primary = '#3f51b5';
          throw e;
        }
      });
    },
    setThemeFromCache() {
      if (localStorage.theme) {
        const obj = JSON.parse(localStorage.getItem('theme'));
        this.backgroundImage = obj.image;
        this.background = obj.background;
        if (obj.dark === true) {
          this.$vuetify.theme.dark = true;
        } else {
          this.$vuetify.theme.dark = false;
        }
        this.$vuetify.theme.currentTheme.primary = obj.primary;
      }
    },
    checkLogin() {
      const refreshToken = this.$route.query.refresh_token;

      if (refreshToken != null) {
        this.$router.push({ query: {} });

        if (!this.$store.getters.isLoggedIn) {
          AuthService.login(refreshToken, () => {
            //
          }, () => {
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

<!--<style v-if="$vuetify.theme.dark" lang="sass">@import "assets/css/dark.sass"</style>-->
<!--<style lang="sass">
.v-card
  background-color: rgba(33,33,33, 0.85) !important
.v-card__title
  background-color: rgba(33,33,33, 0.80) !important
.v-slide-group
  background-color: rgba(33,33,33, 0) !important
.v-data-table
  background-color: rgba(33,33,33, 0) !important
.v-expansion-panel
  background-color: rgba(33,33,33, 0) !important
.v-list
  background-color: rgba(33,33,33, 0) !important
.v-tabs-items
  background-color: rgba(33,33,33, 0) !important
.v-card.transparent
  background-color: rgba(0,0,0,0) !important
  .v-card__title
    background-color: rgba(0,0,0,0) !important
.v-card__title.grey-title
    background-color: rgb(200,200,200) !important
</style>-->

<style lang="sass">
.dark-theme
  @import "assets/css/dark.sass"
</style>
