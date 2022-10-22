import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';
import config from '@/config';

const API_URL = config.backend_url;

export default {
  type: 'object',
  required: [
    'title',
    'linkType',
    'icon',
    'location',
  ],
  properties: {
    title: {
      type: 'string',
      title: i18n.t('_navigation.linkTitle'),
    },
    location: {
      type: 'string',
      title: i18n.t('_navigation.location'),
      oneOf: [
        {
          const: 'HEADER',
          title: i18n.t('_navigation.header'),
        },
        {
          const: 'FOOTER',
          title: i18n.t('_navigation.footer'),
        },
      ],
    },
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
      title: i18n.t('_navigation.type'),
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
  else: {
    properties: {
      cms_page_id: {
        type: 'string',
        title: i18n.t('_navigation.cmsPage'),
        'x-fromUrl': `${API_URL}/navigation/html`,
        'x-itemTitle': 'title',
        'x-itemKey': 'id',
      },
    },
  },
};
