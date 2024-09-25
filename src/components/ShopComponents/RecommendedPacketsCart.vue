<template>
  <v-card
    v-if="recommendedPackets !== null && recommendedPackets.length > 0"
    class="vh-cart-recommended-packets-cart card-rounded"
    flat
  >
    <v-card-title>
      <h2 class="text-h6">
        {{ $t('_shop.labels.recommended') }}
      </h2>
    </v-card-title>
    <v-card-text>
      <Swiper
        :number-of-elements="recommendedPackets.length"
        :per-page-custom="[1,2,2,3,4]"
      >
        <swiper-slide
          v-for="p in recommendedPackets"
          :key="p.id"
          style="height: 95px;"
        >
          <v-card
            class="card-rounded d-block"
            height="90px"
            width="100%"
            max-width="500px"
            @click="selectedPacket = p; $refs.detailDialog.show()"
          >
            <div
              class="d-flex"
              style="width: 100%"
            >
              <PacketImage
                :packet="p"
                :alt="p.title"
                height="90px"
                width="40%"
                max-width="150px"
                class="card-rounded"
              >
                <div
                  class="d-flex flex-column"
                  style="height: 100%;"
                >
                  <v-row
                    v-if="p.title_in_image"
                    justify="center"
                    align="center"
                    style="height: 100%; text-shadow: #000000 2px 2px 2px;"
                    class="text-white text-h6 text-center title-in-image ml-1 mr-1"
                  >
                    {{ p.title_in_image }}
                  </v-row>
                </div>
              </PacketImage>
              <div
                class="pa-2 d-flex flex-column grow"
                style="height: 76px;"
              >
                <h3
                  class="font-weight-bold text-wrap overflow-hidden"
                  style="font-size: 0.95em; line-height: 1.4em; height: 40px"
                >
                  {{ p.title }}
                </h3>
                <v-spacer />
                <div class="d-flex align-end">
                  <span
                    v-if="p.price_with_discount.total !== p.price_without_discount.total"
                    class="strikethrough-diagonal text-disabled mr-2"
                  >
                    {{ utils.formatDecimal(p.price_without_discount.total) }}
                    {{ p.currency.symbol }}
                  </span>
                  <v-spacer v-if="p.price_with_discount.total !== p.price_without_discount.total" />
                  <span
                    class="text-primary"
                    style="font-size: large"
                  >
                    {{ p.price_with_discount.total
                      .toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                    {{ p.currency.symbol }}
                  </span>
                  <v-spacer v-if="p.price_with_discount.total === p.price_without_discount.total" />
                  <v-icon
                    class="cart-add-animation ml-1"
                    color="primary"
                    @click.stop="addToCart(p.id)"
                  >
                    mdi-cart-plus
                  </v-icon>
                </div>
              </div>
            </div>
          </v-card>
        </swiper-slide>
      </Swiper>
      <v-row v-if="false">
        <v-col
          v-for="i in 4"
          :key="i"
          cols="6"
          md="6"
          lg="6"
          xl="3"
        >
          <v-skeleton-loader
            type="card"
            height="200"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <PacketDetailDialog
      ref="detailDialog"
      :packet="selectedPacket"
    />
  </v-card>
</template>

<script>
import openapi from '@/api/openapi';
import PacketDetailDialog from '@/components/ShopComponents/PacketDetailDialog.vue';
import ShopService from '@/services/ShopService';
import Swiper from '@/components/Swiper.vue';
import PacketImage from '@/components/ShopComponents/PacketImage.vue';

export default {
  name: 'RecommendedPackets',
  components: { PacketImage, Swiper, PacketDetailDialog },
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
