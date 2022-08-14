import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: i18n.t('name'),
    },
    properties: {
      ...Common.propertiesSelector,
      title: i18n.t('extraProperties'),
    },
  },
};
