<template>
    <div>
      <div v-if="packet != null">
        <PageTitle icon="mdi-gift-open" :subtitle="packet.subtitle">
          {{ packet.title }}
        </PageTitle>

        <v-row>
          <v-col cols="12" md="6" xl="3" class="d-flex flex-column">
            <v-card class="flex d-flex flex-column">
              <v-card-title>
                <v-icon left>mdi-archive-star</v-icon>
                {{ $t('summary') }}
              </v-card-title>
              <v-card-text>
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
                <v-list dense>
                  <v-list-item v-for="point in packet.abstract" :key="point">
                    <v-list-item-icon>
                      <v-icon>mdi-star</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content class="body-2">
                      {{ point }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="12" xl="6" order-md="3" order-xl="2" class="d-flex flex-column">
            <v-card class="flex d-flex flex-column">
              <v-card-title>
                <v-icon left>mdi-image-text</v-icon>
                {{ $t('description') }}
              </v-card-title>
              <v-card-text>
                <span v-html="packet.description" class="ql-editor">
                </span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" xl="3" order-md="2" order-xl="3" class="d-flex flex-column">
            <v-card class="flex d-flex flex-column">
              <v-card-title>
                <v-icon left>mdi-currency-usd</v-icon>
                {{ $t('price') }}
              </v-card-title>
              <v-card-text class="text-center">
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
                <v-row v-if="packet.price_with_discount.credits != null">
                  <v-col>
                    <div class="text-h5" v-if="!packet.custom_price">
                      {{ packet.price_with_discount.credits }}
                      {{ $t('_shop.labels.credits') }}
                    </div>
                    <div v-else>
                      <v-row justify="center" class="text-center">
                        <v-col cols="12" xl="5" lg="7">
                          <v-text-field
                            v-model="customCredits"
                            :label="$t('_shop.labels.credits')"
                            type="number"
                            :min="packet.price_with_discount.credits"
                            :suffix="$t('_shop.labels.credits')"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-spacer></v-spacer>
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
            </v-card>
          </v-col>
        </v-row>
      </div>
      <DialogForm :title="$t('_shop.labels.changeTargetUser')"
                  :form-schema="cartPacketTargetUserForm"
                  @submit="buyForAnotherUser"
                  icon="mdi-account-switch"
                  ref="giftPacketDialog" />
    </div>
</template>

<script>
import UtilService from '@/services/UtilService';
import DialogForm from '@/components/DialogForm.vue';
import cartPacketTargetUserForm from '@/forms/CartPacketTargetUserForm';
import ShopService from '../../services/ShopService';
import PageTitle from '../../components/PageTitle.vue';
import openapi from '../../api/openapi';
import openapiCached from '../../api/openapiCached';

export default {
  components: { DialogForm, PageTitle },
  data() {
    return {
      packet: null,
      loading: false,
      addSuccess: false,
      addFail: false,
      customPrice: null,
      customCredits: null,
      cartPacketTargetUserForm,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    getReturnUrl() {
      return UtilService.data().utils.getFullUrl(this.$route.path);
    },
    async fetchData() {
      const apiCached = await openapiCached;

      let packetsData = null;

      if (this.$store.getters.address != null) {
        packetsData = {
          category_id: this.$route.params.categoryId,
          country_code: this.$store.getters.address.country.code,
        };
      } else {
        packetsData = {
          category_id: this.$route.params.categoryId,
        };
      }

      apiCached.shop_getPackets(packetsData)
        .then((rsp) => {
          this.packet = rsp.data.find((p) => p.id === this.$route.params.packetId);

          if (this.packet != null && this.packet.custom_price) {
            this.customPrice = this.packet.price_with_discount.total;
            this.customCredits = this.packet.price_with_discount.credits;
          }
        });
    },
    async addToCart(target_user_id = null) {
      const api = await openapi;

      this.loading = true;
      this.addFail = false;
      this.addSuccess = false;

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
        this.addSuccess = true;

        this.$notify({
          title: this.$t('_shop.messages.addToCartSuccess'),
          type: 'success',
        });
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

<style scoped>

</style>
