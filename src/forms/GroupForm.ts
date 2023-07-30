import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';
import config from '@/config';
import utilService from '@/services/UtilService';

const API_URL = config.backend_url;

function returnForm() {
  const res = {
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
          max_ban_length: {
            type: ['integer'],
            title: i18n.t('_group.maxBanLengthInDays'),
            description: i18n.t('_group.maxBanLengthInDaysDescription'),
            default: null,
            minimum: 0,
            maximum: 365,
            'x-props': {
              clearable: true,
            },
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
          negative_properties: {
            type: 'array',
            items: {
              type: 'string',
            },
            title: i18n.t('_property.negatedProperties'),
            'x-fromUrl': `${API_URL}/group/negative-property/`,
            'x-itemTitle': 'description',
            'x-itemKey': 'name',
          },
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
              required: ['name'],
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

  if (!utilService.data().utils.showAdvancedSettings()) {
    delete res.allOf[1].properties.negative_properties;
  }
  return res;
}

export default {
  returnForm,
};
