import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';
import utilService from '@/services/UtilService';

function returnForm() {
  const ret = {
    type: 'object',
    required: [
      'title',
    ],
    properties: {
      title: {
        type: 'string',
        title: i18n.t('title'),
      },
      requirement_set_id: {
        ...Common.requirementSetSelectField,
        type: 'string',
      },
    },
  };
  if (!utilService.data().utils.showAdvancedSettings()) {
    delete ret.properties.requirement_set_id;
  }
  return ret;
}

export default returnForm();
