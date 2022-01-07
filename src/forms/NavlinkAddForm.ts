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
        title: i18n.t('_navigation.linkTitle'),
      },
      enabled: {
        type: 'boolean',
        default: false,
        title: i18n.t('_navigation.enabled'),
      },
      icon: Common.iconPicker,
      linkType: {
        type: 'string',
        title: i18n.t('_navigation.type'),
        readOnly: disabled,
        oneOf: [
          {
            const: 'link',
            title: i18n.t('_navigation.externalLink'),
          },
          {
            const: 'html',
            title: i18n.t('_navigation.htmlContent'),
          },
        ],
        default: 'link',
      },
    },
    if: {
      required: ['linkType'],
      properties: {
        linkType: {
          const: 'link',
        },
      },
    },
    then: {
      properties: {
        link: {
          type: 'string',
          title: i18n.t('_navigation.link'),
          pattern: '^https?://.+$',
          'x-props': {
            placeholder: 'https://vhyub.net',
          },
        },
      },
    },
  };
}

export default {
  returnForm,
};
