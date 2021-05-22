import OpenAPIClientAxios from 'openapi-client-axios';
import { Client } from '@/api/openapi.d';
import store from '@/store';

const API_URL = process.env.VUE_APP_BACKEND_CUSTOMER_URL;

let headers = {};

if (store.getters.accessToken) {
  headers = { Authorization: `Bearer ${store.getters.accessToken}` };
}

function api() {
  return new OpenAPIClientAxios({
    definition: `${API_URL}/openapi.json`,
    withServer: 'main',
    axiosConfigDefaults: {
      headers,
    },
  }).init<Client>();
}

export default api();
