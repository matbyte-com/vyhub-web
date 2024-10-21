<template>
  <v-row>
    <v-col cols="12">
      <v-row v-if="alertMessage != null">
        <v-col
          cols="12"
          class="mt-4"
        >
          <v-alert :type="alertType">
            {{ alertMessage }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
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
                />
              </template>
            </v-jsf>
            <slot name="form-after" />
            <v-row v-if="!hideButtons && (submitText != null || cancelText != null)">
              <v-col
                cols="12"
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
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import VJsf from '@koumoul/vjsf';
import { v2compat } from "@koumoul/vjsf/compat/v2";
// import '@koumoul/vjsf/src/styles/vjsf.css'; // Maybe needed TODO
// import '@koumoul/vjsf/dist/main.css';
// import '@koumoul/vjsf/lib/deps/third-party';
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
      default: 'submit',
    },
    cancelText: {
      type: String,
      default: 'cancel',
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
        // TODO API Does not seem to be respected it was just axios before
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
    validateAndRun() {
      setTimeout(() => {
        if (this.$refs.form.validate()) {
          this.$emit('submit');
        } else {
          this.$emit('notValid');
          this.loading = false;
        }
      }, 500);
    },
    cancelForm() {
      this.loading = false;
      this.alertMessage = null;
      this.$refs.form.reset();
      this.formModel = null;
      this.$emit('cancel');
      this.forceRerender();
    },
    getData() {
      return { ...this.formModel };
    },
    setData(data) {
      // Copy data object to not modify the source object
      this.formModel = { ...data };
      this.forceRerender();
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
      this.componentKey += 1;
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
