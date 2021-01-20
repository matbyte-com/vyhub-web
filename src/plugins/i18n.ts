import Vue from 'vue';
import VueI18n from 'vue-i18n';

const dateTimeFormats = {
  en: {
    short: {
      year: 'numeric', month: 'short', day: 'numeric',
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric',
    },
  },
  de: {
    short: {
      day: 'numeric', month: 'short', year: 'numeric',
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric',
    },
  },
};

function loadLocaleMessages() {
  const locales = require.context(
    '@/lang',
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
export default new VueI18n({
  dateTimeFormats,
  locale: navigator.language.split('-')[0],
  fallbackLocale: 'en',
  messages: loadLocaleMessages(),
});
