import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'title',
  ],
  properties: {
    title: {
      type: 'string',
      title: i18n.t('_faq.formTitle'),
    },
  },
};
