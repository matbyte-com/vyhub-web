/* eslint-disable @typescript-eslint/camelcase */

import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: ['name', 'serverbundle', 'type', 'value', 'on_event'],
  properties: {
    name: {
      type: 'string',
      title: i18n.t('name'),
    },
    serverbundle: Common.serverbundleSelectField,
    type: {
      type: 'string',
      title: i18n.t('type'),
      oneOf: [
        {
          const: 'COMMAND',
          title: i18n.t('_reward.labels._types.command'),
        },
        {
          const: 'SCRIPT',
          title: i18n.t('_reward.labels._types.script'),
        },
        {
          const: 'CREDITS',
          title: i18n.t('_reward.labels._types.credits'),
        },
      ],
    },
    value: {
      type: 'string',
      title: i18n.t('value'),
      'x-display': 'textarea',
    },
    on_event: {
      type: 'string',
      title: i18n.t('_reward.labels.onEvent'),
      oneOf: [
        {
          const: 'DIRECT',
          title: i18n.t('_reward.labels._events.direct'),
        },
        {
          const: 'CONNECT',
          title: i18n.t('_reward.labels._events.connect'),
        },
        {
          const: 'DISCONNECT',
          title: i18n.t('_reward.labels._events.disconnect'),
        },
        {
          const: 'SPAWN',
          title: i18n.t('_reward.labels._events.spawn'),
        },
        {
          const: 'DEATH',
          title: i18n.t('_reward.labels._events.death'),
        },
      ],
    },
    once: {
      type: 'boolean',
      title: i18n.t('_reward.labels.once'),
      default: false,
    },
    once_from_all: {
      type: 'boolean',
      title: i18n.t('_reward.labels.onceFromAll'),
      default: false,
    },
  },
};
