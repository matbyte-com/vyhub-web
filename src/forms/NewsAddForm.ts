import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: [
    'subject',
    'type',
  ],
  properties: {
    subject: {
      type: 'string',
      title: i18n.t('_home.messageSubject'),
    },
    background_url: Common.imageURLField,
    type: {
      type: 'string',
      title: i18n.t('_home.messageType'),
      default: 'DEFAULT',
      oneOf: [
        {
          const: 'DEFAULT',
          title: i18n.t('_home.messageTypeNews'),
        },
        {
          const: 'PINNED',
          title: i18n.t('_home.messageTypePinned'),
        },
      ],
    },
  },
};
