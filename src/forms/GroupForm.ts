import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

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
        'name',
        'permission_level',
      ],
      properties: {
        name: {
          type: 'string',
          title: i18n.t('name'),
        },
        permission_level: {
          type: 'integer',
          title: i18n.t('_settings.permissionLevel'),
          minimum: 0,
          maximum: 100000,
        },
        color: Common.colorPicker(),
        is_team: {
          type: 'boolean',
          title: i18n.t('_group.isTeam'),
          description: i18n.t('_group.isTeamDescription'),
          'x-display': 'switch',
          default: false,
        },
      },
    },
    {
      title: i18n.t('properties'),
      type: 'object',
      properties: {
        properties: Common.propertiesSelector,
      },
    },
    {
      title: i18n.t('mappings'),
      type: 'object',
      properties: {
        mappings: {
          type: 'array',
          title: i18n.t('mappings'),
          items: {
            type: 'object',
            required: ['name', 'serverbundle_id'],
            properties: {
              serverbundle_id: Common.serverbundleIdSelectField,
              name: {
                type: 'string',
                title: i18n.t('_group.mappings.name'),
              },
            },
          },
        },
      },
    },
  ],
};
