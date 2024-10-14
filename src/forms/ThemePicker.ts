import common from '@/forms/Common';
import i18n from '@/plugins/i18n';
import utilService from '@/services/UtilService';

// VJSF 3 compatible

function returnForm() {
  const ret: any = {
    type: 'object',
    required: [
      'dark',
    ],
    properties: {
      enable_landingpage: {
        type: 'boolean',
        title: i18n.global.t('_theme.enable_landingpage'),
        layout: {
          comp: 'switch',
        }
      },
      header: {
        ...common.colorPicker('_theme.headerColor', undefined, undefined, undefined, 4),
      },
      light_header: {
        type: 'boolean',
        title: i18n.global.t('_theme.lightHeaderColor'),
        layout: {
          comp: 'switch',
          cols: 4,
        }
      },
      header_container: {
        type: 'boolean',
        title: i18n.global.t('_theme.headerContainer'),
        layout: {
          comp: 'switch',
          cols: 4,
        }
      },
      footer: common.colorPicker('_theme.footerColor'),
      primary: common.colorPicker('_theme.primaryColor'),
      secondary: common.colorPicker('_theme.secondaryColor'),
      success: common.colorPicker('_theme.successColor'),
      warning: common.colorPicker('_theme.warningColor'),
      error: common.colorPicker('_theme.errorColor'),
      dark: {
        type: 'boolean',
        title: i18n.global.t('_theme.darkmode'),
        layout: {
          comp: 'switch',
          cols: 7,
        }
      },
      image: {
        type: 'string',
        title: i18n.global.t('_theme.backgroundImageURL'),
        pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,10}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
        props: {
          clearable: true,
          placeholder: i18n.global.t('_settings.httpPlaceholder'),
        },
        layout: {
          cols: 7,
        }
      },
      background: {
        ...common.colorPicker('_theme.backgroundColor', '_theme.backgroundColorDescription'),
        layout: {
          cols: 5,
        }
      },
      logo: {
        type: 'string',
        title: i18n.global.t('_theme.logoURL'),
        pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,10}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
        layout: {
          props: {
            clearable: true,
            placeholder: i18n.global.t('_settings.httpPlaceholder'),
          },
          cols: 6,
        },
        description: i18n.global.t('_theme.logoDescription'),
      },
      logo_width: {
        type: 'integer',
        minimum: 50,
        maximum: 150,
        title: i18n.global.t('_theme.logoWidth'),
        layout: {
          comp: 'slider',
          cols: 5,
          props: {
            thumbLabel: 'always'
          }
        },
      },
      show_community_name: {
        type: 'boolean',
        title: i18n.global.t('_theme.showCommunityName'),
        default: false,
        layout: {
          comp: 'switch',
          cols: 6,
        },
        description: i18n.global.t('_theme.communityNameDescription'),
      },
      custom_css: {
        type: 'string',
        title: i18n.global.t('_theme.customCss'),
        layout: {
          comp: 'textarea',
          props: {
            clearable: true,
            placeholder: '.vh-news-of-day { \n  color: red;\n}',
          }
        },
      },
    },
  };
  if (!utilService.data().utils.showAdvancedSettings()) {
    delete ret.properties.custom_css;
    delete ret.properties.success;
    delete ret.properties.error;
    delete ret.properties.warning;
    delete ret.properties.header_container;
  }
  return ret;
}

export default returnForm();
