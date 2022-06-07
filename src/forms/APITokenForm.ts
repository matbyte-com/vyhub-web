import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

const propSel = { ...Common.propertiesSelector };
propSel.title = String(i18n.t('properties'));

export default {
  type: 'object',
  required: ['properties'],
  properties: {
    name: {
      type: 'string',
      title: i18n.t('name'),
    },
    properties: Common.propertiesSelector,
    serverbundle: {
      ...Common.serverbundleSelectField,
      title: i18n.t('_api.labels.limitToServerbundle'),
    },
  },
};
