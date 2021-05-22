/* eslint-disable @typescript-eslint/camelcase */

import axios, { AxiosError } from 'axios';
import store from '@/store';
import api from '@/api/api';
import openapi from '@/api/openapi';
import openapiCached from '@/api/openapiCached';

export default {
  login(refreshToken: string, callback: Function, errorCallback: Function) {
    this.getToken(refreshToken, (accessToken: string, newRefreshToken: string) => {
      store.dispatch('login', {
        accessToken,
        refreshToken: newRefreshToken,
      });

      this.setAuthTokens();

      this.fetchUserData((user: object) => {
        // console.log(data);
        store.dispatch('setUserData', { user });
        callback(user);
      }, (err: object) => {
        console.log(`Error in phase user_data: ${err}`);
        errorCallback(2, err);
      });
    }, (err: AxiosError) => {
      if (err !== undefined && err.response !== undefined) {
        console.log(`Error in phase login: ${err.response.data.msg}`);
      }
      errorCallback(1, err);
    });
  },
  getToken(refreshToken: string, callback: Function, errorCallback: Function) {
    // create QueryObjectForCustomerAPI
    const sndQuery = {
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    };

    // Query customer API
    api.auth.getToken(sndQuery).then((rsp) => {
      callback(rsp.data.access_token, rsp.data.refresh_token);
    }, (error) => errorCallback(error));
  },
  async fetchUserData(callback: Function, errorCallback: Function) {
    (await openapi).user_getCurrentUser().then((rsp) => {
      callback(rsp.data);
    }).catch((error) => errorCallback(error));
  },
  async logout() {
    api.auth.revokeToken(store.getters.accessToken, 'access_token').then();

    store.dispatch('logout').then();
    delete api.http.defaults.headers.common.Authorization;
    delete (await openapi).defaults.headers.Authorization;
    delete (await openapiCached).defaults.headers.Authorization;
    delete api.throttledHttp.defaults.headers.common.Authorization;
    delete axios.defaults.headers.common.Authorization;
  },
  async setAuthTokens() {
    if (store.getters.accessToken) {
      const header = `Bearer ${store.getters.accessToken}`;
      axios.defaults.headers.common.Authorization = header;
      (await openapi).defaults.headers.Authorization = header;
      (await openapiCached).defaults.headers.Authorization = header;
      api.http.defaults.headers.common.Authorization = header;
      api.throttledHttp.defaults.headers.common.Authorization = header;
    }
  },
  getSocialAuthUrl(backend: string) {
    return `${process.env.VUE_APP_BACKEND_CUSTOMER_URL}/auth/social/${backend}/start`;
  },
  async setProperties() {
    const api_client = await openapi;

    let properties = null;

    if (store.getters.isLoggedIn) {
      api_client.user_getCurrentProperties(
        { uuid: store.getters.user.id },
      ).then((rsp) => {
        properties = rsp.data;
        store.dispatch('setProperties', { properties });
      }).catch((e) => console.log(`Could not query current properties: ${e}`));
    } else {
      api_client.user_getUnauthProperties().then((rsp) => {
        properties = rsp.data;
        store.dispatch('setProperties', { properties });
      }).catch((e) => console.log(`Could not query unauth properties: ${e}`));
    }
  },
};
