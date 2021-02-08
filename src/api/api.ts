import axios from 'axios';
import { throttleAdapterEnhancer } from 'axios-extensions';

if (axios.defaults.adapter === undefined) {
  throw new ReferenceError();
}

const http = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_CUSTOMER_URL,
  headers: { 'Cache-Control': 'no-cache' },
  adapter: throttleAdapterEnhancer(axios.defaults.adapter, { threshold: 2 * 1000 }),
});

// Adapter with 5 Minute Cache
const throttledHttp = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_CUSTOMER_URL,
  headers: { 'Cache-Control': 'no-cache' },
  adapter: throttleAdapterEnhancer(axios.defaults.adapter, { threshold: 300 * 1000 }),
});

export default {
  ban: {
    getBans() {
      return http.get('/ban');
    },
  },
  server: {
    getBundles() {
      return throttledHttp.get('/server/bundle');
    },
    getGroups() {
      return throttledHttp.get('/group');
    },
    getServer() {
      return http.get('/server/gameserver');
    },
  },
  user: {
    getMemberships(uuid: string) {
      return http.get(`/user/${uuid}/memberships`);
    },
    getUser(uuid: string) {
      return http.get(`/user/${uuid}`);
    },
    getAttributeDefinitions() {
      return throttledHttp.get('/user/attribute/definitions');
    },
    prepareSocialAuth() {
      return http.get('/auth/social/prepare', { withCredentials: true });
    },
    search(query: string) {
      return http.get('/user/', { params: { query } });
    },
  },
  design: {
    getTheme() {
      return throttledHttp.get('/design/theme');
    },
  },
  http,
  throttledHttp,
};
