import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: [

  ],
  'x-display': 'stepper',
  allOf: [
    {
      title: i18n.t('_import.gextension.labels.basicData'),
      description: i18n.t('_import.gextension.messages.basicDataDescription'),
      type: 'object',
      required: [
        'url',
        'api_key',
      ],
      properties: {
        url: {
          type: 'string',
          title: i18n.t('_import.gextension.labels.url'),
          description: i18n.t('_import.gextension.labels.urlDescription'),
          pattern: '^http(s?)://.+$',
          default: 'https://',
        },
        api_key: {
          'x-display': 'password',
          type: 'string',
          title: i18n.t('apiKey'),
          description: i18n.t('_import.gextension.labels.apiKeyDescription'),
        },
      },
    },
    {
      title: i18n.t('packets'),
      description: i18n.t('_import.gextension.messages.packetsDataDescription'),
      type: 'object',
      properties: {
        excluded_rewards: {
          ...Common.rewardsSelectField,
          title: i18n.t('_import.gextension.labels.excludedRewards'),
        },
        packet_translations: {
          type: 'array',
          title: i18n.t('_import.gextension.labels.packetTranslations'),
          items: {
            type: 'object',
            required: ['gex_packet', 'packet'],
            properties: {
              gex_packet: {
                title: i18n.t('_import.gextension.labels.gexPacket'),
                type: 'object',
                'x-fromUrl': `${Common.apiURL}/import/gextension/packet?url={url}&api_key={api_key}`,
                'x-itemKey': 'id',
                'x-itemTitle': 'title',
              },
              packet: Common.packetSelectField,
            },
          },
        },
      },
    },
    {
      title: i18n.t('import'),
      description: i18n.t('_import.gextension.messages.importDescription'),
      type: 'object',
      properties: {
        import_buttons: {
          'x-display': 'custom-import',
        },
      },
    },
  ],

};
