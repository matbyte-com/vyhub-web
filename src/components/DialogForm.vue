<template>
  <v-dialog
    v-model="dialog"
    width="500">
    <v-card class="pa-3">
      <GenForm :form-schema="formSchema" :form-model="formModel" @submit="$emit('submit')"
               :error-message="errorMessage"
               :cancel-text="cancelText" :submit-text="submitText"
               @cancel="dialog = false"
               >
      </GenForm>
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
    formSchema: null, // VJSF schema
    formModel: null, // data model
    errorMessage: null, // error message variable
    cancelText: null,
    submitText: null,
  },
  data() {
    return {
      dialog: null,
    };
  },
};
</script>

<style scoped>

</style>
