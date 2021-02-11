<template>
  <v-row @keyup.enter="submitForm">
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
            <v-row>
              <v-col cols="12">
                <v-jsf v-model="formModel" :schema="formSchema" :options="options"/>
              </v-col>
            </v-row>

            <v-row v-if="submitText != null || cancelText != null">
              <v-col cols="12">
                <v-btn v-if="submitText != null" class="mr-4"
                       depressed color="primary" type="submit">
                  {{ submitText }}
                </v-btn>

                <v-btn v-if="cancelText != null" color="lighten-5" depressed @click="cancelForm">
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
import i18n from '@/plugins/i18n';
import axios from 'axios';

export default {
  name: 'GenForm',
  components: {
    VJsf,
  },
  props: {
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
  },
  methods: {
    validateAndRun() {
      if (this.$refs.form.validate()) {
        this.$emit('submit');
      }
    },
    cancelForm() {
      this.errorMessage = null;
      this.$refs.form.reset();
      this.$emit('cancel');
    },
    getData() {
      return this.formModel;
    },
  },
  data() {
    return {
      valid: false,
      options: {
        locale: 'en',
        httpLib: axios,
      },
      formModel: null,
    };
  },
  created() {
    for (
      let index = 0;
      index < Object.keys(this.formSchema.properties).length;
      index += 1
    ) {
      const property = Object.keys(this.formSchema.properties)[index];
      const propertyTitle = this.formSchema.properties[property].titleK;
      const propertyDesc = this.formSchema.properties[property].descriptionK;

      if (propertyTitle != null) {
        this.formSchema.properties[property].title = this.$t(`${propertyTitle}`);
      }

      if (propertyDesc != null) {
        this.formSchema.properties[property].description = this.$t(`${propertyDesc}`);
      }
    }
    this.options.locale = i18n.locale;
  },
};
</script>

<style scoped>

</style>
