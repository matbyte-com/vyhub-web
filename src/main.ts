import Vue from 'vue';
import Axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';

Vue.config.productionTip = false;

Axios.defaults.headers.common.Authorization = `Bearer ${store.state.token}`;

/* function loadLocaleMessages() {
  const locales = require.context(
    './lang',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i,
  );
  const messages: any = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched) {
      if (matched.length > 1) {
        const locale: string = matched[1];
        messages[locale] = locales(key);
      }
    }
  });
  return messages;
}

Vue.use(VueI18n);
// eslint-disable-next-line import/prefer-default-export
export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: loadLocaleMessages(),
}); */

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
