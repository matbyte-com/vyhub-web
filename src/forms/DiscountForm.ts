import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';
// import { v4 as uuidv4 } from 'uuid';

export default {
  type: 'object',
  required: ['percentage', 'name', 'enabled', 'begin'],
  properties: {
    name: {
      type: 'string',
      title: i18n.t('name'),
    },
    percentage: {
      type: 'number',
      title: i18n.t('percentage'),
      minimum: 0,
    },
    code: {
      type: ['string', 'null'],
      title: i18n.t('code'),
      //  default: uuidv4().substr(0, 18),
    },
    enabled: {
      type: 'boolean',
      title: i18n.t('enabled'),
      default: true,
    },
    begin: {
      type: 'string',
      title: i18n.t('begin'),
      format: 'date-time',
      default: new Date(),
    },
    end: {
      type: ['string', 'null'],
      title: i18n.t('end'),
      format: 'date-time',
    },
    max_usages: {
      type: 'integer',
      title: i18n.t('maxUsages'),
    },
    max_usages_per_user: {
      type: ['integer', 'null'],
      title: i18n.t('_discount.labels.maxUsagesPerUser'),
      minimum: 1,
    },
    all_packets: {
      type: 'boolean',
      title: i18n.t('_discount.labels.allPackets'),
      default: true,
    },
    packets: Common.packetsSelectField,
    requirement_set: Common.requirementSetSelectField,
  },
};
