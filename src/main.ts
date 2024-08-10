import { createApp } from 'vue';
import Axios from 'axios';
// import Notifications from 'vue-notification';
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

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(store);
app.use(i18n);

app.config.compilerOptions.isCustomElement = (tag) => ['swiper-container', 'swiper-slide'].includes(tag);

Axios.defaults.baseURL = config.backend_url;
Axios.defaults.headers.common['Content-Type'] = 'application/json';
Axios.defaults.headers.common.Accept = 'application/json';

// Vue.use(Notifications); TODO CHeck whether the following things are working
app.use(VueApexCharts);
app.use(VueNativeNotification);

app.component('apexchart', VueApexCharts);

app.mount('#app');

/* Can likely be removed
new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
*/

/* TODO Sentry
if (config.sentry_dsn != null && config.sentry_dsn.length > 5) {
  Sentry.init({
    Vue,
    dsn: config.sentry_dsn,
  });
}*/
