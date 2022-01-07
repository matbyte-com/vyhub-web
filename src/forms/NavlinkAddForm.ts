import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

function returnForm(disabled?: false) {
  return {
    type: 'object',
    allOf: [
      {
        required: [
          'title',
          'linkType',
          'icon',
        ],
        properties: {
          title: {
            type: 'string',
            title: i18n.t('_navigation.title'),
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
            },
          },
        },
      },
    ],
  };
}

export default {
  returnForm,
};
