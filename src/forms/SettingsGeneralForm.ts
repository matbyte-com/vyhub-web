import i18n from '@/plugins/i18n';

export default {
  type: 'object',
  required: ['community_name', 'show_ticket', 'show_team'],
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
  },
};
