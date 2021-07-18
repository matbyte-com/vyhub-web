<template>
  <Dialog :max-width="1000" icon="mdi-cart-arrow-right" :title="$t('_shop.labels.orderOverview')"
          ref="checkoutDialog">
    <template>
      <div v-if="purchase == null">
        {{ $t('_shop.messages.noOngoingPurchase') }}
      </div>
      <div v-else>
        <v-row v-if="errorMessage != null">
          <v-col cols="12" class="mt-4">
            <v-alert
              type="error"
            >
              {{ errorMessage }}
            </v-alert>
          </v-col>
        </v-row>
        <v-row class="mt-2">
          <v-col lg="7" md="12">
            <v-row v-for="cartPacket in purchase.cart_packets" v-bind:key="cartPacket.id" >
              <v-col>
                <CartPacket :cart-packet="cartPacket" :priceCols="4" />
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-col>
                <v-card>
                  <v-card-title>
                    <v-icon left>mdi-currency-usd</v-icon>
                    {{ $t('_shop.labels.total') }}
                  </v-card-title>
                  <v-card-text class="body-1">
                    <CartTotal :price="price" />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card>
                  <v-card-title>
                    <v-icon left>mdi-map-marker</v-icon>
                    {{ $t('_shop.labels.billingAddress') }}
                  </v-card-title>
                  <v-card-text class="body-1">
                    <Address :address="purchase.address"></Address>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mt-2">
          <v-col>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <div v-if="!confirmed">
          <v-row v-if="checkboxes != null">
            <v-col>
              <v-form v-model="allChecked" ref="checkboxesForm" lazy-validation>
                <v-checkbox required v-for="checkbox in checkboxes" v-bind:key="checkbox.id"
                            :rules="[v => !!v || $t('_shop.messages.mustAgree')]">
                  <template v-slot:label>
                    <div>
                      <a :href="checkbox.url" target="_blank" @click.stop>
                        {{ checkbox.text }}
                      </a>
                    </div>
                  </template>
                </v-checkbox>
              </v-form>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col class="text-center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </div>
        <div v-else-if="!loading">
          <v-row>
            <v-col>
              {{ $t('_shop.messages.selectGateway') }}
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col lg="3" md="4" sm="6" xs="12" v-for="gateway in gateways" v-bind:key="gateway.id">
              <v-card @click="startPayment(gateway)">
                <v-card-text class="text-center">
                  {{ gateway.name }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <div v-else>
          <v-row>
            <v-col class="text-center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-col>
          </v-row>
        </div>
      </div>
    </template>
    <template v-slot:actions v-if="!loading">
      <v-row class="text-center">
        <v-col>
          <v-btn text @click="cancel">
            <v-icon left>mdi-close</v-icon>
            {{ $t('cancel') }}
          </v-btn>
          <v-btn text color="primary" @click="showPaymentGateways" v-if="!confirmed">
            <v-icon left>mdi-check</v-icon>
            {{ $t('_shop.labels.purchaseNow') }}
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </Dialog>
</template>

<script>
import CartPacket from '@/components/ShopComponents/CartPacket.vue';
import Address from '@/components/Address.vue';
import CartTotal from '@/components/ShopComponents/CartTotal.vue';
import ShopService from '@/services/ShopService';
import Dialog from '../Dialog.vue';
import openapi from '../../api/openapi';
import openapiCached from '../../api/openapiCached';

export default {
  name: 'CheckoutDialog',
  components: {
    Dialog,
    CartTotal,
    CartPacket,
    Address,
  },
  data() {
    return {
      purchase: null,
      allChecked: false,
      confirmed: false,
      gateways: null,
      loading: false,
      errorMessage: null,
      generalConfig: null,
    };
  },
  methods: {
    async queryData() {
      const api = await openapi;
      api.shop_getPurchaseGateways({ uuid: this.purchase.id }).then((rsp) => {
        this.gateways = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });

      const apiCached = await openapiCached;

      apiCached.shop_getGeneralConfig().then((rsp) => {
        this.generalConfig = rsp.data;

        if (this.checkboxes != null && this.checkboxes.length === 0) {
          this.confirmed = true;
        }
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    show(purchase) {
      this.purchase = purchase;
      this.$refs.checkoutDialog.show();
      this.confirmed = false;
      this.loading = false;

      this.queryData();

      if (purchase.debits.length > 0) {
        this.confirmed = true;
      }
    },
    showPaymentGateways() {
      if (this.checkboxes != null && this.$refs.checkboxesForm.validate()) {
        this.confirmed = true;
      }
    },
    async startPayment(gateway) {
      const api = await openapi;

      this.loading = true;
      this.errorMessage = null;

      api.shop_startPayment(undefined, {
        purchase_id: this.purchase.id,
        payment_gateway_id: gateway.id,
      }).then((rsp) => {
        const { action, debit } = rsp.data;
        console.log(action, debit);

        ShopService.executeAction(debit, action).catch((err) => {
          this.loading = false;
          this.errorMessage = this.$t('_shop.messages.paymentActionFailed', { message: err });
        });
      }).catch((err) => {
        this.loading = false;
        this.errorMessage = this.$t('_shop.messages.startingPaymentFailed');
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    close() {
      this.loading = false;
      this.$refs.checkoutDialog.close();
    },
    cancel() {
      this.$emit('cancel');
      this.close();
    },
  },
  computed: {
    price() {
      /* eslint-disable @typescript-eslint/camelcase */
      return {
        net: this.purchase.amount_net,
        total: this.purchase.amount_total,
        currency: this.purchase.currency,
        tax_rate: this.purchase.tax_rate,
        amount_tax: this.purchase.amount_tax,
        tax_info: this.purchase.tax_info,
        credits: this.purchase.credits,
      };
    },
    checkboxes() {
      if (this.generalConfig == null) {
        return null;
      }

      if (this.generalConfig.checkout_checkboxes == null) {
        return [];
      }

      let id = 1;
      return this.generalConfig.checkout_checkboxes.map((cb) => {
        const cbo = {
          text: cb.text,
          url: cb.url,
          id,
        };

        id += 1;

        return cbo;
      });
    },
  },
};
</script>

<style scoped>

</style>
