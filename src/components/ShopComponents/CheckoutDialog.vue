<template>
  <Dialog :max-width="1000" icon="mdi-cart-arrow-right" :title="$t('_shop.labels.orderOverview')"
          ref="checkoutDialog" with-id>
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
          <v-col lg="7" cols="12">
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
                    <Address hidden :address="purchase.address"></Address>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-if="purchase.cart_packets.some((cp) => cp.target_user)">
              <v-col>
                <v-card>
                  <v-card-title>
                    <v-icon left>mdi-account-switch</v-icon>
                    {{ $t('_shop.labels.changeTargetUser') }}
                  </v-card-title>
                  <v-card-text class="d-flex">
                    <v-row>
                      <v-col>
                        <v-img :src="require('@/assets/img/icons/gift-box.png')" max-width="100px"/>
                      </v-col>
                      <v-col>
                        <ul>
                          <li v-for="user in targetedUsers" :key="user.id" class="mt-1">
                            <UserLink :user="user" :small="true" />
                          </li>
                        </ul>
                      </v-col>
                    </v-row>
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
                            :rules="[v => !!v || $t('_shop.messages.mustAgree')]" class="mt-0">
                  <template v-slot:label>
                    <div v-if="checkbox.url != null">
                      <a :href="checkbox.url" target="_blank" @click.stop>
                        {{ checkbox.text }}
                      </a>
                    </div>
                    <div v-else>
                      {{ checkbox.text }}
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
            <v-col lg="3" md="4" sm="6" xs="12" v-for="gateway in gateways" v-bind:key="gateway.id"
                   class="d-flex">
              <v-card @click="startPayment(gateway)" class="flex-grow-1">
                <v-card-text class="text-center">
                  <div class="d-flex justify-center">
                    <v-img contain class="mb-1" width="200" height="50"
                           :src="getImgUrl(gateway.type)" :alt="gateway.type"
                           v-if="getImgUrl(gateway.type) != null" />
                    <div v-else>
                      <h4 class="text-h4">{{ gateway.type }}</h4>
                    </div>
                  </div>
                  <div v-if="gateway.subtitle != null">
                    {{ gateway.subtitle }}
                  </div>
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
          <v-btn text @click="$refs.cancelPurchaseConfirmationDialog.show()">
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
    <cancel-purchase-confirmation-dialog ref="cancelPurchaseConfirmationDialog"
                                         @submit="cancel()"/>
  </Dialog>
</template>

<script>
import CartPacket from '@/components/ShopComponents/CartPacket.vue';
import Address from '@/components/Address.vue';
import CartTotal from '@/components/ShopComponents/CartTotal.vue';
import ShopService from '@/services/ShopService';
import UserLink from '@/components/UserLink.vue';
import Dialog from '../Dialog.vue';
import openapi from '../../api/openapi';
import openapiCached from '../../api/openapiCached';
import CancelPurchaseConfirmationDialog from './CancelPurchaseConfirmationDialog.vue';

export default {
  name: 'CheckoutDialog',
  components: {
    UserLink,
    CancelPurchaseConfirmationDialog,
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
    getImgUrl(gateway) {
      const images = require.context('@/assets/img/gateways/', false, /\.png$/);

      try {
        return images(`./${gateway}.png`);
      } catch (e) {
        return null;
      }
    },
    async fetchData() {
      const api = await openapi;
      api.shop_getPurchaseGateways({ uuid: this.purchase.id }).then((rsp) => {
        this.gateways = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });

      const apiCached = await openapiCached;

      apiCached.shop_getConfig().then((rsp) => {
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
      this.errorMessage = null;

      this.fetchData();

      if (purchase.debits.length > 0) {
        this.confirmed = true;
      }
    },
    showPaymentGateways() {
      if (this.checkboxes != null && this.$refs.checkboxesForm.validate()) {
        this.confirmed = true;

        setTimeout(() => {
          this.scrollDown();
        }, 500);
      } else {
        this.scrollDown();
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
      this.$refs.cancelPurchaseConfirmationDialog.closeAndReset();
    },
    scrollDown() {
      const { id } = this.$refs.checkoutDialog;
      const container = document.querySelector(`#${id}`);
      container.scrollTop = container.scrollHeight;
    },
  },
  computed: {
    price() {
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
    targetedUsers() {
      const res = [];
      this.purchase.cart_packets.forEach((cp) => {
        if (cp.target_user != null) {
          res.push(cp.target_user);
        }
      });
      return res.filter((cp, index, self) => index === self.findIndex((t) => t.id === cp.id));
    },
  },
  watch: {
  },
};
</script>

<style scoped>
ul {
  list-style: none; /* Remove default bullets */
}

ul li::before {
  content: "\2022";  /* Add content: \2022 is the CSS Code/unicode for a bullet */
  color: var(--v-primary-base); /* Change the color */
  font-weight: bold; /* If you want it to be bold */
  display: inline-block; /* Needed to add space between the bullet and the text */
  width: 1em; /* Also needed for space (tweak if needed) */
  margin-left: -1em; /* Also needed for space (tweak if needed) */
}
</style>
