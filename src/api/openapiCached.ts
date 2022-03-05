import { throttleAdapterEnhancer } from 'axios-extensions';
import OpenAPIClientAxios from 'openapi-client-axios';
import axios from 'axios';
import { Client } from '@/api/openapi.d';
import store from '@/store';
import config from '@/config';

let headers = {};

if (store.getters.accessToken) {
  headers = { Authorization: `Bearer ${store.getters.accessToken}` };
}

async function api() {
  if (axios.defaults.adapter == null) {
    throw new Error('axios not available.');
  }

  return new OpenAPIClientAxios({
    definition: `${config.backend_url}/openapi.json`,
    withServer: 'main',
    axiosConfigDefaults: {
      adapter: throttleAdapterEnhancer(axios.defaults.adapter, { threshold: 300 * 1000 }),
      baseURL: config.backend_url,
      headers,
    },
  }).init<Client>();
}

export default api();
