import OpenAPIClientAxios from 'openapi-client-axios';
import { Client } from './openapi.d';
import qs from 'qs';
import store from '@/store';
import config from '@/config';

let headers = {};

if (store.getters.accessToken) {
  headers = { common: { Authorization: `Bearer ${store.getters.accessToken}` } };
}

function api() {
  return new OpenAPIClientAxios({
    definition: `${config.backend_url}/openapi.json`,
    withServer: 'main',
    axiosConfigDefaults: {
      withCredentials: true,
      baseURL: config.backend_url,
      // needed to match the fast-api required input type
      paramsSerializer: (params) => {
        return qs.stringify(params, {arrayFormat: 'repeat'})
      },
      headers,
    },
  }).init<Client>();
}

export default api();
