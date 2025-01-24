import ISO6391 from 'iso-639-1-plus';
import i18n from '@/plugins/i18n';
import utilService from '@/services/UtilService';

const oneOf: { const: string, title: string }[] = [];
i18n.global.availableLocales.forEach((l) => {
  oneOf.push({
    const: l,
    // Cool but too new: new Intl.DisplayNames([l], { type: 'language' }),
    // title: new Intl.DisplayNames([l], { type: 'language' }),
    title: `${ISO6391.getName(l.replace('_', '-'))} (${ISO6391.getNativeName(l.replace('_', '-')).replace(/^./, ISO6391.getNativeName(l.replace('_', '-'))[0].toUpperCase())})`,
  });
});

// VJSF3 compatible

function form(forum_enabled = false) {
  const ret: any = {
    type: 'object',
    required: ['community_name', 'language'],
    layout: [
      {
        key: 'community_name',
      },
      {
        key: 'shop_only',
      },
      {
        key: 'enable_landingpage',
      },
      {
        key: 'enable_ticket',
      },
      {
        key: 'enable_forum',
        cols: {
          xs: 8,
          md: 8,
        },
      },
      {
        name: 'forum-chip',
        cols: {
          xs: 4,
          md: 4,
        },
      },
      {
        key: 'enable_team',
      },
      {
        key: 'enable_faq',
      },
      {
        key: 'language',
      },
      {
        key: 'enable_customer_journey',
      },
      {
        key: 'google_analytics_tag',
      },
    ],
    properties: {
      community_name: {
        type: 'string',
        title: i18n.global.t('communityName'),
      },
      shop_only: {
        type: 'boolean',
        title: i18n.global.t('_settings.shopOnly'),
        layout: {
          comp: 'switch',
        },
        default: false
      },
      enable_landingpage: {
        type: 'boolean',
        title: i18n.global.t('_theme.enable_landingpage'),
        layout: {
          comp: 'switch',
        }
      },
      enable_ticket: {
        type: 'boolean',
        title: i18n.global.t('_settings.showTicket'),
        layout: {
          comp: 'switch',
        },
        default: false,
      },
      enable_forum: {
        type: 'boolean',
        title: i18n.global.t('_settings.showForum'),
        readOnly: !forum_enabled,
        default: false,
        layout: {
          comp: 'switch',
        },
      },
      enable_team: {
        type: 'boolean',
        title: i18n.global.t('_settings.showTeam'),
        default: false,
        layout: {
          comp: 'switch',
        },
      },
      enable_faq: {
        type: 'boolean',
        title: i18n.global.t('_settings.showFaq'),
        default: false,
        layout: {
          comp: 'switch',
        },
      },
      language: {
        type: 'string',
        title: i18n.global.t('_settings.language'),
        oneOf,
        layout: {
          comp: 'autocomplete',
          props: {
            hideDetails: 'auto',
          },
          slots: {
            after: `[${i18n.global.t('_settings.languageNewDescriptionText')}](https://github.com/matbyte-com/vyhub-lang)`
          }
        }
      },
      enable_customer_journey: {
        type: 'boolean',
        title: i18n.global.t('_settings.showFirstSteps'),
        layout: 'switch',
        description: i18n.global.t('_settings.showFirstStepsDescription'),
      },
      google_analytics_tag: {
        type: ['string', 'null'],
        title: 'Google Analytics Tag',
        description: i18n.global.t('_settings.googleAnalyticsTagDescription'),
        // pattern: 'UA-\\d{4,10}-\\d{1,4}',
        layout: {
          props: {
            clearable: true,
            placeholder: 'UA-00000000-0',
          }
        },
      },
    },
  };
  if (!utilService.data().utils.showAdvancedSettings()) {
    delete ret.properties.google_analytics_tag;
    ret.layout = ret.layout.filter(obj => obj.key !== 'google_analytics_tag');
  }
  return ret;
}

export default {
  form,
};
