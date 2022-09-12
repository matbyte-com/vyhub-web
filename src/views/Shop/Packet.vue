<template>
    <div>
      <div v-if="packet != null">
        <PageTitle icon="mdi-gift-open" :subtitle="packet.subtitle">
          {{ packet.title }}
        </PageTitle>

        <v-row>
          <v-col md="3" lg="3" cols="12" class="d-flex flex-column">
            <v-card class="flex d-flex flex-column">
              <v-card-title>
                <v-icon left>mdi-archive-star</v-icon>
                {{ $t('summary') }}
              </v-card-title>
              <v-card-text>
                <v-img
                  :src="packet.image_url"
                ></v-img>
                <v-alert
                  dense
                  text
                  color="info"
                  outlined
                  class="font-weight-bold text-center mt-2"
                  v-if="packet.active_for != null"
                >
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
          <v-col md="6" lg="6" cols="12" class="d-flex flex-column">
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
          <v-col md="3" lg="3" cols="12" class="d-flex flex-column">
            <v-card class="flex d-flex flex-column">
              <v-card-title>
                <v-icon left>mdi-currency-usd</v-icon>
                {{ $t('price') }}
              </v-card-title>
              <v-card-text class="text-center">
                <v-row>
                  <v-col>
                    <div class="text-h2 d-flex align-center justify-center">
                      <span class="text-h5 strikethrough-diagonal mr-2 text--disabled"
                            v-if="packet.discount != null">
                        {{ utils.formatDecimal(packet.price_without_discount.total) }}
                        {{ packet.currency.symbol }}
                      </span>
                      {{ utils.formatDecimal(packet.price_with_discount.total) }}
                      {{ packet.currency.symbol }}
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
                    <div class="text-h5">
                      {{ packet.price_with_discount.credits }}
                      {{ $t('_shop.labels.credits') }}
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
                <v-btn block color="success" @click="addToCart" v-else>
                  <v-progress-circular v-if="loading" indeterminate size="25" width="2"/>
                  <div v-else>
                    <v-icon left>mdi-cart-arrow-down</v-icon>
                    {{ $t('_shop.labels.addToCart') }}
                  </div>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
</template>

<script>
import UtilService from '@/services/UtilService';
import ShopService from '../../services/ShopService';
import PageTitle from '../../components/PageTitle.vue';
import openapi from '../../api/openapi';
import openapiCached from '../../api/openapiCached';

export default {
  components: { PageTitle },
  data() {
    return {
      packet: null,
      loading: false,
      addSuccess: false,
      addFail: false,
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
        });
    },
    async addToCart() {
      const api = await openapi;

      this.loading = true;
      this.addFail = false;
      this.addSuccess = false;

      api.shop_addPacketToCart(undefined, { packet_id: this.packet.id }).then(() => {
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
  },
};
</script>

<style scoped>

</style>
