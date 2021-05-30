<template>
    <div>
      <div v-if="packet != null">
        <PageTitle icon="mdi-gift-open" :subtitle="packet.subtitle">
          {{ packet.title }}
        </PageTitle>

        <v-row>
          <v-col md="8" lg="9">
            <v-row>
              <v-col lg="4" class="d-flex">
                <v-card class="flex-grow-1">
                  <v-card-text>
                    <v-img
                      :src="packet.image_url"
                    ></v-img>
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
              <v-col class="d-flex">
                <v-card class="flex-grow-1">
                  <v-card-text>
                    <div class="body-2">
                      {{ packet.description }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="d-flex">
            <v-card class="flex-grow-1">
              <v-card-title>
                <v-icon left>mdi-currency-usd</v-icon>
                {{ $t('price') }}
              </v-card-title>
              <v-card-text class="text-center">
                <div class="text-h2">
                  {{ packet.price_with_discount.total
                  .toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                  {{ packet.currency.symbol }}
                </div>
                <div v-if="packet.recurring" class="text-h6 mt-1">
                  <v-icon>mdi-calendar-sync</v-icon>
                  {{ $t('every') }}
                  {{ utils.formatLength(packet.active_for) }}
                </div>
                <div class="subtitle-2 font-italic mt-2">
                  {{ $t('_shop.messages.includesVAT',
                  { tax_rate: packet.price_with_discount.tax_rate }) }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="success" @click="addToCart">
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
    this.queryData();
  },
  methods: {
    async queryData() {
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
        this.loading = false;
        this.addFail = true;

        this.$notify({
          title: this.$t('_shop.messages.addToCartError'),
          text: this.$t(`_shop.errors.${err.response.data.detail.code}`, err.response.data.detail.detail),
          type: 'error',
        });
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>

</style>
