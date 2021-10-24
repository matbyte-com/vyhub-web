import GroupAddForm from '@/forms/GroupAddForm';
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
      properties: GroupAddForm.properties,
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
