<template>
  <div>
    <SettingTitle>{{ $t('_authorization.title') }}</SettingTitle>
    <GenForm ref="form" :form-schema="AuthorizationSettingsFormSchema" @submit="patchConfig">
    </GenForm>
  </div>
</template>

<script>
import SettingTitle from './SettingTitle.vue';
import openapi from '../../api/openapi';
import GenForm from '@/components/GenForm.vue';
import AuthorizationSettingsForm from '@/forms/AuthorizationSettingsForm';
import EventBus from '@/services/EventBus';

export default {
  name: 'Discord.vue',
  components: { GenForm, SettingTitle },
  data() {
    return {
      AuthorizationSettingsFormSchema: AuthorizationSettingsForm,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).auth_getAuthConfig().then((rsp) => {
        const { data } = rsp;
        if (rsp.data.discord_key) {
          data.discord = true;
        }
        this.$refs.form.setData(data);
      });
    },
    async patchConfig() {
      const data = this.$refs.form.getData();
      if (data.discord === false) {
        data.discord_key = null;
        data.discord_secret = null;
      }
      (await openapi).auth_editAuthConfig(null, data).then((rsp) => {
        EventBus.emit('social_config_edited'); // caught in link account dialog
        this.fetchData();
        this.$notify({
          title: this.$t('_authorization.messages.editedConfig'),
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
