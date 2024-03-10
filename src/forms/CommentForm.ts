import i18n from '@/plugins/i18n';
import common from '@/forms/Common';

export default {
  type: 'object',
  required: ['message'],
  properties: {
    color: {
      ...common.colorPicker('color',
        undefined,
        [['#C62828'], ['#2E7D32'], ['#EF6C00'], ['#1565C0'], ['#4527A0']],
        false),
      default: '#424242',
    },
    message: {
      type: 'string',
      title: i18n.t('message'),
      'x-display': 'textarea',
    },
    visible_to_user: {
      type: 'boolean',
      title: i18n.t('_dashboard.labels.visibleToUser'),
      default: false,
    },
  },
};
