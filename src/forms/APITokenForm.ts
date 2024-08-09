import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

const propSel = { ...Common.propertiesSelector };
propSel.title = String(i18n.global.t('properties'));

export default {
  type: 'object',
  required: ['properties'],
  properties: {
    name: {
      type: 'string',
      title: i18n.global.t('name'),
    },
    properties: Common.propertiesSelector,
    serverbundle: {
      ...Common.serverbundleSelectField,
      title: i18n.global.t('_api.labels.limitToServerbundle'),
    },
  },
};
