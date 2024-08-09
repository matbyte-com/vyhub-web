import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: [
    'name',
  ],
  properties: {
    name: {
      type: 'string',
      title: i18n.global.t('name'),
    },
  },
};
