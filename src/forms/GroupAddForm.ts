import Common from '@/forms/Common';
import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'name',
    'permissionLevel',
    'serverbundle',
  ],
  properties: {
    name: {
      type: 'string',
      title: i18n.t('name'),
    },
    permission_level: {
      type: 'integer',
      title: i18n.t('settings.permissionLevel'),
      minimum: 0,
      maximum: 100,
    },
    serverbundle: Common.serverbundleSelectField,
    color: Common.colorPicker(),
  },
};
