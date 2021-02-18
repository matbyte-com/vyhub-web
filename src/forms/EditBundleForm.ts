import Common from '@/forms/Common';

const API_URL = process.env.VUE_APP_BACKEND_CUSTOMER_URL;

function returnForm(serverType: string) {
  const config = {
    type: 'object',
    'x-display': 'tabs',
    'x-props': {
      grow: true,
    },
    allOf: [
      {
        title: 'section1',
        titleK: 'details',
        type: 'object',
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
        },
      },
      {
        title: 'section2',
        titleK: 'server',
        type: 'object',
        properties: {
          serverSelect: {
            type: 'array',
            items: {
              type: 'string',
            },
            title: 'Server',
            'x-fromUrl': `${API_URL}/server/?_type=${serverType}`,
            'x-itemTitle': 'name',
            'x-itemKey': 'id',
            'x-display': 'checkbox',
          },
        },
      },
    ],
  };
  return config;
}

export default {
  returnForm,
};
