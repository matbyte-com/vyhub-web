import Common from '@/forms/Common';
import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'userId',
  ],
  properties: {
    reason: {
      type: 'string',
      title: i18n.global.t('reason'),
    },
    length: {
      type: 'integer',
      title: i18n.global.t('_ban.labels.lengthInMinutes'),
      minimum: 1,
    },
    serverbundle: Common.serverbundleSelectField,
  },
};
