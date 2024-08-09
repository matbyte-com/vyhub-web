import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'begin',
  ],
  properties: {
    begin: {
      type: 'string',
      title: i18n.global.t('begin'),
      format: 'date-time',
      default: new Date(),
    },
    end: {
      type: 'string',
      title: i18n.global.t('end'),
      format: 'date-time',
      description: i18n.global.t('_dashboard.labels.membershipEndDescription'),
    },
  },
};
