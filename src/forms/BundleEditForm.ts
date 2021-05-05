import BundleAddForm from '@/forms/BundleAddForm';
import i18n from '@/plugins/i18n';

const API_URL = process.env.VUE_APP_BACKEND_CUSTOMER_URL;

const section1Properties: {[k: string]: any} = { ...BundleAddForm.returnForm(true).properties };

function returnForm(serverType: string) {
  section1Properties.defaultGroup = {
    type: 'string',
    title: i18n.t('settings.defaultGroup'),
    'x-fromUrl': `${API_URL}/group/?type=${serverType}`,
    'x-itemTitle': 'name',
    'x-itemKey': 'id',
  };

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
        properties: section1Properties,
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
            'x-fromUrl': `${API_URL}/server/?type=${serverType}`,
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
