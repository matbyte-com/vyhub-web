<template>
  <div>
    <SettingTitle doc-path="/guide/shop/packet">
      {{ $t('packets') }}
    </SettingTitle>
    <!-- TODO Make it more clear that table can be sorted -->
    <DataTable
      id="packets-table"
      :headers="headers"
      :items="packets"
      :disable-sort="currentCategory != null"
      :disable-pagination="currentCategory != null"
      :hide-default-footer="currentCategory != null"
      :sort-by="(currentCategory != null ? null : ['category.name'])"
      :show-search="true"
    >
      <template #header>
        <v-col
          cols="12"
          xl="9"
          class="pa-0 ma-0"
        >
          <v-select
            v-model="currentCategory"
            variant="outlined"
            hide-details
            density="compact"
            class="animate__animated"
            :class="{animate__headShake:selectWobble === true}"
            return-object
            :label="$t('category')"
            clearable
            :items="categories"
            item-value="id"
            item-title="name"
          />
        </v-col>
      </template>
      <template #item.flags="{ item }">
        <div v-if="item.flags.length === 0">
          -
        </div>
        <v-chip
          v-for="flag in item.flags"
          :key="flag.text"
          :color="flag.color + ' lighten-1'"
          size="small"
          class="mr-1"
        >
          {{ flag.text }}
        </v-chip>
      </template>
      <template #item.actions="{ item }">
        <div class="text-right">
          <v-btn
            variant="text"
            icon="mdi-content-copy"
            color="secondary"
            size="small"
            class="mr-1"
            @click="copyPacket(item)"
          />
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
            :disabled="!item.deletable"
            @click="$refs.deletePacketDialog.show(item)"
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      </template>
      <template #footer-right>
        <v-btn
          variant="outlined"
          color="success"
          :class="{ 'glow-effect':utils.customerJourneyActive('add-packet') }"
          @click="showAddPacketDialog"
        >
          <v-icon start>
            mdi-plus
          </v-icon>
          <span>{{ $t('_packet.labels.add') }}</span>
        </v-btn>
      </template>
    </DataTable>
    <DialogForm
      ref="addPacketDialog"
      :form-schema="packetSchema"
      icon="mdi-gift-open"
      :submit-text="$t('add')"
      :max-width="600"
      :title="$t('_packet.labels.add')"
      @submit="addPacket"
    >
      <template #custom-editor="{ node, statefulLayout }">
        <EditorForForm
          :value="node.data"
          @update="event => statefulLayout.input(node, event.target.value)"
        />
      </template>
    </DialogForm>
    <DialogForm
      ref="editPacketDialog"
      :form-schema="packetSchema"
      icon="mdi-gift-open"
      :submit-text="$t('edit')"
      :max-width="600"
      :title="$t('_packet.labels.edit')"
      @submit="editPacket"
    >
      <template #custom-editor="context">
        <EditorForForm v-bind="context" />
      </template>
    </DialogForm>
    <DeleteConfirmationDialog
      ref="deletePacketDialog"
      :countdown="true"
      :text="$t('_packet.messages.deleteWarning')"
      @submit="deletePacket"
    />
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import PacketForm from '@/forms/PacketForm';
import ShopService from '@/services/ShopService';
import EventBus from '@/services/EventBus';
import openapi from '../../api/openapi';

export default {
  data() {
    return {
      headers: [
        { title: this.$t('title'), key: 'title' },
        { title: this.$t('category'), key: 'category.name' },
        { title: this.$t('flags'), key: 'flags' },
        {
          title: this.$t('actions'), key: 'actions', width: '200px', sortable: false, align: 'end',
        },
      ],
      packets: null,
      packetSchema: PacketForm.form(),
      categories: [],
      currentCategory: null,
      selectWobble: false,
    };
  },
  watch: {
    currentCategory() {
      this.queryPackets();
    },
  },
  beforeMount() {
    this.fetchData();
  },
  mounted() {
    const table = document.querySelector('#packets-table tbody');
    Sortable.create(table, {
      onEnd: ({ newIndex, oldIndex }) => {
        if (this.currentCategory == null) {
          this.selectWobble = true;
          setTimeout(() => {
            this.selectWobble = false;
          }, 500);
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
      } else {
        packet = data;
      }

      packet = this.prepareDataForSending(packet);

      api.packet_addPacket(null, packet).then(() => {
        this.fetchData();
        this.$refs.addPacketDialog.closeAndReset();
        this.$notify({
          title: this.$t('_messages.createSuccess'),
          type: 'success',
        });
        // Event caught in CustomerJourney.vue
        EventBus.emit('customerJourneyUpdate');
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

      if (data.abstract == null) {
        data.abstract = [];
      }

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
          title: this.$t('_messages.editSuccess'),
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
      if (data.payment_gateways) {
        new_data.payment_gateway_ids = data.payment_gateways.map((gw) => gw.id);
      }
      new_data.reward_ids = data.rewards.map((reward) => reward.id);
      delete new_data.category;
      delete new_data.payment_gateways;
      delete new_data.rewards;

      if (data.relations) {
        new_data.relations = data.relations.map((rel) => {
          const newRel = rel;
          newRel.packet_right_id = rel.packet_right.id;
          delete newRel.packet_left;
          delete newRel.packet_right;
          return newRel;
        });
      }

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
          title: this.$t('_messages.deleteSuccess'),
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
};
</script>

<style>
  #packets-table tr {
    cursor: move  !important;
  }
</style>
