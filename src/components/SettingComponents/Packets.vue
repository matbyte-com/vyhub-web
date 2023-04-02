<template>
  <div>
    <SettingTitle docPath="/guide/shop/packet">
      {{ $t('packets') }}
    </SettingTitle>

    <DataTable
      :headers="headers"
      :items="packets"
      :disable-sort="currentCategory != null"
      :disable-pagination="currentCategory != null"
      :hide-default-footer="currentCategory != null"
      :sort-by="(currentCategory != null ? null : ['category.name'])"
      id="packets-table"
      :showSearch="true">
      <template slot="header">
        <v-col xl="9" md="12">
          <v-select outlined hide-details dense
                    return-object
                    :label="$t('category')"
                    clearable
                    v-model="currentCategory"
                    :items="categories" item-value="id" item-text="name">

          </v-select>
        </v-col>
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
          <v-btn icon color="secondary" small @click="copyPacket(item)" class="mr-1">
            <v-icon small>
              mdi-content-copy
            </v-icon>
          </v-btn>
          <v-btn outlined color="primary" small @click="showEditDialog(item)" class="mr-1">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn outlined color="error" small @click="$refs.deletePacketDialog.show(item)"
                 :disabled="!item.deletable">
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      </template>
    </DataTable>
    <v-divider class="mb-3"/>
    <div>
      <v-btn outlined color="success" @click="showAddPacketDialog">
        <v-icon left>mdi-plus</v-icon>
        <span>{{ $t('_packet.labels.add') }}</span>
      </v-btn>
    </div>
    <DialogForm
      ref="addPacketDialog"
      :form-schema="packetSchema"
      icon="mdi-gift-open"
      :submitText="$t('add')"
      @submit="addPacket"
      :max-width="600"
      :title="$t('_packet.labels.add')">
      <template v-slot:custom-editor="context">
        <EditorForForm v-bind="context"/>
      </template>
    </DialogForm>
    <DialogForm
      ref="editPacketDialog"
      :form-schema="packetSchema"
      icon="mdi-gift-open"
      :submitText="$t('edit')"
      @submit="editPacket"
      :max-width="600"
      :title="$t('_packet.labels.edit')">
      <template v-slot:custom-editor="context">
        <EditorForForm v-bind="context"/>
      </template>
    </DialogForm>
    <DeleteConfirmationDialog
      :countdown="true"
      :text="$t('_packet.messages.deleteWarning')"
      ref="deletePacketDialog"
      @submit="deletePacket"/>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import DialogForm from '@/components/DialogForm.vue';
import PacketForm from '@/forms/PacketForm';
import DataTable from '@/components/DataTable.vue';
import EditorForForm from '@/components/EditorForForm.vue';
import ShopService from '@/services/ShopService';
import SettingTitle from './SettingTitle.vue';
import openapi from '../../api/openapi';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog.vue';

export default {
  name: 'Packets',
  components: {
    EditorForForm,
    DeleteConfirmationDialog,
    SettingTitle,
    DataTable,
    DialogForm,
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
      packets: null,
      packetSchema: PacketForm,
      categories: [],
      currentCategory: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async queryPackets() {
      const api = await openapi;
      const params = (this.currentCategory != null
        ? { category_id: this.currentCategory.id } : null);

      api.packet_getPackets(params).then((rsp) => {
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
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async fetchData() {
      const api = await openapi;

      api.packet_getCategories().then((rsp) => {
        this.categories = rsp.data;
        this.queryPackets();
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async showAddPacketDialog() {
      this.$refs.addPacketDialog.show();

      ShopService.getConfig().then((cfg) => {
        this.$refs.addPacketDialog.setData({ currency_code: cfg.default_currency });
      });
    },
    async addPacket(data) {
      const api = await openapi;

      let packet = null;
      if (!data) {
        packet = this.$refs.addPacketDialog.getData();
        packet.enabled = true;
        packet.buyable = true;
      } else {
        packet = data;
      }

      packet = this.prepareDataForSending(packet);

      api.packet_addPacket(null, packet).then(() => {
        this.fetchData();
        this.$refs.addPacketDialog.closeAndReset();
        this.$notify({
          title: this.$t('_packet.messages.addSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        this.$refs.addPacketDialog.setError(err);
      });
    },
    async copyPacket(packet) {
      const data = { ...packet };
      data.enabled = false;
      data.buyable = false;
      data.currency_code = data.currency.code;
      await this.addPacket(data);
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
        this.fetchData();
        this.$refs.editPacketDialog.closeAndReset();
        this.$notify({
          title: this.$t('_packet.messages.editSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        this.$refs.editPacketDialog.setError(err);
      });
    },
    prepareDataForSending(data) {
      const new_data = data;

      new_data.category_id = data.category.id;
      new_data.payment_gateway_ids = data.payment_gateways.map((gw) => gw.id);
      new_data.reward_ids = data.rewards.map((reward) => reward.id);
      delete new_data.category;
      delete new_data.payment_gateways;
      delete new_data.rewards;

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
        this.fetchData();
        this.$refs.deletePacketDialog.closeAndReset();
        this.$notify({
          title: this.$t('_packet.messages.deleteSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        this.$refs.deletePacketDialog.setError(err);
      });
    },
    async saveOrder() {
      const api = await openapi;
      const order = this.packets.map((p) => p.id);

      console.log(this.packets);

      await api.packet_updateOrder(null, order);
    },
  },
  mounted() {
    const table = document.querySelector('#packets-table tbody');
    Sortable.create(table, {
      onEnd: ({ newIndex, oldIndex }) => {
        if (this.currentCategory == null) {
          this.$notify({
            type: 'warning',
            title: this.$t('_packet.messages.sortOnlyWithCategory'),
          });
          return;
        }

        const rowSelected = this.packets.splice(oldIndex, 1)[0];
        this.packets.splice(newIndex, 0, rowSelected);

        this.saveOrder();
      },
    });
  },
  watch: {
    currentCategory() {
      this.queryPackets();
    },
  },
};
</script>

<style>
  #packets-table tr {
    cursor: move  !important;
  }
</style>
