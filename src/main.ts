import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from './lang';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VueI18n);
// eslint-disable-next-line import/prefer-default-export
export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
