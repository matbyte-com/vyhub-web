import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: [
    'category',
    'title',
    'topic_category_id',
    'edit_post',
  ],
  properties: {
    topic_category_id: {
      ...Common.forumSelectCategory,
      type: 'string',
    },
    title: {
      type: 'string',
      title: i18n.t('title'),
      maxLength: 150,
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
    admin_group_ids: {
      ...Common.groupSelectField,
      title: i18n.t('_forum.topicAdminGroup'),
      type: 'array',
      items: {
        type: 'string',
      },
    },
    icon: Common.iconPicker,
    edit_post: {
      type: 'boolean',
      'x-display': 'switch',
      title: i18n.t('_forum.allowEditPost'),
      description: i18n.t('_forum.allowEditPostDescription'),
      default: false,
    },
    prohibit_create_threads: {
      type: 'boolean',
      'x-display': 'switch',
      title: i18n.t('_forum.prohibitCreateThreads'),
      description: i18n.t('_forum.prohibitCreateThreadsDescription'),
      default: false,
    },
  },
};
