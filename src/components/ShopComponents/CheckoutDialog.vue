<template>
  <v-dialog
    v-model="checkoutDialog"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    max-width="1000">
    <v-card>
      <v-card-title class="grey lighten-3">
        <v-icon class="mr-1">mdi-cart-arrow-right</v-icon>
        <span>{{ $t('_shop.labels.orderOverview') }}</span>
        <v-spacer />
        <v-icon @click="checkoutDialog = false">mdi-close</v-icon>
      </v-card-title>
      <v-card-text v-if="purchase == null">
        {{ $t('_shop.messages.noOngoingPurchase') }}
      </v-card-text>
      <v-card-text v-else>
        <v-row class="mt-2">
          <v-col lg="7" md="12">
            <v-row v-for="cartPacket in purchase.cart_packets" v-bind:key="cartPacket.id" >
              <v-col>
                <CartPacket :cart-packet="cartPacket" :priceCols="3" />
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-row>
              <v-col>
                <v-card>
                  <v-card-title>
                    <v-icon class="mr-1">mdi-currency-usd</v-icon>
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
                    <v-icon class="mr-1">mdi-map-marker</v-icon>
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
          <v-row>
            <v-col>
              <v-form v-model="allChecked" ref="checkboxesForm" lazy-validation>
                <v-checkbox required v-for="checkbox in checkboxes" v-bind:key="checkbox.id"
                            :rules="[v => !!v || $t('_shop.messages.mustAgree')]">
                  <template v-slot:label>
                    <div>
                      <a :href="checkbox.link" target="_blank" @click.stop>
                        {{ checkbox.text }}
                      </a>
                    </div>
                  </template>
                </v-checkbox>
              </v-form>
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
      </v-card-text>
      <v-card-actions class="justify-center" v-if="!loading">
        <v-btn text @click="cancel">
          <v-icon class="mr-1">mdi-close</v-icon>
          {{ $t('cancel') }}
        </v-btn>
        <v-btn text color="primary" @click="showPaymentGateways" v-if="!confirmed">
          <v-icon class="mr-1">mdi-check</v-icon>
          {{ $t('_shop.labels.purchaseNow') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CartPacket from '@/components/ShopComponents/CartPacket.vue';
import Address from '@/components/Address.vue';
import CartTotal from '@/components/ShopComponents/CartTotal.vue';
import api from '@/api/api';
import UtilService from '@/services/UtilService';
import ShopService from '@/services/ShopService';

export default {
  name: 'CheckoutDialog',
  components: {
    CartTotal,
    CartPacket,
    Address,
  },
  data() {
    return {
      checkoutDialog: null,
      purchase: null,
      checkboxes: [
        {
          id: 1,
          model: null,
          text: 'I agree to sell my soul.',
          link: 'https://google.de',
        },
      ],
      allChecked: false,
      confirmed: false,
      gateways: null,
      loading: false,
    };
  },
  methods: {
    queryData() {
      api.shop.getPaymentGateways(this.purchase.id).then((rsp) => {
        this.gateways = rsp.data;
      }).catch((err) => {
        console.log(err);
        UtilService.notifyUnexpectedError(err.response.data);
      });
    },
    show(purchase) {
      this.purchase = purchase;
      this.checkoutDialog = true;
      this.confirmed = false;
      this.loading = false;

      this.queryData();

      if (purchase.debits.length > 0) {
        this.confirmed = true;
      }
    },
    showPaymentGateways() {
      if (this.$refs.checkboxesForm.validate()) {
        this.confirmed = true;
      }
    },
    startPayment(gateway) {
      this.loading = true;

      api.shop.startPayment(this.purchase.id, gateway.id).then((rsp) => {
        const { action, debit } = rsp.data;
        console.log(action, debit);
        ShopService.executeAction(debit, action);
      }).catch((err) => {
        console.log(err);
        UtilService.notifyUnexpectedError(err.response.data);
      });
    },
    close() {
      this.loading = false;
      this.checkoutDialog = false;
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
        tax_amount: this.purchase.tax_amount,
        tax_info: this.purchase.tax_info,
        credits: this.purchase.credits,
      };
    },
  },
};
</script>

<style scoped>

</style>
