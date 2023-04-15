import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: ['donation_goal_enabled', 'default_currency'],
  properties: {
    default_currency: {
      ...Common.currency_code,
      title: i18n.t('_shop.labels.defaultCurrency'),
    },
    donation_goal_enabled: {
      type: 'boolean',
      'x-display': 'switch',
      title: i18n.t('_shop.labels.enableDonationGoal'),
      description: i18n.t('_shop.labels.enableDonationGoalDescription'),
      default: 'true',
      'x-cols': 6,
    },
    donation_goal: {
      type: 'integer',
      title: i18n.t('_shop.labels.donationGoal'),
      minimum: '0',
      'x-cols': 6,
    },
    top_donators_enabled: {
      type: 'boolean',
      'x-display': 'switch',
      title: i18n.t('_shop.labels.enableTopDonators'),
      description: i18n.t('_shop.labels.enableTopDonatorsDescription'),
      default: 'true',
    },
    tax_allow_unknown: {
      type: 'boolean',
      title: i18n.t('_shop.labels.taxAllowUnknown'),
      description: i18n.t('_shop.labels.taxAllowUnknownDescription'),
      default: 'true',
    },
    tax_included_in_packet_price: {
      type: 'boolean',
      title: i18n.t('_shop.labels.taxIncludedInPacketPrice'),
      description: i18n.t('_shop.labels.taxIncludedInPacketPriceDescription'),
      default: 'false',
    },
    invoice_logo_url: {
      type: 'string',
      title: i18n.t('_shop.labels.invoiceLogoURL'),
      description: i18n.t('_shop.labels.invoiceLogoURLDetails'),
      pattern: '^(http|https)://.+$',
    },
    checkout_checkboxes: {
      type: 'array',
      title: i18n.t('_shop.labels.checkoutCheckboxes'),
      items: {
        type: 'object',
        required: ['text'],
        properties: {
          text: {
            type: 'string',
            title: i18n.t('text'),
          },
          url: {
            type: ['string', 'null'],
            title: i18n.t('url'),
            pattern: '^(http|https)://.+$',
          },
        },
      },
    },
  },
};
