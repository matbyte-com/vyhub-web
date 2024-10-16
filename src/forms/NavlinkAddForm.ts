import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';
import config from '@/config';
import utilService from '@/services/UtilService';

const API_URL = config.backend_url;

function returnForm(links: {}[], disabled?: false) {
  const ret = {
    type: 'object',
    allOf: [
      {
        required: [
          'title',
        ],
        properties: {
          title: {
            type: 'string',
            title: i18n.t('_navigation.linkTitle'),
          },
          subLink: {
            type: 'boolean',
            title: i18n.t('_navigation.sublink'),
            'x-cols': 4,
            'x-class': 'mt-4',
          },
        },
        if: {
          required: ['subLink'],
          properties: {
            subLink: {
              const: true,
            },
          },
        },
        then: {
          properties: {
            parent_navigation_link_id: {
              type: ['string', 'null'],
              title: i18n.t('_navigation.parentNavigationLink'),
              oneOf: links,
              'x-options': {
                fieldColProps: {
                  cols: 8,
                },
              },
            },
          },
        },
        else: {
          required: ['location'],
          properties: {
            location: {
              type: 'string',
              title: i18n.t('_navigation.location'),
              'x-options': {
                fieldColProps: {
                  cols: 8,
                },
              },
              oneOf: [
                {
                  const: 'HEADER',
                  title: i18n.t('_navigation._location.header'),
                },
                {
                  const: 'FOOTER',
                  title: i18n.t('_navigation._location.footer'),
                },
                {
                  const: 'HELP',
                  title: i18n.t('_navigation._location.help'),
                },
              ],
            },
          },
        },
      },
      {
        required: [
          'enabled',
          'linkType',
        ],
        properties: {
          enabled: {
            type: 'boolean',
            default: 'true',
            title: i18n.t('_navigation.enabled'),
            'x-cols': 4,
            'x-class': 'mt-4',
          },
          req_prop: {
            type: 'string',
            title: i18n.t('_navigation.reqProp'),
            'x-options': {
              fieldColProps: {
                cols: 8,
              },
            },
          },
          icon: Common.iconPicker,
          linkType: {
            type: 'string',
            title: i18n.t('type'),
            readOnly: disabled,
            oneOf: [
              {
                const: 'link',
                title: i18n.t('_navigation.link'),
              },
              {
                const: 'html',
                title: i18n.t('_navigation.htmlContent'),
              },
            ],
            default: 'link',
            'x-class': 'mr-3, pr-3',
            'x-cols': 4,
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
              pattern: '(^https?://.+$)|(/.*)',
              readOnly: disabled,
              'x-props': {
                placeholder: 'https://vyhub.net',
              },
              'x-options': {
                fieldColProps: {
                  cols: 8,
                },
              },
            },
          },
        },
        else: {
          properties: {
            cms_page_id: {
              type: 'string',
              title: i18n.t('_navigation.cmsPage'),
              'x-fromUrl': `${API_URL}/general/html`,
              'x-itemTitle': 'title',
              'x-itemKey': 'id',
              'x-options': {
                fieldColProps: {
                  cols: 8,
                },
              },
            },
          },
        },
      },
    ],
  };
  if (!utilService.data().utils.showAdvancedSettings()) {
    ret.allOf[1].properties.linkType?.oneOf.splice(1, 1);
  }
  return ret;
}

export default {
  returnForm,
};
