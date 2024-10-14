import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: [
    'title', 'content', 'enabled',
  ],
  properties: {
    title: {
      type: 'string',
      title: i18n.global.t('_advert.formTitle'),
    },
    content: {
      type: 'string',
      title: i18n.global.t('_advert.formContent'),
      'x-display': 'textarea',
    },
    enabled: {
      type: 'boolean',
      title: i18n.global.t('_advert.formEnabled'),
      default: false,
    },
    color: Common.colorPicker(),
    serverbundle_id: {
      ...Common.serverbundleSelectField,
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
};
