<template>
  <Dialog :max-width="maxWidth" ref="dialog" :title="title" :icon="icon" @cancel="cancelForm">
          <!--:text-class="formSchema.properties ? '' : 'pl-0 pr-0 pb-0'"-->
    <template v-if="formSchema" style="overflow-x: hidden">
      <GenForm :form-schema="formSchema" @submit="$emit('submit', item)"
               :error-message="errorMessage" :hide-buttons="true"
               :cancel-text="cancelText" :submit-text="submitText" :options-extra="optionsExtra"
               @cancel="$refs.dialog.open = false; $emit('cancel');"
               ref="form"
               class="mt-1"
               @mounted="genFormMounted"
               @updated="$emit('updated')"
               @notValid="loading=false"
      >
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="scope">
          <slot v-bind="scope" :name="name"/>
        </template>
      </GenForm>
    </template>
    <template v-slot:actions v-if="submitText != null || cancelText != null">
      <v-btn v-if="submitText != null"
             text color="primary" @click="submit">
        <v-progress-circular v-if="loading" indeterminate size="25" width="2"/>
        <v-icon v-if="!loading" left>mdi-check</v-icon>
        <div v-if="!loading">
          {{ submitText }}
        </div>
      </v-btn>
      <v-btn v-if="cancelText != null" color="lighten-5"
             text @click="cancelForm">
        <v-icon left>mdi-close</v-icon>
        {{ cancelText }}
      </v-btn>
    </template>
  </Dialog>
</template>

<script>
import GenForm from '@/components/GenForm.vue';
import Dialog from './Dialog.vue';

export default {
  name: 'DialogForm',
  components: {
    Dialog,
    GenForm,
  },
  props: {
    title: String,
    icon: String,
    formSchema: Object,
    errorMessage: String,
    maxWidth: {
      type: Number,
      default: 500,
    },
    submitText: {
      type: String,
      default: 'submit',
    },
    cancelText: {
      type: String,
      default: 'cancel',
    },
    slots: Array,
  },
  data() {
    return {
      dataBeforeMount: null,
      item: null,
      loading: false,
      optionsExtra: {
        editMode: 'inline',
      },
    };
  },
  methods: {
    show(item, data) {
      this.$refs.dialog.show();
      this.item = item;

      if (data != null) {
        this.setData(data);
      }
    },
    close() {
      this.loading = false;
      this.$refs.dialog.close();
    },
    closeAndReset() {
      this.loading = false;
      this.$refs.dialog.close();
      return this.$refs.form.cancelForm();
    },
    getData() {
      if (this.$refs.form) {
        return this.$refs.form.getData();
      } return Object;
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
      this.loading = false;
      return this.$refs.form.cancelForm();
    },
    setSuccessMessage(text) {
      this.loading = false;
      return this.$refs.form.setSuccessMessage(text);
    },
    setErrorMessage(text) {
      this.loading = false;
      return this.$refs.form.setErrorMessage(text);
    },
    setError(err) {
      this.loading = false;
      return this.$refs.form.setError(err);
    },
    genFormMounted() {
      this.$refs.form.setData(this.dataBeforeMount);
    },
    submit() {
      if (!this.loading) {
        this.loading = true;
        this.$refs.form.validateAndRun();
      }
    },
  },
  computed: {
    open() {
      return this.$refs.dialog.open;
    },
  },
};
</script>

<style scoped>

</style>
