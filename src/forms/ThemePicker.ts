import common from '@/forms/Common';
import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'dark',
  ],
  properties: {
    primary: common.colorPicker('settings.labels.primaryColor'),
    dark: {
      type: 'boolean',
      title: i18n.t('settings.labels.darkmode'),
      'x-display': 'switch',
    },
    image: {
      type: 'string',
      title: i18n.t('settings.labels.backgroundUrl'),
      'x-props': {
        clearable: true,
      },
    },
    background: common.colorPicker('settings.labels.backgroundColor', 'settings.backgroundColorDescription'),
  },
};
