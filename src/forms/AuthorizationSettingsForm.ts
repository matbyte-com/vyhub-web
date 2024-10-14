import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  allOf: [
    {
      properties: {
        discord: {
          type: 'boolean',
          layout: {
            comp: 'switch',
          },
          title: i18n.global.t('discord'),
          default: false,
        },
      },
      dependentSchemas: {
        discord: {
          if: {
            properties: {
              discord: {
                const: true,
              }
            }
          },
          then: {
            required: [
              'discord_oauth_client_id', 'discord_oauth_client_secret', 'discord_bot_token',
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
            }
          }
        }
      },
    },
  ],
};
