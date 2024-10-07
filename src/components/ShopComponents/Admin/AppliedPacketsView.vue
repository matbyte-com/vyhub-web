<template>
  <div>
    <PaginatedDataTable
      ref="packetTable"
      :total-items="totalItems"
      :headers="headers"
      :items="appliedPackets"
      default-sort-by="timerange"
      :default-sort-desc="true"
      @reload="fetchData"
    >
      <template #header>
        <v-row>
          <v-col class="d-flex align-center">
            <v-menu
              location="bottom"
              :close-on-content-click="false"
            >
              <template #activator="{ props }">
                <v-btn
                  variant="outlined"
                  color="primary"

                  v-bind="props"
                >
                  <v-icon start>
                    mdi-filter
                  </v-icon>
                  {{ $t('active') }}
                </v-btn>
              </template>
              <v-radio-group v-model="active_filter">
                <v-radio
                  :value="true"
                  :label="$t('active')"
                />
                <v-radio
                  :value="false"
                  :label="$t('inactive')"
                />
              </v-radio-group>
              <a
                class="ma-1"
                @click="active_filter = null;"
              >
                {{ $t('reset') }}</a>
            </v-menu>
          </v-col>
        </v-row>
      </template>
      <template #footer-right>
        <v-btn
          v-if="$checkProp('applied_packet_edit')"
          variant="outlined"
          color="success"
          @click="$refs.addAppliedPacketDialog.show()"
        >
          <v-icon start>
            mdi-plus
          </v-icon>
          {{ $t('_purchases.labels.addAppliedPacket') }}
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
      <template #item.packet_title="{ item }">
        {{ item.packet.title }}
      </template>
      <template #item.active="{ item }">
        <BoolIcon :value="item.active" />
      </template>
      <template #item.begin="{ item }">
        <span>{{ new Date(item.begin).toLocaleString() }}</span>
      </template>
      <template #item.end="{ item }">
        <span v-if="item.end != null">{{ new Date(item.end).toLocaleString() }}</span>
        <span v-else>∞</span>
      </template>
      <template #item.user="{ item }">
        <UserLink :user="item.user" />
      </template>
      <template #item.actions="{ item }">
        <div class="text-right">
          <v-btn
            variant="flat"
            size="small"
            color="error"
            @click="showDetails(item)"
          >
            <v-icon start>
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
      :submit-text="$t('edit')"
      :title="$t('_purchases.labels.editAppliedPacket')"
      @submit="editAppliedPacket"
    />
    <DeleteConfirmationDialog
      ref="deleteAppliedPacketDialog"
      @submit="deleteAppliedPacket"
    />
    <DeleteConfirmationDialog
      ref="deleteAppliedRewardDialog"
      @submit="deleteAppliedReward"
    />
    <DialogForm
      ref="addAppliedPacketDialog"
      :form-schema="addFormSchema"
      icon="mdi-gift-open"
      :title="$t('_purchases.labels.addAppliedPacket')"
      @submit="createAppliedPacket"
    />
    <DialogForm
      ref="addAppliedRewardDialog"
      :form-schema="addAppliedRewardSchema"
      icon="mdi-star"
      :title="$t('_reward.labels.addAppliedReward')"
      @submit="addAppliedReward"
    />
    <SyncAppliedRewardsPacketsDialog
      ref="appliedRewardSyncDialog"
      @success="fetchData"
    />
    <Dialog
      ref="packetDetailDialog"
      icon="mdi-gift-open"
      :title="getDetailDialogTitle"
      :max-width="1000"
    >
      <template>
        <data-table
          :headers="appliedRewardsHeaders"
          :items="currentAppliedRewards"
          :show-search="true"
          class="mt-3"
        >
          <template #header>
            <v-chip :color="currentItem.status === 'ENABLED' ? 'success' : ''">
              {{ $t(`_packet.status.${currentItem.status}`) }}
            </v-chip>
            <span class="ml-2">
              {{ $t('_packet.labels.end') }}: {{ utils.formatDate(currentItem.end) }}
            </span>
          </template>
          <template #footer-right>
            <v-btn
              v-if="$checkProp('applied_packet_edit')"
              variant="outlined"
              color="success"
              @click="$refs.addAppliedRewardDialog.show()"
            >
              <v-icon start>
                mdi-plus
              </v-icon>
              {{ $t('_reward.labels.addAppliedReward') }}
            </v-btn>
          </template>
          <template #item.reward="{ item }">
            {{ item.reward.name }}
          </template>
          <template #item.status="{ item }">
            <v-chip v-if="item.status === 'OPEN'">
              {{ $t(`_reward.status.${item.status}`) }}
            </v-chip>
            <v-chip
              v-if="item.status === 'EXECUTED'"
              color="success"
            >
              {{ $t(`_reward.status.${item.status}`) }}
            </v-chip>
            <v-chip
              v-if="item.status === 'FAILED'"
              color="error"
            >
              {{ $t(`_reward.status.${item.status}`) }}
            </v-chip>
          </template>
          <template #item.actions="{ item }">
            <v-btn
              variant="text"
              color="error"
              size="small"
              @click="$refs.deleteAppliedRewardDialog.show(item)"
            >
              <v-icon start>
                mdi-delete
              </v-icon>
              {{ $t('delete') }}
            </v-btn>
          </template>
        </data-table>
      </template>
      <template #actions>
        <v-btn
          variant="text"
          color="primary"
          size="small"
          class="mr-1"
          @click="showEditDialog(currentItem)"
        >
          <v-icon start>
            mdi-pencil
          </v-icon>
          {{ $t('edit') }}
        </v-btn>
        <v-btn
          variant="text"
          color="error"
          size="small"
          @click="$refs.deleteAppliedPacketDialog.show(currentItem)"
        >
          <v-icon start>
            mdi-delete
          </v-icon>
          {{ $t('_packet.labels.deleteAppliedPacket') }}
        </v-btn>
      </template>
    </Dialog>
  </div>
</template>

<script>
import UserAppliedPacketAddForm from '@/forms/UserAppliedPacketAddForm';
import AppliedPacketEditForm from '@/forms/AppliedPacketEditForm';
import AppliedRewardAddForm from '@/forms/AppliedRewardAddForm';
import openapi from '../../../api/openapi';

export default {
  data() {
    return {
      headers: [
        { title: this.$t('name'), key: 'packet_title', sortable: false },
        { title: this.$t('user'), key: 'user', sortable: false },
        { title: this.$t('active'), key: 'active', sortable: false },
        { title: this.$t('begin'), key: 'begin' },
        { title: this.$t('end'), key: 'end' },
        {
          title: this.$t('actions'), key: 'actions', width: '200px', sortable: false, align: 'end',
        },
      ],
      appliedRewardsHeaders: [
        { title: this.$t('_purchases.labels.reward'), key: 'reward' },
        { title: this.$t('status'), key: 'status' },
        {
          title: this.$t('actions'), key: 'actions', width: '200px', sortable: false, align: 'end',
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
  computed: {
    getDetailDialogTitle() {
      if (this.currentItem) {
        return `${this.currentItem.user.username}: ${this.currentItem.packet.title}`;
      }
      return '';
    },
  },
  watch: {
    active_filter() {
      this.fetchData();
    },
  },
  mounted() {
    this.fetchData();
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
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
        this.$refs.editAppliedPacketDialog.closeAndReset();
        this.fetchData();
        this.currentItem = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.$refs.editAppliedPacketDialog.setError(err);
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
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteAppliedPacketDialog.closeAndReset();
        this.fetchData();
        this.$refs.packetDetailDialog.close();
        this.currentItem = null;
      }).catch((err) => {
        console.log(err);
        this.$refs.deleteAppliedPacketDialog.setError(err);
      });
    },
    async createAppliedPacket() {
      const data = this.$refs.addAppliedPacketDialog.getData();
      data.user_id = data.user.id;
      data.packet_id = data.packet.id;
      (await openapi).packet_createAppliedPacket(null, data).then(() => {
        this.$refs.addAppliedPacketDialog.closeAndReset();
        this.$notify({
          title: this.$t('_messages.createSuccess'),
          type: 'success',
        });
        this.fetchData();
      }).catch((err) => {
        this.$refs.addAppliedPacketDialog.setError(err);
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
          title: this.$t('_messages.createSuccess'),
          type: 'success',
        });
        this.getAppliedRewards();
      }).catch((err) => {
        this.$refs.addAppliedRewardDialog.setError(err);
      });
    },
    async deleteAppliedReward(item) {
      (await openapi).packet_deleteAppliedReward({ uuid: item.id }).then(() => {
        this.$notify({
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteAppliedRewardDialog.closeAndReset();
        this.getAppliedRewards();
      }).catch((err) => {
        console.log(err);
        this.$refs.deleteAppliedPacketDialog.setError(err);
      });
    },
    async showDetails(item) {
      this.currentItem = item;
      this.$refs.packetDetailDialog.show();
      await this.getAppliedRewards();
    },
  },
};
</script>

<style scoped>

</style>
