import axios from 'axios';
// import { throttleAdapterEnhancer } from 'axios-extensions';
import qs from 'qs';
import config from '@/config';

// import { authGetTokenResponse } from './api.d';

if (axios.defaults.adapter === undefined) {
  throw new ReferenceError();
}

const http = axios.create({
  baseURL: config.backend_url,
  headers: { 'Cache-Control': 'no-cache' },
  // adapter: throttleAdapterEnhancer(axios.defaults.adapter, { threshold: 0 * 1000 }),
});

// Adapter with 5 Minute Cache
// TODO not correctly working at the moment
const throttledHttp = axios.create({
  baseURL: config.backend_url,
  headers: { 'Cache-Control': 'no-cache' },
  // adapter: throttleAdapterEnhancer(axios.defaults.adapter, { threshold: 2 * 1000 }),
});

export default {
  auth: {
    getToken(query: object) {
      // Was before TODO - maybe add typing again
      //       return http.post<authGetTokenResponse>('/auth/token', qs.stringify(query));
      return http.post('/auth/token', qs.stringify(query));
    },
    revokeToken(token: string, token_type: string) {
      return http.post('/auth/revoke', qs.stringify({ token, token_type }));
    },
  },
  http,
  throttledHttp,
};
