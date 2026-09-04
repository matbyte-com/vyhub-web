import axios from 'axios';
import qs from 'qs';
import { useVyHubStore } from '@/store';
import openapi from '@/api/openapi';
import openapiCached from '@/api/openapiCached';
import { fetchHeaders } from '@/api/overwriteFetch';
import EventBus from '@/services/EventBus';
import config from '@/config';
import UserService from '@/services/UserService';

const store = useVyHubStore();

// The token endpoint answers a revoked/expired/reused refresh token with
// RFC 6749 §5.2 "400 invalid_grant", not 401.
function isRefreshTokenRejected(err: unknown): boolean {
  const rsp = (err as { response?: { status?: number; data?: any } })?.response;
  if (rsp == null) return false;
  if (rsp.status === 401) return true;
  return rsp.status === 400 && rsp.data?.error === 'invalid_grant';
}

export default {
  async login(_refreshToken: string) {
    const { access_token, refresh_token, expires_in } = await this.getToken(_refreshToken);
    let refreshAfter = null;

    if (expires_in != null) {
      refreshAfter = new Date();
      refreshAfter.setSeconds(refreshAfter.getSeconds() + expires_in / 2);
    }

    store.login(access_token, refresh_token, refreshAfter);

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
      token: store.accessToken,
      token_type: 'access_token',
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then();

    store.logout();
    delete (await openapi).defaults.headers.common.Authorization;
    delete (await openapiCached).defaults.headers.common.Authorization;
    delete axios.defaults.headers.common.Authorization;
    delete fetchHeaders.Authorization;

    EventBus.emit('logout');
  },
  async setAuthTokens() {
    if (store.accessToken) {
      const header = `Bearer ${store.accessToken}`;
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

    if (store.isLoggedIn) {
      api_client.user_getCurrentProperties(
        { uuid: store.user.id },
      ).then((rsp) => {
        store.properties = rsp.data;
      }).catch((e) => console.log(`Could not query current properties: ${e}`));
    } else {
      api_client.user_getUnauthProperties().then((rsp) => {
        store.properties = rsp.data;
      }).catch((e) => console.log(`Could not query unauth properties: ${e}`));
    }
  },
  async refreshUser(tryRefresh = false) {
    try {
      const user: object = await this.fetchUserData();
      await UserService.setUserMemberships();

      store.user = user;

      if (tryRefresh && store.refreshAfter != null
        && new Date() > new Date(store.refreshAfter)) {
        console.log('Trying to use refresh token to renew session in time.');
        try {
          await this.login(store.refreshToken);
          await this.refreshUser();
        } catch (e) {
          if (isRefreshTokenRejected(e)) {
            console.log('Refresh token rejected, logging out.');
            await this.logout();
            return;
          }
          throw e;
        }
      }
    } catch (err) {
      console.log(`Error in phase user_data: ${err}`);

      if (isRefreshTokenRejected(err)) {
        if (tryRefresh && store.refreshToken != null) {
          console.log('Trying to use refresh token to recover session.');

          try {
            await this.login(store.refreshToken);
          } catch (e) {
            if (isRefreshTokenRejected(e)) {
              console.log('Refresh token rejected, logging out.');
              await this.logout();
              return;
            }
            console.log('Refresh failed without rejection, keeping session.');
            throw e;
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
