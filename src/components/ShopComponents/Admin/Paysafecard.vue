<template>
  <div>
    Debits to approve
    <PaginatedDataTable ref="debitTable" :headers="headers"
                        :items="debits"
                        :totalItems="totalItems"
                        default-sort-by="date"
                        :default-sort-desc="true"
                        @reload="fetchData">
    </PaginatedDataTable>
  </div>
</template>

<script>
import PaginatedDataTable from '@/components/PaginatedDataTable.vue';
import openapi from '@/api/openapi';

export default {
  name: 'Paysafecard',
  components: { PaginatedDataTable },
  data() {
    return {
      totalItems: 0,
      debits: null,
      headers: [
        { text: this.$t('amount_total'), value: 'amount_total', sortable: false },
        { text: this.$t('date'), value: 'date' },
        {
          text: this.$t('actions'), value: 'actions', align: 'right', sortable: false,
        },
      ],
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData(queryParams = null) {
      (await openapi).shop_getDebits({
        ...(queryParams != null ? queryParams : this.$refs.debitTable.getQueryParameters()),
      })
        .then((rsp) => {
          this.debits = rsp.data.items;
          this.totalItems = rsp.data.total;
        });
    },
  },
};
</script>

<style scoped>

</style>
