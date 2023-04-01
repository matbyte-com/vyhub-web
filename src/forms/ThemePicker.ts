import common from '@/forms/Common';
import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'dark',
  ],
  properties: {
    header: common.colorPicker('_theme.headerColor'),
    primary: common.colorPicker('_theme.primaryColor'),
    secondary: common.colorPicker('_theme.secondaryColor'),
    success: common.colorPicker('_theme.successColor'),
    warning: common.colorPicker('_theme.warningColor'),
    error: common.colorPicker('_theme.errorColor'),
    dark: {
      type: 'boolean',
      title: i18n.t('_theme.darkmode'),
      'x-display': 'switch',
    },
    image: {
      type: 'string',
      title: i18n.t('_theme.backgroundImageURL'),
      pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
      'x-props': {
        clearable: true,
        placeholder: i18n.t('_settings.httpPlaceholder'),
      },
    },
    background: common.colorPicker('_theme.backgroundColor', '_theme.backgroundColorDescription'),
    logo: {
      type: 'string',
      title: i18n.t('_theme.logoURL'),
      pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
      'x-props': {
        clearable: true,
        placeholder: i18n.t('_settings.httpPlaceholder'),
      },
      description: i18n.t('_theme.logoDescription'),
    },
    logo_width: {
      type: 'integer',
      minimum: 50,
      maximum: 150,
      title: i18n.t('_theme.logoWidth'),
      'x-display': 'slider',
      'x-props': {
        'thumb-label': 'always',
      },
    },
    show_community_name: {
      type: 'boolean',
      title: i18n.t('_theme.showCommunityName'),
      default: false,
      'x-display': 'switch',
      description: i18n.t('_theme.communityNameDescription'),
    },
    favicon: {
      type: 'string',
      title: i18n.t('_theme.faviconURL'),
      pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
      'x-props': {
        clearable: true,
        placeholder: i18n.t('_settings.httpPlaceholder'),
      },
    },
    show_information_fab: {
      type: 'boolean',
      title: i18n.t('_theme.showInformationFab'),
      'x-display': 'switch',
      description: i18n.t('_theme.showInformationFabDescription'),
    },
  },
};
