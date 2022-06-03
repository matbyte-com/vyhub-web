<template>
<div v-if="account" class="mt-3">
  <span class="text-h5">
    {{ account.balance }}
  <v-icon right>mdi-circle-multiple</v-icon>
  </span>
  <DataTable :headers="headers"
             :items="account.transactions"
             :totalItems="account.transactions ? account.transactions.length : 0"
             default-sort-by="date"
             :default-sort-desc="true">
    <template v-slot:item.creator="{ item }">
      <UserLink v-if="item.creator" :user="item.creator"></UserLink>
    </template>
    <template v-slot:item.date="{ item }">
      <span>{{ new Date(item.date).toLocaleString() }}</span>
    </template>
    <template v-slot:footer-right v-if="$checkProp('warning_edit')">
      <v-btn outlined color="success" @click="$refs.addCreditDialog.show()">
        <v-icon left>mdi-plus</v-icon>
        <span>{{ $t("add") }}</span>
      </v-btn>
    </template>
  </DataTable>
  <DialogForm />
</div>
</template>

<script>
import openapi from '@/api/openapi';
import DataTable from '@/components/DataTable.vue';
import UserLink from '@/components/UserLink.vue';
import DialogForm from '@/components/DialogForm.vue';

export default {
  name: 'CreditHistory',
  components: {DialogForm, DataTable, UserLink },
  beforeMount() {
    this.fetchData();
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
    };
  },
  methods: {
    async fetchData() {
      if (!this.$store.getters.user) return;
      const id = this.$store.getters.user.credit_account_id;
      (await openapi).finance_getAccount(id).then((rsp) => {
        this.account = rsp.data;
      });
    },
  },
};
</script>

<style scoped>

</style>
