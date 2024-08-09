import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  allOf: [
    {
      properties: {
        discord: {
          type: 'boolean',
          'x-display': 'switch',
          title: i18n.global.t('discord'),
          default: false,
        },
      },
      if: {
        required: [
          'discord',
        ],
        properties: {
          discord: {
            const: true,
          },
        },
      },
      then: {
        required: [
          'discord_key', 'discord_secret',
        ],
        properties: {
          discord_oauth_client_id: {
            type: 'string',
            title: i18n.global.t('_authorization.discordOauthClientId'),
            pattern: '^[0-9]*$',
            default: '',
          },
          discord_oauth_client_secret: {
            type: 'string',
            title: i18n.global.t('_authorization.discordOauthClientSecret'),
            default: '',
          },
          discord_bot_token: {
            type: 'string',
            title: i18n.global.t('_authorization.discordBotToken'),
            default: '',
          },
        },
      },
    },
  ],
};
