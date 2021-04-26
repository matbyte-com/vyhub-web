<template>
  <div>
    <SettingTitle>{{ $t('packets') }}</SettingTitle>

    <DataTable
      :headers="headers"
      :items="packets"
      :search="true">
      <template v-slot:footer-right>
        <v-btn outlined color="success" @click="$refs.addPacketDialog.show()">
          <v-icon left>mdi-plus</v-icon>
          <span>{{ $t('_packet.labels.add') }}</span>
        </v-btn>
      </template>
      <template v-slot:item.flags="{ item }">
        <div v-if="item.flags.length === 0">
          -
        </div>
        <v-chip v-for="flag in item.flags" :color="flag.color + ' lighten-1'" v-bind:key="flag.text"
                small class="mr-1">
          {{ flag.text }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="text-right">
          <v-btn outlined color="primary" small @click="showEditDialog(item)" class="mr-1">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn outlined color="error" small @click="$refs.deletePacketDialog.show(item)">
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      </template>
    </DataTable>
    <DialogForm
      ref="addPacketDialog"
      :form-schema="packetSchema"
      titleIcon="mdi-gift-open"
      :submitText="$t('add')"
      @submit="addPacket"
      :title="$t('_packet.labels.add')"/>
    <DialogForm
      ref="editPacketDialog"
      :form-schema="packetSchema"
      titleIcon="mdi-gift-open"
      :submitText="$t('edit')"
      @submit="editPacket"
      :title="$t('_packet.labels.edit')"/>
    <DeleteConfirmationDialog
      ref="deletePacketDialog"
      @submit="deletePacket"/>
  </div>
</template>

<script>
/* eslint-disable @typescript-eslint/camelcase */

import UtilService from '@/services/UtilService';
import DialogForm from '@/components/DialogForm.vue';
import PacketForm from '@/forms/PacketForm';
import DataTable from '@/components/DataTable.vue';
import SettingTitle from './SettingTitle.vue';
import openapi from '../../api/openapi';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog.vue';

export default {
  name: 'Packets',
  components: {
    DeleteConfirmationDialog, SettingTitle, DataTable, DialogForm,
  },
  data() {
    return {
      headers: [
        { text: this.$t('title'), value: 'title' },
        { text: this.$t('category'), value: 'category.name' },
        { text: this.$t('flags'), value: 'flags' },
        {
          text: this.$t('actions'), value: 'actions', width: '200px', sortable: false, align: 'right',
        },
      ],
      packets: [],
      packetSchema: PacketForm,
    };
  },
  beforeMount() {
    this.queryData();
  },
  methods: {
    async queryData() {
      const api = await openapi;

      api.packet_getPackets().then((rsp) => {
        this.packets = rsp.data;

        this.packets.forEach((packet) => {
          const pckt = packet;
          pckt.flags = [];

          if (packet.custom_price) {
            pckt.flags.push({ text: this.$t('_packet.labels.customPrice'), color: null });
          }
          if (!packet.enabled) {
            pckt.flags.push({ text: this.$t('disabled'), color: 'error' });
          }
          if (!packet.buyable) {
            pckt.flags.push({ text: this.$t('_packet.labels.notBuyable'), color: 'warning' });
          }
          if (packet.recurring) {
            pckt.flags.push({ text: this.$t('_packet.labels.recurring'), color: null });
          }
          if (packet.active_for) {
            pckt.flags.push({ text: this.$t('_packet.labels.expires'), color: null });
            pckt.active_for /= (60 * 60 * 24);
          }
          if (packet.payment_gateways.length > 0) {
            pckt.flags.push({ text: this.$t('_packet.labels.limitedPayments'), color: null });
          }
        });
      }).catch((err) => {
        console.log(err);
        UtilService.notifyUnexpectedError(err.response.data);
      });
    },
    async addPacket() {
      /* eslint-disable @typescript-eslint/camelcase */
      const api = await openapi;

      let packet = this.$refs.addPacketDialog.getData();

      packet.enabled = true;
      packet.buyable = true;

      packet = this.prepareDataForSending(packet);

      api.packet_addPacket(null, packet).then(() => {
        this.queryData();
        this.$refs.addPacketDialog.closeAndReset();
        this.$notify({
          title: this.$t('_packet.messages.addSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        this.$refs.addPacketDialog.setErrorMessage(err.response.data);
      });
    },
    showEditDialog(packet) {
      const data = { ...packet };
      data.currency_code = data.currency.code;

      delete data.currency;
      delete data.flags;
      delete data.price_with_discount;
      delete data.price_without_discount;

      this.$refs.editPacketDialog.setData(data);
      this.$refs.editPacketDialog.show(data);
    },
    async editPacket(packetOld) {
      const api = await openapi;

      const data = this.prepareDataForSending(this.$refs.editPacketDialog.getData());

      api.packet_editPacket({ uuid: packetOld.id }, data).then(() => {
        this.queryData();
        this.$refs.editPacketDialog.closeAndReset();
        this.$notify({
          title: this.$t('_packet.messages.editSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        this.$refs.editPacketDialog.setErrorMessage(err.response.data);
      });
    },
    prepareDataForSending(data) {
      const new_data = data;

      new_data.category_id = data.category.id;
      new_data.payment_gateway_ids = data.payment_gateways.map((gw) => gw.id);
      delete new_data.category;
      delete new_data.payment_gateways;

      new_data.relations = data.relations.map((rel) => {
        const newRel = rel;
        newRel.packet_right_id = rel.packet_right.id;
        delete newRel.packet_left;
        delete newRel.packet_right;
        return newRel;
      });

      if (data.active_for != null) {
        new_data.active_for = data.active_for * 60 * 60 * 24;
      }

      return new_data;
    },
    async deletePacket(packet) {
      const api = await openapi;

      api.packet_deletePacket({ uuid: packet.id }).then(() => {
        this.queryData();
        this.$refs.deletePacketDialog.closeAndReset();
        this.$notify({
          title: this.$t('_packet.messages.deleteSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        this.$refs.deletePacketDialog.setErrorMessage(err.response.data);
      });
    },
    editRewards(packet) {
      //
    },
  },
};
</script>

<style scoped>

</style>
