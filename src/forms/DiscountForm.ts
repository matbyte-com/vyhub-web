import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: ['percentage', 'name', 'enabled', 'begin'],
  layout: [
    {
      key: 'name',
    },
    {
      key: 'percentage',
    },
    {
      key: 'code',
    },
    {
      name: 'code-after'
    },
    {
      key: 'enabled',
    },
    {
      key: 'begin',
    },
    {
      key: 'end',
    },
    {
      key: 'max_usages',
    },
    {
      key: 'max_usages_per_user',
    },
    {
      key: 'all_packets',
    },
    {
      key: 'packets',
    },
    {
      key: 'requirement_set'
    }
  ],
  properties: {
    name: {
      type: 'string',
      title: i18n.global.t('name'),
    },
    percentage: {
      type: 'number',
      title: i18n.global.t('percentage'),
      minimum: 0,
      maximum: 100,
    },
    code: {
      type: ['string', 'null'],
      title: i18n.global.t('code'),
      description: i18n.global.t('_discount.labels.codeDescription'),
      //  default: uuidv4().substr(0, 18),
      layout: {
        props: {
          hideDetails: 'auto',
        }
      }
    },
    enabled: {
      type: 'boolean',
      title: i18n.global.t('enabled'),
      default: true,
    },
    begin: {
      type: 'string',
      title: i18n.global.t('begin'),
      format: 'date-time',
      default: (new Date()).toISOString(),
    },
    end: {
      type: ['string', 'null'],
      title: i18n.global.t('end'),
      format: 'date-time',
    },
    max_usages: {
      type: 'integer',
      title: i18n.global.t('maxUsages'),
    },
    max_usages_per_user: {
      type: ['integer', 'null'],
      title: i18n.global.t('_discount.labels.maxUsagesPerUser'),
      minimum: 1,
    },
    all_packets: {
      type: 'boolean',
      title: i18n.global.t('_discount.labels.allPackets'),
      default: true,
    },
    packets: {
      ...Common.packetSelectField,
      default: [],
      type: 'array',
      title: i18n.global.t('packets'),
      items: {
        type: 'object',
      },
    },
    requirement_set: Common.requirementSetSelectField,
  },
};
