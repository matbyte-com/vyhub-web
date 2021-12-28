import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

const on_event_full = [
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
  {
    const: 'DISABLE',
    title: i18n.t('_reward.labels._events.disable'),
  },
];

const on_event_reduced = [
  {
    const: 'DIRECT',
    title: i18n.t('_reward.labels._events.direct'),
  },
  {
    const: 'DISABLE',
    title: i18n.t('_reward.labels._events.disable'),
  },
];

function rewardTypeFields(rewardType: string) {
  let properties = {};
  let required: Array<string> = [];
  const requiredTop: Array<string> = [];
  let on_event_set = 'full';
  let onceSelectors: Object = {
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
  };

  if (rewardType === 'COMMAND') {
    required = ['command'];
    properties = {
      command: {
        type: 'string',
        title: i18n.t('command'),
        description: 'Available: %steamid64%, %steamid32%, %user_id%, %nick%, %uniqueid%, '
          + '%applied_packet_id%',
      },
    };
  } else if (rewardType === 'SCRIPT') {
    required = ['script'];
    properties = {
      script: {
        type: 'string',
        title: i18n.t('script'),
        'x-display': 'textarea',
        description: 'Available: PLAYER, %steamid64%, %steamid32%, %user_id%, %nick%, %uniqueid%, '
          + '%applied_packet_id%',
      },
    };
  } else if (rewardType === 'CREDITS') {
    on_event_set = 'reduced';
    onceSelectors = {};
    required = ['credits'];
    properties = {
      credits: {
        type: 'integer',
        title: i18n.t('_shop.labels.credits'),
        minimum: 1,
      },
    };
  } else if (rewardType === 'MEMBERSHIP') {
    on_event_set = 'reduced';
    onceSelectors = {};
    required = ['group'];
    properties = {
      group_id: {
        type: 'group',
        title: i18n.t('group'),
        'x-fromUrl': `${Common.apiURL}/group/`,
        'x-itemKey': 'id',
        'x-itemTitle': 'name',
      },
    };
  }

  requiredTop.push('on_event');
  requiredTop.push(...Object.keys(onceSelectors));

  return {
    required: requiredTop,
    properties: {
      type: {
        title: i18n.t('type'),
        type: 'string',
        const: rewardType,
      },
      on_event: {
        type: 'string',
        title: i18n.t('_reward.labels.onEvent'),
        oneOf: (on_event_set === 'full' ? on_event_full : on_event_reduced),
      },
      ...onceSelectors,
      data: {
        type: 'object',
        required,
        properties,
      },
    },
  };
}

function form() {
  return {
    type: 'object',
    allOf: [{
      required: ['name', 'serverbundle', 'type'],
      properties: {
        name: {
          type: 'string',
          title: i18n.t('name'),
        },
        serverbundle: Common.serverbundleSelectField,
      },
    },
    {
      type: 'object',
      oneOf: [
        {
          title: i18n.t('_reward.labels._types.command'),
          ...rewardTypeFields('COMMAND'),
        },
        {
          title: i18n.t('_reward.labels._types.script'),
          ...rewardTypeFields('SCRIPT'),
        },
        {
          title: i18n.t('_reward.labels._types.credits'),
          ...rewardTypeFields('CREDITS'),
        },
        {
          title: i18n.t('_reward.labels._types.membership'),
          ...rewardTypeFields('MEMBERSHIP'),
        },
      ],
    },
    ],
  };
}

export default form();
