import i18n from '@/plugins/i18n';

function gatewayFields(gatewayType: string) {
  if (gatewayType === 'PAYPAL') {
    return {
      environment: {
        type: [
          'string',
          'null',
        ],
        title: i18n.t('environment'),
        enum: [
          'SANDBOX',
          'PRODUCTION',
        ],
      },
      client_id: {
        type: [
          'string',
          'null',
        ],
        title: 'Client ID',
      },
      client_secret: {
        type: [
          'string',
          'null',
        ],
        title: 'Client Secret',
      },
    };
  }

  return {};
}

function form(gatewayType: string) {
  return {
    type: 'object',
    required: ['name', 'type'],
    properties: {
      name: {
        type: 'string',
        title: i18n.t('name'),
      },
      type: {
        type: 'string',
        title: i18n.t('type'),
        default: gatewayType,
        readOnly: true,
      },
      enabled: {
        type: 'boolean',
        title: i18n.t('enabled'),
        default: false,
      },
      ...gatewayFields(gatewayType),
    },
  };
}

export default form;
