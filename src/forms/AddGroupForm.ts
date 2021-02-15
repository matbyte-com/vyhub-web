import Common from '@/forms/Common';

export default {
  type: 'object',
  required: [
    'name',
    'permissionLevel',
    'serverbundle',
  ],
  properties: {
    name: {
      type: 'string',
      titleK: 'name',
    },
    permissionLevel: {
      type: 'integer',
      titleK: 'settings.permissionLevel',
      minimum: 0,
      maximum: 100,
    },
    serverbundle: Common.serverbundleSelectField,
    color: Common.colorPicker,
  },
};
