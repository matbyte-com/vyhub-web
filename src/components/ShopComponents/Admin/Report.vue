<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <GenForm :form-schema="financeReportForm" ref="reportForm" @submit="downloadCSV"
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
      const end = new Date((new Date(data.end)).setHours(0, 0)).toISOString();

      (await openapi).shop_getReportCsv({ start, end }).then((rsp) => {
        this.utils.showFile(rsp.data, `vyhub_${data.start}_${data.end}.csv`, 'text/csv');
      });
    },
  },
};
</script>

<style scoped>

</style>
