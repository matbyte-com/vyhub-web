import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';
import config from '@/config';

const API_URL = config.backend_url;

function returnForm(links: {}[], disabled?: false) {
  return {
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
              type: 'string',
              title: i18n.t('_navigation.parentNavigationLink'),
              oneOf: links,
            },
          },
        },
        else: {
          properties: {
            location: {
              type: 'string',
              title: i18n.t('_navigation.location'),
              oneOf: [
                {
                  const: 'HEADER',
                  title: i18n.t('_navigation._location.header'),
                },
                {
                  const: 'FOOTER',
                  title: i18n.t('_navigation._location.footer'),
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
          'icon',
        ],
        properties: {
          enabled: {
            type: 'boolean',
            default: false,
            title: i18n.t('_navigation.enabled'),
          },
          req_prop: {
            type: 'string',
            title: i18n.t('_navigation.reqProp'),
          },
          icon: Common.iconPicker,
          linkType: {
            type: 'string',
            title: i18n.t('type'),
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
              readOnly: disabled,
              'x-props': {
                placeholder: 'https://vhyub.net',
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
