import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: ['status'],
  properties: {
    reward: {
      ...Common.rewardsSelectField,
      type: 'object',
      title: i18n.global.t('_purchases.labels.reward'),
    },
  },
};
