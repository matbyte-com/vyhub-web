import Vue from 'vue';
import VueI18n from 'vue-i18n';

const dateTimeFormats: any = {
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
  const locales = import.meta.globEager('../lang/*.json');

  const messages: any = {};
  for (const path in locales) {
    const matched = path.match(/([A-Za-z0-9-_]+)\.json$/i);
    if (matched) {
      if (matched.length > 1) {
        const locale = matched[1];
        messages[locale] = locales[path];
      }
    }
  }
  return messages;
}

Vue.use(VueI18n);
// eslint-disable-next-line import/prefer-default-export
export default new VueI18n({
  dateTimeFormats,
  locale: 'en',
  fallbackLocale: 'en',
  messages: loadLocaleMessages(),
});
