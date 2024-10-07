<template>
  <div>
    <SettingTitle doc-path="/guide/warning">
      {{ $t('warnings') }}
    </SettingTitle>
    <v-row>
      <v-col
        lg="8"
        xl="6"
      >
        <h6 class="text-h6">
          {{ $t('general') }}
        </h6>
        <GenForm
          ref="form"
          :form-schema="formSchema"
          :settings-mode="true"
          @submit="saveData"
        >
          <slot name="time_to_live-after">
            {{ $t('_warning.settingFormDesc') }}
          </slot>
        </GenForm>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import WarningSettingsForm from '@/forms/WarningSettingsForm';
import openapi from '@/api/openapi';

export default {
  data() {
    return {
      formSchema: WarningSettingsForm,
    };
  },
  mounted() {
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
