<template>
  <div>
    <SettingTitle>{{ $t('general') }}</SettingTitle>
    <GenForm :form-schema="formSchema" :cancel-text="$t('cancel')"
             :submit-text="$t('submit')" ref="form" @submit="saveData"/>
  </div>
</template>

<script>
import GenForm from '@/components/GenForm.vue';
import SettingsGeneralFormSchema from '@/forms/SettingsGeneralForm';
import openapi from '@/api/openapi';
import EventBus from '@/services/EventBus';
import SettingTitle from './SettingTitle.vue';

export default {
  name: 'General',
  components: { SettingTitle, GenForm },
  data() {
    return {
      formSchema: SettingsGeneralFormSchema,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).design_getGeneralSettings().then((rsp) => {
        this.$refs.form.setData(rsp.data);
      });
    },
    async saveData() {
      const data = this.$refs.form.getData();
      (await openapi).design_editGeneralSettings(null, data).then(() => {
        // caught in App.vue to Update Theme + Header
        EventBus.emit('themeUpdated');
      }).catch((err) => {
        this.$refs.form.setErrorMessage(err.response.data.detail);
      });
    },
  },
};
</script>

<style scoped>

</style>
