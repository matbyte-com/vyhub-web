import Common from '@/forms/Common';
import i18n from '@/plugins/i18n';

const API_URL = Common.apiURL;

function returnForm(disableServerTypeSelectField = false) {
  const form = {
    type: 'object',
    required: [
      'name',
      'serverType',
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
      /* icon: {
        type: 'string',
        title: i18n.t('icon'),
        'x-slots': {
          'append-outer': `<a href="https://materialdesignicons.com/" style="white-space: nowrap" target="_blank">${i18n.t('forms.iconDescription')}</a>`,
        },
      }, */
      icon: Common.iconPicker,
      serverType: Common.serverTypeSelectField(disableServerTypeSelectField),
    },
    dependencies: {
      serverType: {
        properties: {
          defaultgroup: {
            type: 'string',
            title: i18n.t('settings.defaultGroup'),
            'x-fromUrl': `${API_URL}/group/?type={serverType}`,
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
