<template>
  <v-row @keydown.enter="validateAndRun">
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
                <v-jsf v-model="formModel"
                       :schema="formSchema"
                       :options="options"
                       @input="$emit('updated')">
                  <template v-for="(index, name) in $slots" v-slot:[name]>
                    <slot :name="name"/>
                  </template>
                </v-jsf>
              </v-col>
            </v-row>

            <v-row v-if="!hideButtons && (submitText != null || cancelText != null)">
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
    setData(data) {
      // Copy data object to not modify the source object
      this.formModel = { ...data };
    },
    setErrorMessage(text) {
      this.errorMessage = text;
    },
  },
  data() {
    return {
      errorMessage: null,
      valid: false,
      options: {
        locale: 'en',
        httpLib: axios,
        markdownit: {
          html: true,
        },
      },
      formModel: null,
    };
  },
  created() {
    if (!this.formSchema.allOf) {
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
    }
    if (this.formSchema.allOf) {
      for (
        let index = 0;
        index < this.formSchema.allOf.length;
        index += 1
      ) {
        for (
          let innerIndex = 0;
          innerIndex < Object.keys(this.formSchema.allOf[index].properties).length;
          innerIndex += 1
        ) {
          const property = Object.keys(this.formSchema.allOf[index].properties)[innerIndex];
          const propertyTitle = this.formSchema.allOf[index].properties[property].titleK;
          const propertyDesc = this.formSchema.allOf[index].properties[property].descriptionK;

          if (propertyTitle != null) {
            this.formSchema.allOf[index].properties[property].title = this.$t(`${propertyTitle}`);
          }

          if (propertyDesc != null) {
            this.formSchema.allOf[index].properties[property].description = this.$t(`${propertyDesc}`);
          }
        }

        const sectionTitle = this.formSchema.allOf[index].titleK;
        const sectionDesc = this.formSchema.allOf[index].decriptionK;

        if (sectionTitle != null) {
          this.formSchema.allOf[index].title = this.$t(`${sectionTitle}`);
        }

        if (sectionDesc != null) {
          this.formSchema.allOf[index].description = this.$t(`${sectionDesc}`);
        }
      }
    }
    this.options.locale = i18n.locale;
  },
  mounted() {
    this.$emit('mounted');
  },
};
</script>

<style scoped>

</style>
