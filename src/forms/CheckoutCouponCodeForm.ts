import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'couponArray',
  ],
  properties: {
    couponArray: {
      type: 'array',
      'x-itemTitle': 'title',
      title: i18n.t('_shop.labels.couponCode'),
      items: {
        type: 'object',
        required: [
          'coupon',
        ],
        properties: {
          coupon: {
            type: 'string',
            title: i18n.t('_shop.labels.couponCode'),
          },
        },
      },
    },
  },
};
