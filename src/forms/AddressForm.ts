import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: [
    'name', 'street_and_number', 'city', 'state', 'zip_code', 'country_code',
  ],
  properties: {
    name: {
      type: 'string',
      title: i18n.t('name'),
      maxLength: 50,
      minLength: 2,
    },
    street_and_number: {
      type: 'string',
      title: i18n.t('_address.labels.streetAndNumber'),
      maxLength: 50,
      minLength: 2,
    },
    addition: {
      type: 'string',
      title: i18n.t('_address.labels.addition'),
      maxLength: 40,
    },
    zip_code: {
      type: 'string',
      title: i18n.t('_address.labels.zip_code'),
      'x-cols': 4,
      maxLength: 10,
    },
    city: {
      type: 'string',
      title: i18n.t('_address.labels.city'),
      'x-cols': 8,
      maxLength: 40,
      minLength: 2,
    },
    state: {
      type: 'string',
      title: i18n.t('_address.labels.state'),
      maxLength: 40,
    },
    country_code: Common.countryCodeField,
    vat_number: {},
  },
};
