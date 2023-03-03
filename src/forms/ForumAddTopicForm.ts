import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: [
    'category',
    'title',
    'topic_category_id',
  ],
  properties: {
    topic_category_id: {
      ...Common.forumSelectCategory,
      type: 'string',
    },
    title: {
      type: 'string',
      title: i18n.t('title'),
    },
    description: {
      type: 'string',
      title: i18n.t('description'),
      maxLength: 75,
    },
    admin_ids: {
      ...Common.userSelectField,
      title: i18n.t('_forum.topicAdminUser'),
      type: 'array',
      items: {
        type: 'string',
      },
    },
    icon: Common.iconPicker,
  },
};