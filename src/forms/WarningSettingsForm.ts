import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: ['time_to_live', 'count_till_ban'],
  properties: {
    count_till_ban: {
      type: 'integer',
      title: i18n.t('_warning.countTillBan'),
      minimum: 0,
      description: i18n.t('_warning.countTillBanDesc'),
    },
    time_to_live: {
      type: 'string',
      title: i18n.t('_warning.ttl'),
      description: i18n.t('_warning.ttlDescription'),
    },
  },
};
