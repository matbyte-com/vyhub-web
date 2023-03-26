import Common from '@/forms/Common';

export default {
  type: 'object',
  required: [
    'title',
  ],
  properties: {
    target_user_id: {
      ...Common.userSelectField,
      type: ['string', 'null'],
    },
  },
};
