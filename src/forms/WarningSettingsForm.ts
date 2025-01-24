import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: ['time_to_live', 'count_till_ban', 'ban_length'],
  layout: [
    {
      key: 'time_to_live',
    },
    {
      name: 'time_to_live-after'
    },
    {
      key: 'count_till_ban',
    },
    {
      key: 'ban_length',
    },
  ],
  properties: {
    time_to_live: {
      type: 'integer',
      title: i18n.global.t('_warning.ttl'),
      'x-props': {
        placeholder: i18n.global.t('_warning.ttlPlaceholder'),
      },
      description: i18n.global.t('_warning.ttlDescription'),
      layout: {
        slots: {
          'after': i18n.global.t('_warning.settingFormDesc'),
        }
      }

    },
    count_till_ban: {
      type: 'integer',
      title: i18n.global.t('_warning.countTillBan'),
      minimum: 0,
      description: i18n.global.t('_warning.countTillBanDesc'),
    },
    ban_length: {
      type: 'integer',
      'x-props': {
        placeholder: i18n.global.t('_ban.labels.lengthInMinutes'),
      },
      title: i18n.global.t('_warning.banLength'),
      minimum: 1,
    },
  },
};
