<template>
  <v-footer color="footer" padless class="vh-footer justify-center lighten-1">
    <div style="width: 100%">
      <div class="d-flex my-2 flex-wrap justify-center">
        <NavigationLink
          class="ml-1"
          :link="link"
          :dark="true"
          v-for="(link, index) in navLinks"
          :key="index">
        </NavigationLink>
      </div>
      <div class="footer py-4 text-center white--text" style="width: 100%">
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
      </div>
    </div>
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
