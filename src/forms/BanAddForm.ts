import Common from '@/forms/Common';
import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'user',
  ],
  properties: {
    user: Common.userSelectField,
    reason: {
      type: 'string',
      title: i18n.t('reason'),
    },
    length: {
      type: 'integer',
      title: i18n.t('ban.labels.lengthInMinutes'),
      minimum: 1,
      description: i18n.t('ban.labels.infiniteBandDescription'),
    },
    serverbundle: {
      ...Common.serverbundleSelectField,
      description: i18n.t('ban.labels.bundleDescription'),
    },
  },
};
