import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: ['status'],
  properties: {
    status: {
      type: 'string',
      title: i18n.t('status'),
      oneOf: [
        {
          const: 'ENABLED',
          title: i18n.t('enabled'),
        },
        {
          const: 'DISABLED',
          title: i18n.t('disabled'),
        },
      ],
    },
    end: {
      type: ['string', 'null'],
      title: i18n.t('end'),
      format: 'date-time',
    },
  },
};
