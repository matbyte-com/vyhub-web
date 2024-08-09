import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';
import store from '@/store';
import utilService from '@/services/UtilService';

const API_URL = Common.apiURL;

function form() {
  const res = {
    type: 'object',
    'x-display': 'tabs',
    'x-props': {
      grow: true,
    },
    allOf: [
      {
        title: i18n.global.t('general'),
        type: 'object',
        required: [
          'title', 'category', 'enabled', 'buyable',
        ],
        properties: {
          title: {
            type: 'string',
            title: i18n.global.t('title'),
          },
          title_in_image: {
            type: 'string',
            title: i18n.global.t('_packet.labels.titleInImage'),
          },
          subtitle: {
            type: 'string',
            title: i18n.global.t('subtitle'),
          },
          category: Common.packetCategorySelectField,
          subcategory: {
            'x-display': 'combobox',
            type: 'string',
            title: i18n.global.t('subcategory'),
            'x-fromUrl': `${API_URL}/packet/category/{category.id}/subcategory`,
          },
          abstract: {
            type: 'array',
            title: i18n.global.t('_packet.labels.abstract'),
            description: i18n.global.t('_packet.labels.abstractDetail'),
            items: {
              type: 'string',
            },
            default: [],
          },
          description: {
            type: 'string',
            title: i18n.global.t('description'),
            'x-display': 'custom-editor',
          },
          image_url: {
            ...Common.imageURLField,
            description: i18n.global.t('_packet.labels.imageDetail'),
          },
          active_for: {
            type: ['number', 'null'],
            title: i18n.global.t('_packet.labels.activeFor'),
            description: i18n.global.t('_packet.labels.activeForDetail'),
            'x-slots': {
              'append-outer': i18n.global.t('days'),
            },
            minimum: 1,
          },
          enabled: {
            type: 'boolean',
            title: i18n.global.t('enabled'),
            description: i18n.global.t('_packet.labels.enabledDetail'),
            default: true,
          },
          buyable: {
            type: 'boolean',
            title: i18n.global.t('_packet.labels.buyable'),
            description: i18n.global.t('_packet.labels.buyableDetail'),
            default: true,
          },
          buyable_active: {
            type: 'boolean',
            title: i18n.global.t('_packet.labels.buyableActive'),
            default: false,
          },
          buyable_inactive: {
            type: 'boolean',
            title: i18n.global.t('_packet.labels.buyableInactive'),
            default: false,
          },
          recommendable: {
            type: 'boolean',
            title: i18n.global.t('_packet.labels.recommendable'),
            description: i18n.global.t('_packet.labels.recommendableDescription'),
            default: true,
          },
        },
      },
      {
        title: i18n.global.t('payment'),
        type: 'object',
        required: [
          'price', 'currency_code',
        ],
        properties: {
          price: {
            type: 'number',
            title: i18n.global.t('price'),
            'x-cols': 4,
            minimum: 0,
          },
          currency_code: {
            ...Common.currency_code,
            'x-cols': 4,
          },
          credits: {
            type: ['integer', 'null'],
            title: store.getters.shopConfig.credits_display_title,
            'x-cols': 4,
            minimum: 0,
          },
          custom_price: {
            type: 'boolean',
            title: i18n.global.t('_packet.labels.customPrice'),
            description: i18n.global.t('_packet.labels.customPriceDetail'),
            default: false,
          },
          payment_gateways: {
            title: i18n.global.t('_packet.labels.limitPaymentMethods'),
            description: i18n.global.t('_packet.labels.limitPaymentMethodsDetail'),
            type: 'array',
            items: {
              type: 'object',
            },
            'x-fromUrl': `${API_URL}/shop/gateway/`,
            'x-itemKey': 'id',
            'x-itemTitle': 'name',
          },
          recurring: {
            type: 'boolean',
            title: i18n.global.t('_packet.labels.recurring'),
            description: i18n.global.t('_packet.labels.recurringDetail'),
            default: false,
          },
        },
      },
      {
        title: i18n.global.t('relations'),
        type: 'object',
        properties: {
          relations: {
            title: i18n.global.t('_packet.labels.packetRelations'),
            type: 'array',
            items: {
              type: 'object',
              required: ['type', 'packet_right'],
              properties: {
                type: {
                  title: i18n.global.t('type'),
                  type: 'string',
                  oneOf: [
                    {
                      const: 'REQUIRES',
                      title: i18n.global.t('_packet.labels.relationRequires'),
                    },
                    {
                      const: 'NOT_COMPATIBLE',
                      title: i18n.global.t('_packet.labels.relationNotCompatible'),
                    },
                    {
                      const: 'DISABLES',
                      title: i18n.global.t('_packet.labels.relationDisables'),
                    },
                    {
                      const: 'UPGRADES',
                      title: i18n.global.t('_packet.labels.relationUpgrades'),
                    },
                  ],
                },
                packet_right: Common.packetSelectField,
              },
            },
          },
        },
      },
      {
        title: i18n.global.t('rewards'),
        type: 'object',
        properties: {
          rewards: Common.rewardsSelectField,
        },
      },
    ],
  };
  if (!utilService.data().utils.showAdvancedSettings()) {
    delete res.allOf[0].properties.enabled;
    delete res.allOf[0].properties.buyable_active;
    delete res.allOf[0].properties.buyable_inactive;
    delete res.allOf[0].properties.abstract;
    delete res.allOf[1].properties.payment_gateways;
    delete res.allOf[2];
  }
  return res;
}

export default {
  form,
};
