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
  USER_SELF: { icon: 'mdi-account-box' },
};

const operators: IOperators = {
  EQ: { const: 'EQ', title: i18n.t('_requirement.operators.EQ').toString(), icon: 'mdi-equal' },
  NEQ: { const: 'NEQ', title: i18n.t('_requirement.operators.NEQ').toString(), icon: 'mdi-not-equal' },
  GEQ: { const: 'GEQ', title: i18n.t('_requirement.operators.GEQ').toString(), icon: 'mdi-greater-than-or-equal' },
  LEQ: { const: 'LEQ', title: i18n.t('_requirement.operators.LEQ').toString(), icon: 'mdi-less-than-or-equal' },
  LT: { const: 'LT', title: i18n.t('_requirement.operators.LT').toString(), icon: 'mdi-less-than' },
  GT: { const: 'GT', title: i18n.t('_requirement.operators.GT').toString(), icon: 'mdi-greater-than' },
  ACTIVE: { const: 'ACTIVE', title: i18n.t('_requirement.operators.ACTIVE').toString(), icon: 'mdi-check' },
  INACTIVE: { const: 'INACTIVE', title: i18n.t('_requirement.operators.INACTIVE').toString(), icon: 'mdi-close' },
  NEVER_ACTIVE: { const: 'NEVER_ACTIVE', title: i18n.t('_requirement.operators.NEVER_ACTIVE').toString(), icon: 'mdi-close' },
  HAVE: { const: 'HAVE', title: i18n.t('_requirement.operators.HAVE').toString(), icon: 'mdi-check' },
};

function checkIfTypeSB(requirementType: string) {
  if (requirementType === 'PERMISSION_LEVEL_SB' || requirementType === 'PROPERTY_SB') {
    return Common.serverbundleSelectField;
  }
  return {};
}

function requirementTypeField(requirementType: string) {
  let properties = {};
  let required: Array<string> = [];

  if (requirementType === 'GROUP_MEMBER') {
    required = ['operator', 'key'];
    properties = {
      operator: {
        type: 'string',
        title: i18n.t('_requirement.requirementOperator'),
        'x-display': 'icon',
        'x-itemIcon': 'icon',
        oneOf: [
          operators.EQ,
          operators.NEQ,
        ],
      },
      key: Common.groupSelectField,
    };
  } else if (requirementType === 'PERMISSION_LEVEL' || requirementType === 'PERMISSION_LEVEL_SB') {
    required = ['operator', 'key', 'value'];
    properties = {
      operator: {
        type: 'string',
        title: i18n.t('_requirement.requirementOperator'),
        'x-display': 'icon',
        'x-itemIcon': 'icon',
        oneOf: [
          operators.EQ,
          operators.NEQ,
          operators.LEQ,
          operators.LT,
          operators.GT,
          operators.GEQ,
        ],
      },
      key: checkIfTypeSB(requirementType),
      value: {
        type: 'integer',
        title: i18n.t('_requirement.permissionLevel'),
        minimum: 0,
        maximum: 100,
      },
    };
  } else if (requirementType === 'PROPERTY' || requirementType === 'PROPERTY_SB') {
    required = ['operator', 'value', 'key'];
    properties = {
      operator: {
        type: 'string',
        title: i18n.t('_requirement.requirementOperator'),
        'x-display': 'icon',
        'x-itemIcon': 'icon',
        oneOf: [
          operators.HAVE,
          operators.NHAVE,
        ],
      },
      key: checkIfTypeSB(requirementType),
      value: {
        type: 'string',
        title: i18n.t('_requirement.propertyName'),
      },
    };
  } else if (requirementType === 'USER_ATTRIBUTE') {
    required = ['operator', 'value', 'key'];
    properties = {
      operator: {
        type: 'string',
        title: i18n.t('_requirement.requirementOperator'),
        'x-display': 'icon',
        'x-itemIcon': 'icon',
        oneOf: [
          operators.EQ,
          operators.NEQ,
          operators.LEQ,
          operators.LT,
          operators.GT,
          operators.GEQ,
        ],
      },
      key: {
        type: 'string',
        title: i18n.t('_requirement.attributeName'),
      },
      value: {
        type: 'string',
        title: i18n.t('_requirement.attributeValue'),
      },
    };
  } else if (requirementType === 'PACKET') {
    required = ['operator', 'key'];
    properties = {
      operator: {
        type: 'string',
        title: i18n.t('_requirement.requirementOperator'),
        'x-display': 'icon',
        'x-itemIcon': 'icon',
        oneOf: [
          operators.ACTIVE,
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
        title: i18n.t('_requirement.requirementOperator'),
        'x-display': 'icon',
        'x-itemIcon': 'icon',
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
        title: '_requirement.date',
        format: 'date-time',
      },
    };
  } else if (requirementType === 'USER_SELF') {
    required = ['operator'];
    properties = {
      operator: {
        type: 'string',
        title: i18n.t('_requirement.requirementOperator'),
        'x-display': 'icon',
        'x-itemIcon': 'icon',
        oneOf: [
          operators.EQ,
          operators.NEQ,
        ],
      },
    };
  }

  return {
    required,
    properties: {
      // title: i18n.t('type'),
      schemaKey: {
        type: 'string',
        const: requirementType,
      },
      ...properties,
    },
  };
}

function returnForm() {
  const oneOf: { properties: object }[] = [];
  Object.entries(types).forEach(([key, value]) => {
    const reqType = {
      title: i18n.t(`_requirement.types.${key}`),
      icon: value.icon.toString(),
      ...requirementTypeField(key),
    };
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
        type: 'object',
        title: i18n.t('_requirement.requirementType'),
        'x-display': 'icon',
        'x-itemIcon': 'icon',
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
