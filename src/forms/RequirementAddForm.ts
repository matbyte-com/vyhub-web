import i18n from '@/plugins/i18n';
import openapiCached from '@/api/openapiCached';
import VueI18n from 'vue-i18n';

// const API_URL = process.env.VUE_APP_BACKEND_CUSTOMER_URL;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum RequirementOperator {
  EQ = 'EQ',
  LEQ = 'LEQ',
  GEQ = 'GEQ',
  LT = 'LT',
  GT = 'GT',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  NEVER_ACTIVE = 'NEVER_ACTIVE',
  HAVE = 'HAVE',
}

const typeMapping = {
  ACTIVE: ['ACTIVE', 'INACTIVE', 'NEVER_ACTIVE'],
  NUMBER: ['EQ', 'LEQ', 'GEQ', 'LT', 'GT'],
  HAVE: ['HAVE'],
};

const types = {
  GROUP_MEMBER: ['mdi-account-multiple', typeMapping.ACTIVE],
  PERMISSION_LEVEL: ['mdi-numeric-9-plus-box-outline', typeMapping.NUMBER],
  PERMISSION_LEVEL_SB: ['mdi-numeric-9-plus-box-multiple-outline', typeMapping.NUMBER],
  PROPERTY: ['mdi-asterisk', typeMapping.HAVE],
  PROPERTY_SB: ['mdi-atom', typeMapping.HAVE],
  USER_ATTRIBUTE: ['mdi-account-details', typeMapping.HAVE],
  PACKET: ['mdi-gift-open', typeMapping.ACTIVE],
  DATE: ['mdi-calendar', typeMapping.NUMBER],
  USER_SELF: ['mdi-account-box', typeMapping.HAVE],
};

function returnForm() {
  const oneOf: { const: string; title: string }[] = [];
  Object.entries(types).forEach(([key, value]) => {
    const reqType = {
      const: '',
      title: '',
      icon: '',
    };
    reqType.const = key;
    reqType.title = i18n.t(`_requirement.types.${key}`).toString();
    reqType.icon = value[0].toString();
    oneOf.push(reqType);
  });
  const form = {
    type: 'object',
    required: [
      'type',
    ],
    properties: {
      type: {
        type: 'string',
        title: i18n.t('_requirement.requirementType'),
        'x-display': 'icon',
        'x-itemIcon': 'icon',
        default: 'GROUP_MEMBER',
        oneOf,
      },
    },
  };
  return form;
}

export default {
  returnForm,
  types,
  typeMapping,
};
