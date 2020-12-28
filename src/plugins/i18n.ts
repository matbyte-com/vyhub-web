import Vue from 'vue';
import VueI18n from 'vue-i18n';

function loadLocaleMessages() {
  const locales = require.context(
    '@/lang',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i,
  );
  // eslint-disable-next-line
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
export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: loadLocaleMessages(),
});
