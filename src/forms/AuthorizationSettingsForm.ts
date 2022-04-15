import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'name',
  ],
  allOf: [
    {
      properties: {
        discord: {
          type: 'boolean',
          'x-display': 'switch',
          title: i18n.t('_authorization.discord'),
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
        properties: {
          discord_key: {
            type: 'string',
            title: i18n.t('_authorization.discord_key'),
            pattern: '^[0-9]*$',
          },
          discord_secret: {
            type: 'string',
            title: i18n.t('_authorization.discord_secret'),
          },
        },
      },
    },
  ],
};
