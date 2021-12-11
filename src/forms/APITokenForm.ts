import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

const propSel = { ...Common.propertiesSelector };
delete propSel['x-display'];
propSel.title = i18n.t('properties');

export default {
  type: 'object',
  required: ['properties'],
  properties: {
    name: {
      type: 'string',
      title: i18n.t('name'),
    },
    properties: {
      ...propSel,
    },
    serverbundle: {
      ...Common.serverbundleSelectField,
      title: i18n.t('_api.labels.limitToServerbundle'),
    },
  },
};
