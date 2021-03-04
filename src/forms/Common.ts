const API_URL = process.env.VUE_APP_BACKEND_CUSTOMER_URL;

export default {
  userSelectField: {
    type: 'object',
    titleK: 'user',
    'x-fromUrl': `${API_URL}/user/?query={q}&max=10`,
    'x-itemKey': 'id',
    'x-itemTitle': 'username',
    'x-itemIcon': 'avatar',
  },
  serverbundleSelectField: {
    type: 'object',
    titleK: 'serverbundle',
    'x-fromUrl': `${API_URL}/server/bundle/`,
    'x-itemKey': 'id',
    'x-itemTitle': 'name',
  },
  serverTypeSelectField: {
    type: 'string',
    titleK: 'type',
    default: 'GMOD',
    'x-fromUrl': `${API_URL}/server/type/`,
  },
  colorPicker(title = 'color', description?: string) {
    const form = {
      type: 'string',
      titleK: title,
      format: 'hexcolor',
      default: '#000000',
      descriptionK: description,
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
