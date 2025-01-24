import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';
import utilService from "../services/UtilService";

function returnForm() {
  const ret = {
    type: 'object',
    required: ['title'],
    layout: [
      {
        key: 'title',
      },
      {
        name: 'title-after'
      },
      {
        key: 'requirement_set_id',
      },
      {
        key: 'wrapper',
      },
      {
        key: 'content',
      },
    ],
    properties: {
      title: {
        type: 'string',
        title: i18n.global.t('title'),
      },
      requirement_set_id: {
        ...Common.requirementSetSelectField,
        type: ['string', 'null'],
      },
      wrapper: {
        type: 'boolean',
        title: i18n.global.t('wrapper'),
        'x-display': 'switch',
      },
      content: {
        type: 'string',
        title: i18n.global.t('description'),
        layout: {
          slots: {
            component: "custom-editor"
          }
        }
      },
    },
  }

  if (!utilService.data().utils.showAdvancedSettings()) {
    delete ret.properties.requirement_set_id;
    ret.layout = ret.layout.filter(obj => obj.key !== 'requirement_set_id');
  }

  return ret;
}

export default {
  returnForm
};
