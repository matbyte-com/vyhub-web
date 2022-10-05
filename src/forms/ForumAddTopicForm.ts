import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: [
    'title',
  ],
  properties: {
    title: {
      type: 'string',
      title: i18n.t('title'),
    },
    admins: {
      ...Common.groupSelectField,
      title: i18n.t('__forum.topicAdminGroup'),
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
};
