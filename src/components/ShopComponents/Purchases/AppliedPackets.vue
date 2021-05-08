<template>
    <div>
      <DataTable
        :headers="headers"
        :items="appliedPackets"
        :sort-by="['begin']"
        :sort-desc="[true]"
        :search="true">
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
            <v-btn outlined color="primary" small @click="showEditDialog(item)" class="mr-1">
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn outlined color="error" small @click="$refs.deleteAppliedPacketDialog.show(item)">
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </div>
        </template>
      </DataTable>
      <DialogForm
        ref="editAppliedPacketDialog"
        :form-schema="editFormSchema"
        titleIcon="mdi-gift-open"
        :submitText="$t('edit')"
        @submit="editAppliedPacket"
        :title="$t('_purchases.labels.editAppliedPacket')"/>
      <DeleteConfirmationDialog
        ref="deleteAppliedPacketDialog"
        @submit="deleteAppliedPacket"/>
    </div>
</template>

<script>
import DataTable from '../../DataTable.vue';
import UserLink from '../../UserLink.vue';
import openapi from '../../../api/openapi';
import UtilService from '../../../services/UtilService';
import BoolIcon from '../../BoolIcon.vue';
import AppliedPacketEditForm from '../../../forms/AppliedPacketEditForm';
import DialogForm from '../../DialogForm.vue';
import DeleteConfirmationDialog from '../../DeleteConfirmationDialog.vue';

export default {
  name: 'UserPackets',
  components: {
    DeleteConfirmationDialog,
    DialogForm,
    BoolIcon,
    UserLink,
    DataTable,
  },
  data() {
    return {
      headers: [
        { text: this.$t('name'), value: 'packet_title' },
        { text: this.$t('user'), value: 'user' },
        { text: this.$t('active'), value: 'active' },
        { text: this.$t('begin'), value: 'begin' },
        { text: this.$t('end'), value: 'end' },
        {
          text: this.$t('actions'), value: 'actions', width: '200px', sortable: false, align: 'right',
        },
      ],
      appliedPackets: null,
      editFormSchema: AppliedPacketEditForm,
    };
  },
  methods: {
    async queryData() {
      const api = await openapi;

      api.packet_getAppliedPackets().then((rsp) => {
        this.appliedPackets = rsp.data;
      }).catch((err) => {
        console.log(err);
        UtilService.notifyUnexpectedError(err.response.data);
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
        this.queryData();
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
        this.queryData();
      }).catch((err) => {
        console.log(err);
        this.$refs.deleteAppliedPacketDialog.setErrorMessage(err.response.data.detail);
      });
    },
  },
  beforeMount() {
    this.queryData();
  },
  watch: {
    $route() {
      this.queryData();
    },
  },
};
</script>

<style scoped>

</style>
