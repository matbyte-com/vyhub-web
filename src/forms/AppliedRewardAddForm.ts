import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: ['status'],
  properties: {
    reward: {
      ...Common.rewardSelectField,
    },
  },
};
