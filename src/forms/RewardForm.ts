import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

function rewardTypeFields(rewardType: string) {
  let properties = {};
  let required: Array<string> = [];

  if (rewardType === 'COMMAND') {
    required = ['command'];
    properties = {
      command: {
        type: 'string',
        title: i18n.t('command'),
      },
    };
  } else if (rewardType === 'SCRIPT') {
    required = ['script'];
    properties = {
      script: {
        type: 'string',
        title: i18n.t('script'),
        'x-display': 'textarea',
      },
    };
  } else if (rewardType === 'CREDITS') {
    required = ['credits'];
    properties = {
      credits: {
        type: 'integer',
        title: i18n.t('_shop.labels.credits'),
        minimum: 1,
      },
    };
  } else if (rewardType === 'MEMBERSHIP') {
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

  return {
    properties: {
      type: {
        title: i18n.t('type'),
        type: 'string',
        const: rewardType,
      },
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
    required: ['name', 'serverbundle', 'type', 'value', 'on_event'],
    allOf: [{
      properties: {
        name: {
          type: 'string',
          title: i18n.t('name'),
        },
        serverbundle: Common.serverbundleSelectField,
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
            {
              const: 'DISABLE',
              title: i18n.t('_reward.labels._events.disable'),
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
