import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'content',
  ],
  properties: {
    content: {
      type: 'string',
      title: i18n.global.t('_forum.content'),
    },
  },
};
