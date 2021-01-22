import axios from 'axios';
import { throttleAdapterEnhancer } from 'axios-extensions';

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
  },
  user: {
    getMemberships(uuid) {
      return http.get(`user/${uuid}/memberships`);
    },
    getUser(uuid) {
      return http.get(`user/${uuid}`);
    },
    getAttributeDefinitions() {
      return throttledHttp.get('user/attribute/definitions');
    },
  },
};
