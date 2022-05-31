import Common from '@/forms/Common';
import i18n from '@/plugins/i18n';

const API_URL = Common.apiURL;

export default {
  type: 'object',
  required: [
    'serverbundle',
    'group',
    'begin',
  ],
  properties: {
    group: Common.groupSelectField,
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
    serverbundle: {
      ...Common.serverbundleSelectField,
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
};
