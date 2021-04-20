import OpenAPIClientAxios from 'openapi-client-axios';
import { Client } from '@/api/openapi.d';

const API_URL = process.env.VUE_APP_BACKEND_CUSTOMER_URL;

function api() {
  return new OpenAPIClientAxios({
    definition: `${API_URL}/openapi.json`,
    withServer: 'main',
  }).init<Client>();
}

export default api();
