import Vue from 'vue';
import Axios from 'axios';
import Notifications from 'vue-notification';
import VueApexCharts from 'vue-apexcharts';
import VueNativeNotification from 'vue-native-notification';
import * as Sentry from '@sentry/vue';
import config from '@/config';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';
import '@/assets/css/main.scss';
import 'animate.css';

Vue.config.productionTip = false;
Vue.config.ignoredElements = ['swiper-container', 'swiper-slide'];

Axios.defaults.baseURL = config.backend_url;
Axios.defaults.headers.common['Content-Type'] = 'application/json';
Axios.defaults.headers.common.Accept = 'application/json';

Vue.use(Notifications);
Vue.use(VueApexCharts);
Vue.use(VueNativeNotification);

Vue.component('apexchart', VueApexCharts);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');

if (config.sentry_dsn != null && config.sentry_dsn.length > 5) {
  Sentry.init({
    Vue,
    dsn: config.sentry_dsn,
  });
}
