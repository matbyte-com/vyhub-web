/* eslint-disable @typescript-eslint/camelcase */

import axios, { AxiosError } from 'axios';
import qs from 'qs';
import store from '@/store';
import api from '@/api/api';
import openapi from '@/api/openapi';

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
    axios.post('/auth/token', qs.stringify(sndQuery)).then((rsp) => {
      callback(rsp.data.access_token, rsp.data.refresh_token);
    }, (error) => errorCallback(error));
  },
  fetchUserData(callback: Function, errorCallback: Function) {
    axios.get('/user/current').then((rsp) => {
      callback(rsp.data);
    }, (error) => errorCallback(error));
  },
  logout() {
    store.dispatch('logout');
    delete api.http.defaults.headers.common.Authorization;
    delete api.throttledHttp.defaults.headers.common.Authorization;
    delete axios.defaults.headers.common.Authorization;
  },
  setAuthTokens() {
    if (store.getters.accessToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${store.getters.accessToken}`;
      api.http.defaults.headers.common.Authorization = `Bearer ${store.getters.accessToken}`;
      api.throttledHttp.defaults.headers.common.Authorization = `Bearer ${store.getters.accessToken}`;
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
