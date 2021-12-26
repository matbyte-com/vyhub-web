import Common from '@/forms/Common';
import i18n from '@/plugins/i18n';

function returnForm(disableServerTypeSelectField = false, selected = 'GMOD') {
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
      server_type: Common.serverTypeSelectField(disableServerTypeSelectField, selected),
      default_group: {
        ...Common.groupSelectField,
        title: i18n.t('settings.defaultGroup'),
      },
    },
  };
  return form;
}

export default {
  returnForm,
};
