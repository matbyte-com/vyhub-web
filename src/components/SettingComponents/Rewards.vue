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
        <v-btn outlined color="success" @click="$refs.createRewardDialog.show()">
          <v-icon left>mdi-plus</v-icon>
          <span>{{ $t('_reward.labels.create') }}</span>
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
      :title="$t('_reward.labels.create')"/>
    <DialogForm
      ref="editRewardDialog"
      :form-schema="rewardSchema"
      icon="mdi-star-shooting"
      :submitText="$t('edit')"
      @submit="editReward"
      :title="$t('_reward.labels.edit')"/>
    <DeleteConfirmationDialog
      ref="deleteRewardDialog"
      @submit="deleteReward"/>
  </div>
</template>

<script>
import SettingTitle from './SettingTitle.vue';
import DataTable from '../DataTable.vue';
import openapi from '../../api/openapi';
import DialogForm from '../DialogForm.vue';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog.vue';
import RewardForm from '../../forms/RewardForm';
import BoolIcon from '../BoolIcon.vue';

export default {
  name: 'Rewards',
  components: {
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
      }).catch((err) => {
        console.log(err);
        this.$refs.createRewardDialog.setErrorMessage(err.response.data);
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
        this.$refs.editRewardDialog.setErrorMessage(err.response.data);
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
        this.$refs.deleteRewardDialog.setErrorMessage(err.response.data);
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
