import OpenAPIClientAxios from 'openapi-client-axios';
import { Client } from '@/api/openapi.d';
import store from '@/store';
import config from '@/config';

let headers = {};

if (store.getters.accessToken) {
  headers = { Authorization: `Bearer ${store.getters.accessToken}` };
}

function api() {
  return new OpenAPIClientAxios({
    definition: `${config.backend_url}/openapi.json`,
    withServer: 'main',
    axiosConfigDefaults: {
      withCredentials: true,
      baseURL: config.backend_url,
      headers,
    },
  }).init<Client>();
}

export default api();
