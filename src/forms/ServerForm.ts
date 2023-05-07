import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

function serverTypeFields(serverType: string) {
  let properties = {};
  let required: Array<string> = [];
  let properties_secrets = {};
  let required_secrets: Array<string> = [];

  if (serverType === 'GMOD') {
    required = [];
    properties = {
      res_slots: {
        type: 'integer',
        title: i18n.t('_server.labels.numberOfReservedSlots'),
        minimum: 0,
        default: 0,
      },
      res_slots_keep_free: {
        type: 'boolean',
        title: i18n.t('_server.labels.keepReservedSlotsFree'),
        default: false,
      },
      res_slots_hide: {
        type: 'boolean',
        title: i18n.t('_server.labels.hideReservedSlots'),
        default: false,
      },
    };
  }
  if (serverType === 'DISCORD') {
    properties = {
      joinBotLink: {
        'x-slots': {
          before: i18n.t('_server.labels.discordEnterIdAsAddress'),
        },
      },
    };
  }
  if (serverType === 'TEAMSPEAK3') {
    required = ['query_port'];
    required_secrets = ['username', 'password'];
    properties = {
      query_port: {
        type: 'integer',
        title: i18n.t('_server.labels.sshQueryPort'),
        description: i18n.t('_server.labels.queryPortDescription'),
        default: 1,
        minimum: 1,
        maximum: 65535,
      },
    };
    properties_secrets = {
      username: {
        type: 'string',
        title: i18n.t('username'),
      },
      password: {
        type: 'string',
        title: i18n.t('password'),
      },
    };
  }

  return {
    title: serverType,
    required: ['type'],
    properties: {
      type: {
        title: i18n.t('type'),
        type: 'string',
        const: serverType,
      },
      extra: {
        type: 'object',
        required,
        properties,
      },
      secrets: {
        type: 'object',
        required: required_secrets,
        properties: properties_secrets,
      },
    },
  };
}

export default {
  type: 'object',
  allOf: [
    {
      required: ['name', 'address', 'port'],
      properties: {
        name: {
          type: 'string',
          title: i18n.t('name'),
        },
        address: {
          type: 'string',
          title: i18n.t('address'),
        },
        port: {
          type: 'integer',
          title: i18n.t('port'),
          default: 1,
          minimum: 1,
          maximum: 65535,
        },
      },
    },
    {
      type: 'object',
      oneOf: [
        {
          ...serverTypeFields('GMOD'),
        },
        {
          ...serverTypeFields('MINECRAFT'),
        },
        {
          ...serverTypeFields('TEAMSPEAK3'),
        },
        {
          ...serverTypeFields('DISCORD'),
        },
        {
          ...serverTypeFields('FIVEM'),
        },
      ],
    },
    {
      required: ['serverbundle_id'],
      properties: {
        serverbundle_id: Common.serverbundleSelectFieldByType('string'),
      },
    },
  ],
};
