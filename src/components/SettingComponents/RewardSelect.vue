<template>
  <div>
    <v-autocomplete
      v-model="selected"
      :items="rewards"
      :label="title"
      :loading="loading"
      :error-messages="node.error"
      item-title="name"
      item-value="id"
      return-object
      multiple
      chips
      closable-chips
      clearable
    >
      <template #append>
        <v-btn
          variant="tonal"
          color="success"
          size="small"
          icon="mdi-plus"
          @click="$refs.createRewardDialog.show()"
        >
          <v-icon>mdi-plus</v-icon>
          <v-tooltip
            activator="parent"
            location="top"
          >
            {{ $t('_reward.labels.create') }}
          </v-tooltip>
        </v-btn>
      </template>
    </v-autocomplete>
    <DialogForm
      ref="createRewardDialog"
      :form-schema="rewardSchema"
      icon="mdi-star-shooting"
      :submit-text="$t('create')"
      :title="$t('_reward.labels.create')"
      @submit="createReward"
    >
      <template #custom-autocomplete="context">
        <CommandAutocomplete v-bind="context" />
      </template>
    </DialogForm>
  </div>
</template>

<script>
import i18n from '@/plugins/i18n';
import RewardForm from '@/forms/RewardForm';
import EventBus from '@/services/EventBus';
import openapi from '@/api/openapi';

export default {
  props: {
    title: {
      type: String,
      default: () => i18n.global.t('rewards'),
    },
    node: {
      type: Object,
      required: true,
    },
    statefulLayout: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rewards: [],
      selected: [],
      loading: false,
      receivedContent: false,
      rewardSchema: RewardForm,
    };
  },
  watch: {
    selected() {
      this.receivedContent = true;
      this.statefulLayout.input(this.node, this.selected);
    },
    node() {
      this.loadContent();
    },
  },
  beforeMount() {
    this.loadContent();
    this.fetchRewards();
  },
  methods: {
    loadContent() {
      if (!this.receivedContent && this.node.data) {
        this.selected = this.node.data;
      }
    },
    async fetchRewards() {
      const api = await openapi;

      this.loading = true;

      api.packet_getRewards().then((rsp) => {
        this.rewards = rsp.data;
        this.loading = false;
      }).catch((err) => {
        console.log(err);
        this.loading = false;
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async createReward() {
      const data = this.$refs.createRewardDialog.getData();

      data.order = 0;
      data.serverbundle_id = (data.serverbundle ? data.serverbundle.id : null);
      data.limit_servers_ids = (data.limit_servers ? data.limit_servers.map((s) => s.id) : null);
      delete data.serverbundle;

      const api = await openapi;

      api.packet_addReward(null, data).then((rsp) => {
        const reward = rsp.data;

        this.rewards = [...this.rewards, reward];
        this.selected = [...this.selected, reward];

        this.$refs.createRewardDialog.closeAndReset();
        this.$notify({
          title: this.$t('_messages.createSuccess'),
          type: 'success',
        });
        // Event caught in CustomerJourney.vue
        EventBus.emit('customerJourneyUpdate');
      }).catch((err) => {
        console.log(err);
        this.$refs.createRewardDialog.setError(err);
      });
    },
  },
};
</script>
