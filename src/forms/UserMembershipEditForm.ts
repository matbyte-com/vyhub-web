import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'begin',
  ],
  layout: [
    {
      key: "begin"
    },
    {
      key: "end"
    },
    {
      name: "delete-membership"
    }
  ],
  properties: {
    begin: {
      type: 'string',
      title: i18n.global.t('begin'),
      format: 'date-time',
      default: (new Date()).toISOString(),
    },
    end: {
      type: ['string', 'null'],
      title: i18n.global.t('end'),
      format: 'date-time',
      description: i18n.global.t('_dashboard.labels.membershipEndDescription'),
    },
  },
};
