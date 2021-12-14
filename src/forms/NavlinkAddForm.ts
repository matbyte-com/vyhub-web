import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

function returnForm(disabled?: false) {
  return {
    type: 'object',
    required: [
      'title',
      'linkType',
      'icon',
    ],
    properties: {
      title: {
        type: 'string',
        title: i18n.t('title'),
      },
      enabled: {
        type: 'boolean',
        default: false,
        title: i18n.t('enabled'),
      },
      icon: Common.iconPicker,
      linkType: {
        type: 'string',
        title: i18n.t('type'),
        readOnly: disabled,
        oneOf: [
          {
            const: 'link',
            title: i18n.t('settings.externalLink'),
          },
          {
            const: 'html',
            title: i18n.t('settings.htmlContent'),
          },
        ],
      },
    },
  };
}

export default {
  returnForm,
};
