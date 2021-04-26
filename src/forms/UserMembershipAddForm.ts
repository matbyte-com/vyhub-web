/* eslint-disable @typescript-eslint/camelcase */
import common from '@/forms/Common';
import i18n from '@/plugins/i18n';

const API_URL = process.env.VUE_APP_BACKEND_CUSTOMER_URL;

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
    serverbundle: common.serverbundleSelectField,
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
