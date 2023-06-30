<template>
<div v-if="account" class="mt-3">
  <span class="text-h5">
    {{ account.balance }}
  <v-icon right>mdi-circle-multiple</v-icon>
  </span>
  <DataTable :headers="headers"
             :items="account.transactions"
             :totalItems="account.transactions ? account.transactions.length : 0"
             sort-by="date"
             :sort-desc="true"
             :item-class="transactionRowFormatter">
    <template v-slot:item.author="{ item }">
      <UserLink v-if="item.author" :user="item.author"></UserLink>
    </template>
    <template v-slot:item.date="{ item }">
      <span>{{ new Date(item.date).toLocaleString() }}</span>
    </template>
    <template v-slot:footer-right v-if="$checkProp('account_edit')">
      <v-btn outlined color="success" @click="$refs.transactionAddDialog.show()">
        <v-icon left>mdi-plus</v-icon>
        <span>{{ $t("add") }}</span>
      </v-btn>
    </template>
  </DataTable>
  <DialogForm ref="transactionAddDialog" icon="mdi-hand-coin"
              :title="$t('_creditHistory.addTransaction')"
              :form-schema="transactionAddSchema" @submit="addTransaction"/>
</div>
</template>

<script>
import openapi from '@/api/openapi';
import DataTable from '@/components/DataTable.vue';
import UserLink from '@/components/UserLink.vue';
import DialogForm from '@/components/DialogForm.vue';
import TransactionAddForm from '@/forms/TransactionAddForm';

export default {
  name: 'CreditHistory',
  components: { DialogForm, DataTable, UserLink },
  beforeMount() {
    this.fetchData();
  },
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
        { text: this.$t('date'), value: 'date' },
        { text: this.$t('amount'), value: 'amount' },
        { text: this.$t('author'), value: 'author' },
        { text: this.$t('description'), value: 'description' },
      ],
      transactionAddSchema: TransactionAddForm,
    };
  },
  methods: {
    async fetchData() {
      if (!this.$store.getters.user) return;
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
      const add = (this.$vuetify.theme.dark ? 'darken-4' : 'lighten-4');

      if (item.amount < 0) {
        return `orange ${add}`;
      }

      return '';
    },
  },
};
</script>

<style scoped>

</style>
