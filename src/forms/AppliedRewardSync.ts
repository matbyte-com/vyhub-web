import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';

export default {
  type: 'object',
  required: ['packet_id', 'reward_id'],
  properties: {
    packet_id: {
      ...Common.packetSelectField,
      type: 'string',
    },
    reward_id: {
      ...Common.rewardSelectField,
      type: 'string',
    },
    begin: {
      type: 'string',
      title: i18n.t('begin'),
      description: i18n.t('_reward.labels.packetSyncLimitDescription'),
      format: 'date-time',
    },
    end: {
      type: 'string',
      title: i18n.t('end'),
      description: i18n.t('_reward.labels.packetSyncLimitDescription'),
      format: 'date-time',
    },
  },
};
