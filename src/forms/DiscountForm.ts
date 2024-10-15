import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';
// import { v4 as uuidv4 } from 'uuid';

export default {
  type: 'object',
  required: ['percentage', 'name', 'enabled', 'begin'],
  properties: {
    name: {
      type: 'string',
      title: i18n.global.t('name'),
    },
    percentage: {
      type: 'number',
      title: i18n.global.t('percentage'),
      minimum: 0,
    },
    code: {
      type: ['string', 'null'],
      title: i18n.global.t('code'),
      //  default: uuidv4().substr(0, 18),
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
      default: new Date(),
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
      type: 'array',
      title: i18n.global.t('packets'),
      items: {
        type: 'object',
      },
    },
    requirement_set: Common.requirementSetSelectField,
  },
};
