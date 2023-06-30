<template>
  <div>
    <SettingTitle docPath="/guide/warning">{{ $t('warnings') }}</SettingTitle>
    <v-row>
      <v-col lg="8" xl="6">
        <h6 class="text-h6">{{ $t('general') }}</h6>
        <GenForm :form-schema="formSchema" ref="form" @submit="saveData" :settings-mode="true">
          <template slot="time_to_live-after">
            {{ $t('_warning.settingFormDesc') }}
          </template>
        </GenForm>
      </v-col>
    </v-row>
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
      (await openapi).warning_getConfig().then((rsp) => {
        const { data } = rsp;
        data.ban_length = rsp.data.ban_length / 60;
        this.$refs.form.setData(data);
      });
    },
    async saveData() {
      const data = this.$refs.form.getData();
      data.ban_length *= 60;
      (await openapi).warning_updateConfig(null, data).then(() => {
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.form.setError(err);
      });
    },
  },
};
</script>

<style scoped>

</style>
