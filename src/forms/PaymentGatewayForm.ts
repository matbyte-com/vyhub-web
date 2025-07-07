import i18n from '@/plugins/i18n';

function gatewayFields(gatewayType: string) {
  if (gatewayType === 'PAYPAL') {
    return {
      environment: {
        type: 'string',
        title: i18n.global.t('environment'),
        enum: [
          'SANDBOX',
          'PRODUCTION',
        ],
      },
      client_id: {
        type: 'string',
        title: 'Client ID',
      },
      client_secret: {
        type: 'string',
        title: 'Client Secret',
      },
      webhook_id: {
        type: 'string',
        title: 'Webhook ID',
      },
    };
  }

  if (gatewayType === 'STRIPE') {
    return {
      public_key: {
        type: 'string',
        title: 'Public Key',
      },
      secret_key: {
        type: 'string',
        title: 'Secret Key',
      },
      wh_secret: {
        type: 'string',
        title: 'Webhook Secret',
      },
      payment_methods: {
        type: 'array',
        default: [],
        title: i18n.global.t('paymentMethods'),
        items: {
          type: 'string',
          enum: [
            'card',
            'acss_debit',
            'affirm',
            'afterpay_clearpay',
            'alipay',
            'alma',
            'amazon_pay',
            'au_becs_debit',
            'bacs_debit',
            'bancontact',
            'blik',
            'boleto',
            'cashapp',
            'customer_balance',
            'eps',
            'fpx',
            'giropay',
            'grabpay',
            'ideal',
            'interac_present',
            'kakao_pay',
            'klarna',
            'konbini',
            'link',
            'mobilepay',
            'multibanco',
            'naver_pay',
            'oxxo',
            'p24',
            'payco',
            'paynow',
            'paypal',
            'pix',
            'promptpay',
            'revolut_pay',
            'samsung_pay',
            'sepa_debit',
            'swish',
            'twint',
            'us_bank_account',
            'wechat_pay',
            'zip',
          ],
        },
      },
      accept_pending: {
        type: 'string',
        title: i18n.global.t('_gateway.labels.acceptPending'),
        description: i18n.global.t('_gateway.labels.acceptPendingDescription'),
        oneOf: [
          {
            const: 'true',
            title: i18n.global.t('_gateway.labels.acceptPending'),
          },
          {
            const: 'false',
            title: i18n.global.t('_gateway.labels.doNotAcceptPending'),
          },
        ],
      },
    };
  }

  if (gatewayType === 'PAYSAFECARD') {
    return {
      secret_key: {
        type: 'string',
        title: 'API Key',
      },
      environment: {
        type: 'string',
        title: i18n.global.t('environment'),
        enum: [
          'SANDBOX',
          'PRODUCTION',
        ],
      },
      client_cert: {
        type: 'string',
        title: i18n.global.t('clientCert'),
        description: i18n.global.t('_gateway.labels.clientCertDescription'),
        'x-display': 'textarea',
      },
      client_key: {
        type: 'string',
        title: i18n.global.t('clientKey'),
        description: i18n.global.t('_gateway.labels.clientCertDescription'),
        'x-display': 'textarea',
      },
    };
  }

  if (gatewayType === 'PAYPAL_LEGACY') {
    return {
      environment: {
        type: 'string',
        title: i18n.global.t('environment'),
        enum: [
          'SANDBOX',
          'PRODUCTION',
        ],
      },
      email: {
        type: 'string',
        title: `${i18n.global.t('email')} (PayPal)`,
      },
    };
  }

  return {};
}

function form(gatewayType: string) {
  const res: any = {
    type: 'object',
    required: ['name', 'type'],
    properties: {
      type: {
        type: 'string',
        title: i18n.global.t('type'),
        default: gatewayType,
        readOnly: true,
      },
      name: {
        type: 'string',
        title: i18n.global.t('name'),
      },
      subtitle: {
        type: 'string',
        title: i18n.global.t('subtitle'),
      },
      image_url: {
        type: ['string', 'null'],
        layout: {
          slots: {
            component: 'custom-image'
          },
        },
      },
      enabled: {
        type: 'boolean',
        title: i18n.global.t('enabled'),
        default: true,
      },
      attributes: {
        type: 'object',
        properties: gatewayFields(gatewayType),
      },
    },
  };
  if (gatewayType === 'FREE') delete res.properties.enabled;
  return res;
}

export default form;
