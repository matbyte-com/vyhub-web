import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';
import utilService from '@/services/UtilService';

function returnForm() {
  const ret: any = {
    type: 'object',
    required: [
      'subject',
      'type',
    ],
    properties: {
      subject: {
        type: 'string',
        title: i18n.global.t('_home.messageSubject'),
      },
      background_url: {
        ...Common.imageURLField,
        'x-cols': 6,
      },
      invert_title_color: {
        type: 'boolean',
        title: i18n.global.t('_home.invertTitleColor'),
        default: false,
        layout: {
          comp: 'switch',
          cols: 5,
        }
      },
      type: {
        type: 'string',
        title: i18n.global.t('type'),
        default: 'DEFAULT',
        oneOf: [
          {
            const: 'DEFAULT',
            title: i18n.global.t('_home.news'),
          },
          {
            const: 'PINNED',
            title: i18n.global.t('_home.newsOfTheDay'),
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
