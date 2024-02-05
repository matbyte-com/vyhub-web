<template>
  <div>
    <RecommendedPacketsCart @cartChanged="fetchData"/>
    <v-row v-if="cartPackets != null" class="mt-4" :dense="$vuetify.breakpoint.mdAndDown">
      <!-- Cart packets -->
      <v-col cols="12" lg="8" xl="9">
        <!-- Unfinished Purchases -->
        <div v-if="openPurchase">
          <PageTitleFlat :title="$t('_shop.labels.unfinishedPurchase')" :hide-triangle="true"
                         :no-bottom-border-radius="true"/>
          <v-card class="vh-cart-packets-open-purchase card-rounded-bottom" flat
                  style="border-top-right-radius: 0; border-top-left-radius: 0">
            <v-card-text>
              <transition-group name="packet-list">
                <CartPacket
                    class="mt-1"
                    v-for="cartPacket in openPurchase.cart_packets" v-bind:key="cartPacket.id"
                    :cart-packet="cartPacket" :show-remove="!openPurchase"
                    :open-purchase="openPurchase"
                    @remove="removeCartPacket(cartPacket.id)"
                    @removeDiscount="removeDiscount(cartPacket.discount.id)"
                    @targetUserChanged="fetchData">
                </CartPacket>
                <div class="text-right" :key="3">
                  <v-btn color="error" text class="mt-1"
                         @click="$refs.cancelPurchaseConfirmationDialog.show()">
                    <v-icon left>mdi-close</v-icon>
                    {{ $t('_shop.labels.cancelPurchase') }}
                  </v-btn>
                </div>
              </transition-group>
            </v-card-text>
          </v-card>
        </div>
        <div :class="{ 'mt-3': openPurchase }"
             v-if="cartPackets && (!openPurchase || cartPackets.length > 0)">
          <!-- Cart Packets -->
          <PageTitleFlat :title="$t('_shop.labels.cart')" :hide-triangle="true"
                         :no-bottom-border-radius="true"/>
          <!-- Either show cart-packets or open-purchase packets -->
          <v-card class="vh-cart-packets card-rounded-bottom" flat
                  style="border-top-right-radius: 0; border-top-left-radius: 0">
            <v-card-text>
              <transition-group name="packet-list">
                <CartPacket
                    class="mt-1"
                    v-for="cartPacket in cartPackets" v-bind:key="cartPacket.id"
                    :cart-packet="cartPacket"
                    :show-remove="!openPurchase" :open-purchase="openPurchase"
                    @remove="removeCartPacket(cartPacket.id)"
                    @removeDiscount="removeDiscount(cartPacket.discount.id)"
                    @targetUserChanged="fetchData">
                </CartPacket>
                <!-- Remove All Btn -->
                <div class="text-right" v-if="cartPackets.length > 0" :key="3">
                  <v-btn small color="error" @click="clearCart" depressed
                         class="text-right vh-remove-all-packets mt-1">
                    <v-icon left>mdi-delete</v-icon>
                    {{ $t('_shop.labels.removeAllPackets') }}
                  </v-btn>
                </div>
              </transition-group>
              <!-- Cart Empty -->
              <div v-if="!openPurchase && cartPackets.length === 0" :key="1">
                {{ $t('_shop.messages.cartEmpty') }}
                <v-btn class="ml-3" color="primary" :to="{ name: 'Shop' }" depressed
                       active-class="no-active">
                  {{ $t('shop') }}
                  <v-icon right>
                    mdi-arrow-right
                  </v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </div>
        <!-- Address and Email -->
        <v-card class="card-rounded mt-3 vh-address-email-cart animate__animated"
                v-if="!openPurchase"
                :class="{ 'card-next-step': billingAddressDrawer === 0,
                 animate__headShake:emailWobble === true || addressWobble === true,
                  'card-error': billingCardError }" flat>
          <v-expansion-panels v-model="billingAddressDrawer" flat>
            <v-expansion-panel>
              <v-expansion-panel-header class="px-5 pb-0 pt-0">
                <div>
                  <h2 class="text-h6">{{ $t('_shop.labels.billingAddress') }}</h2>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content eager>
                <v-row class="d-flex">
                  <v-col cols="12" sm="6" class="mt-0 pt-0">
                    <!-- Billing address -->
                    <v-card class="animate__animated vh-cart-address mt-3 card-rounded" outlined
                            :class="{animate__headShake:addressWobble === true}">
                      <v-card-title>
                        <v-icon left>mdi-map-marker</v-icon>
                        {{ $t('_shop.labels.billingAddress') }}
                      </v-card-title>
                      <v-card-text class="body-1">
                        <Address hidden incognito
                                 v-if="currentAddress != null" :address="currentAddress"/>
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
                           @user-changed="refreshUser" :outlined="true"
                           :user="$store.getters.user"
                           :class="{animate__headShake:emailWobble === true}"/>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
        <!-- Payment Methods -->
        <v-fade-transition>
          <v-card class="mt-3 card-rounded vh-select-payment-gateway" flat
                  v-if="openPurchase || cartPackets.length > 0"
                  :class="{ 'card-next-step': billingAddressDrawer == null }">
            <v-card-title class="d-block">
              <h2 class="text-h6">{{ $t('_shop.messages.selectGateway') }}</h2>
              <v-divider class="mt-3"/>
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
                               v-if="getImgUrl(gateway) != null"/>
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
                <!-- No payment gateways available -->
                <v-col cols="6" sm="6" md="4" lg="3" v-if="gateways.length === 0">
                  <v-card outlined>
                    <v-card-text class="text-center">
                      {{ $t('noDataAvailable') }}
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
        </v-fade-transition>
      </v-col>

      <!-- Cart total, address and checkout -->
      <v-col cols="12" lg="4" xl="3">
        <!-- Cart total -->
        <v-card class="vh-cart-total card-rounded" flat>
          <v-alert type="error" v-if="errorMessage">
            {{ errorMessage }}
          </v-alert>
          <v-card-title>
            <v-icon left>mdi-cart</v-icon>
            {{ openPurchase ? $t('_shop.labels.total') : $t('_shop.labels.cartTotal') }}
          </v-card-title>
          <v-card-text class="body-1">
            <CartTotal :price="price"/>
          </v-card-text>
          <!-- Checkboxes (hide when open purchase)-->
          <div class="px-3" v-if="checkboxes != null && !openPurchase">
            <v-form v-model="allChecked" ref="checkboxesForm" lazy-validation>
              <v-checkbox required v-for="checkbox in checkboxes" v-bind:key="checkbox.id"
                          hide-details="auto"
                          :rules="[v => !!v || $t('_shop.messages.mustAgree')]" class="mt-1">
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
          </div>
          <v-card-text v-else-if="!openPurchase">
            <v-skeleton-loader type="heading"/>
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
            <v-btn color="primary" depressed block class="cta-btn"
                   :disabled="cartPackets.length === 0 && !openPurchase"
                   @click="startCheckout">
              <v-icon left>mdi-cart-arrow-right</v-icon>
              {{ openPurchase ? $t('_shop.labels.payNow') : $t('_shop.labels.purchaseNow') }}
            </v-btn>
          </v-card-actions>
        </v-card>
        <!-- Discount Codes -->
        <v-card class="vh-cart-discount card-rounded mt-3" flat>
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
        <!-- Your Accounts -->
        <v-card class="vh-cart-accounts card-rounded mt-3" flat>
          <v-card-title>
            <v-icon left>mdi-account-group</v-icon>
            {{ $t('_shop.labels.yourAccounts') }}
          </v-card-title>
          <v-card-text v-if="$store.getters.isLoggedIn">
            <div>
              <v-chip style="width: 100%" outlined>
                <v-icon left>{{ UserService.userTypeIcons[$store.getters.user.type] }}</v-icon>
                {{ $store.getters.user.username }}
              </v-chip>
            </div>
            <div v-if="$store.getters.user.linked_users">
              <div v-for="acc in $store.getters.user.linked_users"
                   :key="acc.id" class="mt-1">
                <v-chip style="width: 100%" outlined>
                  <v-icon left>{{ UserService.userTypeIcons[acc.type] }}</v-icon>
                  {{ acc.username }}
                </v-chip>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Skeleton loaders -->
    <v-row v-else>
      <v-col cols="12" lg="9" md="8">
        <div>
          <v-skeleton-loader v-for="n in 3" class="mb-3"
                             v-bind:key="n"
                             type="card-heading, list-item-avatar, actions"/>
        </div>
      </v-col>
      <v-col>
        <v-skeleton-loader type="article"/>
        <v-skeleton-loader type="article, actions" class="mt-3"/>
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
    <v-dialog v-model="redirectDialog" max-width="500px" persistent>
      <v-card class="card-rounded text-center pa-3">
        <h2 class="text-h5 text-capitalize mb-2">{{ $t('_shop.labels.pleaseWait') }}</h2>
        <p>{{ $t('_shop.labels.redirectDescription') }}</p>
        <v-progress-circular indeterminate class="mb-3 mt-3" size="50" color="primary"/>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AddressForm from '@/forms/AddressForm';
import DialogForm from '@/components/DialogForm.vue';
import ShopService from '@/services/ShopService';
import Address from '@/components/Address.vue';
import CartPacket from '@/components/ShopComponents/CartPacket.vue';
import CartTotal from '@/components/ShopComponents/CartTotal.vue';
import Dialog from '@/components/Dialog.vue';
import Email from '@/components/PersonalSettings/Email.vue';
import AuthService from '@/services/AuthService';
import RecommendedPacketsCart from '@/components/ShopComponents/RecommendedPacketsCart.vue';
import PageTitleFlat from '@/components/PageTitleFlat.vue';
import openapiCached from '@/api/openapiCached';
import EventBus from '@/services/EventBus';
import UserService from '@/services/UserService';
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
      allChecked: false,
      redirectDialog: false,
      generalConfig: null,
      errorMessage: null,
      billingCardError: null,
    };
  },
  beforeMount() {
    this.fetchData();
    this.queryAddresses();
    this.fetchShopConfig();
    EventBus.on('cart-packet-added', this.fetchData);
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
        cartData = {};
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
          this.fetchGateways();
        });
    },
    async fetchGateways() {
      const api = await openapi;
      if (this.openPurchase == null) {
        // Gateways when no Purchase
        api.shop_getAvailableGateways().then((rsp) => {
          this.gateways = rsp.data;
          if (rsp.data.length > 0 && this.selectedGateway == null) {
            this.selectedGateway = rsp.data[0].id;
          }
        });
      } else {
        // Different Endpoint when Purchase is available
        api.shop_getPurchaseGateways({ uuid: this.openPurchase.id }).then((rsp) => {
          this.gateways = rsp.data;
          if (rsp.data.length > 0 && this.selectedGateway == null) {
            this.selectedGateway = rsp.data[0].id;
          }
        });
      }
    },
    async fetchShopConfig() {
      const apiCached = await openapiCached;

      apiCached.shop_getConfig().then((rsp) => {
        this.generalConfig = rsp.data;

        // if (this.checkboxes != null && this.checkboxes.length === 0) {
        //   this.confirmed = true;
        // }
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
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
        this.billingCardError = false;
      }).catch((err) => {
        console.log(err);
        this.$refs.addressAddDialog.setError(err);
      });
    },
    selectAddress(address) {
      ShopService.selectAddress(address);
      this.$notify({
        title: this.$t('_messages.editSuccess'),
        type: 'success',
      });
      this.$refs.selectAddressDialog.close();
    },
    async startCheckout() {
      // Set error when no gateway is selected
      if (this.selectedGateway == null) {
        this.errorMessage = this.$t('_shop.messages.selectGateway');
        return;
      }

      // SKip checks when open purchase
      if (this.openPurchase == null) {
        // Check for missing address or email and wobble
        if (this.currentAddress == null || this.$refs.emailCard.user.email == null) {
          if (this.currentAddress == null) {
            this.addressWobble = true;
            this.billingCardError = true;
          }
          if (this.$refs.emailCard.user.email == null) {
            this.emailWobble = true;
            this.billingCardError = true;
          }
          setTimeout(() => {
            this.emailWobble = false;
            this.addressWobble = false;
          }, 500);
          this.showDetails = true;
          return;
        }
        this.billingCardError = false;

        // Check for missing checkboxes
        await this.$refs.checkboxesForm.validate();
        if (!this.allChecked) {
          return;
        }
      }

      const api = await openapi;
      this.redirectDialog = true;

      // Continue Purchase
      if (this.openPurchase != null) {
        await this.startPayment();
        return;
      }
      // Create and start Purchase
      api.shop_startCheckout(undefined, { address_id: this.currentAddress.id }).then((rsp) => {
        this.openPurchase = rsp.data;
        // this.$refs.checkoutDialog.show(purchase);
        this.startPayment();
        this.fetchData();
      }).catch((err) => {
        console.log(err);
        this.redirectDialog = false;
        this.utils.notifyUnexpectedError(err.response.data);
        this.fetchData();
      });
    },
    async startPayment() {
      const api = await openapi;

      this.errorMessage = null;

      api.shop_startPayment(undefined, {
        purchase_id: this.openPurchase.id,
        payment_gateway_id: this.selectedGateway,
      }).then((rsp) => {
        const { action, debit } = rsp.data;
        console.log(action, debit);

        ShopService.executeAction(debit, action).catch((err) => {
          this.errorMessage = this.$t('_shop.messages.paymentActionFailed', { message: err });
        });
      }).catch((err) => {
        this.redirectDialog = false;
        this.errorMessage = this.$t('_shop.messages.startingPaymentFailed');
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
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
    UserService() {
      return UserService;
    },
    currentAddress() {
      return this.$store.getters.address;
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
    packetsToShow() {
      if (this.cartPackets.length > 0) {
        return this.cartPackets;
      }
      if (this.openPurchase && this.openPurchase.cart_packets.length > 0) {
        return this.openPurchase.cart_packets;
      }
      return null;
    },
    price() {
      if (this.openPurchase == null) {
        return this.cartPrice;
      }
      return {
        net: this.openPurchase.amount_net,
        total: this.openPurchase.amount_total,
        currency: this.openPurchase.currency,
        tax_rate: this.openPurchase.tax_rate,
        amount_tax: this.openPurchase.amount_tax,
        tax_info: this.openPurchase.tax_info,
        credits: this.openPurchase.credits,
      };
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

.card-error
  border-style: solid !important
  border-width: 2px !important
  border-color: var(--v-error-base) !important

.packet-list-move, .packet-list-enter-active, .packet-list-leave-active
  transition: all 0.5s ease

.packet-list-enter-from, .packet-list-leave-to
  opacity: 0
  transform: translateX(30px)

.packet-list-leave-active
  position: absolute

.vh-cart-packets
  transition: all 0.5s ease
</style>
