import Common from '@/forms/Common';

export default {
  type: 'object',
  required: ['target_user_id'],
  layout: [
    {
      key: 'target_user_id',
    },
    {
      name: "user-chip",
    }
  ],
  properties: {
    target_user_id: {
      ...Common.userSelectField,
      type: ['string'],
    },
  },
};
