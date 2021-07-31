import Common from '@/forms/Common';
import i18n from '@/plugins/i18n';

const API_URL = Common.apiURL;

function returnForm(disableServerTypeSelectField = false) {
  const form = {
    type: 'object',
    required: [
      'name',
      'server_type',
    ],
    properties: {
      name: {
        type: 'string',
        title: i18n.t('name'),
      },
      multigroup: {
        type: 'boolean',
        title: i18n.t('settings.multigroup'),
        description: i18n.t('settings.multigroupDescription'),
      },
      color: Common.colorPicker(),
      icon: Common.iconPicker,
      server_type: Common.serverTypeSelectField(disableServerTypeSelectField),
    },
    dependencies: {
      server_type: {
        properties: {
          default_group: {
            type: 'object',
            title: i18n.t('settings.defaultGroup'),
            'x-fromUrl': `${API_URL}/group/?type={server_type}`,
            'x-itemTitle': 'name',
            'x-itemKey': 'id',
          },
        },
      },
    },
  };
  return form;
}

export default {
  returnForm,
};
