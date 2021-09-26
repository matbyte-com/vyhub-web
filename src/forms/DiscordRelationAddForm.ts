import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

function returnForm(roles: Array<{ id: string, name: string }>) {
  const rolesProcessed: Array<Object> = [];
  roles.forEach((r) => {
    rolesProcessed.push({ const: r.id, title: r.name });
  });
  return {
    type: 'object',
    required: ['role_id', 'group'],
    properties: {
      role_id: {
        type: 'string',
        title: i18n.t('_discord.discordRole'),
        oneOf: rolesProcessed,
      },
      group: Common.groupSelectField,
    },
  };
}

export default {
  returnForm,
};
