import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';
import store from '@/store';

const on_event_full = [
  {
    const: 'DIRECT',
    title: i18n.t('_reward.labels._events.direct'),
  },
  {
    const: 'CONNECT',
    title: i18n.t('_reward.labels._events.connect'),
  },
  /* {
    const: 'DISCONNECT',
    title: i18n.t('_reward.labels._events.disconnect'),
  }, */
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

const serversSelectField = {
  type: 'array',
  title: i18n.t('_reward.labels.limitToServers'),
  description: i18n.t('_reward.labels.limitToServersDescription'),
  items: {
    type: 'string',
  },
  'x-fromUrl': `${Common.apiURL}/server/?serverbundle_id={serverbundle.id}`,
  'x-itemKey': 'id',
  'x-itemTitle': 'name',
};

function rewardTypeFields(rewardType: string) {
  let properties = {};
  let required: Array<string> = [];
  const requiredTop: Array<string> = [];
  let on_event_set = 'full';
  let otherOptions: Object = {
    once: {
      type: 'boolean',
      title: i18n.t('_reward.labels.once'),
      default: false,
      description: i18n.t('_reward.labels.onceDescription'),
    },
    once_from_all: {
      type: 'boolean',
      title: i18n.t('_reward.labels.onceFromAll'),
      default: false,
      description: i18n.t('_reward.labels.onceFromAllDescription'),
    },
    reactivate_on_extend: {
      type: 'boolean',
      title: i18n.t('_reward.labels.reactivateOnExtend'),
      default: false,
    },
  };
  let serversSelectFieldOptional = {};

  if (rewardType === 'COMMAND') {
    required = ['command'];
    serversSelectFieldOptional = serversSelectField;
    properties = {
      command: {
        type: 'string',
        title: i18n.t('command'),
      },
    };
  } else if (rewardType === 'SCRIPT') {
    required = ['script'];
    serversSelectFieldOptional = serversSelectField;
    properties = {
      script: {
        type: 'string',
        title: i18n.t('script'),
        'x-display': 'textarea',
      },
    };
  } else if (rewardType === 'CREDITS') {
    on_event_set = 'reduced';
    otherOptions = {};
    required = ['credits'];
    properties = {
      credits: {
        type: 'integer',
        title: store.getters.shopConfig.credits_display_title,
        minimum: 1,
      },
    };
  } else if (rewardType === 'MEMBERSHIP') {
    on_event_set = 'reduced';
    otherOptions = {};
    required = ['group_id'];
    properties = {
      group_id: {
        type: 'group',
        title: i18n.t('group'),
        'x-fromUrl': `${Common.apiURL}/group/`,
        'x-itemKey': 'id',
        'x-itemTitle': 'name',
      },
    };
  } else if (rewardType === 'HTTP') {
    on_event_set = 'reduced';
    otherOptions = {};
    required = ['method', 'url'];
    properties = {
      method: {
        type: 'string',
        title: i18n.t('method'),
        enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      },
      url: {
        type: 'string',
        title: i18n.t('url'),
      },
      max_tries: {
        type: 'integer',
        title: i18n.t('_reward.labels.maxRetries'),
        minimum: 1,
        default: 3,
        maximum: 10,
      },
      headers: {
        type: 'array',
        title: i18n.t('_reward.labels.headers'),
        items: {
          type: 'object',
          properties: {
            key: {
              type: 'string',
              title: i18n.t('_reward.labels.headerKey'),
            },
            value: {
              type: 'string',
              title: i18n.t('_reward.labels.headerValue'),
            },
          },
        },
      },
    };
  }

  requiredTop.push('on_event');
  requiredTop.push(...Object.keys(otherOptions));

  return {
    required: requiredTop,
    properties: {
      type: {
        title: i18n.t('type'),
        type: 'string',
        const: rewardType,
      },
      on_event_group: {
        type: 'object',
        allOf: [
          {
            properties: {
              on_event: {
                type: 'string',
                title: i18n.t('_reward.labels.onEvent'),
                oneOf: on_event_reduced,
                'x-if': 'root.serverbundle and root.serverbundle.server_type == "SOURCE"',
                'x-options': {
                  evalMethod: 'evalExpr',
                },
              },
            },
          },
          {
            properties: {
              on_event: {
                type: 'string',
                title: i18n.t('_reward.labels.onEvent'),
                oneOf: (on_event_set === 'full' ? on_event_full : on_event_reduced),
                'x-if': 'not root.serverbundle or root.serverbundle.server_type != "SOURCE"',
                'x-options': {
                  evalMethod: 'evalExpr',
                },
              },
            },
          },
        ],
      },
      limit_servers: serversSelectFieldOptional,
      ...otherOptions,
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
      required: ['name', 'type'],
      properties: {
        name: {
          type: 'string',
          title: i18n.t('name'),
        },
        serverbundle: {
          ...Common.serverbundleSelectField,
          type: ['object', 'null'],
          description: i18n.t('_reward.labels.serverbundleDescription'),
        },
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
          title: i18n.t('_reward.labels._types.credits',
            {
              credits_display_title:
                store.getters.shopConfig.credits_display_title.toLowerCase(),
            }),
          ...rewardTypeFields('CREDITS'),
        },
        {
          title: i18n.t('_reward.labels._types.membership'),
          ...rewardTypeFields('MEMBERSHIP'),
        },
        {
          title: i18n.t('_reward.labels._types.http'),
          ...rewardTypeFields('HTTP'),
        },
      ],
    },
    ],
  };
}

export default form();
