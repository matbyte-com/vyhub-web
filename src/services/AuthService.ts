import axios from 'axios';
import qs from 'qs';

const centralUrl = `${process.env.VUE_APP_BACKEND_CENTRAL_URL}auth/token/`;
const customerUrl = `${process.env.VUE_APP_BACKEND_CUSTOMER_URL}auth/token/`;
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

export default {
  login(credentials: any) {
    // create QueryObjectForCustomerAPI
    const sndQuery = {
      username: '-',
      password: '-',
    };

    // query central api
    axios.post(`${centralUrl}`, qs.stringify(credentials), config).then((response) => {
      // password = received token
      sndQuery.password = response.data.access_token;
    }, (error) => error.data);

    // query customer api
    return axios.post(`${customerUrl}`, qs.stringify(sndQuery), config).then((response) => response.data);
  },
};
