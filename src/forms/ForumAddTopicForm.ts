import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: [
    'category',
    'title',
  ],
  properties: {
    category: {
      ...Common.forumSelectCategory,
      type: 'object',
      items: {
        type: 'object',
      },
    },
    title: {
      type: 'string',
      title: i18n.t('title'),
    },
    description: {
      type: 'string',
      title: i18n.t('description'),
    },
    admins: {
      ...Common.userSelectField,
      title: i18n.t('__forum.topicAdminUser'),
      type: 'array',
      items: {
        type: 'string',
      },
    },
    icon: Common.iconPicker,
  },
};
