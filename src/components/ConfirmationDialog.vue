<template>
  <Dialog v-model="dialog" :max-width="width" :title="title" icon="mdi-help-circle">
    <template v-if="errorMessage != null || text != null">
      <v-alert type="error" v-if="errorMessage != null" class="mt-2">
        {{ errorMessage }}
      </v-alert>
      <div class="body-1 mt-2 text-center">
        {{ text }}
      </div>
    </template>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-slot:actions>
      <v-col>
        <v-btn text
               color="error"
               type="submit"
               :loading="loading"
               @click="submit">
          <v-icon left>{{ btnIcon }}</v-icon>
          {{ btnText }}
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn text @click="cancel">
          <v-icon left>mdi-close</v-icon>
          <span v-if="btnCancelText">{{ btnCancelText }}</span>
          <span v-else>{{ $t('cancel') }}</span>
        </v-btn>
      </v-col>
    </template>
  </Dialog>
</template>

<script>
import Dialog from './Dialog.vue';
import i18n from '@/plugins/i18n';

export default {
  name: 'ConfirmationDialog',
  components: { Dialog },
  data() {
    return {
      dialog: null,
      errorMessage: null,
      item: null,
      loading: false,
    };
  },
  props: {
    text: String,
    btnIcon: {
      type: String,
      default: 'mdi-check',
    },
    btnText: String,
    btnCancelText: String,
    width: {
      type: Number,
      default: 400,
    },
    title: {
      type: String,
      default: i18n.t('areYouSure'),
    },
  },
  methods: {
    cancel() {
      this.loading = false;
      this.dialog = false;
      this.errorMessage = null;
    },
    closeAndReset() {
      this.loading = false;
      this.dialog = false;
      this.errorMessage = null;
    },
    submit() {
      if (!this.loading) {
        this.loading = true;
        this.$emit('submit', this.item);
      }
    },
    show(item) {
      this.item = item;
      this.dialog = true;
      this.loading = false;
    },
    setErrorMessage(text) {
      this.errorMessage = text;
      this.loading = false;
    },
    setError(err) {
      this.errorMessage = this.utils.formatErrorMessage(err).text;
      this.loading = false;
    },
  },
};
</script>

<style scoped>

</style>
