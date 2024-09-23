<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="800px"
    >
      <v-card
        v-if="packet"
        class="card-rounded"
      >
        <v-card-text class="pa-5">
          <v-row>
            <!-- Image column -->
            <v-col
              cols="12"
              sm="5"
            >
              <v-card
                class="pa-1"
                flat
                border
              >
                <PacketImage
                  :packet="packet"
                  style="border-radius: 3px"
                >
                  <div
                    class="d-flex"
                    style="height: 100%"
                  >
                    <v-row
                      v-if="packet.title_in_image"
                      align="center"
                      justify="center"
                      class="text-h4 text-center ml-2 mr-2 font-weight-bold text-white"
                      style="text-shadow: #000000 2px 2px 2px;"
                    >
                      {{ packet.title_in_image }}
                    </v-row>
                  </div>
                </PacketImage>
                <v-alert
                  v-if="packet.active_for != null || packet.recurring"
                  density="compact"
                  text
                  color="secondary"
                  variant="outlined"
                  class="font-weight-bold text-center mt-2 mb-0"
                >
                  <v-icon
                    v-if="packet.recurring"
                    color="secondary"
                    start
                  >
                    mdi-calendar-sync
                  </v-icon>
                  <v-icon
                    v-else
                    color="secondary"
                  >
                    mdi-clock-end
                  </v-icon>
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
            <v-col
              cols="12"
              sm="7"
              class="d-flex flex-column"
            >
              <!-- Headline -->
              <h1
                class="mt-2"
                :class="{ 'text-center': $vuetify.display.xs }"
              >
                {{ packet.title }}
              </h1>
              <!-- Price -->
              <div v-if="!cartPacket">
                <div
                  v-if="!packet.custom_price"
                  class="mt-2 mb-1"
                  :class="{ 'd-flex justify-center align-center': $vuetify.display.xs }"
                >
                  <div
                    class="ml-1"
                    style="line-height: 0.9em"
                    :class="{ 'text-center': $vuetify.display.xs }"
                  >
                    <span
                      v-if="packet.discount != null"
                      class="strikethrough-diagonal mr-2 text--disabled"
                    >
                      {{ utils.formatDecimal(packet.price_without_discount.total) }}
                    </span>
                    <span style="color: var(--v-success-base); font-weight: 900; font-size: large">
                      {{ utils.formatDecimal(packet.price_with_discount.total) }}
                      {{ packet.currency.name }}
                    </span>
                  </div>
                  <div
                    v-if="packet.price_with_discount.credits != null"
                    class="font-weight-bold ml-1 my-auto"
                  >
                    {{ $t('or') }}
                    {{ packet.price_with_discount.credits }}
                    {{ $store.getters.shopConfig.credits_display_title }}
                  </div>
                </div>
                <span
                  v-else
                  class="font-weight-bold mt-1"
                  :class="{ 'text-center': $vuetify.display.xs }"
                >
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
              <div
                v-if="!hideBuyBtns"
                :class="{ 'mt-7': $vuetify.display.xs }"
                class="mt-1"
              >
                <v-btn
                  v-if="!$store.getters.isLoggedIn"
                  color="info"
                  size="large"
                  block
                  @click="$router.push({ path: $route.path,
                                         query: {
                                           login: 'true',
                                           return_url: utils.getFullUrl($route.path),
                                           shop: true
                                         }})"
                >
                  <v-icon start>
                    mdi-lock
                  </v-icon>
                  {{ $t('_shop.labels.loginToBuy') }}
                </v-btn>
                <div v-if="packet.custom_price && !cartPacket">
                  <v-form
                    ref="minPriceForm"
                    v-model="minPriceFormValid"
                    class="d-flex align-start mb-2"
                    @submit.prevent="addToCart()"
                  >
                    <v-text-field
                      v-model="customPrice"
                      :style="packet.price_with_discount.credits != null ? 'max-width: 33%' : ''"
                      type="number"
                      :rules="[v => v >= packet.price_with_discount.total
                        || $t('_shop.messages.priceMustBeHigherThanMin')]"
                      hide-details="auto"
                      :min="packet.price_with_discount.total"
                      :prefix="packet.currency.symbol"
                      @keydown.enter="addToCart()"
                    />
                    <v-text-field
                      v-if="packet.price_with_discount.credits != null"
                      v-model="customCredits"
                      style="max-width: 66%"
                      class="ml-1"
                      type="number"
                      :rules="[v => v >= packet.price_with_discount.credits
                        || $t('_shop.messages.priceMustBeHigherThanMin')]"
                      hide-details="auto"
                      :prefix="$store.getters.shopConfig.credits_display_title"
                      :min="packet.price_with_discount.credits"
                      @keydown.enter="addToCart()"
                    />
                  </v-form>
                </div>
                <div
                  v-if="$store.getters.isLoggedIn"
                  class="d-flex align-center mb-1"
                >
                  <v-btn
                    ref="addToCartBtn"
                    color="primary"
                    :loading="loading"
                    variant="flat"
                    size="large"
                    :disabled="!minPriceFormValid"
                    class="cta-btn button-rounded"
                    style="width: 66%"
                    @click="addToCart()"
                  >
                    <v-icon start>
                      mdi-cart-arrow-down
                    </v-icon>
                    {{ $t('_shop.labels.addToCart') }}
                  </v-btn>
                  <v-btn
                    color="secondary"
                    class="cta-btn button-rounded ml-1"
                    variant="flat"
                    size="large"
                    style="width: 33%"
                    :disabled="!minPriceFormValid"
                    @click="$refs.giftPacketDialog.show()"
                  >
                    <v-icon>
                      mdi-gift-open
                    </v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
          <!-- Description -->
          <v-card
            v-if="packet.description"
            class="flex d-flex flex-column vh-shop-package-description bg-transparent"
            flat
          >
            <v-card-title class="px-0 mx-0">
              <v-icon
                color="primary"
                start
              >
                mdi-star-four-points
              </v-icon>
              <span
                class="font-weight-bold"
                style="font-size: larger;"
              >
                {{ $t('_shop.labels.productDescription') }}
              </span>
            </v-card-title>
            <span
              class="ql-editor ma-0 pa-0"
              v-html="packet.description"
            />
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
    <DialogForm
      ref="giftPacketDialog"
      :title="$t('_shop.labels.changeTargetUser')"
      :form-schema="cartPacketTargetUserForm"
      icon="mdi-account-switch"
      @submit="buyForAnotherUser"
    />
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
