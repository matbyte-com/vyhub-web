import Common from '@/forms/Common';

export default {
  type: 'object',
  required: [
    'groups',
  ],
  properties: {
    groups: Common.groupSelectFieldMulti,
  },
};
