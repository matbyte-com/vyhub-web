import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: ['name', 'enabled'],
  properties: {
    name: {
      type: 'string',
      title: i18n.global.t('name'),
    },
    image_url: {
      type: ['string', 'null'],
      layout: {
        slots: {
          component: 'custom-image'
        },
      },
    },
    enabled: {
      type: 'boolean',
      title: i18n.global.t('enabled'),
      default: true,
    },
  },
};
