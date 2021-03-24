import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'title',
    'linkType',
  ],
  properties: {
    title: {
      type: 'string',
      title: i18n.t('title'),
    },
    linkType: {
      type: 'string',
      title: i18n.t('type'),
      oneOf: [
        {
          const: 'link',
          title: i18n.t('settings.externalLink'),
        },
        {
          const: 'html',
          title: i18n.t('settings.html'),
        },
      ],
    },
  },
};
