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

function form() {
  const ret: any = {
    type: 'object',
    required: ['community_name', 'language'],
    properties: {
      community_name: {
        type: 'string',
        title: i18n.global.t('communityName'),
      },
      language: {
        type: 'string',
        title: i18n.global.t('_settings.language'),
        oneOf,
        layout: {
          comp: 'autocomplete',
        }
      },
    },
  };
  return ret;
}

export default {
  form,
};
