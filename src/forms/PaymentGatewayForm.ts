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

  if (gatewayType === 'STRIPE') {
    return {
      public_key: {
        type: [
          'string',
          'null',
        ],
        title: 'Public Key',
      },
      secret_key: {
        type: [
          'string',
          'null',
        ],
        title: 'Secret Key',
      },
      wh_secret: {
        type: [
          'string',
          'null',
        ],
        title: 'Webhook Secret',
      },
    };
  }

  if (gatewayType === 'PAYSAFECARD') {
    return {
      secret_key: {
        type: [
          'string',
          'null',
        ],
        title: 'Secret Key',
      },
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
      subtitle: {
        type: 'string',
        title: i18n.t('subtitle'),
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
