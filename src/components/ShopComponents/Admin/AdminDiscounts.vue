<template>
  <div>
    <DataTable
      :headers="headers"
      :items="discounts"
      :showSearch="true">
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
      <template v-slot:item.max_usages="{ item }">
        <span class="d-flex align-center">
          <v-chip small class="mr-2" color="primary">
            {{ item.usages }}
            /
            &nbsp;
            <span v-if="item.max_usages != null">
              {{ item.max_usages }}
            </span>
            <span v-else>
              ∞
            </span>
          </v-chip>
          <v-chip v-if="item.max_usages_per_user" color="info" small>
            {{ item.max_usages_per_user }} /
            <v-icon small>
              mdi-account
            </v-icon>
          </v-chip>
        </span>
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
      :title="$t('_discount.labels.create')">
      <template v-slot:code-after>
        <v-btn class="mb-4 higher"
               style="border-top-right-radius: 0; border-bottom-right-radius: 0;"
          outlined small color="secondary" @click="generateCode(true)">
          <v-icon left>mdi-code-greater-than</v-icon>
          <span>{{ $t('generate') }}</span>
        </v-btn>
        <v-btn class="mb-4 higher" style="border-bottom-left-radius: 0; border-top-left-radius: 0;"
               :disabled="!hasNameAndPercentage"
               outlined small color="secondary" @click="generateCode(false)">
          <v-icon>mdi-code-greater-than-or-equal</v-icon>
        </v-btn>
      </template>
    </DialogForm>
    <DialogForm
      ref="editDiscountDialog"
      :form-schema="discountSchema"
      icon="mdi-ticket-percent"
      :submitText="$t('edit')"
      @submit="editDiscount"
      :title="$t('_discount.labels.edit')">
      <template v-slot:code-after>
        <v-btn class="mb-4 higher"
               style="border-top-right-radius: 0; border-bottom-right-radius: 0;"
               outlined small color="secondary" @click="generateCode(true)">
          <v-icon left>mdi-code-greater-than</v-icon>
          <span>{{ $t('generate') }}</span>
        </v-btn>
        <v-btn class="mb-4 higher" style="border-bottom-left-radius: 0; border-top-left-radius: 0;"
               :disabled="!hasNameAndPercentage"
               outlined small color="secondary" @click="generateCode(false)">
          <v-icon>mdi-code-greater-than-or-equal</v-icon>
        </v-btn>
      </template>
    </DialogForm>
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
          title: this.$t('_messages.createSuccess'),
          type: 'success',
        });
        this.$refs.createDiscountDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.createDiscountDialog.setError(err);
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
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
        this.$refs.editDiscountDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.editDiscountDialog.setError(err);
      });
    },
    async deleteDiscount(discount) {
      const api = await openapi;

      api.shop_deleteDiscount({ uuid: discount.id }).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteDiscountDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.deleteDiscountDialog.setError(err);
      });
    },
    generateCode(random) {
      const data = this.$refs.createDiscountDialog.getData();
      let code = null;
      if (random) {
        code = Array.from({ length: 4 }, () => Math.random().toString(36).substring(2, 6)).join('-');
      } else {
        code = `${data.name}-${Math.random().toString(36).substring(2, 6)}-${data.percentage}`;
      }
      data.code = code;
      this.$refs.createDiscountDialog.setData(data);
    },
    showEditDialog(discount) {
      const data = { ...discount };

      this.$refs.editDiscountDialog.setData(data);
      this.$refs.editDiscountDialog.show(discount);
    },
  },
  computed: {
    hasNameAndPercentage() {
      const data = this.$refs.createDiscountDialog.getData();
      if (data.name && data.percentage) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.higher {
  margin-top: -0.75rem;
}
</style>
