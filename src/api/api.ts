/* eslint-disable @typescript-eslint/camelcase */

import axios from 'axios';
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

if (axios.defaults.adapter === undefined) {
  throw new ReferenceError();
}

const http = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_CUSTOMER_URL,
  headers: { 'Cache-Control': 'no-cache' },
  adapter: throttleAdapterEnhancer(axios.defaults.adapter, { threshold: 0 * 1000 }),
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
    getAddresses(userId: string) {
      return http.get(`/user/${userId}/addresses`);
    },
    addAddress(address: object) {
      return http.post('/user/address', address);
    },
    getPurchases(userId: string) {
      return http.get(`/user/${userId}/purchases`);
    },
    getPackets(userId: string) {
      return http.get(`/user/${userId}/packets`);
    },
  },
  design: {
    getTheme() {
      return throttledHttp.get('/design/theme');
    },
    getNavItems() {
      return throttledHttp.get('/design/nav');
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
  packet: {
    getCategories() {
      return throttledHttp.get('/packet/category');
    },
    getPackets() {
      return http.get('/packet/');
    },
    addPacket(packet: object) {
      return http.post('/packet', packet);
    },
    editPacket(packetId: string, data: object) {
      return http.patch(`/packet/${packetId}`, data);
    },
  },
  shop: {
    getPackets(category_id: string, country_code: string) {
      return throttledHttp.get('/shop/packet', {
        params: {
          category_id,
          country_code,
        },
      });
    },
    getCart(country_code: string) {
      return http.get('/shop/cart', { params: { country_code } });
    },
    getCartPackets() {
      return http.get('/shop/cart/packets');
    },
    addToCart(packetId: string) {
      return http.post('/shop/cart', {
        id: packetId,
      });
    },
    removeFromCart(cartPacketId: string) {
      return http.delete(`/shop/cart/${cartPacketId}`);
    },
    clearCart() {
      return http.delete('/shop/cart');
    },
    getDiscount(discountCodeOrId: string) {
      return http.get(`/shop/discount/${discountCodeOrId}`);
    },
    applyDiscount(discountCodeOrId: string) {
      return http.post(`/shop/cart/discount/${discountCodeOrId}`);
    },
    removeDiscount(discountCodeOrId: string) {
      return http.delete(`/shop/cart/discount/${discountCodeOrId}`);
    },
    startCheckout(addressId: string) {
      return http.post('/shop/cart/checkout', {
        id: addressId,
      });
    },
    startPayment(purchaseId: string, paymentGatewayId: string) {
      return http.post('/shop/checkout', {
        purchase: {
          id: purchaseId,
        },
        payment_gateway: {
          id: paymentGatewayId,
        },
      });
    },
    cancelPayment(debitId: string) {
      return http.patch(`/shop/checkout/${debitId}`);
    },
    checkPayment(debitId: string) {
      return http.get(`/shop/checkout/${debitId}`);
    },
    getPurchases() {
      return http.get('/shop/purchase');
    },
    cancelPurchase(purchaseId: string) {
      return http.patch(`/shop/purchase/${purchaseId}`);
    },
    getPaymentGateways(purchaseId: string) {
      return http.get(`/shop/purchase/${purchaseId}/gateways`);
    },
  },
  http,
  throttledHttp,
};
