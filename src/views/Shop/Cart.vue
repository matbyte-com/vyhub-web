<template>
  <div>
    <v-row>
      <v-col>
        <page-title>{{ $t('_shop.labels.cart') }}</page-title>
      </v-col>
    </v-row>

    <v-row v-if="cartPackets != null">
      <!-- Cart packets -->
      <v-col lg="9" md="8">
        <v-row v-for="cartPacket in cartPackets" v-bind:key="cartPacket.id">
          <v-col>
            <CartPacket :cart-packet="cartPacket" show-outline show-remove
                        @remove="removeCartPacket(cartPacket.id)">
            </CartPacket>
          </v-col>
        </v-row>
        <div v-if="cartPackets.length === 0">{{ $t('_shop.messages.cartEmpty') }}</div>
        <v-btn class="mt-2" color="error" @click="clearCart"
               v-else outlined>
          <v-icon class="mr-1">mdi-delete</v-icon>
          {{ $t('_shop.labels.removeAllPackets') }}
        </v-btn>
      </v-col>

      <!-- Cart total, address and checkout -->
      <v-col>

        <!-- Cart total -->
        <v-row v-if="openPurchase != null">
          <v-col>
            <v-card>
              <v-card-title>
                <v-icon class="mr-1">mdi-cart-arrow-right</v-icon>
                {{ $t('_shop.labels.unfinishedPurchase') }}
              </v-card-title>
              <v-card-text class="body-1">
                {{ $t('_shop.messages.unfinishedPurchase') }}
              </v-card-text>
              <v-card-actions>
                <v-btn text color="success" @click="$refs.checkoutDialog.show(openPurchase)">
                  <v-icon class="mr-1">mdi-arrow-right</v-icon>
                  {{ $t('continue') }}
                </v-btn>
                <v-btn text color="error" @click="cancelPurchase(openPurchase)">
                  <v-icon class="mr-1">mdi-close</v-icon>
                  {{ $t('cancel') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                <v-icon class="mr-1">mdi-cart</v-icon>
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
                <v-icon class="mr-1">mdi-map-marker</v-icon>
                {{ $t('_shop.labels.billingAddress') }}
              </v-card-title>
              <v-card-text class="body-1">
                <Address v-if="currentAddress != null" :address="currentAddress"></Address>
                <div v-else>{{ $t('_shop.messages.noAddressSpecified') }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="success" @click="$refs.addressAddDialog.show()">
                  <v-icon class="mr-1">mdi-plus</v-icon>
                  {{ $t('add') }}
                </v-btn>
                <v-btn text color="primary" @click="selectAddressDialog = true">
                  <v-icon class="mr-1">mdi-format-list-text</v-icon>
                  {{ $t('select') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Checkout button -->
        <v-row>
          <v-col>
            <v-card>
              <v-card-actions>
                <v-btn color="primary" block
                       :disabled="cartPackets.length == 0 || currentAddress == null ||
                       openPurchase != null"
                       @click="startCheckout">
                  <v-icon class="mr-1">mdi-cart-arrow-right</v-icon>
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
                :title="$t('_address.labels.add')" :submit-text="$t('create')"
                title-icon="mdi-map-marker"
                @submit="addAddress">
    </DialogForm>

    <!-- Address select dialog -->
    <v-dialog
      v-model="selectAddressDialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      max-width="500">
      <v-card>
        <v-card-title class="grey lighten-3">
          <v-icon class="mr-1">mdi-map-marker</v-icon>
          <span>{{ $t('_address.labels.selectAddress') }}</span>
          <v-spacer />
          <v-icon @click="selectAddressDialog = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
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
        </v-card-text>
      </v-card>
    </v-dialog>
    <CheckoutDialog ref="checkoutDialog" @cancel="cancelPurchase(openPurchase)"></CheckoutDialog>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import utilService from '@/services/UtilService';
import api from '@/api/api';
import AddressForm from '@/forms/AddressForm';
import DialogForm from '@/components/DialogForm.vue';
import ShopService from '@/services/ShopService';
import Address from '@/components/Address.vue';
import CartPacket from '@/components/ShopComponents/CartPacket.vue';
import CheckoutDialog from '@/components/ShopComponents/CheckoutDialog.vue';
import CartTotal from '@/components/ShopComponents/CartTotal.vue';

export default {
  components: {
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
      selectAddressDialog: null,
      openPurchase: null,
    };
  },
  beforeMount() {
    this.queryData();
    this.queryAddresses();
  },
  methods: {
    queryData() {
      const countryCode = (this.$store.getters.address != null
        ? this.$store.getters.address.country.code : null);

      api.shop.getCart(countryCode)
        .then((rsp) => {
          this.cartPackets = rsp.data.packets;
          this.cartPrice = rsp.data.price;
          this.cartCorrect = rsp.data.correct;

          this.$store.dispatch('setCartPacketCount', {
            cartPacketCount: this.cartPackets.length,
          });
        }).catch((err) => {
          console.log(err);
          utilService.notifyUnexpectedError(err.response.data);
        });

      api.user.getPurchases(this.$store.getters.user.id).then((rsp) => {
        this.openPurchase = rsp.data.find((p) => p.status === 'OPEN');
      });
    },
    queryAddresses() {
      api.user.getAddresses(this.$store.getters.user.id).then((rsp) => {
        this.addresses = rsp.data;

        if (this.$store.getters.address == null && this.addresses.length > 0) {
          ShopService.selectAddress(this.addresses[0]);
        }
      });
    },
    removeCartPacket(cartPacketId) {
      api.shop.removeFromCart(cartPacketId).then(() => {
        this.queryData();
        this.$notify({
          title: this.$t('_shop.messages.removeFromCartSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        utilService.notifyUnexpectedError(err.response.data);
      });
    },
    clearCart() {
      api.shop.clearCart().then(() => {
        this.queryData();
        this.$notify({
          title: this.$t('_shop.messages.clearCartSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        utilService.notifyUnexpectedError(err.response.data);
      });
    },
    addAddress() {
      const data = this.$refs.addressAddDialog.getData();

      api.user.addAddress(data.name, data.streetAndNumber, data.addition, data.zipCode, data.city,
        data.state, data.country).then((rsp) => {
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
      this.selectAddressDialog = false;
    },
    startCheckout() {
      api.shop.startCheckout(this.currentAddress.id).then((rsp) => {
        const purchase = rsp.data;
        this.$refs.checkoutDialog.show(purchase);
        this.queryData();
      }).catch((err) => {
        console.log(err);
        utilService.notifyUnexpectedError(err.response.data);
        this.queryData();
      });
    },
    cancelPurchase(purchase) {
      api.shop.cancelPurchase(purchase.id).then(() => {
        this.queryData();
        this.$notify({
          title: this.$t('_shop.messages.purchaseCancelledSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        utilService.notifyUnexpectedError(err.response.data);
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
