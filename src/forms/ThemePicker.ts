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
      pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
      'x-props': {
        clearable: true,
        placeholder: i18n.t('settings.httpPlaceholder'),
      },
    },
    background: common.colorPicker('settings.labels.backgroundColor', 'settings.backgroundColorDescription'),
  },
};
