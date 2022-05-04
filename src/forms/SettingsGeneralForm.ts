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

export default {
  type: 'object',
  required: ['community_name', 'show_ticket', 'show_team', 'language'],
  properties: {
    community_name: {
      type: 'string',
      title: i18n.t('communityName'),
    },
    enable_ticket: {
      type: 'boolean',
      title: i18n.t('_settings.showTicket'),
      'x-display': 'switch',
      default: false,
    },
    enable_team: {
      type: 'boolean',
      title: i18n.t('_settings.showTeam'),
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
