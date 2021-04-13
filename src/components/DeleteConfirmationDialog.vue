<template>
  <Dialog v-model="dialog" max-width="300" :title="$t('areYouSure')" icon="mdi-help-circle">
    <template v-if="errorMessage != null">
      <v-alert type="error">
        {{ errorMessage }}
      </v-alert>
    </template>
    <template v-slot:actions>
      <v-btn class="mr-1"
             text
             color="error"
             type="submit"
             @click="submit">
        <v-icon left>mdi-delete</v-icon>
        {{ $t('delete') }}
      </v-btn>
      <v-btn text @click="cancel">
        <v-icon left>mdi-close</v-icon>
        {{ $t('cancel') }}
      </v-btn>
    </template>
  </Dialog>
</template>

<script>
import Dialog from './Dialog.vue';

export default {
  name: 'DeleteConfirmationDialog',
  components: { Dialog },
  data() {
    return {
      dialog: null,
      errorMessage: null,
      item: null,
    };
  },
  methods: {
    cancel() {
      this.dialog = false;
      this.errorMessage = null;
    },
    closeAndReset() {
      this.dialog = false;
      this.errorMessage = null;
    },
    submit() {
      this.$emit('submit', this.item);
    },
    show(item) {
      this.item = item;
      this.dialog = true;
    },
    setErrorMessage(text) {
      this.errorMessage = text;
    },
  },
};
</script>

<style scoped>

</style>
