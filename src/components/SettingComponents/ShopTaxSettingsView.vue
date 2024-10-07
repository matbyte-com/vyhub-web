<template>
  <div>
    <SettingTitle doc-path="/guide/shop/tax">
      {{ $t('_shop.labels.taxRules') }}
    </SettingTitle>

    <DataTable
      :headers="headers"
      :items="taxRules"
      :sort-by="['country']"
      :show-search="true"
    >
      <template #footer-right>
        <v-btn
          variant="outlined"
          color="success"
          @click="$refs.createTaxRuleDialog.show()"
        >
          <v-icon start>
            mdi-plus
          </v-icon>
          <span>{{ $t('_taxRule.labels.create') }}</span>
        </v-btn>
      </template>
      <template #item.country="{ item }">
        <div v-if="item.country != null">
          <v-chip>
            {{ countryUnicodeFlags(item.country.code) }}
            {{ item.country.name }}
          </v-chip>
        </div>
        <div v-else>
          <v-chip color="primary">
            <v-icon start>
              mdi-earth
            </v-icon>
            {{ $t('all') }}
          </v-chip>
        </div>
      </template>
      <template #item.percentage="{ item }">
        {{ item.percentage }}%
      </template>
      <template #item.actions="{ item }">
        <div class="text-right">
          <v-btn
            variant="outlined"
            color="error"
            size="small"
            @click="$refs.deleteTaxRuleDialog.show(item)"
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      </template>
    </DataTable>
    <DialogForm
      ref="createTaxRuleDialog"
      :form-schema="taxRuleSchema"
      icon="mdi-credit-card-plus"
      :submit-text="$t('create')"
      :title="$t('_taxRule.labels.create')"
      @submit="createTaxRule"
    />
    <DeleteConfirmationDialog
      ref="deleteTaxRuleDialog"
      @submit="deleteTaxRule"
    />
  </div>
</template>

<script>
import countryUnicodeFlags from 'country-flag-icons/unicode';
import SettingTitle from './SettingTitle.vue';
import DataTable from '../DataTable.vue';
import openapi from '../../api/openapi';
import DialogForm from '../DialogForm.vue';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog.vue';
import TaxRuleForm from '../../forms/TaxRuleForm';

export default {
  name: 'ShopTax',
  components: {
    DeleteConfirmationDialog, DialogForm, DataTable, SettingTitle,
  },
  data() {
    return {
      headers: [
        { text: this.$t('country'), value: 'country' },
        { text: this.$t('percentage'), value: 'percentage' },
        { text: this.$t('info'), value: 'info' },
        {
          text: this.$t('actions'), value: 'actions', width: '100px', sortable: false, align: 'end',
        },
      ],
      taxRules: null,
      taxRuleSchema: TaxRuleForm,
      countryUnicodeFlags,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const api = await openapi;

      api.shop_getTaxRules().then((rsp) => {
        this.taxRules = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async createTaxRule() {
      const data = this.$refs.createTaxRuleDialog.getData();

      const api = await openapi;

      api.shop_createTaxRule(null, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.createSuccess'),
          type: 'success',
        });
        this.$refs.createTaxRuleDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.createTaxRuleDialog.setError(err);
      });
    },
    async deleteTaxRule(taxRule) {
      const api = await openapi;

      api.shop_deleteTaxRule({ uuid: taxRule.id }).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteTaxRuleDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.deleteTaxRuleDialog.setError(err);
      });
    },
  },
};
</script>

<style scoped>

</style>
