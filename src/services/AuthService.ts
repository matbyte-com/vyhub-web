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
  login(email: string, password: string, callback: Function) {
    // create QueryObjectForCustomerAPI
    const sndQuery = {
      username: '-',
      password: '-',
    };

    const credentials = {
      username: email,
      password,
    };

    // query central api
    axios.post(`${centralUrl}`, qs.stringify(credentials), config).then((centralResponse) => {
      // password = received token
      sndQuery.password = centralResponse.data.access_token;

      axios.post(`${customerUrl}`, qs.stringify(sndQuery), config).then((localResponse) => {
        callback(localResponse.data);
      });
    }, (error) => error.data);

    // query customer api
  },
};
