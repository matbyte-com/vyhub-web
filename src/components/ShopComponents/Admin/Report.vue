<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <h5 class="text-h5">{{ $t('_shop.labels.financeReport') }}</h5>
        <GenForm :form-schema="financeReportForm" ref="reportForm" @submit="downloadCSV"
                 :cancel-text="null" :submit-text="$t('download')">
        </GenForm>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <h5 class="text-h5">{{ $t('_shop.labels.downloadInvoices') }}</h5>
        <GenForm :form-schema="financeReportForm" ref="invoicesForm" @submit="downloadInvoices"
                 :cancel-text="null" :submit-text="$t('download')">
        </GenForm>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FinanceReportForm from '@/forms/FinanceReportForm';
import GenForm from '@/components/GenForm.vue';
import openapi from '@/api/openapi';

export default {
  components: { GenForm },
  data() {
    return {
      financeReportForm: FinanceReportForm,
    };
  },
  methods: {
    async downloadCSV() {
      const data = this.$refs.reportForm.getData();

      const start = new Date((new Date(data.start)).setHours(0, 0)).toISOString();
      const end = new Date((new Date(data.end)).setHours(23, 59)).toISOString();

      (await openapi).shop_getReportCsv({ start, end }).then((rsp) => {
        this.utils.showFile(rsp.data, `vyhub_${data.start}_${data.end}.csv`, 'text/csv');
      });
    },

    async downloadInvoices() {
      const data = this.$refs.invoicesForm.getData();

      const start = new Date((new Date(data.start)).setHours(0, 0)).toISOString();
      const end = new Date((new Date(data.end)).setHours(23, 59)).toISOString();

      (await openapi).shop_getDebitInvoices(
        { start, end },
        null,
        { responseType: 'blob' },
      ).then((rsp) => {
        this.utils.showFile(rsp.data, `vyhub-invoices_${data.start}_${data.end}.zip`,
          'application/zip');
      });
    },
  },
};
</script>

<style scoped>

</style>
