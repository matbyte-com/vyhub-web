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
        title: i18n.global.t('name'),
      },
      server_type: Common.serverTypeSelectField(disableServerTypeSelectField, selected),
      multigroup: {
        type: 'boolean',
        title: i18n.global.t('_settings.multigroup'),
        description: i18n.global.t('_settings.multigroupDescription'),
      },
      icon: Common.iconPicker,
      default_group: {
        ...Common.groupSelectField,
        title: i18n.global.t('_settings.defaultGroup'),
      },
    },
  };
  return form;
}

export default {
  returnForm,
};
