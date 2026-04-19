<template>
  <div>
    <SettingTitle doc-path="/game/discord">
      {{ $t('_authorization.title') }}
    </SettingTitle>
    <GenForm
      ref="form"
      :form-schema="AuthorizationSettingsFormSchema"
      :cancel-text="null"
      :submit-text="$t('save')"
      :action-button-top-margin="2"
      @submit="patchConfig"
    >
      <template #steam-api-key-hints>
        <v-alert
          class="mb-2"
          type="info"
          :bordered="false"
          :dense="true"
        >
          {{ $t('_authorization.steamApiKeyDescription') }}:
          <a
            href="https://steamcommunity.com/dev/apikey"
            target="_blank"
          >{{ $t('link') }}</a>
        </v-alert>
      </template>
    </GenForm>
  </div>
</template>

<script>
import AuthorizationSettingsForm from '@/forms/AuthorizationSettingsForm';
import EventBus from '@/services/EventBus';
import openapi from '../../api/openapi';
import config from '../../config';

export default {
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

        data.discord_redirect_url = `${this.backend_url}/auth/social/discord/finish`;

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
      if (data.steam_api_key === '***') delete data.steam_api_key;

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
