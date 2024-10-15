<template>
  <div>
    <DataTable
      :headers="headers"
      :items="discounts"
      :show-search="true"
    >
      <template #footer-right>
        <v-btn
          variant="outlined"
          color="success"
          @click="$refs.createDiscountDialog.show()"
        >
          <v-icon start>
            mdi-plus
          </v-icon>
          <span>{{ $t('_discount.labels.create') }}</span>
        </v-btn>
      </template>
      <template #item.enabled="{ item }">
        <BoolIcon :value="item.enabled" />
      </template>
      <template #item.all_packets="{ item }">
        <v-chip
          v-if="item.all_packets"
          color="green"
        >
          {{ $t('all') }}
        </v-chip>
        <v-chip
          v-for="packet in item.packets"
          v-else
          :key="packet.id"
          class="mr-1"
        >
          {{ packet.title }}
        </v-chip>
        <v-chip
          v-if="!item.all_packets && item.packets.length === 0"
          color="red"
        >
          {{ $t('none') }}
        </v-chip>
      </template>
      <template #item.begin="{ item }">
        {{ new Date(item.begin).toLocaleString() }}
      </template>
      <template #item.end="{ item }">
        <div v-if="item.end != null">
          {{ new Date(item.end).toLocaleString() }}
        </div>
        <div v-else>
          ∞
        </div>
      </template>
      <template #item.percentage="{ item }">
        {{ item.percentage }}%
      </template>
      <template #item.code="{ item }">
        <div v-if="item.code == null">
          <v-chip color="info">
            <v-icon start>
              mdi-reload
            </v-icon>{{ $t('automatic') }}
          </v-chip>
        </div>
        <div v-else>
          {{ item.code }}
        </div>
      </template>
      <template #item.max_usages="{ item }">
        <span class="d-flex align-center">
          <v-chip
            size="small"
            class="mr-2"
            color="primary"
          >
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
          <v-chip
            v-if="item.max_usages_per_user"
            color="info"
            size="small"
          >
            {{ item.max_usages_per_user }} /
            <v-icon size="small">
              mdi-account
            </v-icon>
          </v-chip>
        </span>
      </template>
      <template #item.actions="{ item }">
        <div class="text-right">
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
            @click="$refs.deleteDiscountDialog.show(item)"
          >
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
      :submit-text="$t('create')"
      :title="$t('_discount.labels.create')"
      @submit="createDiscount"
    >
      <!-- TODO This button is probably not there in the slot -->
      <template #code-after>
        <v-btn
          class="mb-4 higher"
          style="border-top-right-radius: 0; border-bottom-right-radius: 0;"
          variant="outlined"
          size="small"
          color="secondary"
          @click="generateCode(true)"
        >
          <v-icon start>
            mdi-code-greater-than
          </v-icon>
          <span>{{ $t('generate') }}</span>
        </v-btn>
        <v-btn
          class="mb-4 higher"
          style="border-bottom-left-radius: 0; border-top-left-radius: 0;"
          :disabled="!hasNameAndPercentage"
          variant="outlined"
          size="small"
          color="secondary"
          @click="generateCode(false)"
        >
          <v-icon>mdi-code-greater-than-or-equal</v-icon>
        </v-btn>
      </template>
    </DialogForm>
    <DialogForm
      ref="editDiscountDialog"
      :form-schema="discountSchema"
      icon="mdi-ticket-percent"
      :submit-text="$t('edit')"
      :title="$t('_discount.labels.edit')"
      @submit="editDiscount"
    >
      <template #code-after>
        <v-btn
          class="mb-4 higher"
          style="border-top-right-radius: 0; border-bottom-right-radius: 0;"
          variant="outlined"
          size="small"
          color="secondary"
          @click="generateCode(true)"
        >
          <v-icon start>
            mdi-code-greater-than
          </v-icon>
          <span>{{ $t('generate') }}</span>
        </v-btn>
        <v-btn
          class="mb-4 higher"
          style="border-bottom-left-radius: 0; border-top-left-radius: 0;"
          :disabled="!hasNameAndPercentage"
          variant="outlined"
          size="small"
          color="secondary"
          @click="generateCode(false)"
        >
          <v-icon>mdi-code-greater-than-or-equal</v-icon>
        </v-btn>
      </template>
    </DialogForm>
    <DeleteConfirmationDialog
      ref="deleteDiscountDialog"
      @submit="deleteDiscount"
    />
  </div>
</template>

<script>
import DiscountForm from '@//forms/DiscountForm';
import openapi from '../../../api/openapi';

export default {
  data() {
    return {
      headers: [
        { title: this.$t('name'), key: 'name' },
        { title: this.$t('code'), key: 'code' },
        { title: this.$t('packets'), key: 'all_packets' },
        { title: this.$t('begin'), key: 'begin' },
        { title: this.$t('end'), key: 'end' },
        { title: this.$t('enabled'), key: 'enabled' },
        { title: this.$t('percentage'), key: 'percentage' },
        { title: this.$t('maxUsages'), key: 'max_usages' },
        {
          title: this.$t('actions'), key: 'actions', width: '200px', sortable: false, align: 'end',
        },
      ],
      discounts: null,
      discountSchema: DiscountForm,
    };
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
  mounted() {
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
};
</script>

<style scoped>
.higher {
  margin-top: -0.75rem;
}
</style>
