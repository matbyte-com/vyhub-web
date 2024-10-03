<template>
  <div>
    <!--   TODO Not sure whether this needs to be readded    :theme="$store.getters.theme && $store.getters.theme.light_header ? 'light' : 'dark'"
-->
    <v-app-bar
      color="header"
      style="z-index: 200;"
    >
      <div
        class="d-flex align-center grow"
        style="width: 100%"
        :class="{ 'container' : $store.getters.theme && $store.getters.theme.header_container
          && $vuetify.display.mdAndUp }"
      >
        <!-- burger menu on the left-->
        <div v-if="$vuetify.display.mdAndDown">
          <BurgerMenu
            :nav-links="allowedLinks"
            :help-links="allowedHelpCircleLinks"
            :menu-links="linksRight"
            @logout="logout"
            @login="showLoginDialog()"
          />
        </div>

        <!-- Logo -->
        <div>
          <v-img
            v-if="imgSrc"
            alt="Community Logo"
            class="shrink"
            :src="imgSrc"
            style="cursor: pointer"
            transition="scale-transition"
            :width="logo_width"
            height="50"
            @click="$router.push('/')"
          />
        </div>
        <!-- Do not overflow on bigger screens -->
        <div
          v-if="$vuetify.display.lgAndUp"
          class="mr-1"
        >
          <v-toolbar-title
            class="ml-3"
            style="cursor: pointer"
            @click="$router.push('/')"
          >
            {{ communityName }}
          </v-toolbar-title>
        </div>
        <!-- Overflow ellipsis (...) on smaller screens -->
        <v-toolbar-title
          v-else
          class="ml-3"
          style="cursor: pointer"
          @click="$router.push('/')"
        >
          {{ communityName }}
        </v-toolbar-title>

        <!-- navigation links-->
        <div
          v-if="$vuetify.display.lgAndUp"
          style="overflow-x: auto; min-width: 50%"
          class="d-flex top-scrollbar ml-3 flex-grow-1"
        >
          <NavigationLink
            v-for="(link, index) in allowedLinks"
            :key="index"
            :link="link"
            class="ml-1"
          />
        </div>

        <v-spacer />
        <Search />
        <div v-if="$vuetify.display.lgAndUp">
          <HelpCircle
            :menu-links="allowedHelpCircleLinks"
            class="ml-1"
          />
        </div>
        <!-- profile icon with dropdown or login-->
        <div>
          <div
            v-if="$store.getters.isLoggedIn"
            class="d-flex align-center"
          >
            <Credits
              v-if="$vuetify.display.smAndUp"
              class="ml-1 mr-1"
            />
            <ShoppingCart />
            <ProfileMenu
              v-if="$vuetify.display.smAndUp"
              class="ml-5"
              :menu-links="linksRight"
              @logout="logout"
            />
            <Notification
              v-if="$vuetify.display.smAndUp && $store.getters.isLoggedIn"
              class="ml-1"
            />
          </div>
          <div v-else>
            <v-chip
              style="height: 32px"
              class="header ml-1"
              data-cy="login-button"
              :class="{ 'glow-effect':utils.customerJourneyActive('login') }"
              @click="showLoginDialog"
            >
              {{ $t("_header.labels.login") }}
            </v-chip>
          </div>
        </div>
      </div>
    </v-app-bar>
    <PersonalSettings
      v-if="$store.getters.isLoggedIn"
      ref="userSelfSettings"
      :user="$store.getters.user"
      @user-changed="refreshUser"
    />
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import EventBus from '@/services/EventBus';
import openapi from '@/api/openapi';
import UtilService from '@/services/UtilService';

export default {
  data() {
    return {
      links: [],
      imgSrc: null,
      communityName: null,
      logo_width: 50,
      linksRight: [],
    };
  },
  computed: {
    allowedLinks() {
      return this.links
        .filter((l) => l.enabled && l.location === 'HEADER' && (!l.req_prop || this.$checkProp(l.req_prop)));
    },
    allowedHelpCircleLinks() {
      return this.links
        .filter((l) => l.enabled && l.location === 'HELP' && (!l.req_prop || this.$checkProp(l.req_prop)));
    },
  },
  watch: {
    $route(to) {
      if (this.$store.getters.isLoggedIn) {
        if (to.query.personal_settings === 'true') {
          this.$refs.userSelfSettings.show();
        } else {
          this.$refs.userSelfSettings.close();
        }
      }
    },
    '$vuetify.display.xs': function (val) {
      if (val && this.$store.getters.isLoggedIn) {
        this.linksRight.push({
          title: 'personalSettings',
          icon: 'mdi-account',
          link: `${this.$route.path}?personal_settings=true`,
        });
      } else {
        this.linksRight = this.linksRight.filter((l) => l.title !== 'personalSettings');
      }
    },
  },
  beforeMount() {
    this.getNavItems();
    this.getLogo();
    // Event Emitted in Components/Settings/Navigation.vue
    EventBus.on('navUpdated', this.getNavItems);
    // Event Emitted in App.vue after Theme was updated
    EventBus.on('themeUpdatedAfter', this.getLogo);
    EventBus.on('themeUpdated', this.getNavItems);

    if (this.$store.getters.isLoggedIn && this.$vuetify.display.xs) {
      this.linksRight.push({
        title: 'personalSettings',
        icon: 'mdi-account',
        link: `${this.$route.path}?personal_settings=true`,
      });
    }
  },
  created() {
    this.getNavItemsFromCache();
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push('/');
    },
    refreshUser() {
      AuthService.refreshUser();
    },
    async getNavItems() {
      const api = await openapi;

      api.navigation_getNavigationLinks().then((rsp) => {
        this.$store.commit('SET_NAV_ITEMS', rsp.data);
        this.links = rsp.data;
        // Caught in Footer
        EventBus.emit('navItemsUpdated', undefined);
      }).catch((err) => console.log(`Could not query nav ${err}`));
    },
    getNavItemsFromCache() {
      if (this.$store.getters.navItems) this.links = this.$store.getters.navItems;
    },
    showLoginDialog() {
      this.$router.push({
        path: this.$route.path,
        query: { login: 'true', return_url: UtilService.data().utils.getFullUrl(this.$route.path) },
      });
    },
    getLogo() {
      if (this.$store.getters.theme) {
        // Theme queried in App.vue
        const obj = this.$store.getters.theme;
        this.imgSrc = obj.logo;
        if (obj.logo_width) this.logo_width = obj.logo_width;
        if (obj.show_community_name) {
          if (!this.$store.getters.generalConfig) {
            this.communityName = null;
          } else {
            this.communityName = this.$store.getters.generalConfig.community_name;
          }
        } else {
          this.communityName = null;
        }
      }
    },
  },
};
</script>

<style scoped>
/*div.top-scrollbar {
  transform: rotateX(180deg);
}
div.top-scrollbar * {
  transform: rotateX(180deg);
}*/
</style>
