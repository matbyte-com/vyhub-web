import Common from '@/forms/Common';
import i18n from '@/plugins/i18n';

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
        title: i18n.t('details'),
        type: 'object',
        properties: {
          name: {
            type: 'string',
            title: i18n.t('name'),
          },
          multigroup: {
            type: 'boolean',
            title: i18n.t('settings.multigroup'),
            description: i18n.t('settings.multigroupDescription'),
          },
          color: Common.colorPicker,
          icon: {
            type: 'string',
            title: i18n.t('icon'),
          },
        },
      },
      {
        title: i18n.t('server'),
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
