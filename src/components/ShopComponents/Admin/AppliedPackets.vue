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
      <DialogForm
        ref="addAppliedPacketDialog"
        :form-schema="addFormSchema"
        icon="mdi-gift-open"
        @submit="createAppliedPacket"
        :title="$t('_purchases.labels.addAppliedPacket')" />
      <Dialog
        ref="packetDetailDialog"
        icon="mdi-gift-open" :title="getDetailDialogTitle">
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
            {{ $t('delete') }}
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
import Dialog from '../../Dialog.vue';

export default {
  name: 'UserPackets',
  components: {
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
      appliedPackets: null,
      editFormSchema: AppliedPacketEditForm,
      addFormSchema: UserAppliedPacketAddForm,
      active_filter: [],
      totalItems: 0,
      availableStatus: [],
      currentItem: null,
      currentRewards: null,
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

      api.packet_editAppliedPacket({ uuid: aPacket.id }, data).then(() => {
        this.$notify({
          title: this.$t('_purchases.messages.editAppliedPacketSuccess'),
          type: 'success',
        });
        this.$refs.editAppliedPacketDialog.closeAndReset();
        this.fetchData(1);
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
        { user_id: [this.currentItem.user.id] },
      ).then((rsp) => {
        this.currentRewards = rsp.data;
      });
    },
    async showDetails(item) {
      this.currentItem = item;
      this.$refs.packetDetailDialog.show();
      this.getAppliedRewards();
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
