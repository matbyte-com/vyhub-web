import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      title: i18n.global.t('title'),
      description: i18n.global.t('_settings.communityDescriptionDescr'),
    },
    description: {
      type: 'string',
      'x-display': 'textarea',
      title: i18n.global.t('_settings.communityDescription'),
      description: i18n.global.t('_settings.communityDescriptionDescr'),
    },
    favicon_url: {
      type: ['string', 'null'],
      layout: {
        slots: {
          component: 'custom-image'
        }
      },
    },
    image_url: {
      type: ['string', 'null'],
      layout: {
        slots: {
          component: 'custom-image-2'
        }
      },
    },
  },
};
