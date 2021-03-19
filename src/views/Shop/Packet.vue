<template>
    <div>
      <div v-if="packet != null">
        <PageTitle>{{ $t('packet') }}: {{ packet.title }}</PageTitle>

        <v-row>
          <v-col md="8" lg="9" class="d-flex">
            <v-card outlined class="flex-grow-1">
              <v-card-title>{{ packet.title }}</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col lg="4">
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
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col>
                    <span v-if="packet.subtitle" class="subtitle-1">{{ packet.subtitle }}</span>
                    <br v-if="packet.subtitle" />
                    <div class="body-2">
                      {{ packet.description }}
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="d-flex">
            <v-card outlined class="flex-grow-1">
              <v-card-title>{{ $t('price') }}</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <span class="text-h2">
                  {{ packet.price_with_discount.total.toFixed(2).toLocaleString() }}
                  {{ packet.currency.symbol }}
                </span>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="success" @click="addToCart">
                  <v-icon class="mr-1">mdi-cart-arrow-down</v-icon>
                  {{ $t('_shop.labels.addToCart') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
</template>

<script>
import PageTitle from '../../components/PageTitle.vue';
import utilService from '../../services/UtilService';
import api from '../../api/api';
import ShopService from '../../services/ShopService';

export default {
  components: { PageTitle },
  data() {
    return {
      packet: null,
      formatLength: utilService.formatLength,
    };
  },
  beforeMount() {
    this.queryData();
  },
  methods: {
    queryData() {
      api.shop.getPackets(this.$route.params.categoryId)
        .then((rsp) => {
          this.packet = rsp.data.find((p) => p.id === this.$route.params.packetId);
        });
    },
    addToCart() {
      api.shop.addToCart(this.packet.id).then(() => {
        this.$notify({
          title: this.$t('_shop.messages.addToCartSuccess'),
          type: 'success',
        });
        ShopService.refreshCartPacketCount();
      }).catch((err) => {
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
