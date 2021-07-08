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
              <router-view>
              </router-view>
            </transition>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>

    <TheFooter/>
    <!-- floating button to show help-->
    <v-fade-transition>
      <v-menu top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab dark x-large style="background-color: rgba(255,255,255,0.7)"
                 fixed right bottom v-bind="attrs" v-on="on">
            <v-btn fab large class="red darken-2">
              <v-icon dark>mdi-help</v-icon>
            </v-btn>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="red lighten-1">
            Question, Bugs, Feature Requests?
          </v-card-title>
          <v-card-text class="mt-4">
            Please open a Github issue or contact us!
          </v-card-text>
          <v-card-actions>
            <v-btn class="red lighten-2" href="https://github.com/matbyte-com/vyhub-documentation/issues">
              <v-icon left>
                mdi-github
              </v-icon>
              <span>GitHub</span>
            </v-btn>
            <v-btn class="red lighten-2"
                   :href="`mailto:info@vyhub.net?subject=Feedback Demo Route: ${$route.path}`">
              <v-icon left>
                mdi-email
              </v-icon>
              <span>Contact</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-fade-transition>

  </v-app>
</template>

<script>
import emitter from '@/services/EventBus';
import Vue from 'vue';
import AuthService from '@/services/AuthService';
import AccessControlService from '@/services/AccessControlService';
import UtilService from '@/services/UtilService';
import openapi from '@/api/openapi';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

Vue.mixin(AccessControlService);
Vue.mixin(UtilService);

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
    this.getGeneralSettings();
    this.background = this.$vuetify.theme.currentTheme.background;
    // watch global themeUpdated Event - emitted in /Components/SettingComponents/ThemeChanger
    emitter.on('themeUpdated', this.setTheme);
  },
  methods: {
    async getGeneralSettings() {
      (await openapi).design_getGeneralSettings().then((rsp) => {
        localStorage.setItem('generalSettings', JSON.stringify(rsp.data));
      }).catch((err) => {
        console.log('Could not get General Settings');
        throw err;
      });
    },
    async setTheme() {
      (await openapi).design_getTheme().then((rsp) => {
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
          // set colors, logo and more
          this.$vuetify.theme.currentTheme.primary = theme.primary;
          this.$vuetify.theme.currentTheme.success = theme.success;
          this.$vuetify.theme.currentTheme.warning = theme.warning;
          this.$vuetify.theme.currentTheme.error = theme.error;
          cachedTheme.primary = theme.primary;
          cachedTheme.success = theme.success;
          cachedTheme.warning = theme.warning;
          cachedTheme.error = theme.error;
          cachedTheme.logo = theme.logo;
          cachedTheme.show_community_name = theme.show_community_name;
          cachedTheme.community_name = theme.community_name;
          // save theme to localStorage
          localStorage.setItem('theme', JSON.stringify(cachedTheme));
          emitter.emit('themeUpdatedAfter');
        } catch (e) {
          this.$vuetify.theme.currentTheme.primary = '#3f51b5';
          console.log('Error While Setting Theme');
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
        this.$vuetify.theme.currentTheme.success = obj.success;
        this.$vuetify.theme.currentTheme.warning = obj.warning;
        this.$vuetify.theme.currentTheme.error = obj.error;
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

<style lang="sass">
@import "assets/css/light.sass"
@import '../node_modules/quill/dist/quill.snow.css'

.theme--dark
  @import "assets/css/dark.sass"
</style>
