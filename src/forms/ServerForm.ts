import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: ['name', 'address', 'port', 'type', 'serverbundle_id'],
  properties: {
    name: {
      type: 'string',
      title: i18n.t('name'),
    },
    address: {
      type: 'string',
      title: i18n.t('address'),
    },
    port: {
      type: 'integer',
      title: i18n.t('port'),
    },
    type: Common.serverTypeSelectField(),
  },
  dependencies: {
    type: {
      properties: {
        serverbundle_id: Common.serverbundleSelectFieldByType('string'),
      },
    },
  },
};
