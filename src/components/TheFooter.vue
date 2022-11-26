<template>
  <v-footer color="header lighten-1" padless>
    <v-row justify="center" no-gutters>
      <div class="d-flex my-2">
        <NavigationLink
          :link="link"
          v-for="(link, index) in getNavlinks"
          :key="index">
        </NavigationLink>
      </div>
      <v-col class="header lighten-2 py-4 text-center white--text" cols="12">
        <strong>
          {{ new Date().getFullYear() }}
          <span v-if="$store.getters.generalConfig != null">
            — {{ $store.getters.generalConfig.community_name }}
          </span>
          —
          <a class="text-decoration-none white--text" href="https://vyhub.net">
            Powered by VyHub
          </a>
          —
          {{ version }}
        </strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import NavigationLink from '@/components/HeaderComponents/NavigationLink.vue';
import { version } from '../../package.json';

export default {
  components: { NavigationLink },
  data() {
    return {
      version,
      links: [
        { title: 'Home', link: '/' },
        { title: 'Legal', link: '/legal' },
      ],
    };
  },
  computed: {
    getNavlinks() {
      const links = this.$store.getters.navItems;
      return links
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
