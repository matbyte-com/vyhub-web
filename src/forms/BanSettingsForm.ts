import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  properties: {
    ban_protest_url: {
      type: ['string', 'null'],
      title: i18n.t('_ban.externalProtestUrl'),
      'x-props': {
        placeholder: i18n.t('_ban.vyhubTicketSystem'),
        clearable: true,
      },
      description: i18n.t('_ban.externalProtestUrlDescription'),
    },
  },
};
