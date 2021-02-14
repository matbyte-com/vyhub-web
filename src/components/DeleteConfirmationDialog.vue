<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">{{ $t('areYouSure') }}</v-card-title>
      <v-card-text>
        <v-alert v-if="errorMessage != null" type="error">
          {{ errorMessage }}
        </v-alert>
        <v-row>
          <v-col cols="12">
            <v-btn class="mr-4"
                   depressed
                   color="primary"
                   type="submit"
                   @click="submit">
              {{ $t('submit') }}
            </v-btn>
            <v-btn color="lighten-5" depressed @click="cancel">
              {{ $t('cancel') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteConfirmationDialog',
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
    },
    submit() {
      this.$emit('submitDelete', this.item);
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
