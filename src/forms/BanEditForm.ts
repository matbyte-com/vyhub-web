import Common from '@/forms/Common';

export default {
  type: 'object',
  required: [
    'userId',
  ],
  properties: {
    reason: {
      type: 'string',
      titleK: 'reason',
    },
    length: {
      type: 'integer',
      titleK: 'ban.labels.lengthInMinutes',
      minimum: 1,
    },
    serverbundle: Common.serverbundleSelectField,
  },
};
