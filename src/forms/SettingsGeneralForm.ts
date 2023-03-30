import ISO6391 from 'iso-639-1';
import i18n from '@/plugins/i18n';

const oneOf: { const: string, title: string }[] = [];
i18n.availableLocales.forEach((l) => {
  oneOf.push({
    const: l,
    // Cool but too new: new Intl.DisplayNames([l], { type: 'language' }),
    title: `${ISO6391.getName(l)} (${ISO6391.getNativeName(l)})`,
  });
});

function form(forum_enabled = false) {
  return {
    type: 'object',
    required: ['community_name', 'show_ticket', 'show_team', 'language'],
    properties: {
      community_name: {
        type: 'string',
        title: i18n.t('communityName'),
      },
      community_description: {
        type: 'string',
        'x-display': 'textarea',
        title: i18n.t('_settings.communityDescription'),
        description: i18n.t('_settings.communityDescriptionDescr'),
      },
      enable_ticket: {
        type: 'boolean',
        title: i18n.t('_settings.showTicket'),
        'x-display': 'switch',
        default: false,
      },
      enable_forum: {
        type: 'boolean',
        title: i18n.t('_settings.showForum'),
        'x-display': 'switch',
        readOnly: !forum_enabled,
        default: false,
      },
      enable_team: {
        type: 'boolean',
        title: i18n.t('_settings.showTeam'),
        'x-display': 'switch',
        default: false,
      },
      enable_faq: {
        type: 'boolean',
        title: i18n.t('_settings.showFaq'),
        'x-display': 'switch',
        default: false,
      },
      language: {
        type: 'string',
        title: i18n.t('_settings.language'),
        oneOf,
        'x-display': 'autocomplete',
      },
    },
  };
}
export default {
  form,
};
