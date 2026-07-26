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
    color: Common.colorPicker('color', undefined, undefined, true, 12),
    enabled: {
      type: 'boolean',
      title: i18n.global.t('enabled'),
      default: true,
    },
  },
};
