import Common from '@/forms/Common';

export default {
  type: 'object',
  required: [
    'packet',
    'user',
  ],
  properties: {
    packet: Common.packetSelectField,
    user: Common.userSelectField,
  },
};
