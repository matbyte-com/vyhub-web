<template>
<div>
  <v-dialog
    max-width="1000px"
    v-model="dialog">
    <v-card>
      <v-card-text class="pa-5">
        <v-row>
          <!-- Image column -->
          <v-col cols="12" sm="5">
            <v-img :src="packet.image_url">
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
              color="info"
              outlined
              class="font-weight-bold text-center mt-2"
              v-if="packet.active_for != null">
              <v-icon color="info" left>
                mdi-clock-end
              </v-icon>
              {{ utils.formatLength(packet.active_for) }}
            </v-alert>
          </v-col>
          <!-- Price and buy column -->
          <v-col cols="12" sm="7">
            <div class="text-center">
              <v-row>
                <v-col>
                  <div class="text-h2 d-flex align-center justify-center"
                       v-if="!packet.custom_price">
                      <span class="text-h5 strikethrough-diagonal mr-2 text--disabled"
                            v-if="packet.discount != null">
                        {{ utils.formatDecimal(packet.price_without_discount.total) }}
                        {{ packet.currency.symbol }}
                      </span>
                    {{ utils.formatDecimal(packet.price_with_discount.total) }}
                    {{ packet.currency.symbol }}
                  </div>
                  <div v-else>
                    <v-chip label class="font-weight-bold" color="primary">
                      {{ $t('_packet.messages.customPricePossible') }}
                    </v-chip>
                    <v-row justify="center" class="text-center mt-2">
                      <v-col cols="12" xl="4" lg="6">
                        <v-text-field
                          :label="$t('price')"
                          v-model="customPrice"
                          type="number"
                          :min="packet.price_with_discount.total"
                          :prefix="packet.currency.symbol"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                  <div v-if="packet.recurring" class="text-h6 mt-2">
                    <v-icon>mdi-calendar-sync</v-icon>
                    {{ $t('every') }}
                    {{ utils.formatLength(packet.active_for) }}
                  </div>
                  <div class="subtitle-2 font-italic mt-2"
                       v-if="packet.price_with_discount.tax_rate > 0">
                    {{ $t('_shop.messages.includesVAT',
                    { tax_rate: packet.price_with_discount.tax_rate }) }}
                  </div>
                </v-col>
              </v-row>
              <v-row align="center" v-if="packet.price_with_discount.credits != null">
                <v-divider></v-divider>
                <span class="mr-3 ml-3">{{ $t('or') }}</span>
                <v-divider></v-divider>
              </v-row>
              <!-- Description -->
              <v-row v-if="packet.price_with_discount.credits != null">
                <v-col>
                  <div class="text-h5" v-if="!packet.custom_price">
                    {{ packet.price_with_discount.credits }}
                    {{ $store.getters.shopConfig.credits_display_title }}
                  </div>
                  <div v-else>
                    <v-row justify="center" class="text-center">
                      <v-col cols="12" xl="5" lg="7">
                        <v-text-field
                          v-model="customCredits"
                          :label="$store.getters.shopConfig.credits_display_title"
                          type="number"
                          :min="packet.price_with_discount.credits"
                          :suffix="$store.getters.shopConfig.credits_display_title"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </div>
            <v-spacer />
            <v-card-actions>
              <v-btn block color="info"
                     v-if="!$store.getters.isLoggedIn"
                     @click="$router.push({ path: $route.path,
                       query: { login: 'true', return_url: getReturnUrl() }})">
                <v-icon left>mdi-lock</v-icon>
                {{ $t('_shop.labels.loginToBuy') }}
              </v-btn>
              <div v-else class="d-flex" style="width: 100%">
                <v-btn color="success" @click="addToCart()" class="flex-grow-1">
                  <v-progress-circular v-if="loading" indeterminate size="25" width="2"/>
                  <div v-else>
                    <v-icon left>mdi-cart-arrow-down</v-icon>
                    {{ $t('_shop.labels.addToCart') }}
                  </div>
                </v-btn>
                <v-btn color="secondary" class="ml-1" @click="$refs.giftPacketDialog.show()">
                  <v-icon>
                    mdi-gift-open
                  </v-icon>
                </v-btn>
              </div>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-card class="flex d-flex flex-column vh-shop-package-description">
          <v-card-title>
            <v-icon left>mdi-image-text</v-icon>
            {{ $t('description') }}
          </v-card-title>
          <v-card-text>
                <span v-html="packet.description" class="ql-editor">
                </span>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  name: 'PacketDetailDialog',
  data() {
    return {
      dialog: false,
      packet: null,
    };
  },
  methods: {
    show(packet) {
      this.dialog = true;
      this.packet = packet;
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>

</style>