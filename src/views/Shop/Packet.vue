<template>
    <div>
      <div v-if="packet != null">
        <PageTitle>{{ packet.title }}</PageTitle>
        <div class="subtitle-1">{{ packet.subtitle }}</div>
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
              <v-card-title>{{ $t('price') }}</v-card-title>
              <v-card-text class="text-center">
                <div class="text-h2">
                  {{ packet.price_with_discount.total
                  .toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                  {{ packet.currency.symbol }}
                </div>
                <div class="subtitle-2 font-italic">
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
import utilService from '../../services/UtilService';
import api from '../../api/api';
import ShopService from '../../services/ShopService';
import PageTitle from '../../components/PageTitle.vue';

export default {
  components: { PageTitle },
  data() {
    return {
      packet: null,
      formatLength: utilService.formatLength,
      loading: false,
      addSuccess: false,
      addFail: false,
    };
  },
  beforeMount() {
    this.queryData();
  },
  methods: {
    queryData() {
      const countryCode = (this.$store.getters.address != null
        ? this.$store.getters.address.country.code : null);

      api.shop.getPackets(this.$route.params.categoryId, countryCode)
        .then((rsp) => {
          this.packet = rsp.data.find((p) => p.id === this.$route.params.packetId);
        });
    },
    addToCart() {
      this.loading = true;
      this.addFail = false;
      this.addSuccess = false;

      api.shop.addToCart(this.packet.id).then(() => {
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
