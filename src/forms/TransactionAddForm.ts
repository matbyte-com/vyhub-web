import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'amount', 'description',
  ],
  properties: {
    description: {
      type: 'string',
      title: i18n.t('description'),
    },
    amount: {
      type: 'number',
      title: i18n.t('amount'),
    },
  },
};
