import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export interface ITypes {
  [propertyName: string]: { icon: string };
}

export interface IOperators {
  [operatorName: string]: {
    const: string,
    icon: string,
    title: string,
  }
}

const types: ITypes = {
  GROUP_MEMBER: { icon: 'mdi-account-multiple' },
  PERMISSION_LEVEL: { icon: 'mdi-numeric-9-plus-box-outline' },
  PERMISSION_LEVEL_SB: { icon: 'mdi-numeric-9-plus-box-multiple-outline' },
  PROPERTY: { icon: 'mdi-asterisk' },
  PROPERTY_SB: { icon: 'mdi-atom' },
  USER_ATTRIBUTE: { icon: 'mdi-account-details' },
  PACKET: { icon: 'mdi-gift-open' },
  DATE: { icon: 'mdi-calendar' },
};

const operators: IOperators = {
  EQ: { const: 'EQ', title: i18n.global.t('_requirement.operators.EQ').toString(), icon: 'mdi-equal' },
  NEQ: { const: 'NEQ', title: i18n.global.t('_requirement.operators.NEQ').toString(), icon: 'mdi-not-equal' },
  GEQ: { const: 'GEQ', title: i18n.global.t('_requirement.operators.GEQ').toString(), icon: 'mdi-greater-than-or-equal' },
  LEQ: { const: 'LEQ', title: i18n.global.t('_requirement.operators.LEQ').toString(), icon: 'mdi-less-than-or-equal' },
  LT: { const: 'LT', title: i18n.global.t('_requirement.operators.LT').toString(), icon: 'mdi-less-than' },
  GT: { const: 'GT', title: i18n.global.t('_requirement.operators.GT').toString(), icon: 'mdi-greater-than' },
  ACTIVE: { const: 'ACTIVE', title: i18n.global.t('_requirement.operators.ACTIVE').toString(), icon: 'mdi-gift-open' },
  INACTIVE: { const: 'INACTIVE', title: i18n.global.t('_requirement.operators.INACTIVE').toString(), icon: 'mdi-gift' },
  NEVER_ACTIVE: { const: 'NEVER_ACTIVE', title: i18n.global.t('_requirement.operators.NEVER_ACTIVE').toString(), icon: 'mdi-gift-off' },
  ONLY_ACTIVE: { const: 'ONLY_ACTIVE', title: i18n.global.t('_requirement.operators.ONLY_ACTIVE').toString(), icon: 'mdi-gift-open-outline' },
  ONLY_INACTIVE: { const: 'ONLY_INACTIVE', title: i18n.global.t('_requirement.operators.ONLY_INACTIVE').toString(), icon: 'mdi-gift-outline' },
  HAVE: { const: 'HAVE', title: i18n.global.t('_requirement.operators.HAVE').toString(), icon: 'mdi-check' },
  NHAVE: { const: 'NHAVE', title: i18n.global.t('_requirement.operators.NHAVE').toString(), icon: 'mdi-close' },
};

function requirementTypeField(requirementType: string) {
  let properties = {};
  let required: Array<string> = [];

  if (requirementType === 'GROUP_MEMBER') {
    required = ['operator', 'key'];
    properties = {
      operator: {
        type: 'string',
        title: i18n.global.t('_requirement.requirementOperator'),
        oneOf: [
          operators.EQ,
          operators.NEQ,
        ],
      },
      key: Common.groupSelectField,
    };
  } else if (requirementType === 'PERMISSION_LEVEL' || requirementType === 'PERMISSION_LEVEL_SB') {
    const isSB = requirementType === 'PERMISSION_LEVEL_SB';
    required = isSB ? ['operator', 'key', 'value'] : ['operator', 'value'];
    properties = {
      operator: {
        type: 'string',
        title: i18n.global.t('_requirement.requirementOperator'),
        oneOf: [
          operators.EQ,
          operators.NEQ,
          operators.LEQ,
          operators.LT,
          operators.GT,
          operators.GEQ,
        ],
      },
      ...(isSB ? { key: Common.serverbundleSelectField } : {}),
      value: {
        type: 'integer',
        title: i18n.global.t('_requirement.permissionLevel'),
        minimum: 0,
        maximum: 100,
      },
    };
  } else if (requirementType === 'PROPERTY' || requirementType === 'PROPERTY_SB') {
    const isSB = requirementType === 'PROPERTY_SB';
    required = isSB ? ['operator', 'value', 'key'] : ['operator', 'value'];
    properties = {
      operator: {
        type: 'string',
        title: i18n.global.t('_requirement.requirementOperator'),
        oneOf: [
          operators.HAVE,
          operators.NHAVE,
        ],
      },
      ...(isSB ? { key: Common.serverbundleSelectField } : {}),
      value: Common.propertySelectField,
    };
  } else if (requirementType === 'USER_ATTRIBUTE') {
    required = ['operator', 'value', 'key'];
    properties = {
      operator: {
        type: 'string',
        title: i18n.global.t('_requirement.requirementOperator'),
        oneOf: [
          operators.EQ,
          operators.NEQ,
          operators.LEQ,
          operators.LT,
          operators.GT,
          operators.GEQ,
        ],
      },
      key: Common.userAttributeSelectField,
      value: {
        type: 'string',
        title: i18n.global.t('_requirement.attributeValue'),
      },
    };
  } else if (requirementType === 'PACKET') {
    required = ['operator', 'key'];
    properties = {
      operator: {
        type: 'string',
        title: i18n.global.t('_requirement.requirementOperator'),
        oneOf: [
          operators.ACTIVE,
          operators.ONLY_ACTIVE,
          operators.ONLY_INACTIVE,
          operators.INACTIVE,
          operators.NEVER_ACTIVE,
        ],
      },
      key: Common.packetSelectField,
    };
  } else if (requirementType === 'DATE') {
    required = ['operator', 'value'];
    properties = {
      operator: {
        type: 'string',
        title: i18n.global.t('_requirement.requirementOperator'),
        oneOf: [
          operators.EQ,
          operators.NEQ,
          operators.LEQ,
          operators.LT,
          operators.GT,
          operators.GEQ,
        ],
      },
      value: {
        type: 'string',
        title: i18n.global.t('_requirement.date'),
        format: 'date-time',
      },
    };
  }

  return {
    required,
    properties: {
      type: {
        type: 'string',
        title: i18n.global.t('_requirement.requirementType'),
        const: requirementType,
      },
      ...properties,
    },
  };
}

function returnForm() {
  const oneOf: { properties: object }[] = [];
  Object.entries(types).forEach(([key, value]) => {
    const field = requirementTypeField(key);
    const description = i18n.global.t(`_requirement.typeDescriptions.${key}`).toString();
    // Render the type's description inline (above the operator) once the type is selected.
    // Every type has an operator field, so this shows for all options.
    const operator = (field.properties as Record<string, any>).operator;
    if (operator) {
      operator.layout = {
        ...(operator.layout || {}),
        slots: { before: { markdown: description } },
      };
    }
    const reqType = {
      title: i18n.global.t(`_requirement.types.${key}`),
      icon: value.icon.toString(),
      ...field,
    };
    oneOf.push(reqType);
  });
  const form = {
    type: 'object',
    required: [
      'type',
    ],
    properties: {
      type: {
        type: 'object',
        oneOf,
      },
    },
  };
  return form;
}

export default {
  returnForm,
  types,
};
