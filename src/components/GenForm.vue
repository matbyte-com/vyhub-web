<template>
  <v-row>
    <v-col cols="12">
      <v-row v-if="errorMessage != null">
        <v-col cols="12" class="mt-4">
          <v-alert
            type="error"
          >
            {{ errorMessage }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-form ref="form" @submit.prevent="validateAndRun">
            <v-jsf v-model="formModel"
                   :schema="formSchema"
                   :options="options"
                   @input="$emit('updated')"
                   :key="componentKey">
              <template v-for="(index, name) in $slots" v-slot:[name]>
                <slot :name="name"/>
              </template>
            </v-jsf>
            <v-row v-if="!hideButtons && (submitText != null || cancelText != null)">
              <v-col cols="12" :class="`mt-${actionButtonTopMargin}`">
                <v-btn v-if="submitText != null" class="mr-4"
                       depressed color="primary" type="submit" :loading="loading">
                  <span v-if="!settingsMode">{{ submitText }}</span>
                  <span v-else>{{ $t('save') }}</span>
                </v-btn>

                <v-btn v-if="cancelText != null && !settingsMode"
                       color="lighten-5" depressed @click="cancelForm">
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
import '@koumoul/vjsf/dist/main.css';
import '@koumoul/vjsf/lib/deps/third-party';
import axios from 'axios';
import i18n from '../plugins/i18n';

export default {
  name: 'GenForm',
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
  methods: {
    validateAndRun() {
      if (this.$refs.form.validate()) {
        this.$emit('submit');
      } else {
        this.$emit('notValid');
        this.loading = false;
      }
    },
    cancelForm() {
      this.loading = false;
      this.errorMessage = null;
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
      this.errorMessage = text;
    },
    forceRerender() {
      this.componentKey += 1;
    },
  },
  data() {
    return {
      errorMessage: null,
      valid: false,
      optionsBase: {
        // TODO: Maybe use i18n.locale again
        locale: navigator.language.split('-')[0], // i18n.locale,
        httpLib: axios,
        timePickerProps: {
          format: '24hr',
        },
        markdownit: {
          html: true,
        },
      },
      formModel: null,
      loading: false,
      componentKey: 1,
    };
  },
  mounted() {
    this.$emit('mounted');
  },
  computed: {
    options() {
      if (this.optionsExtra == null) {
        return this.optionsBase;
      }
      return { ...this.optionsBase, ...this.optionsExtra };
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
