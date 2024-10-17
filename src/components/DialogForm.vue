<template>
  <Dialog
    ref="dialog"
    v-bind="$attrs"
    :max-width="maxWidth"
    :title="title"
    :icon="icon"
    class=""
    @cancel="cancelForm"
  >
    <!-- TODO Keine Ahnung was das ist?? :text-class="formSchema.properties ? '' : 'pl-0 pr-0 pb-0'       style="overflow-x: hidden""-->
    <template
      v-if="formSchema"
    >
      <GenForm
        ref="form"
        :form-schema="formSchema"
        :error-message="errorMessage"
        :hide-buttons="true"
        :cancel-text="cancelText"
        :submit-text="submitText"
        :options-extra="optionsExtra"
        class="mt-1"
        @submit="$emit('submit', item)"
        @cancel="$refs.dialog.open = false; $emit('cancel');"
        @mounted="genFormMounted"
        @updated="$emit('updated')"
        @not-valid="loading=false;
                    $refs.form.$el.scrollIntoView({ block: 'start', behavior: 'smooth' });"
      >
        <template
          v-for="(index, name) in $slots"
          #[name]="scope"
        >
          <slot
            v-bind="scope ?? {}"
            :name="name"
          />
        </template>
      </GenForm>
    </template>
    <template
      v-if="submitText != null || cancelText != null"
      #actions
    >
      <v-btn
        v-if="submitText != null"
        variant="text"
        color="primary"
        @click="submit"
      >
        <v-progress-circular
          v-if="loading"
          indeterminate
          size="25"
          width="2"
        />
        <v-icon
          v-if="!loading"
          start
        >
          mdi-check
        </v-icon>
        <div v-if="!loading">
          {{ submitText }}
        </div>
      </v-btn>
      <v-btn
        v-if="cancelText != null"
        color="lighten-5"
        variant="text"
        @click="cancelForm"
      >
        <v-icon start>
          mdi-close
        </v-icon>
        {{ cancelText }}
      </v-btn>
    </template>
  </Dialog>
</template>

<script>
export default {
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
emits: ['submit', 'cancel', 'updated'],
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
  computed: {
    open() {
      return this.$refs.dialog.open;
    },
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
};
</script>

<style scoped>
</style>
