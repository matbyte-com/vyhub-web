import Common from '@/forms/Common';
import i18n from '@/plugins/i18n';

const API_URL = Common.apiURL;

export default {
  type: 'object',
  required: [
    'serverbundle_id',
    'group_id',
    'begin',
  ],
  properties: {
    group_id: {
      ...Common.groupSelectField,
      type: 'string',
    },
    begin: {
      type: 'string',
      title: i18n.t('begin'),
      format: 'date-time',
      default: new Date(),
    },
    end: {
      type: 'string',
      title: i18n.t('end'),
      format: 'date-time',
      description: i18n.t('_dashboard.labels.membershipEndDescription'),
    },
    serverbundle_id: {
      ...Common.serverbundleSelectField,
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
};
