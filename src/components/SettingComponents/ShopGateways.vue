<template>
  <div>
    <SettingTitle docPath="/guide/shop/payment_gateway">
      {{ $t('paymentGateways') }}
    </SettingTitle>

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
      icon="mdi-currency-usd"
      :submitText="$t('create')"
      @submit="createGateway"
      :title="$t('_gateway.labels.create')"/>
    <DialogForm
      ref="editGatewayDialog"
      :form-schema="gatewaySchema"
      icon="mdi-currency-usd"
      :submitText="$t('edit')"
      @submit="editGateway"
      :title="$t('_gateway.labels.edit')">
      <template slot="attributes-before">
        <div class="text-center font-weight-bold">
          {{ $t('_gateway.messages.formAttributeChangeExplanation') }}
        </div>
      </template>
      <template slot="attributes-after"
                v-if="selectedGateway != null &&
                 ['STRIPE', 'PAYPAL'].includes(selectedGateway.type)">
        <v-text-field
          @focus="$event.target.select()"
          :value="getWebhookUrl(selectedGateway)"
          :label="$t('_gateway.labels.webhookURL')"
          readonly
        ></v-text-field>
      </template>
    </DialogForm>
    <DeleteConfirmationDialog
      ref="deleteGatewayDialog"
      :text="$t('_gateway.messages.deleteWarning')"
      :countdown="true"
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
import Common from '@/forms/Common';

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
        STRIPE: {
          label: this.$t('_gateway.labels.stripe'),
          icon: 'mdi-credit-card-outline',
        },
        CREDITS: {
          label: this.$t('_shop.labels.credits'),
          icon: 'mdi-circle-multiple',
        },
        PAYSAFECARD: {
          label: this.$t('_gateway.labels.paysafecard'),
          icon: 'mdi-lock',
        },
        COUPON: {
          label: this.$t('_gateway.labels.coupon'),
          icon: 'mdi-lock-reset',
        },
      },
      noAttributeKeys: ['name', 'subtitle', 'type', 'enabled'],
      selectedGateway: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
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

      const api = await openapi;

      api.shop_createGateway(null, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_gateway.messages.createSuccess'),
          type: 'success',
        });
        this.$refs.createGatewayDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.createGatewayDialog.setError(err);
      });
    },
    async editGateway(gateway) {
      const data = this.$refs.editGatewayDialog.getData();

      const api = await openapi;

      api.shop_editGateway({ uuid: gateway.id }, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_gateway.messages.editSuccess'),
          type: 'success',
        });
        this.$refs.editGatewayDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.editGatewayDialog.setError(err);
      });
    },
    async deleteGateway(gateway) {
      const api = await openapi;

      api.shop_deleteGateway({ uuid: gateway.id }).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_gateway.messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteGatewayDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.deleteGatewayDialog.setError(err);
      });
    },
    showEditDialog(gateway) {
      this.gatewayType = gateway.type;
      this.selectedGateway = gateway;

      const data = { ...gateway };

      this.$refs.editGatewayDialog.setData(data);
      this.$refs.editGatewayDialog.show(gateway);
    },
    showCreateDialog(gatewayType) {
      this.gatewayType = gatewayType;
      this.selectedGateway = null;

      this.$refs.createGatewayDialog.setData({
        type: gatewayType,
      });

      this.$refs.createGatewayDialog.show();
    },
    getWebhookUrl(gateway) {
      if (gateway == null) {
        return null;
      }

      return `${Common.apiURL}/webhook/${gateway.type.toLowerCase()}/${gateway.id}`;
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
