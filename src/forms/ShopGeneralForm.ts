import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: ['donation_goal_enabled'],
  properties: {
    donation_goal_enabled: {
      type: 'boolean',
      'x-display': 'switch',
      title: i18n.t('settings.shop.enableDonationGoal'),
      description: i18n.t('settings.shop.enableDonationGoalDescription'),
      default: 'true',
    },
    donation_goal: {
      type: 'integer',
      title: i18n.t('settings.shop.donationGoal'),
      minimum: '0',
    },
  },
};
