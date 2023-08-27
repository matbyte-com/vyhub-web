<template>
<v-card class="vh-cart-recommended-packets-cart card-rounded"
        v-if="recommendedPackets !== null && recommendedPackets.length > 0">
  <v-card-title>
    <h2 class="text-h6">{{ $t('_shop.labels.recommended') }}</h2>
  </v-card-title>
  <v-card-text>
    <Swiper :number-of-elements="recommendedPackets.length" :per-page-custom="[1,1,3,3,3]">
      <swiper-slide v-for="p in recommendedPackets" :key="p.id" style="height: 85px;">
        <v-card class="card-rounded d-block" height="80px" width="100%"
                @click="selectedPacket = p; $refs.detailDialog.show()">
          <div class="d-flex">
            <v-img :src="p.image_url" :alt="p.title" max-width="40%" max-height="80px"
                   class="card-rounded">
              <div class="d-flex flex-column white--text text-h6" style="height: 80px">
                <v-row align="center" justify="center" v-if="p.title_in_image">
                  <div style="margin-bottom: auto;
                  margin-top: auto; text-shadow: #000000 2px 2px 2px;">
                    {{ p.title_in_image }}
                  </div>
                </v-row>
              </div>
            </v-img>
            <div class="pa-2 d-flex flex-column grow" style="height: 66px; max-width: 55%;">
              <h3 class="font-weight-bold text-wrap overflow-hidden"
                  style="font-size: 0.95em; line-height: 1.4em; height: 40px">
                {{ p.title }}
              </h3>
              <v-spacer />
              <div class="d-flex align-end">
          <span class="strikethrough-diagonal text--disabled mr-2"
                v-if="p.price_with_discount.total !== p.price_without_discount.total">
            {{ utils.formatDecimal(p.price_without_discount.total) }}
            {{ p.currency.symbol }}
          </span>
                <span class="primary--text" style="font-size: large">
            {{ p.price_with_discount.total
                  .toLocaleString(undefined, {minimumFractionDigits: 2})}}
            {{ p.currency.symbol }}
          </span>
                <v-spacer />
                <v-icon @click.stop="addToCart(p.id)" class="cart-add-animation"
                        color="primary">mdi-cart-plus</v-icon>
              </div>
            </div>
          </div>
        </v-card>
      </swiper-slide>
    </Swiper>
    <v-row v-if="false">
      <v-col cols="6" md="6" lg="6" xl="3" v-for="i in 4" :key="i">
        <v-skeleton-loader type="card" height="200" />
      </v-col>
    </v-row>
  </v-card-text>
  <PacketDetailDialog ref="detailDialog" :packet="selectedPacket" />
</v-card>
</template>

<script>
import openapi from '@/api/openapi';
import PacketDetailDialog from '@/components/ShopComponents/PacketDetailDialog.vue';
import ShopService from '@/services/ShopService';
import Swiper from '@/components/Swiper.vue';

export default {
  name: 'RecommendedPackets',
  components: { Swiper, PacketDetailDialog },
  data() {
    return {
      recommendedPackets: null,
      selectedPacket: null,
    };
  },
  beforeMount() {
    this.getRecommendedPackets();
  },
  methods: {
    async getRecommendedPackets() {
      (await openapi).shop_getPackets({ recommended: true, limit: 8 }).then((rsp) => {
        this.recommendedPackets = rsp.data;
      });
    },
    async addToCart(packet_id) {
      // Simpler Version of Add-To-Cart
      this.loading = true;
      const data = {
        packet_id,
      };

      (await openapi).shop_addPacketToCart(undefined, data).then(() => {
        this.loading = false;

        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
        ShopService.refreshCartPacketCount();
        this.$emit('cartChanged');
      }).catch((err) => {
        console.log(err);
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
.cart-add-animation {
  transition: all 0.2s ease-in-out;
}

.cart-add-animation:hover{
  transform: translateY(-3px);
}

</style>
