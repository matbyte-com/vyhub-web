<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <v-btn v-for="(link, index) in links" :key="index" color="white"
             text class="no-active my-2" :to="link.link"
             >
        {{ link.title }}
      </v-btn>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        <strong>
          {{ new Date().getFullYear() }}
          <span v-if="$store.getters.theme != null">
            — {{ $store.getters.generalConfig.community_name }}
          </span>
          —
          <a class="text-decoration-none white--text" href="http://vyhub.net">
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
import { version } from '../../package.json';

export default {
  components: {},
  data() {
    return {
      version,
      links: [
        { title: 'Home', link: '/' },
        { title: 'Legal', link: '/legal' },
      ],
    };
  },
};
</script>

<style scoped>
.v-btn--active.no-active::before {
  opacity: 0 !important;
}
</style>
