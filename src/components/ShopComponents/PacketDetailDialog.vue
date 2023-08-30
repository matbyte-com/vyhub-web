<template>
<div>
  <v-dialog
    max-width="800px"
    v-model="dialog">
    <!-- TODO Better Animation -->
    <!-- TODO Make Packet Dialog Available for Cart Packets -->
    <v-card v-if="packet" class="card-rounded">
      <v-card-text class="pa-5">
        <v-row>
          <!-- Image column -->
          <v-col cols="12" sm="5">
            <v-card class="pa-1" flat outlined>
              <v-img :src="packet.image_url" style="border-radius: 3px">
                <div class="d-flex" style="height: 100%">
                  <v-row align="center" justify="center" class="text-h4 text-center ml-2 mr-2
                           font-weight-bold white--text"
                         style="text-shadow: #000000 2px 2px 2px;"
                         v-if="packet.title_in_image">
                    {{ packet.title_in_image }}
                  </v-row>
                </div>
              </v-img>
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
                <span v-if="packet.recurring">{{ $t('every') }}</span>
                {{ utils.formatLength(packet.active_for) }}
              </v-alert>
            </v-card>
          </v-col>
          <!-- Price and buy column -->
          <v-col cols="12" sm="7" class="d-flex flex-column">
            <!-- Headline -->
            <h1 class="mt-2">{{ packet.title }}</h1>
            <!-- Price -->
            <div v-if="!packet.custom_price">
              <div class="d-flex align-center mt-2 ml-1" style="line-height: 0.9em">
                <span class="strikethrough-diagonal mr-2 text--disabled"
                      v-if="packet.discount != null">
                  {{ utils.formatDecimal(packet.price_without_discount.total) }}
                </span>
                <span style="color: var(--v-success-base); font-weight: 900; font-size: large">
                  {{ utils.formatDecimal(packet.price_with_discount.total) }}
                  {{ packet.currency.name }}
                </span>
                </div>
                <div v-if="packet.price_with_discount.credits != null">
                  <div class="font-weight-bold ml-1" v-if="!packet.custom_price">
                     {{ $t('or') }}
                    {{ packet.price_with_discount.credits }}
                    {{ $store.getters.shopConfig.credits_display_title }}
                  </div>
              </div>
            </div>
            <span class="font-weight-bold mt-1" v-else>
              {{ $t('_packet.messages.customPricePossible') }}
            </span>
            <!-- Custom Price -->
            <v-spacer />
            <!-- Recurring Packets
            <div v-if="packet.recurring" class="text-h6 mt-2">
              <v-icon>mdi-calendar-sync</v-icon>
              {{ $t('every') }}
              {{ utils.formatLength(packet.active_for) }}
            </div>-->
            <!--
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
            <v-btn color="info" large
                   v-if="!$store.getters.isLoggedIn"
                   @click="$router.push({ path: $route.path,
                     query: { login: 'true', return_url: getReturnUrl() }})">
              <v-icon left>mdi-lock</v-icon>
              {{ $t('_shop.labels.loginToBuy') }}
            </v-btn>
            <v-row v-else dense>
              <v-col :cols="packet.price_with_discount.credits ? 4 : 12 "
                     v-if="packet.custom_price">
                <v-text-field
                  v-model="customPrice"
                  type="number"
                  hide-details="auto"
                  :min="packet.price_with_discount.total"
                  :prefix="packet.currency.symbol"/>
              </v-col>
              <v-col cols="8"
                     v-if="packet.custom_price &&packet.price_with_discount.credits != null">
                <v-text-field
                  v-if="packet.price_with_discount.credits != null"
                  v-model="customCredits"
                  type="number"
                  hide-details="auto"
                  :prefix="$store.getters.shopConfig.credits_display_title"
                  :min="packet.price_with_discount.credits"/>
              </v-col>
              <v-col cols="8">
                <v-btn color="primary" ref="addToCartBtn" :loading="loading" depressed large
                       @click="addToCart()" class="cta-btn button-rounded" block>
                  <v-icon left>mdi-cart-arrow-down</v-icon>
                  {{ $t('_shop.labels.addToCart') }}
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn color="secondary" class="cta-btn button-rounded" block depressed large
                       @click="$refs.giftPacketDialog.show()">
                  <v-icon>
                    mdi-gift-open
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!-- Description -->
        <v-card class="flex d-flex flex-column vh-shop-package-description transparent" flat>
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

export default {
  name: 'PacketDetailDialog',
  components: { DialogForm },
  props: ['packet'],
  data() {
    return {
      dialog: false,
      loading: false,
      cartPacketTargetUserForm,
      customPrice: null,
      customCredits: null,
      addToCartBtnWidth: 0,
    };
  },
  methods: {
    show() {
      this.dialog = true;
      this.$nextTick(() => {
        console.log(this.$refs.addToCartBtn.$el.offsetWidth);
      });
      this.customPrice = this.packet.price_with_discount.total;
      this.customCredits = this.packet.price_with_discount.credits;
    },
    close() {
      this.dialog = false;
    },
    async addToCart(target_user_id = null) {
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
