import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';
import utilService from '@/services/UtilService';

function returnForm() {
  const ret = {
    type: 'object',
    required: [
      'subject',
      'type',
    ],
    properties: {
      subject: {
        type: 'string',
        title: i18n.t('_home.messageSubject'),
      },
      background_url: {
        ...Common.imageURLField,
        'x-cols': 6,
      },
      invert_title_color: {
        type: 'boolean',
        title: i18n.t('_home.invertTitleColor'),
        default: false,
        'x-cols': 5,
        'x-class': 'ml-5 my-auto',
        'x-display': 'switch',
        'x-props': {
          'hide-details': true,
        },
      },
      type: {
        type: 'string',
        title: i18n.t('_home.messageType'),
        default: 'DEFAULT',
        oneOf: [
          {
            const: 'DEFAULT',
            title: i18n.t('_home.messageTypeNews'),
          },
          {
            const: 'PINNED',
            title: i18n.t('_home.messageTypePinned'),
          },
        ],
      },
    },
  };
  if (!utilService.data().utils.showAdvancedSettings()) {
    delete ret.properties.background_url;
    delete ret.properties.invert_title_color;
  }
  return ret;
}

export default {
  returnForm,
};
