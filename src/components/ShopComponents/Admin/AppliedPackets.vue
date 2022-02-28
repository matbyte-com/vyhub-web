<template>
    <div>
      <PaginatedDataTable
        ref="packetTable"
        :totalItems="totalItems"
        :headers="headers"
        :items="appliedPackets"
        default-sort-by="timerange"
        :default-sort-desc="true"
        @reload="fetchData">
        <template v-slot:header>
          <v-row>
            <v-col class="d-flex align-center">
              <v-menu offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>
                      mdi-filter
                    </v-icon>
                    {{ $t('active') }}
                  </v-btn>
                </template>
                <v-radio-group v-model="active_filter">
                  <v-radio :value="true" :label="$t('active')"></v-radio>
                  <v-radio :value="false" :label="$t('inactive')"></v-radio>
                </v-radio-group>
                <a class="ma-1" @click="active_filter = null;">
                  {{ $t('reset') }}</a>
              </v-menu>
            </v-col>
          </v-row>
        </template>
        <template v-slot:footer-right>
          <v-btn outlined color="success" @click="$refs.addAppliedPacketDialog.show()"
                 v-if="$checkProp('applied_packet_edit')">
            <v-icon left>mdi-plus</v-icon>
            {{ $t('_purchases.labels.addAppliedPacket') }}
          </v-btn>
        </template>
        <template v-slot:item.packet_title="{ item }">
          {{ item.packet.title }}
        </template>
        <template v-slot:item.active="{ item }">
          <BoolIcon :value="item.active"></BoolIcon>
        </template>
        <template v-slot:item.begin="{ item }">
          <span>{{ new Date(item.begin).toLocaleString() }}</span>
        </template>
        <template v-slot:item.end="{ item }">
          <span v-if="item.end != null">{{ new Date(item.end).toLocaleString() }}</span>
          <span v-else>∞</span>
        </template>
        <template v-slot:item.user="{ item }">
          <UserLink :user="item.user"></UserLink>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="text-right">
            <v-btn depressed small color="error"
                   @click="showDetails(item)">
              <v-icon left>
                mdi-eye
              </v-icon>
              {{ $t('details') }}
            </v-btn>
          </div>
        </template>
      </PaginatedDataTable>
      <DialogForm
        ref="editAppliedPacketDialog"
        :form-schema="editFormSchema"
        icon="mdi-gift-open"
        :submitText="$t('edit')"
        @submit="editAppliedPacket"
        :title="$t('_purchases.labels.editAppliedPacket')"/>
      <DeleteConfirmationDialog
        ref="deleteAppliedPacketDialog"
        @submit="deleteAppliedPacket"/>
      <DeleteConfirmationDialog
        ref="deleteAppliedRewardDialog"
        @submit="deleteAppliedReward" />
      <DialogForm
        ref="addAppliedPacketDialog"
        :form-schema="addFormSchema"
        icon="mdi-gift-open"
        @submit="createAppliedPacket"
        :title="$t('_purchases.labels.addAppliedPacket')" />
      <DialogForm
        ref="addAppliedRewardDialog"
        :form-schema="addAppliedRewardSchema"
        icon="mdi-star"
        @submit="addAppliedReward"
        :title="$t('_reward.labels.addAppliedReward')" />
      <Dialog
        ref="packetDetailDialog"
        icon="mdi-gift-open" :title="getDetailDialogTitle" :max-width="1000">
        <template>
          <data-table :headers="appliedRewardsHeaders"
                      :items="currentAppliedRewards"
                      :show-search="true" class="mt-3">
            <template v-slot:header>
              <v-chip :color="currentItem.status === 'ENABLED' ? 'success' : ''">
                {{ $t(`_packet.status.${currentItem.status}`) }}
              </v-chip>
              <span class="ml-2">
                {{ $t('_packet.labels.end') }}: {{ utils.formatDate(currentItem.end) }}
              </span>
            </template>
            <template v-slot:footer-right>
              <v-btn outlined color="success" @click="$refs.addAppliedRewardDialog.show()"
                     v-if="$checkProp('applied_packet_edit')">
                <v-icon left>mdi-plus</v-icon>
                {{ $t('_reward.labels.addAppliedReward') }}
              </v-btn>
            </template>
            <template v-slot:item.reward="{ item }">
              {{ item.reward.name }}
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip v-if="item.status === 'OPEN'">
                {{ $t(`_reward.status.${item.status}`) }}
              </v-chip>
              <v-chip v-if="item.status === 'EXECUTED'" color="success">
                {{ $t(`_reward.status.${item.status}`) }}
              </v-chip>
              <v-chip v-if="item.status === 'FAILED'" color="error">
                {{ $t(`_reward.status.${item.status}`) }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn text color="error" small
                     @click="$refs.deleteAppliedRewardDialog.show(item)">
                <v-icon left>
                  mdi-delete
                </v-icon>
                {{ $t('delete') }}
              </v-btn>
            </template>
          </data-table>
        </template>
        <template v-slot:actions>
          <v-btn text color="primary" small @click="showEditDialog(currentItem)" class="mr-1">
            <v-icon left>
              mdi-pencil
            </v-icon>
            {{ $t('edit') }}
          </v-btn>
          <v-btn text color="error" small
                 @click="$refs.deleteAppliedPacketDialog.show(currentItem)">
            <v-icon left>
              mdi-delete
            </v-icon>
            {{ $t('_packet.labels.deleteAppliedPacket') }}
          </v-btn>
        </template>
      </Dialog>
    </div>
</template>

<script>
import UserLink from '../../UserLink.vue';
import openapi from '../../../api/openapi';
import BoolIcon from '../../BoolIcon.vue';
import AppliedPacketEditForm from '../../../forms/AppliedPacketEditForm';
import DialogForm from '../../DialogForm.vue';
import DeleteConfirmationDialog from '../../DeleteConfirmationDialog.vue';
import PaginatedDataTable from '@/components/PaginatedDataTable.vue';
import UserAppliedPacketAddForm from '@/forms/UserAppliedPacketAddForm';
import AppliedRewardAddForm from '../../../forms/AppliedRewardAddForm';
import Dialog from '../../Dialog.vue';
import DataTable from '../../DataTable.vue';

export default {
  name: 'UserPackets',
  components: {
    DataTable,
    Dialog,
    PaginatedDataTable,
    DeleteConfirmationDialog,
    DialogForm,
    BoolIcon,
    UserLink,
  },
  data() {
    return {
      headers: [
        { text: this.$t('name'), value: 'packet_title', sortable: false },
        { text: this.$t('user'), value: 'user', sortable: false },
        { text: this.$t('active'), value: 'active', sortable: false },
        { text: this.$t('begin'), value: 'begin' },
        { text: this.$t('end'), value: 'end' },
        {
          text: this.$t('actions'), value: 'actions', width: '200px', sortable: false, align: 'right',
        },
      ],
      appliedRewardsHeaders: [
        { text: this.$t('_purchases.labels.reward'), value: 'reward' },
        { text: this.$t('status'), value: 'status' },
        {
          text: this.$t('actions'), value: 'actions', width: '200px', sortable: false, align: 'right',
        },
      ],
      appliedPackets: null,
      editFormSchema: AppliedPacketEditForm,
      addFormSchema: UserAppliedPacketAddForm,
      addAppliedRewardSchema: AppliedRewardAddForm,
      active_filter: [],
      totalItems: 0,
      availableStatus: [],
      currentItem: null,
      currentAppliedRewards: null,
    };
  },
  methods: {
    async fetchData(queryParams = null) {
      const api = await openapi;

      const params = {
        ...(queryParams != null ? queryParams : this.$refs.packetTable.getQueryParameters()),
      };

      if (this.active_filter != null) {
        params.active = this.active_filter;
      }

      api.packet_getAppliedPackets(params).then((rsp) => {
        this.appliedPackets = rsp.data.items;
        this.totalItems = rsp.data.total;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async editAppliedPacket(aPacket) {
      const api = await openapi;
      const data = this.$refs.editAppliedPacketDialog.getData();

      api.packet_editAppliedPacket({ uuid: aPacket.id }, data).then((rsp) => {
        this.$notify({
          title: this.$t('_purchases.messages.editAppliedPacketSuccess'),
          type: 'success',
        });
        this.$refs.editAppliedPacketDialog.closeAndReset();
        this.fetchData();
        this.currentItem = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.$refs.editAppliedPacketDialog.setErrorMessage(err.response.data.detail);
      });
    },
    showEditDialog(aPacket) {
      const data = { ...aPacket };

      this.$refs.editAppliedPacketDialog.setData(data);
      this.$refs.editAppliedPacketDialog.show(data);
    },
    async deleteAppliedPacket(ePacket) {
      (await openapi).packet_deleteAppliedPacket({ uuid: ePacket.id }).then(() => {
        this.$notify({
          title: this.$t('_purchases.messages.deleteAppliedPacketSuccess'),
          type: 'success',
        });
        this.$refs.deleteAppliedPacketDialog.closeAndReset();
        this.fetchData();
        this.$refs.packetDetailDialog.close();
        this.currentItem = null;
      }).catch((err) => {
        console.log(err);
        this.$refs.deleteAppliedPacketDialog.setErrorMessage(err.response.data.detail);
      });
    },
    async createAppliedPacket() {
      const data = this.$refs.addAppliedPacketDialog.getData();
      data.user_id = data.user.id;
      data.packet_id = data.packet.id;
      (await openapi).packet_createAppliedPacket(null, data).then(() => {
        this.$refs.addAppliedPacketDialog.closeAndReset();
        this.$notify({
          title: this.$t('_purchases.messages.createAppliedPacketSuccess'),
          type: 'success',
        });
        this.fetchData();
      }).catch((err) => {
        this.$refs.addAppliedPacketDialog.setErrorMessage(err.response.data.detail);
      });
    },
    async getAppliedRewards() {
      (await openapi).packet_getAppliedRewardsByUser(
        {
          user_id: [this.currentItem.user.id],
          applied_packet_id: [this.currentItem.id],
        },
      ).then((rsp) => {
        let res = [];
        Object.values(rsp.data).forEach((r) => {
          res = res.concat(r);
        });
        this.currentAppliedRewards = res;
      });
    },
    async addAppliedReward() {
      const data = this.$refs.addAppliedRewardDialog.getData();
      data.reward_id = data.reward.id;
      data.user_id = this.currentItem.user.id;
      data.applied_packet_id = this.currentItem.id;
      (await openapi).packet_addAppliedReward(null, data).then(() => {
        this.$refs.addAppliedRewardDialog.closeAndReset();
        this.$notify({
          title: this.$t('_reward.messages.createAppliedRewardSuccess'),
          type: 'success',
        });
        this.getAppliedRewards();
      }).catch((err) => {
        this.$refs.addAppliedRewardDialog.setErrorMessage(err.response.data.detail);
      });
    },
    async deleteAppliedReward(item) {
      (await openapi).packet_deleteAppliedReward({ uuid: item.id }).then(() => {
        this.$notify({
          title: this.$t('_reward.messages.deleteAppliedRewardSuccess'),
          type: 'success',
        });
        this.$refs.deleteAppliedRewardDialog.closeAndReset();
        this.getAppliedRewards();
      }).catch((err) => {
        console.log(err);
        this.$refs.deleteAppliedPacketDialog.setErrorMessage(err.response.data.detail);
      });
    },
    async showDetails(item) {
      this.currentItem = item;
      this.$refs.packetDetailDialog.show();
      await this.getAppliedRewards();
    },
  },
  beforeMount() {
    this.fetchData();
  },
  watch: {
    active_filter() {
      this.fetchData();
    },
  },
  computed: {
    getDetailDialogTitle() {
      if (this.currentItem) {
        return `${this.currentItem.user.username}: ${this.currentItem.packet.title}`;
      }
      return '';
    },
  },
};
</script>

<style scoped>

</style>
