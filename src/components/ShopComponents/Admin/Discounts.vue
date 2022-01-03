<template>
  <div>
    <DataTable
      :headers="headers"
      :items="discounts"
      showSearch="true">
      <template v-slot:footer-right>
        <v-btn outlined color="success" @click="$refs.createDiscountDialog.show()">
          <v-icon left>mdi-plus</v-icon>
          <span>{{ $t('_discount.labels.create') }}</span>
        </v-btn>
      </template>
      <template v-slot:item.enabled="{ item }">
        <BoolIcon :value="item.enabled"></BoolIcon>
      </template>
      <template v-slot:item.all_packets="{ item }">
        <v-chip v-if="item.all_packets" color="green">{{ $t('all') }}</v-chip>
        <v-chip v-else v-for="packet in item.packets" :key="packet.id" class="mr-1">
          {{ packet.title }}
        </v-chip>
        <v-chip v-if="!item.all_packets && item.packets.length === 0" color="red">
          {{ $t('none') }}
        </v-chip>
      </template>
      <template v-slot:item.begin="{ item }">
        {{ new Date(item.begin).toLocaleString() }}
      </template>
      <template v-slot:item.end="{ item }">
        <div v-if="item.end != null">{{ new Date(item.end).toLocaleString() }}</div>
        <div v-else>∞</div>
      </template>
      <template v-slot:item.percentage="{ item }">
        {{ item.percentage }}%
      </template>
      <template v-slot:item.code="{ item }">
        <div v-if="item.code == null">
          <v-chip color="info"><v-icon left>mdi-reload</v-icon>{{ $t('automatic') }}</v-chip>
        </div>
        <div v-else>{{ item.code }}</div>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="text-right">
          <v-btn outlined color="primary" small @click="showEditDialog(item)" class="mr-1">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn outlined color="error" small @click="$refs.deleteDiscountDialog.show(item)">
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      </template>
    </DataTable>
    <DialogForm
      ref="createDiscountDialog"
      :form-schema="discountSchema"
      icon="mdi-ticket-percent"
      :submitText="$t('create')"
      @submit="createDiscount"
      :title="$t('_discount.labels.create')"/>
    <DialogForm
      ref="editDiscountDialog"
      :form-schema="discountSchema"
      icon="mdi-ticket-percent"
      :submitText="$t('edit')"
      @submit="editDiscount"
      :title="$t('_discount.labels.edit')"/>
    <DeleteConfirmationDialog
      ref="deleteDiscountDialog"
      @submit="deleteDiscount"/>
  </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import DialogForm from '@/components/DialogForm.vue';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import BoolIcon from '@/components/BoolIcon.vue';
import DiscountForm from '@//forms/DiscountForm';
import openapi from '../../../api/openapi';

export default {
  name: 'Discounts',
  components: {
    BoolIcon,
    DeleteConfirmationDialog,
    DialogForm,
    DataTable,
  },
  data() {
    return {
      headers: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('code'), value: 'code' },
        { text: this.$t('packets'), value: 'all_packets' },
        { text: this.$t('begin'), value: 'begin' },
        { text: this.$t('end'), value: 'end' },
        { text: this.$t('enabled'), value: 'enabled' },
        { text: this.$t('percentage'), value: 'percentage' },
        { text: this.$t('maxUsages'), value: 'max_usages' },
        {
          text: this.$t('actions'), value: 'actions', width: '200px', sortable: false, align: 'right',
        },
      ],
      discounts: null,
      discountSchema: DiscountForm,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const api = await openapi;

      api.shop_getDiscounts().then((rsp) => {
        this.discounts = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async createDiscount() {
      const data = this.$refs.createDiscountDialog.getData();

      data.packet_ids = data.packets.map((packet) => packet.id);
      data.requirement_set_id = (data.requirement_set != null ? data.requirement_set.id : null);
      delete data.packets;
      delete data.requirement_set;

      const api = await openapi;

      api.shop_createDiscount(null, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_discount.messages.createSuccess'),
          type: 'success',
        });
        this.$refs.createDiscountDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.createDiscountDialog.setErrorMessage(err.response.data);
      });
    },
    async editDiscount(discount) {
      const data = this.$refs.editDiscountDialog.getData();

      data.packet_ids = data.packets.map((packet) => packet.id);
      data.requirement_set_id = (data.requirement_set != null ? data.requirement_set.id : null);
      delete data.packets;
      delete data.requirement_set;

      const api = await openapi;

      api.shop_editDiscount({ uuid: discount.id }, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_discount.messages.editSuccess'),
          type: 'success',
        });
        this.$refs.editDiscountDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.editDiscountDialog.setErrorMessage(err.response.data);
      });
    },
    async deleteDiscount(discount) {
      const api = await openapi;

      api.shop_deleteDiscount({ uuid: discount.id }).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_discount.messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteDiscountDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.deleteDiscountDialog.setErrorMessage(err.response.data);
      });
    },
    showEditDialog(discount) {
      const data = { ...discount };

      this.$refs.editDiscountDialog.setData(data);
      this.$refs.editDiscountDialog.show(discount);
    },
  },
};
</script>

<style scoped>

</style>
