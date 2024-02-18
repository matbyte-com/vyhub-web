<template>
  <v-card class="vh-cart-recommended-packets card-rounded" flat
          v-if="recommendedPackets !== null && recommendedPackets.length > 0">
    <v-card-title class="d-flex">
      <h2 class="text-h6">{{ $t('_shop.labels.recommended') }}</h2>
      <v-divider class="ml-3 mb-1 align-self-end"/>
    </v-card-title>
    <v-card-text>
      <div v-if="$vuetify.breakpoint.mdAndUp">
        <v-row v-if="recommendedPackets" dense>
          <v-col cols="3" md="6" lg="6" xl="4" v-for="p in recommendedPackets" :key="p.id"
                 class="d-flex">
            <v-card class="card-rounded d-block" width="100%"
                    @click="selectedPacket = p; $refs.detailDialog.show()">
              <v-img :src="p.image_url" :alt="p.title" v-if="p.image_url">
                <div class="d-flex flex-column ml-3 mr-3" style="height: 80px;">
                  <v-row align="center" justify="center" v-if="p.title_in_image"
                         class="title-in-image text-center white--text text-h6"
                         style="text-shadow: #000000 2px 2px 2px;">
                    {{ p.title_in_image }}
                  </v-row>
                </div>
              </v-img>
              <h3 class="text-wrap overflow-hidden text-center mt-1"
                  style="font-size: 1em; line-height: 1.4em; height: 40px">
                {{ p.title }}
              </h3>
              <v-spacer />
              <div class="d-flex justify-center align-end px-2 pb-1">
                <span class="strikethrough-diagonal text--disabled mr-2" style="font-size: small"
                  v-if="p.price_with_discount.total !== p.price_without_discount.total">
                  {{ utils.formatDecimal(p.price_without_discount.total) }}
                </span>
                <v-spacer v-if="p.price_with_discount.total !== p.price_without_discount.total"/>
                <span class="primary--text">
                  {{ p.price_with_discount.total
                            .toLocaleString(undefined, {minimumFractionDigits: 2})}}
                  {{ p.currency.symbol }}
                </span>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="6" md="6" lg="6" xl="6" v-for="i in 4" :key="i">
            <v-skeleton-loader type="card" height="200" />
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <Swiper :number-of-elements="recommendedPackets.length" :per-page-custom="[2,3]">
          <swiper-slide v-for="p in recommendedPackets" :key="p.id" style="height: 300px">
            <v-card class="card-rounded">
              <PacketCard :flat="true"
                          :small="true" :disable-hover="true" :packet="p" />
            </v-card>
          </swiper-slide>
        </Swiper>
      </div>
    </v-card-text>
    <PacketDetailDialog ref="detailDialog" :packet="selectedPacket" />
  </v-card>
</template>

<script>
import PacketCard from '@/components/ShopComponents/PacketCard.vue';
import openapi from '@/api/openapi';
import Swiper from '@/components/Swiper.vue';
import PacketDetailDialog from '@/components/ShopComponents/PacketDetailDialog.vue';

export default {
  name: 'RecommendedPacketsSide',
  components: { PacketDetailDialog, Swiper, PacketCard },
  data() {
    return {
      selectedPacket: null,
      recommendedPackets: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).shop_getPackets({ recommended: true, limit: 6 }).then((rsp) => {
        this.recommendedPackets = rsp.data;
      });
    },
  },
};
</script>

<style scoped>

</style>
