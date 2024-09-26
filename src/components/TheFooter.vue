<template>
  <v-footer
    color="footer-lighten-1"
    class="d-flex flex-column vh-footer ma-0 pa-0"
  >
    <div class="d-flex my-2 flex-wrap justify-center">
      <NavigationLink
        v-for="(link, index) in navLinks"
        :key="index"
        class="ml-1 no-active"
        :link="link"
        :dark="true"
      />
    </div>
    <div
      class="bg-footer py-4 text-center"
      style="width: 100%"
    >
      <strong>
        {{ new Date().getFullYear() }}
        <span v-if="$store.getters.generalConfig != null">
          — {{ $store.getters.generalConfig.community_name }}
        </span>
        <span v-if="!removeBranding">
          —
          <a
            class="text-decoration-none text-white"
            href="https://vyhub.net"
          >
            Powered by VyHub
          </a>
        </span>
        —
        {{ version }}
      </strong>
    </div>
  </v-footer>
</template>

<script>
import emitter from '@/services/EventBus';
import { version } from '../../package.json';

export default {
  data() {
    return {
      version,
    };
  },
  computed: {
    removeBranding() {
      return this.$store.getters.generalConfig != null
        && this.$store.getters.generalConfig.remove_branding;
    },
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
  beforeMount() {
    emitter.on('navItemsUpdated', this.links);
  },
};
</script>

<style scoped>
.no-active :deep(.v-btn__overlay) {
  opacity: 0 !important;
}
</style>
