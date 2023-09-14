<template>
  <div>
    <v-app-bar :fixed="fixed" :dense="dense" :app="app" :color="backgroundColor"
               :flat="!app" style="z-index: 4;" :src="backgroundImage">
      <!-- Logo -->
      <div class="d-flex align-center grow"
           :class="{ 'container' : $vuetify.breakpoint.mdAndUp }">
        <!-- burger menu on the left-->
        <v-menu offset-y v-if="$vuetify.breakpoint.smAndDown">
          <template v-slot:activator="{ on, attrs }">
            <v-app-bar-nav-icon :class="{ 'white--text': whiteText }" v-on="on" v-bind="attrs"/>
          </template>
          <v-list dense>
            <!-- render navlinks -->
            <v-list-item v-for="(l, index) in links"
                         :key="index" :href="(!utils.localLink(l) ? l.link : null)"
                         :to="utils.localLink(l) ? utils.getLocalLink(l) : null">
              <v-icon v-if="l.icon" left>{{ l.icon }}</v-icon>
              <v-list-item-title>{{ l.btnText }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <div>
          <v-img alt="Community Logo" class="shrink py-1" contain v-if="logoUrl" :src="logoUrl"
                 transition="scale-transition" :width="logo_width" height="50"/>
        </div>
        <!-- Do not overflow on bigger screens -->
        <div v-if="$vuetify.breakpoint.mdAndUp" class="mr-1">
          <v-toolbar-title class="ml-3" :class="{ 'white--text': whiteText }"
                           style="cursor: default">
            {{ headline }}
          </v-toolbar-title>
        </div>
        <!-- Overflow ellipsis (...) on smaller screens -->
        <v-toolbar-title v-else class="ml-3 mr-1" :class="{ 'white--text': whiteText }"
                         style="cursor: default">
          {{ headline }}
        </v-toolbar-title>
        <v-spacer v-if="$vuetify.breakpoint.mdAndUp" />
        <div class="d-flex flex-wrap align-center" v-if="$vuetify.breakpoint.mdAndUp">
          <v-btn v-for="l in links" :key="l.text" :class="{ 'white--text': whiteText }"
                 text class="my-1" :href="(!utils.localLink(l) ? l.link : null)"
                 :to="utils.localLink(l) ? utils.getLocalLink(l) : null">
            <v-icon :left="!(l.btnText == null || l.btnText === '')" v-if="l.icon">
              {{ l.icon }}
            </v-icon>
            {{ l.btnText }}
          </v-btn>
        </div>
        <v-spacer />
        <v-btn color="primary card-rounded" :large="$vuetify.breakpoint.mdAndUp"
               depressed v-if="!$store.getters.isLoggedIn"
               @click="showLoginDialog"
               :class="{ 'glow-effect':utils.customerJourneyActive('login') }">
          {{ $t('_header.labels.login') }}
        </v-btn>
        <v-chip pill v-else outlined :to="{ name: 'Dashboard' }">
          <v-avatar left>
            <v-img :src="$store.getters.user.avatar"
                   lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png" />
          </v-avatar>
          <span class="ml-1 mr-1">
            {{ $store.getters.user.username }}
          </span>
        </v-chip>
      </div>
    </v-app-bar>
    <LinkAccountDialog ref="linkAccountDialog" />
  </div>
</template>

<script>
import LinkAccountDialog from '@/components/LinkAccountDialog.vue';

export default {
  name: 'Header',
  props: ['headline', 'logoUrl', 'logo_width', 'app', 'backgroundColor', 'whiteText', 'links', 'dense', 'fixed', 'backgroundImage'],
  components: {
    LinkAccountDialog,
  },
  methods: {
    showLoginDialog() {
      this.$router.push({
        path: this.$route.path,
        query: { login: 'true', return_url: `${window.location.origin}/user` },
      });
    },
  },
};
</script>

<style scoped>

</style>
