<template>
  <v-dialog
    v-model="dialog"
    width="500">
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <GenForm :form-schema="formSchema" @submit="$emit('submit')"
                 :error-message="errorMessage"
                 :cancel-text="cancelText" :submit-text="submitText"
                 @cancel="dialog = false"
                 ref="form"
                 >
        </GenForm>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import GenForm from '@/components/GenForm.vue';

export default {
  name: 'DialogForm',
  components: {
    GenForm,
  },
  props: {
    title: String,
    formSchema: Object,
    errorMessage: String,
    submitText: String,
    cancelText: String,
  },
  data() {
    return {
      dialog: null,
    };
  },
  methods: {
    show() {
      this.dialog = true;
    },
    closeAndReset() {
      this.dialog = false;
      return this.$refs.form.cancelForm();
    },
    getData() {
      return this.$refs.form.getData();
    },
    validateAndRun() {
      return this.$refs.form.validateAndRun();
    },
    cancelForm() {
      return this.$refs.form.cancelForm();
    },
    setErrorMessage(text) {
      return this.$refs.form.setErrorMessage(text);
    },
  },
};
</script>

<style scoped>

</style>
