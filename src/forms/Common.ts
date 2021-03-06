import i18n from '@/plugins/i18n';

const API_URL = process.env.VUE_APP_BACKEND_CUSTOMER_URL;

export default {
  userSelectField: {
    type: 'object',
    title: i18n.t('user'),
    'x-fromUrl': `${API_URL}/user/?query={q}&max=10`,
    'x-itemKey': 'id',
    'x-itemTitle': 'username',
    'x-itemIcon': 'avatar',
  },
  serverbundleSelectField: {
    type: 'object',
    title: i18n.t('serverbundle'),
    'x-fromUrl': `${API_URL}/server/bundle/`,
    'x-itemKey': 'id',
    'x-itemTitle': 'name',
  },
  serverTypeSelectField: {
    type: 'string',
    title: i18n.t('type'),
    default: 'GMOD',
    'x-fromUrl': `${API_URL}/server/type/`,
  },
  colorPicker(title = 'color', description?: string) {
    const form = {
      type: 'string',
      title: i18n.t(title),
      format: 'hexcolor',
      default: '#000000',
      description: (description != null ? i18n.t(description) : null),
      'x-props': {
        showSwatches: true,
        hideCanvas: true,
        hideSliders: true,
        hideInputs: true,
        hideModeSwitch: true,
      },
    };
    return form;
  },
};
