<template>
  <div>
    <PageTitle icon="mdi-account-alert">{{ $t('_warning.title') }}</PageTitle>
    <v-card>
      <v-card-text>
        <DataTable :headers="headers"
                   :items="warnings">
        </DataTable>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import DataTable from '@/components/DataTable.vue';
import openapi from '@/api/openapi';

export default {
  name: 'Warning.vue',
  components: { DataTable, PageTitle },
  data() {
    return {
      warnings: [],
      headers: [
        { text: this.$t('user'), value: 'user' },
        { text: this.$t('reason'), value: 'reason' },
        { text: this.$t('bundle'), value: 'serverbundle.name' },
        { text: this.$t('createdOn'), value: 'created_on' },
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
    async fetchData() {
      (await openapi).warning_getWarnings().then((rsp) => {
        this.warnings = rsp.data;
      });
    },
  },
};
</script>

<style scoped>

</style>
