import i18n from '@/plugins/i18n';

export interface IIconOperators {
  icon: string;
  operators: Array<string>;
}

export interface ITypes {
  [propertyName: string]: IIconOperators;
}

export interface ITypeMapping {
  [propertyName: string]: Array<string>;
}

const typeMapping: ITypeMapping = {
  ACTIVE: ['ACTIVE', 'INACTIVE', 'NEVER_ACTIVE'],
  NUMBER: ['EQ', 'LEQ', 'GEQ', 'LT', 'GT'],
  HAVE: ['HAVE'],
  EQ: ['EQ'],
};

const types: ITypes = {
  GROUP_MEMBER: { icon: 'mdi-account-multiple', operators: typeMapping.EQ },
  PERMISSION_LEVEL: { icon: 'mdi-numeric-9-plus-box-outline', operators: typeMapping.NUMBER },
  PERMISSION_LEVEL_SB: { icon: 'mdi-numeric-9-plus-box-multiple-outline', operators: typeMapping.NUMBER },
  PROPERTY: { icon: 'mdi-asterisk', operators: typeMapping.HAVE },
  PROPERTY_SB: { icon: 'mdi-atom', operators: typeMapping.HAVE },
  USER_ATTRIBUTE: { icon: 'mdi-account-details', operators: typeMapping.HAVE },
  PACKET: { icon: 'mdi-gift-open', operators: typeMapping.ACTIVE },
  DATE: { icon: 'mdi-calendar', operators: typeMapping.NUMBER },
  USER_SELF: { icon: 'mdi-account-box', operators: typeMapping.EQ },
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
    reqType.icon = value.icon.toString();
    oneOf.push(reqType);
  });
  const form = {
    type: 'object',
    required: [
      'type',
      'requirement_set_id',
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
