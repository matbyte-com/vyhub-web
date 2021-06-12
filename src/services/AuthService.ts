/* eslint-disable @typescript-eslint/camelcase */

import axios from 'axios';
import store from '@/store';
import api from '@/api/api';
import openapi from '@/api/openapi';
import openapiCached from '@/api/openapiCached';
import { authGetTokenResponse } from '@/api/api.d';
import EventBus from '@/services/EventBus';

export default {
  async login(_refreshToken: string) {
    const { access_token, refresh_token, expires_in } = await this.getToken(_refreshToken);
    let refreshAfter = null;

    if (expires_in != null) {
      refreshAfter = new Date();
      refreshAfter.setSeconds(refreshAfter.getSeconds() + expires_in / 2);
    }

    await store.dispatch('login', {
      accessToken: access_token,
      refreshToken: refresh_token,
      refreshAfter,
    });

    await this.setAuthTokens();

    await this.refreshUser();

    EventBus.emit('login');
  },
  async getToken(refreshToken: string): Promise<authGetTokenResponse> {
    const sndQuery = {
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    };

    // Query customer API
    return (await api.auth.getToken(sndQuery)).data;
  },
  async fetchUserData() {
    const rsp = await (await openapi).user_getCurrentUser();

    return rsp.data;
  },
  async logout() {
    api.auth.revokeToken(store.getters.accessToken, 'access_token').then();

    await store.dispatch('logout');
    delete api.http.defaults.headers.common.Authorization;
    delete (await openapi).defaults.headers.Authorization;
    delete (await openapiCached).defaults.headers.Authorization;
    delete api.throttledHttp.defaults.headers.common.Authorization;
    delete axios.defaults.headers.common.Authorization;

    EventBus.emit('logout');
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
  getSocialAuthUrl(backend: string, returnUrl: string) {
    let redirectUrl = `${process.env.VUE_APP_BACKEND_CUSTOMER_URL}/auth/social/${backend}/start`;

    if (returnUrl != null) {
      const returnUrlEnc = encodeURIComponent(returnUrl);
      redirectUrl = redirectUrl.concat(`?return_url=${returnUrlEnc}`);
    }

    return redirectUrl;
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
  async refreshUser(tryRefresh = false) {
    this.fetchUserData().then((user: object) => {
      store.dispatch('setUserData', { user });

      if (tryRefresh && store.getters.refreshAfter != null
        && new Date() > new Date(store.getters.refreshAfter)) {
        console.log('Trying to use refresh token to renew session in time.');
        this.login(store.getters.refreshToken).then(() => {
          this.refreshUser();
        });
      }

      return user;
    }).catch((err) => {
      console.log(`Error in phase user_data: ${err}`);

      if (err.response.status === 401) {
        if (tryRefresh && store.getters.refreshToken != null) {
          console.log('Trying to use refresh token to recover session.');
          this.login(store.getters.refreshToken).then(() => {
            this.refreshUser();
          }).catch(() => {
            this.logout();
          });
        } else {
          this.logout();
        }
      }

      throw err;
    });
  },
};
