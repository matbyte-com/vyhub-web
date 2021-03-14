<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    max-width="500">
    <v-card>
      <v-card-title class="grey lighten-3">
        <v-icon :if="titleIcon != null" class="mr-1">{{ titleIcon }}</v-icon>
        <span class="headline">{{ title }}</span>
        <v-spacer />
        <v-icon @click="$refs.form.cancelForm()">mdi-close</v-icon>
      </v-card-title>
      <v-card-text style="overflow: hidden" :class="formSchema.properties ? '' : 'pl-0 pr-0'">
        <GenForm :form-schema="formSchema" @submit="$emit('submit', item)"
                 :error-message="errorMessage" :hide-buttons="true"
                 :cancel-text="cancelText" :submit-text="submitText"
                 @cancel="dialog = false"
                 ref="form"
                 @mounted="genFormMounted"
                 @updated="$emit('updated')"
                 @notValid="loading=false"
                 >
          <template v-for="(index, name) in $slots" v-slot:[name]>
            <slot :name="name"/>
          </template>
        </GenForm>
      </v-card-text>
      <v-card-actions v-if="submitText != null || cancelText != null"
                      class="grey lighten-3">
            <v-btn v-if="submitText != null" class="mr-4"
                   depressed color="primary" @click="submit">
              <v-progress-circular v-if="loading" indeterminate size="25" width="2"/>
              <span v-else>{{ submitText }}</span>
            </v-btn>

            <v-btn v-if="cancelText != null" color="lighten-5"
                   depressed @click="cancelForm">
              {{ cancelText }}
            </v-btn>
      </v-card-actions>
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
      dialog: false,
      item: null,
      loading: false,
    };
  },
  methods: {
    show(item) {
      this.dialog = true;
      this.item = item;
    },
    closeAndReset() {
      this.loading = false;
      this.dialog = false;
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
    setErrorMessage(text) {
      this.loading = false;
      return this.$refs.form.setErrorMessage(text);
    },
    genFormMounted() {
      this.$refs.form.setData(this.dataBeforeMount);
    },
    submit() {
      this.loading = true;
      this.$refs.form.validateAndRun();
    },
  },
};
</script>

<style scoped>

</style>
