import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: ['community_name'],
  properties: {
    community_name: {
      type: 'string',
      title: i18n.t('communityName'),
    },
  },
};
