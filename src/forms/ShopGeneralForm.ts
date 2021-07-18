import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: ['donation_goal_enabled'],
  properties: {
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
