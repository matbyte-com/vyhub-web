<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <v-btn color="white" text class="my-2" @click="$refs.languagePicker.dialog = true">
        {{ $t("footer.labels.language") }}
      </v-btn>
      <v-btn v-for="link in links" :key="link" color="white" text class="my-2">
        {{ link }}
      </v-btn>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>VyHub</strong>
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
        'Home',
        'About Us',
        'Team',
      ],
    };
  },
};
</script>
