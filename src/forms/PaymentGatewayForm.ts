import i18n from '@/plugins/i18n';

function gatewayFields(gatewayType: string) {
  if (gatewayType === 'PAYPAL') {
    return {
      environment: {
        type: [
          'string',
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
        ],
        title: 'Client ID',
      },
      client_secret: {
        type: [
          'string',
        ],
        title: 'Client Secret',
      },
      webhook_id: {
        type: [
          'string',
        ],
        title: 'Webhook ID',
      },
    };
  }

  if (gatewayType === 'STRIPE') {
    return {
      public_key: {
        type: [
          'string',
        ],
        title: 'Public Key',
      },
      secret_key: {
        type: [
          'string',
        ],
        title: 'Secret Key',
      },
      wh_secret: {
        type: [
          'string',
        ],
        title: 'Webhook Secret',
      },
      payment_methods: {
        type: [
          'array',
        ],
        default: [],
        title: i18n.t('paymentMethods'),
        items: {
          type: 'string',
          enum: [
            'alipay',
            'card',
            'ideal',
            'fpx',
            'bacs_debit',
            'bancontact',
            'giropay',
            'p24',
            'eps',
            'sofort',
            'sepa_debit',
            'grabpay',
            'afterpay_clearpay',
            'acss_debit ',
          ],
        },
      },
      accept_pending: {
        type: 'string',
        title: i18n.t('_gateway.labels.acceptPending'),
        description: i18n.t('_gateway.labels.acceptPendingDescription'),
        oneOf: [
          {
            const: 'true',
            title: i18n.t('_gateway.labels.acceptPending'),
          },
          {
            const: 'false',
            title: i18n.t('_gateway.labels.doNotAcceptPending'),
          },
        ],
      },
    };
  }

  if (gatewayType === 'PAYSAFECARD') {
    return {
      secret_key: {
        type: [
          'string',
        ],
        title: 'Secret Key',
      },
      environment: {
        type: [
          'string',
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
      attributes: {
        type: 'object',
        properties: gatewayFields(gatewayType),
      },
    },
  };
}

export default form;
