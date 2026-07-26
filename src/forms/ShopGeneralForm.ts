import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: ['donation_goal_enabled', 'default_currency'],
  layout: {
    children: [
      {
        comp: 'card',
        title: i18n.global.t('general'),
        children: [
          'default_currency',
          'purchases_without_address_limit',
          'credits_display_title',
          'packet_list_view',
        ],
      },
      {
        comp: 'card',
        title: i18n.global.t('statistics'),
        children: [
          'show_widgets_on_shop_page',
          {
            comp: 'section',
            title: i18n.global.t('_shop.labels.donationGoal'),
            children: [
              'donation_goal_enabled',
              'donation_goal',
              'donation_goal_display_title',
            ],
          },
          {
            comp: 'section',
            title: i18n.global.t('_shop.labels.topDonators'),
            children: [
              'top_donators_enabled',
              'top_donators_limit',
              'top_donators_days_limit',
              'top_donators_display_title',
            ],
          },
          {
            comp: 'section',
            title: i18n.global.t('_shop.labels.lastDonations'),
            children: [
              'last_donators_enabled',
              'last_donators_display_title',
            ],
          },
        ],
      },
      {
        comp: 'card',
        title: i18n.global.t('tax'),
        children: [
          'tax_allow_unknown',
          'tax_included_in_packet_price',
        ],
      },
      {
        comp: 'card',
        title: i18n.global.t('invoice'),
        children: [
          'invoice_logo_url',
          'invoice_accent_color',
        ],
      },
      {
        comp: 'card',
        title: i18n.global.t('checkout'),
        children: [
          'checkout_checkboxes',
        ],
      },
      {
        comp: 'card',
        title: i18n.global.t('news'),
        children: [
          'news',
        ],
      },
    ],
  },
  properties: {
    default_currency: {
      ...Common.currency_code,
      title: i18n.global.t('_shop.labels.defaultCurrency'),
      'x-cols': 6,
    },
    purchases_without_address_limit: {
      type: 'number',
      title: i18n.global.t('_shop.labels.purchasesWithoutAddressLimit'),
      description: i18n.global.t('_shop.labels.purchasesWithoutAddressLimitDescription'),
      'x-cols': 6,
      minimum: 0,
    },
    credits_display_title: {
      type: 'string',
      title: i18n.global.t('_shop.labels.creditsDisplayTitle'),
      description: i18n.global.t('_shop.labels.creditsDisplayTitleDescription'),
    },
    show_widgets_on_shop_page: {
      type: 'boolean',
      layout: {
        comp: 'switch',
      },
      title: i18n.global.t('_shop.labels.showWidgetsOnShopPage'),
      description: i18n.global.t('_shop.labels.showWidgetsOnShopPageDesc'),
      default: 'true',
    },
    donation_goal_enabled: {
      type: 'boolean',
      title: i18n.global.t('_shop.labels.enableDonationGoal'),
      description: i18n.global.t('_shop.labels.widgetDescription'),
      default: true,
      layout: {
        cols: 12,
        comp: 'switch',
      },
    },
    donation_goal: {
      type: 'integer',
      title: i18n.global.t('_shop.labels.donationGoal'),
      minimum: 0,
      layout: {
        cols: 6,
      },
    },
    top_donators_enabled: {
      type: 'boolean',
      title: i18n.global.t('_shop.labels.enableTopDonators'),
      description: i18n.global.t('_shop.labels.widgetDescription'),
      default: true,
      layout: {
        cols: 12,
        comp: 'switch',
      },
    },
    top_donators_limit: {
      type: 'integer',
      title: i18n.global.t('_shop.labels.topDonatorsLimit'),
      minimum: 1,
      layout: {
        cols: 4,
      },
    },
    top_donators_days_limit: {
      type: ['integer', 'null'],
      title: i18n.global.t('_shop.labels.topDonatorsDaysLimit'),
      layout: {
        props: {
          clearable: true,
        },
        cols: 4
      },
    },
    last_donators_enabled: {
      type: 'boolean',
      title: i18n.global.t('_shop.labels.enableLastDonators'),
      description: i18n.global.t('_shop.labels.widgetDescription'),
      default: 'true',
      layout: {
        cols: 12,
        comp: 'switch',
      },
    },
    donation_goal_display_title: {
      type: 'string',
      title: i18n.global.t('_shop.labels.donationGoalDisplayTitle'),
      default: 'Donation Goal',
      layout: {
        cols: 6,
      }
    },
    top_donators_display_title: {
      type: 'string',
      title: i18n.global.t('_shop.labels.topDonatorDisplayTitle'),
      default: 'Donation Goal',
      layout: {
        cols: 4,
      }
    },
    last_donators_display_title: {
      type: 'string',
      title: i18n.global.t('_shop.labels.lastDonatorsDisplayTitle'),
      default: 'Donation Goal',
      layout: {
        cols: 6,
      }
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
      type: ['string', 'null'],
      layout: {
        slots: {
          component: 'custom-logo'
        }
      },
    },
    invoice_accent_color: Common.colorPicker(
      '_shop.labels.invoiceAccentColor',
      '_shop.labels.invoiceAccentColorDescription',
    ),
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
    news: {
      type: 'string',
      title: i18n.global.t('news'),
      layout: {
        slots: {
          component: "custom-editor"
        }
      }
    },
  },
};
