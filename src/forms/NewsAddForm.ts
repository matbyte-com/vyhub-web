import common from '@/forms/Common';
import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'subject',
    'type',
  ],
  properties: {
    subject: {
      type: 'string',
      title: i18n.t('home.messageSubject'),
    },
    type: {
      type: 'string',
      title: i18n.t('home.messageType'),
      default: 'DEFAULT',
      oneOf: [
        {
          const: 'DEFAULT',
          title: i18n.t('home.messageTypeNews'),
        },
        {
          const: 'PINNED',
          title: i18n.t('home.messageTypePinned'),
        },
      ],
    },
  },
};
