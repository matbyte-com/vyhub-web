<template>
<div>
  <v-dialog
    max-width="800px"
    v-model="dialog">
    <v-card v-if="packet" class="card-rounded">
      <v-card-text class="pa-5">
        <v-row>
          <!-- Image column -->
          <v-col cols="12" sm="5">
            <v-card class="pa-1" flat outlined>
              <PacketImage :packet="packet" style="border-radius: 3px">
                <div class="d-flex" style="height: 100%">
                  <v-row align="center" justify="center" class="text-h4 text-center ml-2 mr-2
                           font-weight-bold white--text"
                         style="text-shadow: #000000 2px 2px 2px;"
                         v-if="packet.title_in_image">
                    {{ packet.title_in_image }}
                  </v-row>
                </div>
              </PacketImage>
              <v-alert
                dense
                text
                color="secondary"
                outlined
                class="font-weight-bold text-center mt-2 mb-0"
                v-if="packet.active_for != null || packet.recurring">
                  <v-icon color="secondary" left v-if="packet.recurring">
                    mdi-calendar-sync
                  </v-icon>
                  <v-icon color="secondary" v-else>mdi-clock-end</v-icon>
                  <span v-if="packet.recurring">
                    <span v-if="utils.isSingularTimeunit(packet.active_for)">
                      {{ utils.isSingularTimeunit(packet.active_for) }}
                    </span>
                    <span v-else>
                      {{ $t('every') }}
                      {{ utils.formatLength(packet.active_for) }}
                    </span>
                  </span>
                <span v-else>{{ utils.formatLength(packet.active_for) }}</span>
              </v-alert>
            </v-card>
          </v-col>
          <!-- Price and buy column -->
          <v-col cols="12" sm="7" class="d-flex flex-column">
            <!-- Headline -->
            <h1 class="mt-2" :class="{ 'text-center': $vuetify.breakpoint.xs }">
              {{ packet.title }}
            </h1>
            <!-- Price -->
            <div v-if="!cartPacket">
              <div v-if="!packet.custom_price" class="mt-2 mb-1"
                   :class="{ 'd-flex justify-center align-center': $vuetify.breakpoint.xs }">
                <div class="ml-1" style="line-height: 0.9em"
                     :class="{ 'text-center': $vuetify.breakpoint.xs }">
                <span class="strikethrough-diagonal mr-2 text--disabled"
                      v-if="packet.discount != null">
                  {{ utils.formatDecimal(packet.price_without_discount.total) }}
                </span>
                  <span style="color: var(--v-success-base); font-weight: 900; font-size: large">
                  {{ utils.formatDecimal(packet.price_with_discount.total) }}
                  {{ packet.currency.name }}
                </span>
                </div>
                <div v-if="packet.price_with_discount.credits != null"
                     class="font-weight-bold ml-1 my-auto">
                  {{ $t('or') }}
                  {{ packet.price_with_discount.credits }}
                  {{ $store.getters.shopConfig.credits_display_title }}
                </div>
              </div>
              <span class="font-weight-bold mt-1"
                    :class="{ 'text-center': $vuetify.breakpoint.xs }" v-else>
                {{ $t('_packet.messages.customPricePossible') }}
              </span>
            </div>
            <!-- Custom Price -->
            <v-spacer />
            <!-- Recurring Packets
            TODO TAX Rate
            <div class="subtitle-2 font-italic mt-2"
                 v-if="packet.price_with_discount.tax_rate > 0">
              {{ $t('_shop.messages.includesVAT',
              { tax_rate: packet.price_with_discount.tax_rate }) }}
            </div>
            -->
            <!--
            OR
            <v-row align="center" v-if="packet.price_with_discount.credits != null">
              <v-divider></v-divider>
              <span class="mr-3 ml-3">{{ $t('or') }}</span>
              <v-divider></v-divider>
            </v-row>-->
            <!-- Abstracts -->
            <!--
            <v-list dense>
              <p class="pa-0 ma-0" v-for="point in packet.abstract" :key="point">
                  <v-icon>mdi-star</v-icon>
                <span class="body-2 pa-0 ma-0">
                  {{ point }}
                </span>
              </p>
            </v-list>-->
            <!-- Buy Button -->
            <div :class="{ 'mt-7': $vuetify.breakpoint.xs }" v-if="!hideBuyBtns" class="mt-1">
              <v-btn color="info" large block
                     v-if="!$store.getters.isLoggedIn"
                     @click="$router.push({ path: $route.path,
                     query: {
                        login: 'true',
                        return_url: utils.getFullUrl($route.path),
                        shop: true
                     }})">
                <v-icon left>mdi-lock</v-icon>
                {{ $t('_shop.labels.loginToBuy') }}
              </v-btn>
              <div v-if="packet.custom_price && !cartPacket">
                <v-form @submit.prevent="addToCart()"
                        class="d-flex align-start mb-2"
                        v-model="minPriceFormValid" ref="minPriceForm">
                  <v-text-field
                    @keydown.enter="addToCart()"
                    :style="packet.price_with_discount.credits != null ? 'max-width: 33%' : ''"
                    v-model="customPrice"
                    type="number"
                    :rules="[v => v >= packet.price_with_discount.total
                     || $t('_shop.messages.priceMustBeHigherThanMin')]"
                    hide-details="auto"
                    :min="packet.price_with_discount.total"
                    :prefix="packet.currency.symbol"/>
                  <v-text-field
                    @keydown.enter="addToCart()"
                    style="max-width: 66%"
                    class="ml-1"
                    v-if="packet.price_with_discount.credits != null"
                    v-model="customCredits"
                    type="number"
                    :rules="[v => v >= packet.price_with_discount.credits
                     || $t('_shop.messages.priceMustBeHigherThanMin')]"
                    hide-details="auto"
                    :prefix="$store.getters.shopConfig.credits_display_title"
                    :min="packet.price_with_discount.credits"/>
                </v-form>
              </div>
              <div class="d-flex align-center mb-1" v-if="$store.getters.isLoggedIn">
                <v-btn color="primary" ref="addToCartBtn" :loading="loading" depressed large
                       :disabled="!minPriceFormValid"
                       @click="addToCart()" class="cta-btn button-rounded" style="width: 66%">
                  <v-icon left>mdi-cart-arrow-down</v-icon>
                  {{ $t('_shop.labels.addToCart') }}
                </v-btn>
                <v-btn color="secondary" class="cta-btn button-rounded ml-1" depressed large
                       style="width: 33%" :disabled="!minPriceFormValid"
                       @click="$refs.giftPacketDialog.show()">
                  <v-icon>
                    mdi-gift-open
                  </v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
        <!-- Description -->
        <v-card class="flex d-flex flex-column vh-shop-package-description transparent" flat
                v-if="packet.description">
          <v-card-title class="px-0 mx-0">
            <v-icon color="primary" left>mdi-star-four-points</v-icon>
            <span class="font-weight-bold" style="font-size: larger;">
              {{ $t('_shop.labels.productDescription') }}
            </span>
          </v-card-title>
          <span v-html="packet.description" class="ql-editor ma-0 pa-0">
          </span>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
  <DialogForm :title="$t('_shop.labels.changeTargetUser')"
              :form-schema="cartPacketTargetUserForm"
              @submit="buyForAnotherUser"
              icon="mdi-account-switch"
              ref="giftPacketDialog" />
</div>
</template>

<script>
import openapi from '@/api/openapi';
import ShopService from '@/services/ShopService';
import DialogForm from '@/components/DialogForm.vue';
import cartPacketTargetUserForm from '@/forms/CartPacketTargetUserForm';
import EventBus from '@/services/EventBus';
import PacketImage from '@/components/ShopComponents/PacketImage.vue';

export default {
  name: 'PacketDetailDialog',
  components: { PacketImage, DialogForm },
  props: ['packet', 'cartPacket', 'hideBuyBtns'],
  data() {
    return {
      dialog: false,
      loading: false,
      cartPacketTargetUserForm,
      customPrice: null,
      customCredits: null,
      addToCartBtnWidth: 0,
      minPriceFormValid: true,
    };
  },
  methods: {
    show() {
      this.dialog = true;
      // If not CartPacket
      if (!this.cartPacket) {
        this.customPrice = this.packet.price_with_discount.total;
        this.customCredits = this.packet.price_with_discount.credits;
      }
    },
    close() {
      this.dialog = false;
    },
    async addToCart(target_user_id = null) {
      if (!this.minPriceFormValid) {
        return;
      }
      const api = await openapi;

      this.loading = true;

      const data = {
        packet_id: this.packet.id,
        custom_price: this.customPrice,
        custom_credits: this.customCredits,
        target_user_id,
      };

      if (!this.packet.custom_price) {
        data.custom_credits = null;
        data.custom_price = null;
      }

      api.shop_addPacketToCart(undefined, data).then(() => {
        this.loading = false;

        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
        this.dialog = false;
        ShopService.refreshCartPacketCount();
        // Caught in cart
        EventBus.emit('cart-packet-added');
      }).catch((err) => {
        console.log(err);

        this.loading = false;
        this.addFail = true;

        let errDet = (err.response.data.detail.code != null ? err.response.data.detail : null);

        if (err.response.status === 401) {
          errDet = {
            code: 'unauthorized',
            detail: { },
          };
        }

        /* this.$notify({
          title: this.$t('_shop.messages.addToCartError'),
          text: this.$t(`_errors.${errDet.code}`, errDet.detail),
          type: 'error',
        }); */
      });
    },
    async buyForAnotherUser() {
      const data = this.$refs.giftPacketDialog.getData();
      await this.addToCart(data.target_user_id).then(() => {
        this.$refs.giftPacketDialog.closeAndReset();
      });
    },
  },
};
</script>

<style>
.button-rounded {
  border-radius: 7px;
}
</style>
