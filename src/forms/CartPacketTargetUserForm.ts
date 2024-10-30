import Common from '@/forms/Common';

export default {
  type: 'object',
  required: ['target_user_id'],
  properties: {
    target_user_id: {
      ...Common.userSelectField,
      type: ['string'],
    },
  },
};
