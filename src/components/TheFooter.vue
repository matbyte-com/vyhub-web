<template>
  <v-footer color="header lighten-1" padless>
    <v-row justify="center" no-gutters>
      <div class="d-flex my-2">
        <NavigationLink
          :link="link"
          v-for="(link, index) in navLinks"
          :key="index">
        </NavigationLink>
      </div>
      <v-col class="header lighten-2 py-4 text-center white--text" cols="12">
        <strong>
          {{ new Date().getFullYear() }}
          <span v-if="$store.getters.generalConfig != null">
            — {{ $store.getters.generalConfig.community_name }}
          </span>
          <span v-if="config.branding == null || config.branding">
            —
            <a class="text-decoration-none white--text" href="https://vyhub.net">
              Powered by VyHub
            </a>
          </span>
          —
          {{ version }}
        </strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import NavigationLink from '@/components/HeaderComponents/NavigationLink.vue';
import config from '@/config';
import { version } from '../../package.json';

export default {
  components: { NavigationLink },
  data() {
    return {
      version,
      config,
    };
  },
  computed: {
    links() {
      return this.$store.getters.navItems;
    },
    navLinks() {
      if (this.links == null) {
        return [];
      }

      return this.links
        .filter((l) => l.enabled && l.location === 'FOOTER' && (!l.req_prop || this.$checkProp(l.req_prop) === true));
    },
  },
};
</script>

<style scoped>
.v-btn--active.no-active::before {
  opacity: 0 !important;
}
</style>
