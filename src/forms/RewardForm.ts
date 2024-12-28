import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';
import store from '@/store';
import utilService from '@/services/UtilService';

const on_event_full = [
  {
    const: 'DIRECT',
    title: i18n.global.t('_reward.labels._events.direct'),
  },
  {
    const: 'CONNECT',
    title: i18n.global.t('_reward.labels._events.connect'),
  },
  /* {
    const: 'DISCONNECT',
    title: i18n.global.t('_reward.labels._events.disconnect'),
  }, */
  {
    const: 'SPAWN',
    title: i18n.global.t('_reward.labels._events.spawn'),
  },
  {
    const: 'DEATH',
    title: i18n.global.t('_reward.labels._events.death'),
  },
  {
    const: 'DISABLE',
    title: i18n.global.t('_reward.labels._events.disable'),
  },
];

const on_event_reduced = [
  {
    const: 'DIRECT',
    title: i18n.global.t('_reward.labels._events.direct'),
  },
  {
    const: 'DISABLE',
    title: i18n.global.t('_reward.labels._events.disable'),
  },
];

const on_event_direct = [
  {
    const: 'DIRECT',
    title: i18n.global.t('_reward.labels._events.direct'),
  },
];

const serversSelectField = {
  type: 'array',
  title: i18n.global.t('_reward.labels.limitToServers'),
  description: i18n.global.t('_reward.labels.limitToServersDescription'),
  items: {
    type: 'object',
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
      title: i18n.global.t('_reward.labels.once'),
      default: false,
      description: i18n.global.t('_reward.labels.onceDescription'),
    },
    once_from_all: {
      type: 'boolean',
      title: i18n.global.t('_reward.labels.onceFromAll'),
      default: false,
      description: i18n.global.t('_reward.labels.onceFromAllDescription'),
    },
    reactivate_on_extend: {
      type: 'boolean',
      title: i18n.global.t('_reward.labels.reactivateOnExtend'),
      default: false,
    },
  };
  let serversSelectFieldOptional = {};

  if (rewardType === 'COMMAND') {
    required = ['command'];
    serversSelectFieldOptional = serversSelectField;
    properties = {
      command: {
        type: ['string', 'null'],
        default: '',
        title: i18n.global.t('command'),
        layout: {
          slots: {
            component: "custom-autocomplete"
          }
        }
      },
    };
  } else if (rewardType === 'SCRIPT') {
    required = ['script'];
    serversSelectFieldOptional = serversSelectField;
    properties = {
      script: {
        type: 'string',
        title: i18n.global.t('script'),
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
        type: 'string',
        title: i18n.global.t('group'),
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
        title: i18n.global.t('method'),
        enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      },
      url: {
        type: 'string',
        title: i18n.global.t('url'),
      },
      max_tries: {
        type: 'integer',
        title: i18n.global.t('_reward.labels.maxRetries'),
        minimum: 1,
        default: 3,
        maximum: 10,
      },
      headers: {
        type: 'array',
        title: i18n.global.t('_reward.labels.headers'),
        items: {
          type: 'object',
          properties: {
            key: {
              type: 'string',
              title: i18n.global.t('_reward.labels.headerKey'),
            },
            value: {
              type: 'string',
              title: i18n.global.t('_reward.labels.headerValue'),
            },
          },
        },
      },
    };
  } else if (rewardType === 'TEAMSPEAK_CHANNEL') {
    on_event_set = 'direct';
    otherOptions = {};
    serversSelectFieldOptional = serversSelectField;
    required = ['parent_channel_id', 'channel_group_id'];
    properties = {
      parent_channel_id: {
        type: 'integer',
        title: i18n.global.t('_reward.labels.parentChannelId'),
      },
      channel_group_id: {
        type: 'integer',
        title: i18n.global.t('_reward.labels.channelGroupId'),
      },
      client_limit: {
        type: 'integer',
        title: i18n.global.t('_reward.labels.clientLimit'),
        minimum: 0,
      },
      delete_on_expire: {
        type: 'boolean',
        title: i18n.global.t('_reward.labels.deleteOnExpire'),
        default: false,
      },
    };
  }

  requiredTop.push('on_event');
  requiredTop.push(...Object.keys(otherOptions));

  return {
    required: requiredTop,
    properties: {
      type: {
        title: i18n.global.t('type'),
        type: ['string'],
        const: rewardType,
      },
      on_event: {
        type: 'string',
        title: i18n.global.t('_reward.labels.onEvent'),
        oneOf: (on_event_set === 'full' ? on_event_full : (on_event_set === 'reduced' ? on_event_reduced : on_event_direct)),
        default: (on_event_set === 'direct' ? 'DIRECT' : null),
      },
      /*on_event_group: {
        type: 'object',
        required: ['on_event'],
        allOf: [
          {
            properties: {
              on_event: {
                type: 'string',
                title: i18n.global.t('_reward.labels.onEvent'),
                oneOf: on_event_reduced,
                layout: {
                  if: {
                    type: 'js-eval',
                    expr: 'rootData.serverbundle && rootData.serverbundle.server_type == "SOURCE"',
                    pure: false,
                  }
                }
              },
            },
          },
          {
            required: ['on_event'],
            properties: {
              on_event: {
                type: 'string',
                title: i18n.global.t('_reward.labels.onEvent'),
                oneOf: (on_event_set === 'full' ? on_event_full : (on_event_set === 'reduced' ? on_event_reduced : on_event_direct)),
                default: (on_event_set === 'direct' ? 'DIRECT' : null),
                layout: {
                  if: {
                    type: 'js-eval',
                    expr: 'rootData.serverbundle && rootData.serverbundle.server_type != "SOURCE"',
                    pure: false,
                  }
                },
              },
            },
          },
        ],
      },*/
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
  const res = {
    type: 'object',
    allOf: [{
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          title: i18n.global.t('name'),
        },
        serverbundle: {
          ...Common.serverbundleSelectField,
          type: 'object',
          description: i18n.global.t('_reward.labels.serverbundleDescription'),
        },
      },
    },
      {
        type: 'object',
        layout: {
          if: {
            type: 'js-eval',
            expr: 'rootData.serverbundle',
            pure: false,
          }
        },
        default: null,
        oneOf: [
          {
            title: i18n.global.t('_reward.labels._types.command'),
            ...rewardTypeFields('COMMAND'),
            layout: {
              if: {
                type: 'js-eval',
                expr: 'rootData.serverbundle && (rootData.serverbundle.server_type != "TEAMSPEAK3" && rootData.serverbundle.server_type != "DISCORD")',
                pure: false,
              }
            },
          },
          {
            title: i18n.global.t('_reward.labels._types.script'),
            ...rewardTypeFields('SCRIPT'),
            layout: {
              if: {
                type: 'js-eval',
                expr: 'rootData.serverbundle && (rootData.serverbundle.server_type == "GMOD" || rootData.serverbundle.server_type == "FIVEM")',
                pure: false,
              }
            },
          },
          {
            title: i18n.global.t('_reward.labels._types.credits',
              {
                credits_display_title:
                  store.getters.shopConfig.credits_display_title.toLowerCase(),
              }),
            ...rewardTypeFields('CREDITS'),
          },
          {
            title: i18n.global.t('_reward.labels._types.membership'),
            ...rewardTypeFields('MEMBERSHIP'),
          },
          {
            title: i18n.global.t('_reward.labels._types.http'),
            ...rewardTypeFields('HTTP'),
          },
          {
            title: i18n.global.t('_reward.labels._types.teamspeak_channel'),
            ...rewardTypeFields('TEAMSPEAK_CHANNEL'),
            layout: {
              if: {
                type: 'js-eval',
                expr: 'rootData.serverbundle && (rootData.serverbundle.server_type == "TEAMSPEAK3")',
                pure: false,
              }
            },
          },
        ],
      },
    ],
  };
  /*if (!utilService.data().utils.showAdvancedSettings()) {
    if (res.allOf[1] && res.allOf[1].oneOf) {
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const property of res.allOf[1].oneOf) {
        if (property.properties && property.properties.limit_servers) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          delete property.properties.limit_servers;
        }
      }
    }
  }*/
  return res;
}

export default form();
