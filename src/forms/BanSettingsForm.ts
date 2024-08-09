import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  properties: {
    ban_protest_url: {
      type: ['string', 'null'],
      title: i18n.global.t('_ban.externalProtestUrl'),
      'x-props': {
        placeholder: i18n.global.t('_ban.vyhubTicketSystem'),
        clearable: true,
      },
      description: i18n.global.t('_ban.externalProtestUrlDescription'),
      pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,10}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
    },
  },
};
