<template>
  <v-row>
    <v-col cols="12">
      <v-row v-if="errorMessage != null">
        <v-col cols="12" class="mt-4">
          <v-alert
            color="red"
            type="error"
          >
            {{ errorMessage }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-form ref="form" v-model="valid">
            <v-jsf v-model="formModel" :schema="formSchema" />
          </v-form>
        </v-col>
      </v-row>
      <v-row v-if="submitText != null || cancelText != null">
        <v-col cols="12">
          <v-btn v-if="submitText != null" class="mr-4" color="primary"
                 @click="submitForm()">
            {{ $t(submitText) }}
          </v-btn>

          <v-btn v-if="cancelText != null" color="lighten-5" @click="cancelForm">
            {{ $t(cancelText) }}
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import VJsf from '@koumoul/vjsf';
import '@koumoul/vjsf/dist/main.css';
import '@koumoul/vjsf/lib/deps/third-party';

export default {
  name: 'GenForm',
  components: {
    VJsf,
  },
  props: {
    formSchema: Object,
    formModel: Object,
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
    submitForm() {
      if (this.$refs.form.validate()) {
        this.$emit('submit');
      }
    },
    cancelForm() {
      this.$emit('cancel');
    },
  },
  data() {
    return {
      valid: false,
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

      this.formSchema.properties[property].title = this.$t(`${propertyTitle}`);

      if (propertyDesc != null) {
        this.formSchema.properties[property].description = this.$t(`${propertyDesc}`);
      }
    }
  },
};
</script>

<style scoped>

</style>
