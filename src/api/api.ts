/* eslint-disable @typescript-eslint/camelcase */

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
      return http.get('/ban/');
    },
    addBan(userId: string, reason: string, length: number, serverbundleId: string) {
      return http.post('/ban/', {
        user_id: userId,
        reason,
        length,
        serverbundle_id: serverbundleId,
      });
    },
    editBan(banId: string, reason: string, length: number, serverbundleId: string) {
      return http.patch(`/ban/${banId}`, {
        reason,
        length,
        serverbundle_id: serverbundleId,
      });
    },
    editBanStatus(banId: string, status: string) {
      return http.patch(`/ban/${banId}`, {
        status,
      });
    },
    deleteBan(banId: string) {
      return http.delete(`/ban/${banId}`);
    },
  },
  server: {
    getBundles() {
      return throttledHttp.get('/server/bundle/');
    },
    getGroups() {
      return throttledHttp.get('/group/');
    },
    getServer() {
      return http.get('/server/');
    },
    addBundle(name: string, type: string, multigroup: boolean, default_group_id: string) {
      return http.post('/server/bundle', {
        name,
        server_type: type,
        default_group_id,
        multigroup,
      });
    },
    deleteBundle(uuid: string) {
      return http.delete(`server/bundle/${uuid}`);
    },
    deleteServer(uuid: string) {
      return http.delete(`server/${uuid}`);
    },
  },
  user: {
    getMemberships(uuid: string) {
      return http.get(`/user/${uuid}/memberships/`);
    },
    getUser(uuid: string) {
      return http.get(`/user/${uuid}/`);
    },
    getAttributeDefinitions() {
      return throttledHttp.get('/user/attribute/definitions/');
    },
    prepareSocialAuth() {
      return http.get('/auth/social/prepare/', { withCredentials: true });
    },
    search(query: string, max = 50) {
      return http.get('/user/', { params: { query, max } });
    },
  },
  design: {
    getTheme() {
      return throttledHttp.get('/design/theme/');
    },
  },
  http,
  throttledHttp,
};
