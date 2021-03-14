/* eslint-disable @typescript-eslint/camelcase */

import axios from 'axios';
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

if (axios.defaults.adapter === undefined) {
  throw new ReferenceError();
}

const http = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_CUSTOMER_URL,
  headers: { 'Cache-Control': 'no-cache' },
  adapter: throttleAdapterEnhancer(axios.defaults.adapter, { threshold: 2 * 1000 }),
});

// Adapter with 5 Minute Cache
// TODO not correctly working at the moment
const throttledHttp = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_CUSTOMER_URL,
  headers: { 'Cache-Control': 'no-cache' },
  adapter: throttleAdapterEnhancer(axios.defaults.adapter, { threshold: 2 * 1000 }),
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
    getLog(banId: string) {
      return http.get(`/ban/${banId}/logs`);
    },
  },
  server: {
    getBundles() {
      return throttledHttp.get('/server/bundle/');
    },
    getServer() {
      return http.get('/server/');
    },
    addBundle(name: string, type: string, multigroup: boolean,
      default_group_id: string, color: string, icon: string) {
      return http.post('/server/bundle/', {
        name,
        server_type: type,
        default_group_id,
        multigroup,
        color,
        icon,
      });
    },
    editBundle(bundleId: string, name: string, multigroup: boolean,
      default_group_id: string, color: string, icon: string, server: []) {
      return http.patch(`server/bundle/${bundleId}`, {
        name,
        multigroup,
        default_group_id,
        color,
        icon,
        server,
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
      return http.get(`/user/${uuid}/memberships`);
    },
    getUser(uuid: string) {
      return http.get(`/user/${uuid}`);
    },
    getAttributeDefinitions() {
      return throttledHttp.get('/user/attribute/definitions');
    },
    prepareSocialAuth() {
      return http.get('/auth/social/prepare/', { withCredentials: true });
    },
    search(query: string, max = 50) {
      return http.get('/user/', { params: { query, max } });
    },
    getLog(userId: string) {
      return http.get(`/user/${userId}/logs`);
    },
    getProperties(userId: string) {
      return throttledHttp.get(`/user/${userId}/properties`);
    },
  },
  design: {
    getTheme() {
      return throttledHttp.get('/design/theme');
    },
    setTheme(primary: string, dark: boolean, image: string, background: string) {
      return http.put('/design/theme', {
        primary,
        dark,
        image,
        background,
      });
    },
  },
  group: {
    getGroups() {
      return throttledHttp.get('/group/');
    },
    addGroup(name: string, permission_level: number, serverbundle_id: string, color: string) {
      return http.post('/group/', {
        name,
        serverbundle_id,
        color,
        permission_level,
      });
    },
    editGroup(group_id: string, name: string, permission_level: number,
      serverbundle_id: string, color: string, properties: [string]) {
      console.log('asdasdsad');
      return http.patch(`/group/${group_id}`, {
        name,
        serverbundle_id,
        color,
        permission_level,
        properties,
      });
    },
    deleteGroup(uuid: string) {
      return http.delete(`/group/${uuid}`);
    },
  },
  log: {
    getEntries(category: string) {
      const params = (category != null ? { category } : {});

      return http.get('/log/', { params });
    },
  },
  shop: {
    getCategories() {
      return throttledHttp.get('/shop/category');
    },
    getPackets(categoryId: string) {
      const params = (categoryId != null ? { category_id: categoryId } : {});

      return throttledHttp.get('/shop/packet/', { params });
    },
  },
  http,
  throttledHttp,
};
