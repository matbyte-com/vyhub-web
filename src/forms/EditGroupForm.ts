import AddGroupForm from '@/forms/AddGroupForm';
import Property from '@/services/PropertyService';

export default {
  type: 'object',
  'x-display': 'tabs',
  'x-props': {
    grow: true,
  },
  allOf: [
    {
      title: 'general',
      type: 'object',
      properties: AddGroupForm.properties,
    },
    {
      titleK: 'properties',
      type: 'object',
      properties: {
        groupProperties: {
          type: 'array',
          titleK: 'properties',
          'x-display': 'checkbox',
          items: {
            type: 'string',
            enum: Object.keys(Property),
          },
        },
      },
    },
  ],
};
