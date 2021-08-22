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
      description: i18n.t('_dashboard.membershipEndDescription'),
    },
    serverbundle: Common.serverbundleSelectField,
  },
  dependencies: {
    serverbundle: {
      properties: {
        group: {
          type: 'object',
          title: i18n.t('group'),
          'x-fromUrl': `${API_URL}/group/?serverbundle_id={serverbundle.id}`,
          'x-itemKey': 'id',
          'x-itemTitle': 'name',
        },
      },
    },
  },
};
