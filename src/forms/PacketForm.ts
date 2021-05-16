/* eslint-disable @typescript-eslint/camelcase */

import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';
import cc from 'currency-codes';

const API_URL = process.env.VUE_APP_BACKEND_CUSTOMER_URL;

export default {
  type: 'object',
  'x-display': 'tabs',
  'x-props': {
    grow: true,
  },
  allOf: [
    {
      title: i18n.t('general'),
      type: 'object',
      required: [
        'title', 'category', 'abstract', 'enabled', 'buyable', 'buyable_active', 'buyable_inactive',
      ],
      properties: {
        title: {
          type: 'string',
          title: i18n.t('title'),
        },
        subtitle: {
          type: 'string',
          title: i18n.t('subtitle'),
        },
        category: Common.packetCategorySelectField,
        enabled: {
          type: 'boolean',
          title: i18n.t('enabled'),
          description: i18n.t('_packet.labels.enabledDetail'),
          default: true,
        },
        abstract: {
          type: 'array',
          title: i18n.t('_packet.labels.abstract'),
          description: i18n.t('_packet.labels.abstractDetail'),
          items: {
            type: 'string',
          },
          default: [],
        },
        description: {
          type: 'string',
          title: i18n.t('description'),
          'x-display': 'textarea',
        },
        image_url: {
          ...Common.imageURLField,
          description: i18n.t('_packet.labels.imageDetail'),
        },
        active_for: {
          type: 'number',
          title: i18n.t('_packet.labels.activeFor'),
          description: i18n.t('_packet.labels.activeForDetail'),
          'x-slots': {
            'append-outer': i18n.t('days'),
          },
        },
        buyable: {
          type: 'boolean',
          title: i18n.t('_packet.labels.buyable'),
          description: i18n.t('_packet.labels.buyableDetail'),
          default: true,
        },
        buyable_active: {
          type: 'boolean',
          title: i18n.t('_packet.labels.buyableActive'),
          default: false,
        },
        buyable_inactive: {
          type: 'boolean',
          title: i18n.t('_packet.labels.buyableInactive'),
          default: false,
        },
      },
    },
    {
      title: i18n.t('payment'),
      type: 'object',
      required: [
        'price', 'currency_code',
      ],
      properties: {
        price: {
          type: 'number',
          title: i18n.t('price'),
          'x-cols': 4,
        },
        currency_code: {
          type: 'string',
          title: i18n.t('_packet.labels.currency'),
          'x-cols': 4,
          enum: cc.codes(),
        },
        credits: {
          type: 'integer',
          title: i18n.t('_shop.labels.credits'),
          'x-cols': 4,
        },
        custom_price: {
          type: 'boolean',
          title: i18n.t('_packet.labels.customPrice'),
          description: i18n.t('_packet.labels.customPriceDetail'),
          default: false,
          readOnly: true,
        },
        payment_gateways: {
          title: i18n.t('_packet.labels.limitPaymentMethods'),
          description: i18n.t('_packet.labels.limitPaymentMethodsDetail'),
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
          title: i18n.t('_packet.labels.recurring'),
          description: i18n.t('_packet.labels.recurringDetail'),
          default: false,
        },
      },
    },
    {
      title: i18n.t('relations'),
      type: 'object',
      properties: {
        relations: {
          title: i18n.t('_packet.labels.packetRelations'),
          type: 'array',
          items: {
            type: 'object',
            required: ['type', 'packet_right'],
            properties: {
              type: {
                title: i18n.t('type'),
                type: 'string',
                oneOf: [
                  {
                    const: 'DISABLES',
                    title: i18n.t('_packet.labels.relationDisables'),
                  },
                  {
                    const: 'REQUIRED',
                    title: i18n.t('_packet.labels.relationRequires'),
                  },
                  {
                    const: 'NOT_COMPATIBLE',
                    title: i18n.t('_packet.labels.relationNotCompatible'),
                  },
                  /* {
                    const: 'UPGRADES',
                    title: i18n.t('_packet.labels.relationUpgrades'),
                  }, */
                ],
              },
              packet_right: Common.packetSelectField,
            },
          },
        },
      },
    },
    {
      title: i18n.t('rewards'),
      type: 'object',
      properties: {
        rewards: Common.rewardsSelectField,
      },
    },
  ],
};
