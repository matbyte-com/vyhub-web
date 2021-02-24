import Common from '@/forms/Common';

const API_URL = process.env.VUE_APP_BACKEND_CUSTOMER_URL;

export default {
  type: 'object',
  required: [
    'name',
    'serverType',
  ],
  properties: {
    name: {
      type: 'string',
      titleK: 'name',
    },
    multigroup: {
      type: 'boolean',
      titleK: 'settings.multigroup',
      descriptionK: 'settings.multigroupDescription',
    },
    color: Common.colorPicker,
    icon: {
      type: 'string',
      titleK: 'icon',
    },
    serverType: Common.serverTypeSelectField,
  },
  dependencies: {
    serverType: {
      properties: {
        defaultgroup: {
          type: 'string',
          titleK: 'settings.defaultGroup',
          'x-fromUrl': `${API_URL}/group/?_type={serverType}`,
          'x-itemTitle': 'name',
          'x-itemKey': 'id',
        },
      },
    },
  },
};
