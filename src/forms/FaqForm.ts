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
    icon: Common.iconPicker,
  },
};
