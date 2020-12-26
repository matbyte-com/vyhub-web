import axios from 'axios';
import qs from 'qs';

const centralUrl = `${process.env.VUE_APP_BACKEND_CENTRAL_URL}/auth/token`;
const customerUrl = `${process.env.VUE_APP_BACKEND_CUSTOMER_URL}/auth/token`;
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

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
    axios.post(`${centralUrl}`, qs.stringify(credentials), config).then((centralResponse) => {
      // password = received token
      sndQuery.password = centralResponse.data.access_token;

      // Query customer API
      axios.post(`${customerUrl}`, qs.stringify(sndQuery), config).then((localResponse) => {
        callback(localResponse.data);
      }, (error) => errorCallback(2, error));
    }, (error) => errorCallback(1, error));
  },
};
