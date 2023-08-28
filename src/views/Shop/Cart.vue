<template>
  <div>
    <RecommendedPacketsCart @cartChanged="fetchData" />
    <v-row v-if="cartPackets != null" class="mt-1">
      <!-- Cart packets -->
      <v-col cols="12" lg="8" xl="9">
        <!-- Page Title -->
        <PageTitleFlat :title="$t('_shop.labels.cart')" class="mb-4" />
        <!-- Open Purchase -->
        <!-- TODO Probably Remove Somehow -->
        <v-card class="vh-cart-unfinished mt-3" v-if="openPurchase != null">
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
            <v-btn text color="error" @click="$refs.cancelPurchaseConfirmationDialog.show()">
              <v-icon left>mdi-close</v-icon>
              {{ $t('cancel') }}
            </v-btn>
          </v-card-actions>
        </v-card>
        <!-- Cart Packets -->
        <v-card class="vh-cart-packets mt-3 card-rounded" v-if="cartPackets.length > 0">
          <v-card-text>
            <CartPacket
              class="mt-1"
              v-for="cartPacket in cartPackets" v-bind:key="cartPacket.id"
              :cart-packet="cartPacket" show-remove
              @remove="removeCartPacket(cartPacket.id)"
              @removeDiscount="removeDiscount(cartPacket.discount.id)"
              @targetUserChanged="fetchData">
            </CartPacket>
            <!-- Remove All Btn -->
            <div class="text-right">
              <v-btn small color="error" @click="clearCart" depressed
                     class="text-right vh-remove-all-packets mt-1">
                <v-icon left>mdi-delete</v-icon>
                {{ $t('_shop.labels.removeAllPackets') }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
        <!-- Empty Cart -->
        <v-card class="vh-cart-empty" v-if="cartPackets.length === 0">
          <v-card-text>
            {{ $t('_shop.messages.cartEmpty') }}
            <v-btn class="ml-3" color="primary" :to="{ name: 'Shop' }" depressed
                   active-class="no-active">
              {{ $t('shop') }}
              <v-icon right>
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
        <!-- Address and Email -->
        <v-card class="card-rounded mt-3 vh-address-email-cart" flat
                :class="{ 'card-next-step': billingAddressDrawer === 0 }">
          <v-expansion-panels v-model="billingAddressDrawer">
            <v-expansion-panel>
              <v-expansion-panel-header>
                <div>
                  <h2 class="text-h6">{{ $t('_shop.labels.billingAddress') }}</h2>
                  <v-divider v-if="billingAddressDrawer === 0" class="mt-3 mr-5"/>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content eager>
                <v-row class="d-flex">
                  <v-col cols="12" sm="6" class="mt-0 pt-0">
                    <!-- Billing address -->
                    <v-card class="animate__animated vh-cart-address mt-3 card-rounded" flat
                            :class="{animate__headShake:addressWobble === true}">
                      <v-card-title>
                        <v-icon left>mdi-map-marker</v-icon>
                        {{ $t('_shop.labels.billingAddress') }}
                      </v-card-title>
                      <v-card-text class="body-1">
                        <Address hidden incognito
                                 v-if="currentAddress != null" :address="currentAddress" />
                        <div v-else>{{ $t('_shop.messages.noAddressSpecified') }}</div>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn text color="success" @click="$refs.addressAddDialog.show()">
                          <v-icon left>mdi-plus</v-icon>
                          {{ $t('add') }}
                        </v-btn>
                        <v-btn text color="primary"
                               @click="queryAddresses(); $refs.selectAddressDialog.show()">
                          <v-icon left>mdi-format-list-text</v-icon>
                          {{ $t('select') }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="6" class="d-flex flex-column mt-0 pt-0">
                    <!-- Email -->
                    <Email ref="emailCard" class="animate__animated card-rounded mt-3"
                           @user-changed="refreshUser" :flat="true"
                           :user="$store.getters.user"
                           :class="{animate__headShake:emailWobble === true}"/>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
        <!-- Payment Methods -->
        <v-card class="mt-3 card-rounded vh-select-payment-gateway" flat
                :class="{ 'card-next-step': billingAddressDrawer == null }">
          <v-card-title class="d-block">
            <h2 class="text-h6">{{ $t('_shop.messages.selectGateway') }}</h2>
            <v-divider class="mt-3" />
          </v-card-title>
          <v-card-text>
            <v-row v-if="gateways">
              <v-col cols="6" sm="6" md="4" lg="3" v-for="gateway in gateways" :key="gateway.id"
                     class="d-flex">
                <v-card @click="selectedGateway = gateway.id"
                        class="flex-grow-1 card-rounded gateway-card no-active"
                        :class="{'card-active': gateway.id === selectedGateway,
                         'card-inactive': gateway.id !== selectedGateway}"
                        outlined>
                  <v-card-text class="text-center">
                    <div class="d-flex justify-center">
                      <v-img contain class="mb-1" height="50"
                             :src="getImgUrl(gateway)" :alt="gateway.name"
                             v-if="getImgUrl(gateway) != null" />
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
            <v-row v-else>
              <v-col cols="6" md="3" xl="2" v-for="i in 4" :key="i">
                <v-card class="card-rounded" flat>
                  <v-skeleton-loader type="image"/>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Cart total, address and checkout -->
      <v-col>
        <!-- Discount -->
        <v-card class="vh-cart-discount card-rounded">
          <v-card-actions>
            <v-text-field dense outlined :label="$t('_shop.labels.discountCode')"
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
          </v-card-actions>
        </v-card>
        <!-- Cart total -->
        <v-card class="vh-cart-total mt-3 card-rounded">
          <v-card-title>
            <v-icon left>mdi-cart</v-icon>
            {{ $t('_shop.labels.cartTotal') }}
          </v-card-title>
          <v-card-text v-if="cartPrice != null" class="body-1">
            <CartTotal :price="cartPrice"></CartTotal>
          </v-card-text>
          <!-- Checkout button -->
          <v-card-text class="red--text text-center" v-if="showDetails">
            <span v-if="currentAddress == null">
              {{ $t('_shop.messages.selectBillingAddressFirst') }}
            </span>
            <span v-if="$refs.emailCard.user.email == null">
              {{ $t('_shop.messages.selectEmailFirst') }}
            </span>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" depressed block
                   :disabled="cartPackets.length == 0 || openPurchase != null"
                   @click="startCheckout">
              <v-icon left>mdi-cart-arrow-right</v-icon>
              {{ $t('_shop.labels.purchaseNow') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Skeleton loaders -->
    <v-row v-else>
      <v-col lg="9" md="8">
        <div>
          <v-skeleton-loader v-for="n in 3" class="mb-3"
                             v-bind:key="n"
                             type="card-heading, list-item-avatar, actions" />
        </div>
        <v-skeleton-loader type="button" class="mt-3" />
      </v-col>
      <v-col>
        <v-skeleton-loader type="article"/>
        <v-skeleton-loader type="article, actions" class="mt-3" />
      </v-col>
    </v-row>

    <!-- Address Add Form -->
    <DialogForm :form-schema="addressFormSchema" ref="addressAddDialog"
                :title="$t('_address.labels.add')" :submit-text="$t('add')"
                icon="mdi-map-marker"
                @submit="addAddress">
    </DialogForm>

    <!-- Address select dialog -->
    <Dialog icon="mdi-map-marker" :title="$t('_address.labels.selectAddress')"
            ref="selectAddressDialog">
      <template>
        <div class="mt-2">
          <div v-if="addresses != null && addresses.length > 0">
            <v-row dense>
              <v-col lg="6" md="12" v-for="address in addresses" v-bind:key="address.id"
                     class="d-flex">
                <v-card outlined @click="selectAddress(address)" class="flex-grow-1 card-rounded">
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
    <v-card>
    </v-card>
    <cancel-purchase-confirmation-dialog ref="cancelPurchaseConfirmationDialog"
                         @submit="cancelPurchase(openPurchase)"/>
    <CheckoutDialog ref="checkoutDialog" @cancel="cancelPurchase(openPurchase)"></CheckoutDialog>
  </div>
</template>

<script>
import AddressForm from '@/forms/AddressForm';
import DialogForm from '@/components/DialogForm.vue';
import ShopService from '@/services/ShopService';
import Address from '@/components/Address.vue';
import CartPacket from '@/components/ShopComponents/CartPacket.vue';
import CheckoutDialog from '@/components/ShopComponents/CheckoutDialog.vue';
import CartTotal from '@/components/ShopComponents/CartTotal.vue';
import Dialog from '@/components/Dialog.vue';
import Email from '@/components/PersonalSettings/Email.vue';
import AuthService from '@/services/AuthService';
import RecommendedPacketsCart from '@/components/ShopComponents/RecommendedPacketsCart.vue';
import PageTitleFlat from '@/components/PageTitleFlat.vue';
import openapi from '../../api/openapi';
import CancelPurchaseConfirmationDialog
  from '../../components/ShopComponents/CancelPurchaseConfirmationDialog.vue';

export default {
  components: {
    PageTitleFlat,
    RecommendedPacketsCart,
    CancelPurchaseConfirmationDialog,
    Email,
    Dialog,
    CartTotal,
    CheckoutDialog,
    CartPacket,
    Address,
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
      emailWobble: false,
      addressWobble: false,
      showDetails: false,
      gateways: null,
      selectedGateway: null,
      billingAddressDrawer: null,
    };
  },
  beforeMount() {
    this.fetchData();
    this.queryAddresses();
  },
  methods: {
    async fetchData() {
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
        });

      api.user_getPurchases({
        uuid: this.$store.getters.user.id,
        status: 'OPEN',
        price_calculation: true,
      })
        .then((rsp) => {
          this.openPurchase = rsp.data.find((p) => p.status === 'OPEN');
        });

      api.shop_getAvailableGateways().then((rsp) => {
        this.gateways = rsp.data;
        if (rsp.data.length > 0 && this.selectedGateway == null) {
          this.selectedGateway = rsp.data[0].id;
        }
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
    refreshUser() {
      AuthService.refreshUser();
    },
    async removeCartPacket(cartPacketId) {
      const api = await openapi;

      api.shop_removePacketFromCart({ uuid: cartPacketId }).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.removeSuccess'),
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
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.removeSuccess'),
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
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
        this.$refs.addressAddDialog.closeAndReset();
        this.fetchData();
      }).catch((err) => {
        console.log(err);
        this.$refs.addressAddDialog.setError(err);
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
      // Check for missing address or email and wobble
      if (this.currentAddress == null || this.$refs.emailCard.user.email == null) {
        if (this.currentAddress == null) {
          this.addressWobble = true;
        }
        if (this.$refs.emailCard.user.email == null) {
          this.emailWobble = true;
        }
        setTimeout(() => {
          this.emailWobble = false;
          this.addressWobble = false;
        }, 500);
        this.showDetails = true;
        return;
      }

      const api = await openapi;

      api.shop_startCheckout(undefined, { address_id: this.currentAddress.id }).then((rsp) => {
        const purchase = rsp.data;
        this.$refs.checkoutDialog.show(purchase);
        this.fetchData();
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
        this.fetchData();
      });
    },
    async cancelPurchase(purchase) {
      (await openapi).shop_editPurchase(
        { uuid: purchase.id },
        { status: 'CANCELLED' },
      ).then(() => {
        this.fetchData();
        this.$refs.cancelPurchaseConfirmationDialog.closeAndReset();
        this.$notify({
          title: this.$t('_messages.cancelSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
        this.fetchData();
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
        this.fetchData();

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
        this.couponError = this.$t(`_errors.coupon.${err.response.data.detail.code}`,
          err.response.data.detail.detail);
      });
    },
    async removeDiscount(id) {
      const api = await openapi;

      api.shop_removeDiscount({ code_or_uuid: id }).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_shop.messages.couponRemoveSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
        this.fetchData();
      });
    },
    getImgUrl(gateway) {
      // Return URL, when set, else return default
      if (gateway.image_url) return gateway.image_url;
      const images = require.context('@/assets/img/gateways/', false, /\.png$/);

      try {
        return images(`./${gateway.type}.png`);
      } catch (e) {
        return null;
      }
    },
  },
  computed: {
    currentAddress() {
      return this.$store.getters.address;
    },
  },
};
</script>

<style scoped lang="sass">
.no-active::before
  opacity: 0 !important

.gateway-card
  filter: brightness(0.9)
  transition: all 0.2s ease-in-out

.gateway-card:hover
  filter: brightness(1)
  border-color: var(--v-primary-base)

.gateway-card.card-active
  border-color: var(--v-primary-base)
  transform: scale(1.05)
  filter: brightness(1)

.card-next-step
  border-style: solid !important
  border-width: 2px !important
  border-color: var(--v-primary-base) !important
</style>
