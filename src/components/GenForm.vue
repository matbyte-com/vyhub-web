<template>
  <div>
    <div
      v-if="alertMessage != null"
      class="mt-4"
    >
      <v-alert :type="alertType">
        {{ alertMessage }}
      </v-alert>
    </div>
    <slot name="form-before" />
    <div class="mt-4">
      <v-form
        ref="form"
        @submit.prevent="validateAndRun"
      >
        <v-jsf
          ref="vjsf"
          :key="componentKey"
          v-model="formModel"
          :schema="compatSchema"
          :options="options"
          @update:model-value="$emit('updated')"
        >
          <template
            v-for="(_, name) in $slots"
            #[name]="scope"
          >
            <slot
              :name="name"
              v-bind="scope ?? {}"
              :form-model="formModel"
            />
          </template>
        </v-jsf>
        <slot name="form-after" />
        <div
          v-if="!hideButtons && (submitText != null || cancelText != null)"
          :class="`mt-${actionButtonTopMargin}`"
        >
          <v-btn
            v-if="submitText != null"
            class="mr-4"
            variant="flat"
            color="primary"
            type="submit"
            :loading="loading"
          >
            <span v-if="!settingsMode">{{ submitText }}</span>
            <span v-else>{{ $t('save') }}</span>
          </v-btn>

          <v-btn
            v-if="cancelText != null && !settingsMode"
            color="lighten-5"
            variant="flat"
            @click="cancelForm"
          >
            {{ cancelText }}
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import VJsf from '@koumoul/vjsf';
import { v2compat } from "@koumoul/vjsf/compat/v2";
import i18n from '../plugins/i18n';
import axios from "axios";

export default {
  components: {
    VJsf,
  },
  props: {
    formSchema: Object,
    submitText: {
      type: String,
      default: i18n.global.t('submit'),
    },
    cancelText: {
      type: String,
      default: i18n.global.t('cancel'),
    },
    hideButtons: {
      type: Boolean,
      default: false,
    },
    optionsExtra: Object,
    settingsMode: {
      type: Boolean,
      default: false,
    },
    actionButtonTopMargin: {
      type: Number,
      default: 0,
    },
  },
  emits: ['updated', 'mounted', 'submit', 'notValid', 'cancel'],
  data() {
    return {
      alertMessage: null,
      alertType: 'error',
      valid: false,
      optionsBase: {
        locale: i18n.global.locale, // i18n.locale,
        httpLib: axios,
        density: 'comfortable',
        timePickerProps: {
          format: '24hr',
        },
        markdownItOptions: {
          html: true,
        },
      },
      formModel: null,
      loading: false,
      componentKey: 1,
    };
  },
  computed: {
    options() {
      if (this.optionsExtra == null) {
        return this.optionsBase;
      }
      return { ...this.optionsBase, ...this.optionsExtra };
    },
    compatSchema() {
      return v2compat(this.formSchema);
    },
  },
  mounted() {
    this.$emit('mounted');
  },
  methods: {
    async validateAndRun() {
      this.clearErrors();

      setTimeout(async () => {
        const result = await this.$refs.form.validate();

        const valid = result.valid;

        if (valid === true) {
          console.log('Form is valid');
          this.$emit('submit');
        } else {
          console.log('Form is not valid');
          console.log(result.errors);
          this.$emit('notValid');
          this.loading = false;
        }
      }, 500);
    },
    async cancelForm() {
      this.loading = false;
      this.alertMessage = null;
      // Remount v-jsf (via componentKey) instead of Vuetify's form.reset(). Resetting each
      // input imperatively breaks vjsf's internal node tree for oneOf schemas (a child input
      // resets after its parent oneOf node is gone -> "parent with key not found").
      this.formModel = null;
      this.componentKey += 1;
      this.$emit('cancel');
    },
    getData() {
      return { ...this.formModel };
    },
    setData(data) {
      // Copy data object to not modify the source object
      this.formModel = { ...data };
      this.forceRerender();
    },
    clearErrors() {
      this.alertMessage = null;
    },
    setErrorMessage(text) {
      this.loading = false;
      this.alertMessage = text;
      this.alertType = 'error';
    },
    setError(err) {
      this.setErrorMessage(this.utils.formatErrorMessage(err).text);
    },
    setSuccessMessage(text) {
      this.loading = false;
      this.alertMessage = text;
      this.alertType = 'success';
    },
    forceRerender() {
      //this.componentKey += 1;
    },
  },
  /* watch: {
    formModel() {
      console.log(this.formModel);
    },
  }, */
};
</script>

<style scoped>

</style>
