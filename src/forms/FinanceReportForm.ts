import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'start',
    'end',
  ],
  properties: {
    start: {
      type: 'string',
      format: 'date',
      title: i18n.global.t('start'),
    },
    end: {
      type: 'string',
      format: 'date',
      title: i18n.global.t('end'),
    },
  },
};
