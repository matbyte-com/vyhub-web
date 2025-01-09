import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: [

  ],
  'x-display': 'stepper',
  allOf: [
    {
      title: i18n.global.t('_import.gextension.labels.basicData'),
      description: i18n.global.t('_import.gextension.messages.basicDataDescription'),
      type: 'object',
      required: [
        'url',
        'api_key',
      ],
      properties: {
        url: {
          type: 'string',
          title: i18n.global.t('_import.gextension.labels.url'),
          description: i18n.global.t('_import.gextension.labels.urlDescription'),
          pattern: '^http(s?)://.+$',
          default: 'https://',
        },
        api_key: {
          type: 'string',
          title: i18n.global.t('apiKey'),
          description: i18n.global.t('_import.gextension.labels.apiKeyDescription'),
        },
      },
    },
    {
      title: i18n.global.t('_import.gextension.labels.groupServerbundleUser'),
      description: i18n.global.t('_import.gextension.messages.import1Description'),
      type: 'object',
      properties: {
        import_buttons_1: {
          type: 'string',
          layout: {
            slots: {
              component: 'custom-import-1',
            }
          }
        },
      },
    },
    {
      title: i18n.global.t('_import.gextension.labels.furtherData'),
      description: i18n.global.t('_import.gextension.messages.import2Description'),
      type: 'object',
      properties: {
        import_buttons_2: {
          type: 'string',
          layout: {
            slots: {
              component: 'custom-import-2',
            }
          }
        },
      },
    },
    {
      title: i18n.global.t('packets'),
      description: i18n.global.t('_import.gextension.messages.packetsDataDescription'),
      type: 'object',
      properties: {
        excluded_rewards: {
          ...Common.rewardSelectField,
          title: i18n.global.t('_import.gextension.labels.excludedRewards'),
          type: 'array',
          default: [],
          items: {
            type: 'object',
          },
        },
        packet_translations: {
          type: 'array',
          title: i18n.global.t('_import.gextension.labels.packetTranslations'),
          default: [],
          items: {
            type: 'object',
            required: ['gex_packet', 'packet'],
            properties: {
              gex_packet: {
                title: i18n.global.t('_import.gextension.labels.gexPacket'),
                type: 'object',
                'x-fromUrl': `${Common.apiURL}/import/gextension/packet?url={rootData.url}&api_key={rootData.api_key}`,
                'x-itemKey': 'id',
                'x-itemTitle': 'title',
              },
              packet: Common.packetSelectField,
            },
          },
        },
        import_buttons_3: {
          type: 'string',
          layout: {
            slots: {
              component: 'custom-import-3',
            }
          }
        },
      },
    },
  ],

};
