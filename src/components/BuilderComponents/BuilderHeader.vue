<template>
  <div>
    <v-app-bar
      :fixed="fixed"
      :dense="dense"
      :app="app"
      :color="backgroundColor"
      :flat="!app"
      style="z-index: 4;"
      :src="backgroundImage"
    >
      <!-- Logo -->
      <div
        class="d-flex align-center grow"
        :class="{ 'container' : $vuetify.display.mdAndUp }"
      >
        <!-- burger menu on the left-->
        <v-menu
          v-if="$vuetify.display.smAndDown"
          offset-y
        >
          <template #activator="{ props }">
            <v-app-bar-nav-icon
              :class="{ 'white--text': whiteText }"
              v-bind="props"
            />
          </template>
          <v-list density="compact">
            <!-- render navlinks -->
            <v-list-item
              v-for="(l, index) in links"
              :key="index"
              :href="(!utils.localLink(l) ? l.link : null)"
              :to="utils.localLink(l) ? utils.getLocalLink(l) : null"
            >
              <v-icon
                v-if="l.icon"
                start
              >
                {{ l.icon }}
              </v-icon>
              <v-list-item-title>{{ l.btnText }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <router-link
          v-if="logoUrl"
          :to="{ name: 'news' }"
        >
          <v-img
            alt="Community Logo"
            class="py-1"
            :src="logoUrl"
            :width="logo_width"
            transition="scale-transition"
            height="60"
            contain
          />
        </router-link>
        <!-- Do not overflow on bigger screens -->
        <div
          v-if="$vuetify.display.mdAndUp"
          class="mr-1"
        >
          <router-link
            :to="{ name: 'News' }"
            style="cursor: pointer; color: inherit"
            class="text-decoration-none"
          >
            <v-toolbar-title
              class="ml-3"
              :class="{ 'white--text': whiteText }"
            >
              {{ headline }}
            </v-toolbar-title>
          </router-link>
        </div>
        <!-- Overflow ellipsis (...) on smaller screens -->
        <router-link
          v-else
          :to="{ name: 'News' }"
          style="cursor: pointer; color: inherit"
          class="text-decoration-none"
        >
          <v-toolbar-title
            class="ml-3 mr-1"
            :class="{ 'white--text': whiteText }"
          >
            {{ headline }}
          </v-toolbar-title>
        </router-link>
        <v-spacer v-if="$vuetify.display.mdAndUp" />
        <div
          v-if="$vuetify.display.mdAndUp"
          class="d-flex flex-wrap align-center"
        >
          <v-btn
            v-for="l in links"
            :key="l.text"
            :class="{ 'white--text': whiteText }"
            :target="l.targetBlank? '_blank' : ''"
            variant="text"
            class="my-1"
            :href="(!utils.localLink(l) ? l.link : null)"
            :to="utils.localLink(l) ? utils.getLocalLink(l) : null"
          >
            <v-icon
              v-if="l.icon"
              :start="!(l.btnText == null || l.btnText === '')"
            >
              {{ l.icon }}
            </v-icon>
            {{ l.btnText }}
          </v-btn>
        </div>
        <v-spacer />
        <v-btn
          v-if="!$store.getters.isLoggedIn"
          color="primary card-rounded my-1"
          :size="$vuetify.display.mdAndUp ? 'large' : undefined"
          variant="flat"
          :class="{ 'glow-effect':utils.customerJourneyActive('login') }"
          @click="showLoginDialog"
        >
          {{ $t('_header.labels.login') }}
        </v-btn>
        <v-chip
          v-else
          pill
          variant="outlined"
          :to="{ name: 'Dashboard' }"
        >
          <v-avatar start>
            <v-img
              :src="$store.getters.user.avatar"
              lazy-src="https://cdn.vyhub.net/vyhub/avatars/default.png"
            />
          </v-avatar>
          <span
            class="ml-1 mr-1"
            :class="{ 'white--text': whiteText }"
          >
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
  components: {
    LinkAccountDialog,
  },
  props: ['headline', 'logoUrl', 'logo_width', 'app', 'backgroundColor', 'whiteText', 'links', 'dense', 'fixed', 'backgroundImage'],
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
