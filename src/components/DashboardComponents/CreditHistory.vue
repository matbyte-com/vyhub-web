<template>
  <div
    v-if="account"
    class="mt-3"
  >
    <div class="d-flex align-center">
      <span class="text-h5">
        {{ account.balance }}
      </span>
      <v-icon
        size="large"
        end
      >
        mdi-circle-multiple
      </v-icon>
    </div>
    <DataTable
      :headers="headers"
      :items="account.transactions"
      :total-items="account.transactions ? account.transactions.length : 0"
      :sort-by="['date']"
      :sort-desc="[true]"
    >
      <template #item.color-status="{ item }">
        <v-sheet
          :color="transactionRowFormatter(item)"
          height="95%"
          width="10px"
          style="margin-left: -15px"
        />
      </template>
      <template #item.author="{ item }">
        <UserLink
          v-if="item.author"
          :user="item.author"
        />
      </template>
      <template #item.date="{ item }">
        <span>{{ new Date(item.date).toLocaleString() }}</span>
      </template>
      <template
        v-if="$checkProp('account_edit')"
        #footer-right
      >
        <v-btn
          variant="outlined"
          color="success"
          @click="$refs.transactionAddDialog.show()"
        >
          <v-icon start>
            mdi-plus
          </v-icon>
          <span>{{ $t("add") }}</span>
        </v-btn>
      </template>
    </DataTable>
    <DialogForm
      ref="transactionAddDialog"
      icon="mdi-hand-coin"
      :title="$t('_creditHistory.addTransaction')"
      :form-schema="transactionAddSchema"
      @submit="addTransaction"
    />
  </div>
  <div
    v-else
    style="min-height: 200px"
  >
    <v-skeleton-loader type="list-item@3" />
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import TransactionAddForm from '@/forms/TransactionAddForm';
import { useVyHubStore } from '@/store';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      account: null,
      headers: [
        { key: 'color-status', sortable: false, width: '1px' },
        { title: this.$t('date'), key: 'date' },
        { title: this.$t('amount'), key: 'amount' },
        { title: this.$t('author'), key: 'author' },
        { title: this.$t('description'), key: 'description' },
      ],
      transactionAddSchema: TransactionAddForm,
    };
  },
  computed: {
    store() {
      return useVyHubStore();
    },
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      if (!this.store.user) return;
      const id = this.user.credit_account_id;
      (await openapi).finance_getAccount(id).then((rsp) => {
        this.account = rsp.data;
      });
    },
    async addTransaction() {
      const data = this.$refs.transactionAddDialog.getData();
      (await openapi).finance_createCreditTransaction(this.account.id, data).then(() => {
        this.$refs.transactionAddDialog.closeAndReset();
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.transactionAddDialog.setError(err);
      });
    },
    transactionRowFormatter(item) {
      if (item.amount < 0) {
        return `orange`;
      } else {
        return 'green';
      }
    },
  },
};
</script>

<style scoped>

</style>
