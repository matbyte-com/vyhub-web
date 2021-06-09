<template>
  <div>
    <SettingTitle>{{ $t('general') }}</SettingTitle>
    <GenForm :form-schema="formSchema" :error-message="errorMessage" :cancel-text="$t('cancel')"
             :submit-text="$t('submit')" ref="form" @submit="saveData"/>
  </div>
</template>

<script>
import GenForm from '@/components/GenForm.vue';
import SettingsGeneralFormSchema from '@/forms/SettingsGeneralForm';
import SettingTitle from './SettingTitle.vue';

export default {
  name: 'General',
  components: { SettingTitle, GenForm },
  data() {
    return {
      formSchema: SettingsGeneralFormSchema,
      errorMessage: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      console.log('12');
    },
    saveData() {
      const data = this.$refs.form.getData();
    },
  },
};
</script>

<style scoped>

</style>
