import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  'x-display': 'tabs',
  'x-props': {
    grow: true,
  },
  allOf: [
    {
      title: i18n.t('general'),
      type: 'object',
      required: [
        'name',
        'permission_level',
      ],
      properties: {
        name: {
          type: 'string',
          title: i18n.t('name'),
        },
        permission_level: {
          type: 'integer',
          title: i18n.t('settings.permissionLevel'),
          minimum: 0,
          maximum: 100000,
        },
        color: Common.colorPicker(),
      },
    },
    {
      title: i18n.t('properties'),
      type: 'object',
      properties: {
        properties: Common.propertiesSelector,
      },
    },
    {
      title: i18n.t('advancedProperties'),
      type: 'object',
      properties: {
        advanced_properties: Common.advancedProperties,
      },
    },
  ],
};
