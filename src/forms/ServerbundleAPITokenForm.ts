import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

const propSel = { ...Common.propertiesSelector };
delete propSel['x-display'];
propSel.title = String(i18n.t('extraProperties'));

export default {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: i18n.t('name'),
    },
    extra_properties: {
      ...propSel,
    },
  },
};
