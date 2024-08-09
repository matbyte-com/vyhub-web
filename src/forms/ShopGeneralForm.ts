import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: ['donation_goal_enabled', 'default_currency'],
  properties: {
    default_currency: {
      ...Common.currency_code,
      title: i18n.global.t('_shop.labels.defaultCurrency'),
    },
    credits_display_title: {
      type: 'string',
      title: i18n.global.t('_shop.labels.creditsDisplayTitle'),
      description: i18n.global.t('_shop.labels.creditsDisplayTitleDescription'),
    },
    show_widgets_on_shop_page: {
      type: 'boolean',
      'x-display': 'switch',
      title: i18n.global.t('_shop.labels.showWidgetsOnShopPage'),
      description: i18n.global.t('_shop.labels.showWidgetsOnShopPageDesc'),
      default: 'true',
    },
    donation_goal_enabled: {
      type: 'boolean',
      'x-display': 'switch',
      title: i18n.global.t('_shop.labels.enableDonationGoal'),
      description: i18n.global.t('_shop.labels.widgetDescription'),
      default: 'true',
      'x-cols': 6,
    },
    donation_goal: {
      type: 'integer',
      title: i18n.global.t('_shop.labels.donationGoal'),
      minimum: '0',
      'x-cols': 6,
    },
    top_donators_enabled: {
      type: 'boolean',
      'x-display': 'switch',
      title: i18n.global.t('_shop.labels.enableTopDonators'),
      description: i18n.global.t('_shop.labels.widgetDescription'),
      default: 'true',
      'x-cols': 4,
    },
    top_donators_limit: {
      type: 'integer',
      title: i18n.global.t('_shop.labels.topDonatorsLimit'),
      minimum: '1',
      'x-cols': 4,
      'x-class': 'pl-1',
    },
    top_donators_days_limit: {
      type: 'integer',
      title: i18n.global.t('_shop.labels.topDonatorsDaysLimit'),
      'x-class': 'pl-1',
      'x-props': {
        clearable: true,
      },
      'x-cols': 4,
    },
    last_donators_enabled: {
      type: 'boolean',
      'x-display': 'switch',
      title: i18n.global.t('_shop.labels.enableLastDonators'),
      description: i18n.global.t('_shop.labels.widgetDescription'),
      default: 'true',
      'x-cols': 12,
    },
    donation_goal_display_title: {
      type: 'string',
      title: i18n.global.t('_shop.labels.donationGoalDisplayTitle'),
      default: 'Donation Goal',
      'x-cols': 4,
    },
    top_donators_display_title: {
      type: 'string',
      title: i18n.global.t('_shop.labels.topDonatorDisplayTitle'),
      default: 'Donation Goal',
      'x-cols': 4,
      'x-class': 'pl-1',
    },
    last_donators_display_title: {
      type: 'string',
      title: i18n.global.t('_shop.labels.lastDonatorsDisplayTitle'),
      default: 'Donation Goal',
      'x-cols': 4,
      'x-class': 'pl-1',
    },
    tax_allow_unknown: {
      type: 'boolean',
      title: i18n.global.t('_shop.labels.taxAllowUnknown'),
      description: i18n.global.t('_shop.labels.taxAllowUnknownDescription'),
      default: 'true',
    },
    tax_included_in_packet_price: {
      type: 'boolean',
      title: i18n.global.t('_shop.labels.taxIncludedInPacketPrice'),
      description: i18n.global.t('_shop.labels.taxIncludedInPacketPriceDescription'),
      default: 'false',
    },
    packet_list_view: {
      type: 'boolean',
      title: i18n.global.t('_shop.labels.showPacketsAsList'),
      default: 'false',
    },
    invoice_logo_url: {
      type: 'string',
      title: i18n.global.t('_shop.labels.invoiceLogoURL'),
      description: i18n.global.t('_shop.labels.invoiceLogoURLDetails'),
      pattern: '^(http|https)://.+$',
    },
    checkout_checkboxes: {
      type: 'array',
      title: i18n.global.t('_shop.labels.checkoutCheckboxes'),
      items: {
        type: 'object',
        required: ['text'],
        properties: {
          text: {
            type: 'string',
            title: i18n.global.t('text'),
          },
          url: {
            type: ['string', 'null'],
            title: i18n.global.t('url'),
            pattern: '^(http|https)://.+$',
          },
        },
      },
    },
  },
};
