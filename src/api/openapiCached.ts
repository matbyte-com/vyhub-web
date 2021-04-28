import OpenAPIClientAxios from 'openapi-client-axios';
import { Client } from '@/api/openapi.d';
import { throttleAdapterEnhancer } from 'axios-extensions';
import axios from 'axios';

const API_URL = process.env.VUE_APP_BACKEND_CUSTOMER_URL;

async function api() {
  if (axios.defaults.adapter == null) {
    throw new Error('axios not available.');
  }

  return new OpenAPIClientAxios({
    definition: `${API_URL}/openapi.json`,
    withServer: 'main',
    axiosConfigDefaults: {
      adapter: throttleAdapterEnhancer(axios.defaults.adapter, { threshold: 300 * 1000 }),
    },
  }).init<Client>();
}

export default api();
