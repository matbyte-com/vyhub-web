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
    'x-fromUrl': `${API_URL}/server/type/`,
  },
};
