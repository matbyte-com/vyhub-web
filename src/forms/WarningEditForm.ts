import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  properties: {
    reason: {
      type: 'string',
      title: i18n.global.t('_warning.reason'),
    },
  },
};
