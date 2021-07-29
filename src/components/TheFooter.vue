<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <v-btn color="white" text class="my-2" @click="$refs.languagePicker.dialog = true" disabled>
        {{ $t("footer.labels.language") }}
      </v-btn>
      <v-btn v-for="(link, index) in links" :key="index" color="white"
             text class="no-active my-2" :to="link.link"
             >
        {{ link.title }}
      </v-btn>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <a class="text-decoration-none white--text"
                                            href="http://vyhub.net"><strong>VyHub</strong></a>
      </v-col>
    </v-row>
    <LanguagePicker ref="languagePicker" />
  </v-footer>
</template>

<script>
import LanguagePicker from '@/components/FooterComponents/LanguagePicker.vue';

export default {
  components: { LanguagePicker },
  comments: {
    LanguagePicker,
  },
  data() {
    return {
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
