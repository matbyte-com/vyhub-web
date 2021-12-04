import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: ['donation_goal_enabled', 'donation_goal_currency_code'],
  properties: {
    donation_goal_enabled: {
      type: 'boolean',
      'x-display': 'switch',
      title: i18n.t('_shop.labels.enableDonationGoal'),
      description: i18n.t('_shop.labels.enableDonationGoalDescription'),
      default: 'true',
    },
    donation_goal: {
      type: 'integer',
      title: i18n.t('_shop.labels.donationGoal'),
      minimum: '0',
      'x-cols': 6,
    },
    donation_goal_currency_code: {
      ...Common.currency_code,
      'x-cols': 6,
    },
    checkout_checkboxes: {
      type: 'array',
      title: i18n.t('_shop.labels.checkoutCheckboxes'),
      items: {
        type: 'object',
        required: ['text', 'url'],
        properties: {
          text: {
            type: 'string',
            title: i18n.t('text'),
          },
          url: {
            type: 'string',
            title: i18n.t('url'),
            pattern: '^(http|https)://.+$',
          },
        },
      },
    },
  },
};
