import axios from 'axios';
import qs from 'qs';
import store from '@/store';
import api from '@/api/api';

const centralUrl = `${process.env.VUE_APP_BACKEND_CENTRAL_URL}/auth/token`;

export default {
  login(email: string, password: string, callback: Function, errorCallback: Function) {
    // create QueryObjectForCustomerAPI
    const sndQuery = {
      username: '-',
      password: '-',
    };

    const credentials = {
      username: email,
      password,
    };

    // Query central API
    axios.post(`${centralUrl}`, qs.stringify(credentials)).then((centralResponse) => {
      // password = received token
      sndQuery.password = centralResponse.data.access_token;

      // Query customer API
      axios.post('/auth/token', qs.stringify(sndQuery)).then((localResponse) => {
        callback(localResponse.data.access_token);
      }, (error) => errorCallback(2, error));
    }, (error) => errorCallback(1, error));
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
};
