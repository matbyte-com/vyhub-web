import Common from '@/forms/Common';

export default {
  type: 'object',
  required: [
    'userId',
  ],
  properties: {
    userId: Common.userSelectField,
    reason: {
      type: 'string',
      titleK: 'reason',
    },
    length: {
      type: 'integer',
      titleK: 'ban.labels.lengthInMinutes',
      minimum: 1,
    },
    serverbundleId: Common.serverbundleSelectField,
  },
};
