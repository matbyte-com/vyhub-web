import common from '@/forms/Common';
import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'dark',
  ],
  properties: {
    primary: common.colorPicker('settings.labels.primaryColor'),
    success: common.colorPicker('settings.labels.successColor'),
    warning: common.colorPicker('settings.labels.warningColor'),
    error: common.colorPicker('settings.labels.errorColor'),
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
    logo: {
      type: 'string',
      title: i18n.t('settings.labels.logoUrl'),
      pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
      'x-props': {
        clearable: true,
        placeholder: i18n.t('settings.httpPlaceholder'),
      },
      description: i18n.t('settings.labels.logoDescription'),
    },
    show_community_name: {
      type: 'boolean',
      title: i18n.t('settings.labels.showCommunityName'),
      default: false,
      'x-display': 'switch',
      description: i18n.t('settings.labels.communityNameDescription'),
    },
  },
};
