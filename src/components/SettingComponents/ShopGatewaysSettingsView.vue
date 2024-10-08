<template>
  <div>
    <SettingTitle
      ref="title"
      doc-path="/guide/shop/payment_gateway"
    >
      {{ $t('paymentGateways') }}
    </SettingTitle>

    <DataTable
      :headers="headers"
      :items="gateways"
    >
      <template #footer-right>
        <v-menu location="bottom">
          <template #activator="{ props }">
            <v-btn
              variant="outlined"
              color="success"
              :class="{ 'glow-effect':utils.customerJourneyActive('add-pm-gateway') }"

              v-bind="props"
            >
              <v-icon start>
                mdi-plus
              </v-icon>
              <span>{{ $t('_gateway.labels.create') }}</span>
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item
              v-for="(typeData, typeName) in gatewayTypes"
              :key="typeName"
              @click="showCreateDialog(typeName)"
            >
              <v-list-item-title>
                <v-icon start>
                  {{ typeData.icon }}
                </v-icon>
                {{ typeData.label }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template #item.enabled="{ item }">
        <BoolIcon :value="item.enabled" />
      </template>
      <template #item.actions="{ item }">
        <div class="text-right">
          <v-btn
            variant="outlined"
            color="primary"
            size="small"
            class="mr-1"
            @click="showEditDialog(item)"
          >
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn
            variant="outlined"
            color="error"
            size="small"
            :disabled="!item.deletable"
            @click="$refs.deleteGatewayDialog.show(item)"
          >
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
      :submit-text="$t('create')"
      :title="$t('_gateway.labels.create')"
      @submit="createGateway"
    >
      <slot name="type-before">
        <v-alert
          v-if="$refs.title"
          type="info"
          class="mt-2"
        >
          <a
            :href="$refs.title.docLink"
            target="_blank"
          >
            {{ $t('followInstructionsInDocs') }}
          </a>
        </v-alert>
        <v-alert
          v-if="gatewayType === 'PAYPAL_LEGACY'"
          type="warning"
          class="mt-2 font-weight-bold"
        >
          {{ $t('_gateway.labels.paypalLegacyHint') }}
        </v-alert>
        <v-alert
          v-else-if="gatewayType === 'PAYPAL'"
          type="info"
          class="mt-2"
        >
          {{ $t('_gateway.labels.paypalHint') }}
        </v-alert>
      </slot>
    </DialogForm>
    <DialogForm
      ref="editGatewayDialog"
      :form-schema="gatewaySchema"
      icon="mdi-currency-usd"
      :submit-text="$t('edit')"
      :title="$t('_gateway.labels.edit')"
      @submit="editGateway"
    >
      <slot name="type-before">
        <v-alert
          v-if="gatewayType === 'PAYPAL_LEGACY'"
          type="warning"
          class="mt-2 font-weight-bold"
        >
          {{ $t('_gateway.labels.paypalLegacyHint') }}
        </v-alert>
        <v-alert
          v-else-if="gatewayType === 'PAYPAL'"
          type="info"
          class="mt-2"
        >
          {{ $t('_gateway.labels.paypalHint') }}
        </v-alert>
      </slot>
      <slot name="attributes-before">
        <div class="text-center font-weight-bold">
          {{ $t('_gateway.messages.attributeChangeExplanation') }}
        </div>
      </slot>
      <slot
        v-if="selectedGateway != null &&
          ['STRIPE', 'PAYPAL'].includes(selectedGateway.type)"
        name="attributes-after"
      >
        <v-text-field
          :model-value="getWebhookUrl(selectedGateway)"
          :label="$t('_gateway.labels.webhookURL')"
          readonly
          @focus="$event.target.select()"
        />
      </slot>
    </DialogForm>
    <DeleteConfirmationDialog
      ref="deleteGatewayDialog"
      :text="$t('_gateway.messages.deleteWarning')"
      :countdown="true"
      @submit="deleteGateway"
    />
  </div>
</template>

<script>
import Common from '@/forms/Common';
import EventBus from '@/services/EventBus';
import openapi from '../../api/openapi';
import GatewayForm from '../../forms/PaymentGatewayForm';

export default {
  data() {
    return {
      headers: [
        { title: this.$t('name'), key: 'name' },
        { title: this.$t('type'), key: 'type' },
        { title: this.$t('enabled'), key: 'enabled' },
        {
          title: this.$t('actions'), key: 'actions', width: '200px', sortable: false, align: 'end',
        },
      ],
      gateways: null,
      gatewayType: null,
      gatewayTypes: {
        PAYPAL: {
          label: this.$t('_gateway.labels.paypal'),
          icon: 'mdi-parking',
        },
        PAYPAL_LEGACY: {
          label: this.$t('_gateway.labels.paypalEasy'),
          icon: 'mdi-parking',
        },
        STRIPE: {
          label: this.$t('_gateway.labels.stripe'),
          icon: 'mdi-credit-card-outline',
        },
        CREDITS: {
          label: this.$store.getters.shopConfig.credits_display_title,
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
  computed: {
    gatewaySchema() {
      return GatewayForm(this.gatewayType);
    },
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
          title: this.$t('_messages.createSuccess'),
          type: 'success',
        });
        this.$refs.createGatewayDialog.closeAndReset();
        // Event caught in CustomerJourney.vue
        EventBus.emit('customerJourneyUpdate');
      }).catch((err) => {
        console.log(err);
        this.$refs.createGatewayDialog.setError(err);
      });
    },
    async editGateway(gateway) {
      const data = this.$refs.editGatewayDialog.getData();

      const api = await openapi;


      for (const [name, attr] of Object.entries(data.attributes)) {
        if (Array.isArray(attr) && attr.length === 0) {
          delete data.attributes[name];
        }
      }

      api.shop_editGateway({ uuid: gateway.id }, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.editSuccess'),
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
          title: this.$t('_messages.deleteSuccess'),
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

      const data = { ...gateway, attributes: gateway.safe_attributes };

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
};
</script>

<style scoped>

</style>
