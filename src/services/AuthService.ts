import axios from 'axios';
import qs from 'qs';
import store from '@/store';
import openapi from '@/api/openapi';
import openapiCached from '@/api/openapiCached';
import { fetchHeaders } from '@/api/overwriteFetch';
import EventBus from '@/services/EventBus';
import config from '@/config';
import UserService from '@/services/UserService';

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
    await this.setProperties();

    EventBus.emit('login');
    // Event caught in CustomerJourney.vue
    EventBus.emit('customerJourneyUpdate');
  },
  async getToken(refreshToken: string): Promise {
    const sndQuery = {
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    };

    // The token endpoint reads request.form(), so the body must be
    // application/x-www-form-urlencoded rather than JSON.
    const rsp = await (await openapi).auth_getToken(null, qs.stringify(sndQuery), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return rsp.data;
  },
  async fetchUserData() {
    const rsp = await (await openapi).user_getCurrentUser();

    return rsp.data;
  },
  async logout() {
    (await openapi).auth_revokeToken(null, qs.stringify({
      token: store.getters.accessToken,
      token_type: 'access_token',
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then();

    await store.dispatch('logout');
    delete (await openapi).defaults.headers.common.Authorization;
    delete (await openapiCached).defaults.headers.common.Authorization;
    delete axios.defaults.headers.common.Authorization;
    delete fetchHeaders.Authorization;

    EventBus.emit('logout');
  },
  async setAuthTokens() {
    if (store.getters.accessToken) {
      const header = `Bearer ${store.getters.accessToken}`;
      fetchHeaders.Authorization = header;
      axios.defaults.headers.common.Authorization = header;
      (await openapi).defaults.headers.common.Authorization = header;
      (await openapiCached).defaults.headers.common.Authorization = header;
    }
  },
  // Tokens travel back from a social login in the URL fragment, which browsers never
  // send to a server, so they cannot leak through Referer headers or access logs.
  getHashParam(hash: string, name: string): string | null {
    if (hash == null || hash === '') {
      return null;
    }

    return new URLSearchParams(hash.replace(/^#/, '')).get(name);
  },
  getSocialAuthUrl(backend: string, returnUrl: string, authRequestId: string) {
    const step = (authRequestId != null ? 'finish' : 'start');

    const redirectUrl = new URL(`${config.backend_url}/auth/social/${backend}/${step}`);

    if (returnUrl != null) {
      // const returnUrlEnc = encodeURIComponent(returnUrl);
      redirectUrl.searchParams.append('return_url', returnUrl);
    }

    if (authRequestId != null) {
      redirectUrl.searchParams.append('auth_request_id', authRequestId);
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
    try {
      const user: object = await this.fetchUserData();
      await UserService.setUserMemberships();

      await store.dispatch('setUserData', { user });

      if (tryRefresh && store.getters.refreshAfter != null
        && new Date() > new Date(store.getters.refreshAfter)) {
        console.log('Trying to use refresh token to renew session in time.');
        await this.login(store.getters.refreshToken);
        await this.refreshUser();
      }
    } catch (err) {
      console.log(`Error in phase user_data: ${err}`);

      if (err.response.status === 401) {
        if (tryRefresh && store.getters.refreshToken != null) {
          console.log('Trying to use refresh token to recover session.');

          try {
            await this.login(store.getters.refreshToken);
          } catch (e) {
            await this.logout();
          }
        } else {
          await this.logout();
        }
      }

      throw err;
    }
  },
  authRequestCommands: {
    MINECRAFT: '/vylogin {uuid}',
    TEAMSPEAK3: '!login {uuid}',
    FIVEM: '/vylogin {uuid}',
    ASA: '/vylogin {uuid}',
  },
};
