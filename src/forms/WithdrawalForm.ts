import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: ['name', 'email', 'purchaseDate'],
  properties: {
    name: {
      type: 'string',
      title: i18n.global.t('_withdrawal.name'),
      maxLength: 100,
    },
    email: {
      type: 'string',
      format: 'email',
      title: i18n.global.t('_withdrawal.email'),
    },
    purchaseDate: {
      type: 'string',
      format: 'date',
      title: i18n.global.t('_withdrawal.purchaseDate'),
    },
    purchaseId: {
      type: 'string',
      title: i18n.global.t('_withdrawal.purchaseId'),
      maxLength: 100,
    },
    comment: {
      type: 'string',
      title: i18n.global.t('_withdrawal.comment'),
      description: i18n.global.t('_withdrawal.commentPlaceholder'),
      // Merged with the purchase fields into the endpoint's `text`, which caps at 2000.
      maxLength: 1800,
      'x-display': 'textarea',
    },
  },
};
