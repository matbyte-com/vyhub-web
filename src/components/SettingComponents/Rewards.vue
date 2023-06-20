<template>
  <div>
    <SettingTitle docPath="/guide/shop/reward">
      {{ $t('rewards') }}
    </SettingTitle>
    <DataTable
      :headers="headers"
      :items="rewards"
      :showSearch="true">
      <template v-slot:footer-right>
        <v-btn outlined color="success" @click="$refs.createRewardDialog.show()"
               style="border-bottom-right-radius: 0; border-top-right-radius: 0;"
               :class="{ 'glow-effect':utils.customerJourneyActive('add-reward') }">
          <v-icon left>mdi-plus</v-icon>
          <span>{{ $t('_reward.labels.create') }}</span>
        </v-btn>
        <v-btn outlined color="primary" @click="$refs.useTemplateDialog.show()"
               style="border-bottom-left-radius: 0; border-top-left-radius: 0;"
               :class="{ 'glow-effect':utils.customerJourneyActive('add-reward') }"
        >
          <v-icon left>mdi-bookshelf</v-icon>
          <span>{{ $t('_reward.labels.templates') }}</span>
        </v-btn>
        <v-btn class="ml-1" outlined color="success" @click="$refs.appliedRewardSyncDialog.show()"
               v-if="$checkProp('applied_packet_edit')">
          <v-icon>mdi-sync</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.once="{ item }">
        <BoolIcon :value="item.once"></BoolIcon>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="text-right">
          <v-btn outlined color="primary" small @click="showEditDialog(item)" class="mr-1">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn outlined color="error" small @click="$refs.deleteRewardDialog.show(item)">
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
      :submitText="$t('create')"
      @submit="createReward"
      :title="$t('_reward.labels.create')">
      <template slot="allOf-0.serverbundle-after">
        <b>{{ $t('_reward.labels.checkForReplacements') }}:</b>
        <br/>
        <a target="_blank" href="https://docs.vyhub.net/latest/game/gmod/" class="mr-2"><v-btn small>GMOD</v-btn></a>
        <a target="_blank" href="https://docs.vyhub.net/latest/game/minecraft/" class="mr-2"><v-btn small>Minecraft</v-btn></a>
        <a target="_blank" href="https://docs.vyhub.net/latest/game/discord/" class="mr-2"><v-btn small>Discord</v-btn></a>
      </template>
    </DialogForm>
    <DialogForm
      ref="editRewardDialog"
      :form-schema="rewardSchema"
      icon="mdi-star-shooting"
      :submitText="$t('edit')"
      @submit="editReward"
      :title="$t('_reward.labels.edit')">
    </DialogForm>
    <Dialog :title="$t('_reward.labels.templates')"
            ref="useTemplateDialog" icon="mdi-star-shooting">
      <RewardCatalog @success="$refs.useTemplateDialog.close(); fetchData()"/>
    </Dialog>
    <DeleteConfirmationDialog
      ref="deleteRewardDialog"
      @submit="deleteReward"/>
    <SyncAppliedRewardsPacketsDialog @success="fetchData" ref="appliedRewardSyncDialog"/>
  </div>
</template>

<script>
import SyncAppliedRewardsPacketsDialog
  from '@/components/ShopComponents/Admin/RewardToAppliedPacketAddDialog.vue';
import Dialog from '@/components/Dialog.vue';
import admin from '@/views/Shop/Admin.vue';
import GMOD from '@/components/DashboardComponents/Dashboards/Bundle/GMOD.vue';
import RewardCatalog from '@/components/SettingComponents/RewardCatalog.vue';
import EventBus from '@/services/EventBus';
import SettingTitle from './SettingTitle.vue';
import DataTable from '../DataTable.vue';
import openapi from '../../api/openapi';
import DialogForm from '../DialogForm.vue';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog.vue';
import RewardForm from '../../forms/RewardForm';
import BoolIcon from '../BoolIcon.vue';

export default {
  name: 'Rewards',
  computed: {
    GMOD() {
      return GMOD;
    },
    admin() {
      return admin;
    },
  },
  components: {
    SyncAppliedRewardsPacketsDialog,
    RewardCatalog,
    Dialog,
    BoolIcon,
    DeleteConfirmationDialog,
    DialogForm,
    DataTable,
    SettingTitle,
  },
  data() {
    return {
      headers: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('type'), value: 'type' },
        { text: this.$t('oneTime'), value: 'once' },
        {
          text: this.$t('actions'), value: 'actions', width: '200px', sortable: false, align: 'right',
        },
      ],
      rewards: null,
      rewardSchema: RewardForm,
      currentType: null,
      currentServerbundle: null,
      bundles: null,
    };
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
      data.serverbundle_id = data.serverbundle.id;
      delete data.serverbundle;

      const api = await openapi;

      api.packet_addReward(null, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_reward.messages.createSuccess'),
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
      data.serverbundle_id = data.serverbundle.id;
      delete data.serverbundle;

      const api = await openapi;

      api.packet_editReward({ uuid: reward.id }, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_reward.messages.editSuccess'),
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

      api.packet_deleteReward({ uuid: reward.id }).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_reward.messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteRewardDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.deleteRewardDialog.setError(err);
      });
    },
    showEditDialog(reward) {
      const data = { ...reward };

      this.$refs.editRewardDialog.setData(data);
      this.$refs.editRewardDialog.show(reward);
    },
  },
};
</script>

<style scoped>

</style>
