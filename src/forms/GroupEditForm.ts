import GroupAddForm from '@/forms/GroupAddForm';
import Property from '@/services/PropertyService';
import i18n from '@/plugins/i18n';

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
        groupProperties: {
          type: 'array',
          title: i18n.t('properties'),
          'x-display': 'checkbox',
          items: {
            type: 'string',
            enum: Object.values(Property),
          },
        },
      },
    },
  ],
};
