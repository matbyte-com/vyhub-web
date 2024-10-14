import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';
import config from '@/config';
import utilService from '@/services/UtilService';

const API_URL = config.backend_url;

function returnForm(links: {}[], disabled?: false) {
  const ret = {
    allOf: [
      {
        type: 'object',
        required: ['title'],
        properties: {
          title: {
            type: 'string',
            title: i18n.global.t('_navigation.linkTitle'),
          },
          subLink: {
            type: 'boolean',
            title: i18n.global.t('_navigation.sublink'),
            default: false,
            layout: {
              cols: 4,
            },
          },
        },
        dependentSchemas: {
          subLink: {
            layout: {
              cols: 8,
            },
            if: {
              properties: {
                subLink: {
                  const: true,
                }
              }
            },
            then: {
              properties: {
                parent_navigation_link_id: {
                  type: ['string', 'null'],
                  title: i18n.global.t('_navigation.parentNavigationLink'),
                  oneOf: links,
                },
              },
            },
            else: {
              required: ['location'],
              properties: {
                location: {
                  type: 'string',
                  title: i18n.global.t('_navigation.location'),
                  oneOf: [
                    {
                      const: 'HEADER',
                      title: i18n.global.t('_navigation._location.header'),
                    },
                    {
                      const: 'FOOTER',
                      title: i18n.global.t('_navigation._location.footer'),
                    },
                    {
                      const: 'HELP',
                      title: i18n.global.t('_navigation._location.help'),
                    },
                  ],
                },
              },
            },
          }
        }
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
            title: i18n.global.t('_navigation.enabled'),
            layout: {
              cols: 4,
            },
          },
          req_prop: {
            type: 'string',
            title: i18n.global.t('_navigation.reqProp'),
            layout: {
              cols: 8,
            },
          },
          icon: Common.iconPicker,
          linkType: {
            type: 'string',
            title: i18n.global.t('type'),
            readOnly: disabled,
            oneOf: [
              {
                const: 'link',
                title: i18n.global.t('_navigation.link'),
              },
              {
                const: 'html',
                title: i18n.global.t('_navigation.htmlContent'),
              },
            ],
            default: 'link',
            layout: {
              cols: 4,
            },
            // 'x-class': 'mr-3, pr-3',
          },
        },
        dependentSchemas: {

          linkType: {
            if: {
              properties: {
                linkType: {
                  const: 'link'
                }
              }
            },
            layout: {
              cols: 8,
            },
            then: {
              properties: {
                link: {
                  type: 'string',
                  title: i18n.global.t('_navigation.link'),
                  pattern: '(^https?://.+$)|(/.*)',
                  readOnly: disabled,
                  layout: {
                    props: {
                      placeholder: 'https://vyhub.net',
                    }
                  },
                },
              },
            },
            else: {
              properties: {
                cms_page_id: {
                  type: 'string',
                  title: i18n.global.t('_navigation.cmsPage'),
                  'x-fromUrl': `${API_URL}/general/html`,
                  'x-itemTitle': 'title',
                  'x-itemKey': 'id',
                },
              },
            },
          }
        }
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
