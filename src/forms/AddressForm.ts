import i18n from '@/plugins/i18n';
import countries from 'country-list';
import countryUnicodeFlags from 'country-flag-icons/unicode';

const countryOptions = Object.entries(countries.getCodeList())
  .map((c) => ({
    const: c[0].toUpperCase(),
    title: `${countryUnicodeFlags(c[0])} ${c[1]}`,
  }));

export default {
  type: 'object',
  required: [
    'name', 'streetAndNumber', 'city', 'state', 'zipCode', 'country',
  ],
  properties: {
    name: {
      type: 'string',
      title: i18n.t('name'),
    },
    streetAndNumber: {
      type: 'string',
      title: i18n.t('_address.labels.streetAndNumber'),
    },
    addition: {
      type: 'string',
      title: i18n.t('_address.labels.addition'),
    },
    zipCode: {
      type: 'string',
      title: i18n.t('_address.labels.zip_code'),
      'x-cols': 4,
    },
    city: {
      type: 'string',
      title: i18n.t('_address.labels.city'),
      'x-cols': 8,
    },
    state: {
      type: 'string',
      title: i18n.t('_address.labels.state'),
    },
    country: {
      type: 'string',
      title: i18n.t('country'),
      oneOf: countryOptions,
    },
  },
};
