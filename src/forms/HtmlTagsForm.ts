import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      title: i18n.t('title'),
      description: i18n.t('_settings.communityDescriptionDescr'),
    },
    description: {
      type: 'string',
      'x-display': 'textarea',
      title: i18n.t('_settings.communityDescription'),
      description: i18n.t('_settings.communityDescriptionDescr'),
    },
    favicon_url: {
      type: ['string', 'null'],
      title: 'Favicon',
      pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,10}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
      'x-props': {
        clearable: true,
        placeholder: i18n.t('_settings.httpPlaceholder'),
      },
      description: i18n.t('_settings.communityDescriptionDescr'),
    },
    image_url: {
      type: ['string', 'null'],
      title: i18n.t('_settings.labels.previewImageURL'),
      pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,10}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
      'x-props': {
        clearable: true,
        placeholder: i18n.t('_settings.httpPlaceholder'),
      },
      description: i18n.t('_settings.communityDescriptionDescr'),
    },
  },
};
