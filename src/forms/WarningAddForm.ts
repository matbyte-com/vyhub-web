import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: ['serverbundle', 'user'],
  properties: {
    user: Common.userSelectField,
    reason: {
      type: 'string',
      title: i18n.t('_warning.reason'),
    },
    serverbundle: Common.serverbundleSelectField,
  },
};
