import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: [
    'title',
    'content'
  ],
  properties: {
    title: {
      type: 'string',
      title: i18n.global.t('title'),
    },
    icon: Common.iconPicker,
    content: {
      type: 'string',
      title: i18n.global.t('description'),
      layout: {
        slots: {
          component: "custom-editor"
        }
      }
    },
  },
};
