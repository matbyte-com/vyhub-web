import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: ['name', 'enabled'],
  properties: {
    name: {
      type: 'string',
      title: i18n.t('name'),
    },
    image_url: {
      ...Common.imageURLField,
      description: i18n.t('_packetCategory.labels.imageDetail'),
    },
    enabled: {
      type: 'boolean',
      title: i18n.t('enabled'),
      default: true,
    },
  },
};
