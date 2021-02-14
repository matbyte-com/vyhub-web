<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    max-width="500">
    <v-card>
      <v-card-title>
        <v-icon :if="titleIcon != null" class="mr-1">{{ titleIcon }}</v-icon>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <GenForm :form-schema="formSchema" @submit="$emit('submit')"
                 :error-message="errorMessage"
                 :cancel-text="cancelText" :submit-text="submitText"
                 @cancel="dialog = false"
                 ref="form"
                 @mounted="genFormMounted"
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
    titleIcon: String,
    formSchema: Object,
    errorMessage: String,
    submitText: String,
    cancelText: String,
  },
  data() {
    return {
      dataBeforeMount: null,
      dialog: false,
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
    setData(data) {
      if (this.$refs.form === undefined) {
        this.dataBeforeMount = data;
      } else {
        this.$refs.form.setData(data);
      }
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
    genFormMounted() {
      this.$refs.form.setData(this.dataBeforeMount);
    },
  },
};
</script>

<style scoped>

</style>
