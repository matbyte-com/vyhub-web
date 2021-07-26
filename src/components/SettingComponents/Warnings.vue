<template>
  <div>
    <SettingTitle>{{ $t('warnings') }}</SettingTitle>
    <GenForm :form-schema="formSchema" ref="form" @submit="saveData" :settings-mode="true">
      <template slot="time_to_live-after">
        {{ $t('_warning.settingFormDesc') }}
      </template>
    </GenForm>
  </div>
</template>

<script>
import SettingTitle from '@/components/SettingComponents/SettingTitle.vue';
import GenForm from '@/components/GenForm.vue';
import WarningSettingsForm from '@/forms/WarningSettingsForm';
import openapi from '@/api/openapi';

export default {
  name: 'Warnings.vue',
  components: {
    SettingTitle,
    GenForm,
  },
  data() {
    return {
      formSchema: WarningSettingsForm,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).warning_getWarningConfig().then((rsp) => {
        const { data } = rsp;
        data.ban_length = rsp.data.ban_length / 60;
        data.time_to_live = 12;
        this.$refs.form.setData(data);
        // TODO why is the time to live value not updated and shown?
        console.log(data);
        console.log(this.$refs.form.getData());
      });
    },
    async saveData() {
      const data = this.$refs.form.getData();
      data.ban_length *= 60;
      (await openapi).warning_updateWarningConfig(null, data).then(() => {
        this.$notify({
          title: this.$t('settingsSaveSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.form.setErrorMessage(err.response.data.detail);
      });
    },
  },
};
</script>

<style scoped>

</style>
