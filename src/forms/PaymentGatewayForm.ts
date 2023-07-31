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
            'card',
            'acss_debit',
            'affirm',
            'afterpay_clearpay',
            'alipay',
            'au_becs_debit',
            'bacs_debit',
            'bancontact',
            'blik',
            'boleto',
            'customer_balance',
            'eps',
            'fpx',
            'giropay',
            'grabpay',
            'ideal',
            'klarna',
            'konbini',
            'oxxo',
            'p24',
            'paynow',
            'pix',
            'promptpay',
            'sepa_debit',
            'sofort',
            'us_bank_account',
            'wechat_pay',
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
        title: 'API Key',
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
      client_cert: {
        type: [
          'string',
        ],
        title: i18n.t('clientCert'),
        description: i18n.t('_gateway.labels.clientCertDescription'),
        'x-display': 'textarea',
      },
      client_key: {
        type: [
          'string',
        ],
        title: i18n.t('clientKey'),
        description: i18n.t('_gateway.labels.clientCertDescription'),
        'x-display': 'textarea',
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
      image_url: {
        type: ['string', 'null'],
        title: '',
        description: '',
        pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
        'x-props': {
          clearable: true,
          placeholder: i18n.t('_settings.httpPlaceholder'),
        },
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
