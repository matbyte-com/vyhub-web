<template>
  <v-dialog v-model="dialog" max-width="400px">
    <v-card>
      <v-card-title>
        <span>{{ $t("language") }}</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-select
            :items="items"
            v-model="value"
            solo
          ></v-select>
          <v-btn text @click="changeLocale">Save</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import i18n from '@/plugins/i18n';

export default {
  name: 'LanguagePicker',
  data() {
    return {
      dialog: null,
      items: i18n.availableLocales,
      value: i18n.locale,
    };
  },
  methods: {
    changeLocale() {
      i18n.locale = this.value;
      this.dialog = false;
    },
  },
};
</script>

<style scoped>

</style>
