<template>
  <div>
    <SettingTitle>{{ $t('paymentGateways') }}</SettingTitle>

    <DataTable
      :headers="headers"
      :items="gateways">
      <template v-slot:footer-right>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn outlined color="success"
                   v-bind="attrs"
                   v-on="on">
              <v-icon left>mdi-plus</v-icon>
              <span>{{ $t('_gateway.labels.create') }}</span>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              v-for="(typeData, typeName) in gatewayTypes"
              :key="typeName"
              @click="showCreateDialog(typeName)"
            >
              <v-list-item-icon><v-icon>{{ typeData.icon }}</v-icon></v-list-item-icon>
              <v-list-item-title>{{ typeData.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:item.enabled="{ item }">
        <BoolIcon :value="item.enabled"></BoolIcon>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="text-right">
          <v-btn outlined color="primary" small @click="showEditDialog(item)" class="mr-1">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn outlined color="error" small @click="$refs.deleteGatewayDialog.show(item)"
                 :disabled="!item.deletable">
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      </template>
    </DataTable>
    <DialogForm
      ref="createGatewayDialog"
      :form-schema="gatewaySchema"
      titleIcon="mdi-currency-usd"
      :submitText="$t('create')"
      @submit="createGateway"
      :title="$t('_gateway.labels.create')"/>
    <DialogForm
      ref="editGatewayDialog"
      :form-schema="gatewaySchema"
      titleIcon="mdi-currency-usd"
      :submitText="$t('edit')"
      @submit="editGateway"
      :title="$t('_gateway.labels.edit')">
      <template slot="enabled-after">
        <div class="text-center font-weight-bold">
          {{ $t('_gateway.messages.formAttributeChangeExplanation') }}
        </div>
      </template>
    </DialogForm>
    <DeleteConfirmationDialog
      ref="deleteGatewayDialog"
      @submit="deleteGateway"/>
  </div>
</template>

<script>
import SettingTitle from './SettingTitle.vue';
import DataTable from '../DataTable.vue';
import openapi from '../../api/openapi';
import DialogForm from '../DialogForm.vue';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog.vue';
import GatewayForm from '../../forms/PaymentGatewayForm';
import BoolIcon from '../BoolIcon.vue';

export default {
  name: 'ShopGateways',
  components: {
    BoolIcon,
    DeleteConfirmationDialog,
    DialogForm,
    DataTable,
    SettingTitle,
  },
  data() {
    return {
      headers: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('type'), value: 'type' },
        { text: this.$t('enabled'), value: 'enabled' },
        {
          text: this.$t('actions'), value: 'actions', width: '200px', sortable: false, align: 'right',
        },
      ],
      gateways: null,
      gatewayType: null,
      gatewayTypes: {
        PAYPAL: {
          label: this.$t('_gateway.labels.paypal'),
          icon: 'mdi-credit-card-outline',
        },
        CREDITS: {
          label: this.$t('_shop.labels.credits'),
          icon: 'mdi-circle-multiple',
        },
      },
      noAttributeKeys: ['name', 'type', 'enabled'],
    };
  },
  beforeMount() {
    this.queryData();
  },
  methods: {
    async queryData() {
      const api = await openapi;

      api.shop_getGateways().then((rsp) => {
        this.gateways = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async createGateway() {
      const data = this.$refs.createGatewayDialog.getData();
      const processedData = this.processData(data);
      const { noAttributes, attributes } = processedData;

      const api = await openapi;

      api.shop_createGateway(null, { ...noAttributes, attributes }).then(() => {
        this.queryData();
        this.$notify({
          title: this.$t('_gateway.messages.createSuccess'),
          type: 'success',
        });
        this.$refs.createGatewayDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.createGatewayDialog.setErrorMessage(err.response.data);
      });
    },
    async editGateway(gateway) {
      const data = this.$refs.editGatewayDialog.getData();
      const processedData = this.processData(data);
      const { noAttributes, attributes } = processedData;

      const api = await openapi;

      api.shop_editGateway({ uuid: gateway.id }, { ...noAttributes, attributes }).then(() => {
        this.queryData();
        this.$notify({
          title: this.$t('_gateway.messages.editSuccess'),
          type: 'success',
        });
        this.$refs.editGatewayDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.editGatewayDialog.setErrorMessage(err.response.data);
      });
    },
    async deleteGateway(gateway) {
      const api = await openapi;

      api.shop_deleteGateway({ uuid: gateway.id }).then(() => {
        this.queryData();
        this.$notify({
          title: this.$t('_gateway.messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteGatewayDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.deleteGatewayDialog.setErrorMessage(err.response.data);
      });
    },
    showEditDialog(gateway) {
      this.gatewayType = gateway.type;

      const data = { ...gateway };

      this.$refs.editGatewayDialog.setData(data);
      this.$refs.editGatewayDialog.show(gateway);
    },
    showCreateDialog(gatewayType) {
      this.gatewayType = gatewayType;

      this.$refs.createGatewayDialog.show();
    },
    processData(data) {
      const noAttributes = Object.fromEntries(Object.entries(data)
        .filter(([key, value]) => this.noAttributeKeys.includes(key)));

      const attributes = Object.fromEntries(Object.entries(data)
        .filter(([key, value]) => !this.noAttributeKeys.includes(key) && data[key] != null));

      return { noAttributes, attributes };
    },
  },
  computed: {
    gatewaySchema() {
      return GatewayForm(this.gatewayType);
    },
  },
};
</script>

<style scoped>

</style>
