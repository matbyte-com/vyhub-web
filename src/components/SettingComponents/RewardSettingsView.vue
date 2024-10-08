<template>
  <div>
    <SettingTitle doc-path="/guide/shop/reward">
      {{ $t('rewards') }}
    </SettingTitle>
    <DataTable
      :headers="headers"
      :items="rewards"
      :show-search="true"
    >
      <template #footer-right>
        <v-btn
          variant="outlined"
          color="success"
          style="border-bottom-right-radius: 0; border-top-right-radius: 0;"
          :class="{ 'glow-effect':utils.customerJourneyActive('add-reward') }"
          @click="$refs.createRewardDialog.show()"
        >
          <v-icon start>
            mdi-plus
          </v-icon>
          <span>{{ $t('_reward.labels.create') }}</span>
        </v-btn>
        <v-btn
          variant="outlined"
          color="primary"
          style="border-bottom-left-radius: 0; border-top-left-radius: 0;"
          :class="{ 'glow-effect':utils.customerJourneyActive('add-reward') }"
          @click="$refs.useTemplateDialog.show()"
        >
          <v-icon start>
            mdi-bookshelf
          </v-icon>
          <span>{{ $t('_reward.labels.templates') }}</span>
        </v-btn>
        <v-btn
          v-if="$checkProp('applied_packet_edit')"
          class="ml-1"
          variant="outlined"
          color="success"
          @click="$refs.appliedRewardSyncDialog.show()"
        >
          <v-icon>mdi-sync</v-icon>
        </v-btn>
      </template>
      <template #item.once="{ item }">
        <BoolIcon :value="item.once" />
      </template>
      <template #item.actions="{ item }">
        <div class="text-right">
          <v-btn
            variant="outlined"
            color="primary"
            size="small"
            class="mr-1"
            @click="showEditDialog(item)"
          >
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn
            variant="outlined"
            color="error"
            size="small"
            @click="$refs.deleteRewardDialog.show(item)"
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      </template>
    </DataTable>
    <DialogForm
      ref="createRewardDialog"
      :form-schema="rewardSchema"
      icon="mdi-star-shooting"
      :submit-text="$t('create')"
      :title="$t('_reward.labels.create')"
      @submit="createReward"
    >
      <slot name="allOf-0.serverbundle-after">
        <b>{{ $t('_reward.labels.checkForReplacements') }}:</b>
        <br>
        <a
          target="_blank"
          href="https://docs.vyhub.net/latest/game/gmod/"
          class="mr-2"
        >
          <v-btn
            class="mb-1"
            variant="flat"
            size="small"
          >GMOD
          </v-btn>
        </a>
        <a
          target="_blank"
          href="https://docs.vyhub.net/latest/game/minecraft/"
          class="mr-2"
        >
          <v-btn
            class="mb-1"
            variant="flat"
            size="small"
          >Minecraft
          </v-btn>
        </a>
        <a
          target="_blank"
          href="https://docs.vyhub.net/latest/game/rust/"
          class="mr-2"
        >
          <v-btn
            class="mb-1"
            variant="flat"
            size="small"
          >Rust
          </v-btn>
        </a>
        <a
          target="_blank"
          href="https://docs.vyhub.net/latest/game/7days/"
          class="mr-2"
        >
          <v-btn
            class="mb-1"
            variant="flat"
            size="small"
          >7 Days to Die
          </v-btn>
        </a>
        <a
          target="_blank"
          href="https://docs.vyhub.net/latest/game/asa/"
          class="mr-2"
        >
          <v-btn
            class="mb-1"
            variant="flat"
            size="small"
          >Ark Ascended
          </v-btn>
        </a>
        <a
          target="_blank"
          href="https://docs.vyhub.net/latest/game/fivem/"
          class="mr-2"
        >
          <v-btn
            class="mb-1"
            variant="flat"
            size="small"
          >FiveM
          </v-btn>
        </a>
      </slot>
    </dialogform>
  </div>
  <DialogForm
    ref="editRewardDialog"
    :form-schema="rewardSchema"
    icon="mdi-star-shooting"
    :submit-text="$t('edit')"
    :title="$t('_reward.labels.edit')"
    @submit="editReward"
  />
  <Dialog
    ref="useTemplateDialog"
    :title="$t('_reward.labels.templates')"
    icon="mdi-star-shooting"
  >
    <RewardCatalog @success="$refs.useTemplateDialog.close(); fetchData()" />
  </Dialog>
  <DeleteConfirmationDialog
    ref="deleteRewardDialog"
    @submit="deleteReward"
  />
  <SyncAppliedRewardsPacketsDialog
    ref="appliedRewardSyncDialog"
    @success="fetchData"
  />
</template>

<script>
import GMOD from '@/components/DashboardComponents/Dashboards/Bundle/GMOD.vue';
import EventBus from '@/services/EventBus';
import openapi from '../../api/openapi';
import RewardForm from '../../forms/RewardForm';

export default {
  data() {
    return {
      headers: [
        {title: this.$t('name'), key: 'name'},
        {title: this.$t('type'), key: 'type'},
        {title: this.$t('oneTime'), key: 'once'},
        {
          title: this.$t('actions'), key: 'actions', width: '200px', sortable: false, align: 'end',
        },
      ],
      rewards: null,
      rewardSchema: RewardForm,
      currentType: null,
      currentServerbundle: null,
      bundles: null,
    };
  },
  computed: {
    GMOD() {
      return GMOD;
    },
    admin() {
      return admin;
    },
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const api = await openapi;

      api.packet_getRewards().then((rsp) => {
        this.rewards = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });

      (await openapi).server_getBundles().then((rsp) => {
        this.bundles = rsp.data;
      });
    },
    async createReward() {
      const data = this.$refs.createRewardDialog.getData();

      data.order = 0;
      data.serverbundle_id = (data.serverbundle ? data.serverbundle.id : null);
      data.on_event = data.on_event_group.on_event;
      data.limit_servers_ids = (data.limit_servers ? data.limit_servers.map((s) => s.id) : null);
      delete data.serverbundle;
      delete data.on_event_group;

      const api = await openapi;

      api.packet_addReward(null, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.createSuccess'),
          type: 'success',
        });
        this.$refs.createRewardDialog.closeAndReset();
        // Event caught in CustomerJourney.vue
        EventBus.emit('customerJourneyUpdate');
      }).catch((err) => {
        console.log(err);
        this.$refs.createRewardDialog.setError(err);
      });
    },
    async editReward(reward) {
      const data = this.$refs.editRewardDialog.getData();

      data.order = 0;
      data.serverbundle_id = (data.serverbundle ? data.serverbundle.id : null);
      data.limit_servers_ids = (data.limit_servers ? data.limit_servers.map((s) => s.id) : null);

      data.on_event = data.on_event_group.on_event;
      delete data.serverbundle;
      delete data.on_event_group;

      const api = await openapi;

      api.packet_editReward({uuid: reward.id}, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
        this.$refs.editRewardDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.editRewardDialog.setError(err);
      });
    },
    async deleteReward(reward) {
      const api = await openapi;

      api.packet_deleteReward({uuid: reward.id}).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteRewardDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.deleteRewardDialog.setError(err);
      });
    },
    showEditDialog(reward) {
      const data = {...reward};

      data.on_event_group = {on_event: reward.on_event};

      this.$refs.editRewardDialog.show(reward);

      this.$nextTick(() => {
        this.$refs.editRewardDialog.setData(data);
      });
    },
  },
};
</script>

<style scoped>

</style>
