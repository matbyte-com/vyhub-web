import i18n from '@/plugins/i18n';
import RequirementAddForm from './RequirementAddForm';
import Common from './Common';

const API_URL = Common.apiURL;

export interface IOperatorMapping {
  [propertyName: string]: string;
}

const operatorMapping: IOperatorMapping = {
  EQ: 'mdi-equal',
  LEQ: 'mdi-less-than-or-equal',
  GEQ: 'mdi-greater-than-or-equal',
  LT: 'mdi-less-than',
  GT: 'mdi-greater-than',
  ACTIVE: 'mdi-account-check',
  INACTIVE: 'mdi-account-alert',
  NEVER_ACTIVE: 'mdi-account-cancel',
  HAVE: 'mdi-account-plus',
};

function returnInput(type: string) {
  // TODO type.USER_ATTRIBUTE, type.USER_SELF missing
  if (type === 'PERMISSION_LEVEL' || type === 'PERMISSION_LEVEL_SB') {
    return {
      value: {
        type: 'number',
        title: i18n.t('_requirement.permissionLevel'),
        minimum: 0,
        maximum: 100,
      },
    };
  }
  // TODO Make use of proper serverbundle group picker
  if (type === 'GROUP_MEMBER') {
    return {
      value: {
        type: 'string',
        title: i18n.t('group'),
        // 'x-fromUrl': `${API_URL}/group/?serverbundle_id={serverbundle.id}`,
        'x-fromUrl': `${API_URL}/group/`,
        'x-itemKey': 'id',
        'x-itemTitle': 'name',
      },
    };
  }
  if (type === 'PROPERTY' || type === 'PROPERTY_SB') {
    return {
      value: {
        type: 'string',
        title: i18n.t('property'),
        'x-fromUrl': `${API_URL}/group/property/`,
        'x-itemKey': 'name',
        'x-itemTitle': 'description',
      },
    };
  }
  if (type === 'DATE') {
    return {
      begin: {
        type: 'string',
        title: i18n.t('begin'),
        format: 'date-time',
        default: new Date(),
      },
      end: {
        type: 'string',
        title: i18n.t('end'),
        format: 'date-time',
        description: i18n.t('_dashboard.membershipEndDescription'),
      },
    };
  }
  if (type === 'PACKET') {
    return {
      value: Common.packetSelectField,
    };
  }
  return null;
}

function returnForm(type: string) {
  const oneOf: { const: string; title: string }[] = [];

  const { operators } = RequirementAddForm.types[type];

  operators.forEach((op: string) => {
    const reqType = {
      const: '',
      title: '',
      icon: '',
    };
    reqType.const = op;
    reqType.title = i18n.t(`_requirement.operators.${op}`).toString();
    reqType.icon = operatorMapping[op];
    oneOf.push(reqType);
  });
  const form = {
    type: 'object',
    required: [
      'type',
    ],
    properties: {
      operator: {
        type: 'string',
        title: i18n.t('_requirement.requirementOperator'),
        'x-display': 'icon',
        'x-itemIcon': 'icon',
        default: 'ACTIVE',
        oneOf,
      },
      ...returnInput(type),
      requirement_set_id: {
        type: 'string',
        title: i18n.t('_requirement.requirementSet'),
        'x-fromUrl': `${API_URL}/requirement/set/`,
        'x-itemKey': 'id',
        'x-itemTitle': 'name',
        readOnly: true,
      },
    },
  };
  return form;
}

export default {
  returnForm,
};
