import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'message',
  ],
  properties: {
    message: {
      type: 'string',
      title: i18n.global.t('message'),
    },
  },
};
