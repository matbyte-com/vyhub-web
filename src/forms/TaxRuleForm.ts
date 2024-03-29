import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: ['percentage'],
  properties: {
    country_code: {
      ...Common.countryCodeField,
      description: i18n.t('_taxRule.messages.allCountriesDetail'),
    },
    percentage: {
      type: 'number',
      title: i18n.t('percentage'),
      minimum: 0,
    },
    info: {
      type: ['string', 'null'],
      title: i18n.t('info'),
      'x-display': 'textarea',
      description: i18n.t('_taxRule.messages.infoDetail'),
    },
  },
};
