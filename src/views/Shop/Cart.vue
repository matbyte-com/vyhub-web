<template>
  <div>
    <page-title icon="mdi-cart-variant">{{ $t('_shop.labels.cart') }}</page-title>

    <v-row v-if="cartPackets != null">
      <!-- Cart packets -->
      <v-col lg="9" md="8">
        <v-row v-if="openPurchase != null">
          <v-col>
            <v-card>
              <v-card-title>
                <v-icon left>mdi-cart-arrow-right</v-icon>
                {{ $t('_shop.labels.unfinishedPurchase') }}
              </v-card-title>
              <v-card-text class="body-1">
                {{ $t('_shop.messages.unfinishedPurchase') }}
              </v-card-text>
              <v-card-actions>
                <v-btn color="success" @click="$refs.checkoutDialog.show(openPurchase)">
                  <v-icon left>mdi-arrow-right</v-icon>
                  {{ $t('continue') }}
                </v-btn>
                <v-btn text color="error" @click="cancelPurchase(openPurchase)">
                  <v-icon left>mdi-close</v-icon>
                  {{ $t('cancel') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-for="cartPacket in cartPackets" v-bind:key="cartPacket.id">
          <v-col>
            <CartPacket :cart-packet="cartPacket" show-outline show-remove
                        @remove="removeCartPacket(cartPacket.id)"
                        @removeDiscount="removeDiscount(cartPacket.discount.id)">
            </CartPacket>
          </v-col>
        </v-row>
        <div v-if="cartPackets.length === 0">
          <v-row>
            <v-col>
              <v-card>
                <v-card-text>
                  {{ $t('_shop.messages.cartEmpty') }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <div v-else>
          <v-row>
            <v-col class="text-right">
              <v-btn color="error" @click="clearCart" depressed>
                <v-icon left>mdi-delete</v-icon>
                {{ $t('_shop.labels.removeAllPackets') }}
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <!-- Cart total, address and checkout -->
      <v-col>
        <!-- Cart total -->
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                <v-icon left>mdi-cart</v-icon>
                {{ $t('_shop.labels.cartTotal') }}
              </v-card-title>
              <v-card-text v-if="cartPrice != null" class="body-1">
                <CartTotal :price="cartPrice"></CartTotal>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Billing address -->
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                <v-icon left>mdi-map-marker</v-icon>
                {{ $t('_shop.labels.billingAddress') }}
              </v-card-title>
              <v-card-text class="body-1">
                <Address v-if="currentAddress != null" :address="currentAddress"></Address>
                <div v-else>{{ $t('_shop.messages.noAddressSpecified') }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="success" @click="$refs.addressAddDialog.show()">
                  <v-icon left>mdi-plus</v-icon>
                  {{ $t('add') }}
                </v-btn>
                <v-btn text color="primary" @click="$refs.selectAddressDialog.show()">
                  <v-icon left>mdi-format-list-text</v-icon>
                  {{ $t('select') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <v-text-field dense outlined :label="$t('_shop.labels.couponCode')"
                              @keydown.enter="applyDiscount" v-model="couponCode"
                              :style="couponStyle"
                              :hide-details="couponError == null"
                              :error-messages="couponError">
                  <template slot="prepend-inner">
                    <v-icon>
                      mdi-ticket-percent
                    </v-icon>
                  </template>
                  <template slot="append">
                    <v-icon @click="applyDiscount" color="primary">
                      mdi-check
                    </v-icon>
                  </template>
                </v-text-field>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Checkout button -->
        <v-row>
          <v-col>
            <v-card>
              <v-card-text v-if="currentAddress == null" class="red--text text-center">
                {{ $t('_shop.messages.selectBillingAddressFirst') }}
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" block
                       :disabled="cartPackets.length == 0 || currentAddress == null ||
                       openPurchase != null"
                       @click="startCheckout">
                  <v-icon left>mdi-cart-arrow-right</v-icon>
                  {{ $t('_shop.labels.checkout') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Skeleton loaders -->
    <v-row v-else>
      <v-col lg="9" md="8">
        <v-skeleton-loader v-for="n in 3"
                           v-bind:key="n"
                           type="card-heading, list-item-avatar">
        </v-skeleton-loader>
        <v-skeleton-loader type="button"></v-skeleton-loader>
      </v-col>
      <v-col>
        <v-skeleton-loader type="article"></v-skeleton-loader>
        <v-skeleton-loader type="article, actions"></v-skeleton-loader>
      </v-col>
    </v-row>

    <!-- Address Add Form -->
    <DialogForm :form-schema="addressFormSchema" ref="addressAddDialog"
                :title="$t('_address.labels.add')" :submit-text="$t('add')"
                title-icon="mdi-map-marker"
                @submit="addAddress">
    </DialogForm>

    <!-- Address select dialog -->
    <Dialog icon="mdi-map-marker" :title="$t('_address.labels.selectAddress')"
            ref="selectAddressDialog">
      <template>
        <div class="mt-2">
          <div v-if="addresses != null && addresses.length > 0">
            <v-row>
              <v-col lg="6" md="12" v-for="address in addresses" v-bind:key="address.id"
                     class="d-flex">
                <v-card @click="selectAddress(address)" class="flex-grow-1">
                  <v-card-text>
                    <Address :address="address"></Address>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <div v-else>
            {{ $t('_address.messages.noAddressesYet') }}
          </div>
        </div>
      </template>
    </Dialog>

    <CheckoutDialog ref="checkoutDialog" @cancel="cancelPurchase(openPurchase)"></CheckoutDialog>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import AddressForm from '@/forms/AddressForm';
import DialogForm from '@/components/DialogForm.vue';
import ShopService from '@/services/ShopService';
import Address from '@/components/Address.vue';
import CartPacket from '@/components/ShopComponents/CartPacket.vue';
import CheckoutDialog from '@/components/ShopComponents/CheckoutDialog.vue';
import CartTotal from '@/components/ShopComponents/CartTotal.vue';
import Dialog from '@/components/Dialog.vue';
import openapi from '../../api/openapi';

export default {
  components: {
    Dialog,
    CartTotal,
    CheckoutDialog,
    CartPacket,
    Address,
    PageTitle,
    DialogForm,
  },
  data() {
    return {
      cartPackets: null,
      cartPrice: null,
      cartCorrect: false,
      addressFormSchema: AddressForm,
      addresses: null,
      openPurchase: null,
      couponCode: null,
      couponError: null,
      couponStyle: null,
    };
  },
  beforeMount() {
    this.queryData();
    this.queryAddresses();
  },
  methods: {
    async queryData() {
      const api = await openapi;

      let cartData = null;

      if (this.$store.getters.address != null) {
        cartData = {
          country_code: this.$store.getters.address.country.code,
        };
      } else {
        cartData = { };
      }

      api.shop_getCart(cartData)
        .then((rsp) => {
          console.log(rsp.data);
          this.cartPackets = rsp.data.packets;
          this.cartPrice = rsp.data.price;
          this.cartCorrect = rsp.data.correct;

          this.$store.dispatch('setCartPacketCount', {
            cartPacketCount: this.cartPackets.length,
          });
        }).catch((err) => {
          console.log(err);
          this.utils.notifyUnexpectedError(err.response.data);
        });

      api.user_getPurchases({
        uuid: this.$store.getters.user.id,
        status: 'OPEN',
        price_calculation: true,
      })
        .then((rsp) => {
          this.openPurchase = rsp.data.find((p) => p.status === 'OPEN');
        });
    },
    async queryAddresses() {
      const api = await openapi;

      api.user_getAddresses({ uuid: this.$store.getters.user.id }).then((rsp) => {
        this.addresses = rsp.data;

        if (this.$store.getters.address == null && this.addresses.length > 0) {
          ShopService.selectAddress(this.addresses[0]);
        }
      });
    },
    async removeCartPacket(cartPacketId) {
      const api = await openapi;

      api.shop_removePacketFromCart({ uuid: cartPacketId }).then(() => {
        this.queryData();
        this.$notify({
          title: this.$t('_shop.messages.removeFromCartSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async clearCart() {
      const api = await openapi;

      api.shop_removePacketsFromCart().then(() => {
        this.queryData();
        this.$notify({
          title: this.$t('_shop.messages.clearCartSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async addAddress() {
      const api = await openapi;

      const address = this.$refs.addressAddDialog.getData();

      api.user_addAddress(undefined, address).then((rsp) => {
        ShopService.selectAddress(rsp.data);
        this.$notify({
          title: this.$t('_address.messages.addSuccess'),
          type: 'success',
        });
        this.$refs.addressAddDialog.closeAndReset();
        this.queryData();
      }).catch((err) => {
        console.log(err);
        this.$refs.addressAddDialog.setErrorMessage(err.response.data);
      });
    },
    selectAddress(address) {
      ShopService.selectAddress(address);
      this.$notify({
        title: this.$t('_address.messages.selectedSuccess'),
        type: 'success',
      });
      this.$refs.selectAddressDialog.close();
    },
    async startCheckout() {
      const api = await openapi;

      api.shop_startCheckout(undefined, { address_id: this.currentAddress.id }).then((rsp) => {
        const purchase = rsp.data;
        this.$refs.checkoutDialog.show(purchase);
        this.queryData();
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
        this.queryData();
      });
    },
    async cancelPurchase(purchase) {
      (await openapi).shop_editPurchase(
        { uuid: purchase.id },
        { status: 'CANCELLED' },
      ).then(() => {
        this.queryData();
        this.$notify({
          title: this.$t('_shop.messages.purchaseCancelledSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
        this.queryData();
      });
    },
    async applyDiscount() {
      const api = await openapi;

      this.couponError = null;
      this.couponStyle = null;
      const code = this.couponCode;

      if (!code) {
        return;
      }

      api.shop_applyDiscount({ code_or_uuid: code }).then((rsp) => {
        this.couponCode = null;
        this.queryData();

        if (rsp.data.success === true) {
          this.couponStyle = 'border-color: green !important;';
          this.$notify({
            title: this.$t('_shop.messages.couponApplySuccess'),
            type: 'success',
          });
        } else {
          this.couponError = this.$t('_shop.messages.couponNotApplied');
        }
      }).catch((err) => {
        console.log(err);
        this.couponError = this.$t(`_shop.errors.coupon.${err.response.data.detail.code}`,
          err.response.data.detail.detail);
      });
    },
    async removeDiscount(id) {
      const api = await openapi;

      api.shop_removeDiscount({ code_or_uuid: id }).then(() => {
        this.queryData();
        this.$notify({
          title: this.$t('_shop.messages.couponRemoveSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
        this.queryData();
      });
    },
  },
  computed: {
    currentAddress() {
      return this.$store.getters.address;
    },
  },
};
</script>

<style scoped>

</style>
