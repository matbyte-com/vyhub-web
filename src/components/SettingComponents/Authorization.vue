<template>
  <div>
    <SettingTitle doc-path="/guide/authorization">
      {{ $t('_authorization.title') }}
    </SettingTitle>
    <span>
      {{ `Discord ${$t('_authorization.redirectUrl')}: ${backend_url}/auth/social/discord/finish` }}
    </span>
    <GenForm
      ref="form"
      :form-schema="AuthorizationSettingsFormSchema"
      :cancel-text="null"
      :submit-text="$t('save')"
      @submit="patchConfig"
    />
  </div>
</template>

<script>
import GenForm from '@/components/GenForm.vue';
import AuthorizationSettingsForm from '@/forms/AuthorizationSettingsForm';
import EventBus from '@/services/EventBus';
import openapi from '../../api/openapi';
import SettingTitle from './SettingTitle.vue';
import config from '../../config';

export default {
  name: 'Discord.vue',
  components: { GenForm, SettingTitle },
  data() {
    return {
      AuthorizationSettingsFormSchema: AuthorizationSettingsForm,
      backend_url: config.backend_url,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).auth_getAuthConfig().then((rsp) => {
        const { data } = rsp;
        if (rsp.data.discord_oauth_client_id) {
          data.discord = true;
        }
        this.$refs.form.setData(data);
      });
    },
    async patchConfig() {
      const data = this.$refs.form.getData();
      if (data.discord === false) {
        data.discord_oauth_client_id = null;
        data.discord_oauth_client_secret = null;
        data.discord_bot_token = null;
      }
      if (data.discord_oauth_client_secret === '***') delete data.discord_oauth_client_secret;
      if (data.discord_bot_token === '***') delete data.discord_bot_token;

      Object.entries(data).forEach(([key, value]) => {
        if (value === '') {
          data[key] = null;
        }
      });

      (await openapi).auth_editAuthConfig(null, data).then((rsp) => {
        EventBus.emit('social_config_edited'); // caught in link account dialog
        this.fetchData();
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
