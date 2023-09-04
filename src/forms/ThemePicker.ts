import common from '@/forms/Common';
import i18n from '@/plugins/i18n';
import utilService from '@/services/UtilService';

function returnForm() {
  const ret = {
    type: 'object',
    required: [
      'dark',
    ],
    properties: {
      enable_landingpage: {
        type: 'boolean',
        title: i18n.t('_theme.enable_landingpage'),
        'x-display': 'switch',
      },
      header: common.colorPicker('_theme.headerColor'),
      light_header: {
        type: 'boolean',
        title: i18n.t('_theme.lightHeaderColor'),
        'x-display': 'switch',
        'x-cols': 6,
      },
      footer: common.colorPicker('_theme.footerColor'),
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
        'x-cols': 6,
      },
      background: {
        ...common.colorPicker('_theme.backgroundColor', '_theme.backgroundColorDescription'),
        'x-class': 'ml-5 mt-3',
        'x-cols': 5,
      },
      logo: {
        type: 'string',
        title: i18n.t('_theme.logoURL'),
        pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
        'x-props': {
          clearable: true,
          placeholder: i18n.t('_settings.httpPlaceholder'),
        },
        description: i18n.t('_theme.logoDescription'),
        'x-cols': 6,
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
        'x-class': 'ml-5 mt-5',
        'x-cols': 5,
      },
      show_community_name: {
        type: 'boolean',
        title: i18n.t('_theme.showCommunityName'),
        default: false,
        'x-display': 'switch',
        description: i18n.t('_theme.communityNameDescription'),
      },
      custom_css: {
        type: 'string',
        title: i18n.t('_theme.customCss'),
        'x-display': 'textarea',
        'x-props': {
          clearable: true,
          placeholder: '.vh-news-of-day { \n  color: red;\n}',
        },
      },
    },
  };
  if (!utilService.data().utils.showAdvancedSettings()) {
    delete ret.properties.custom_css;
    delete ret.properties.success;
    delete ret.properties.error;
    delete ret.properties.warning;
  }
  return ret;
}

export default returnForm();
