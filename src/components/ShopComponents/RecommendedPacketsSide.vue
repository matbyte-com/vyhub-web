<template>
  <v-card
    v-if="recommendedPackets !== null && recommendedPackets.length > 0"
    class="vh-cart-recommended-packets card-rounded"
    :flat="flat"
  >
    <v-card-title class="d-flex pt-3">
      <div>
        <h2 class="text-h6">
          {{ $t('_shop.labels.recommended') }}
        </h2>
      </div>
    </v-card-title>
    <v-card-text>
      <div v-if="$vuetify.display.mdAndUp">
        <v-row
          v-if="recommendedPackets"
          dense
        >
          <v-col
            v-for="p in recommendedPackets"
            :key="p.id"
            :cols="storeOnly ? 12 : 12"
            :lg="storeOnly ? 6 : 6"
            :xl="storeOnly ? 6 : 4"
            class="d-flex"
          >
            <v-card
              class="card-rounded d-block"
              width="100%"
              @click="selectedPacket = p; $refs.detailDialog.show()"
            >
              <PacketImage
                :blur-fill="true"
                :packet="p"
                :alt="p.title"
              >
                <div
                  class="d-flex flex-column ml-3 mr-3"
                  style="height: 80px;"
                >
                  <v-row
                    v-if="p.title_in_image"
                    align="center"
                    justify="center"
                    class="title-in-image text-center text-white text-h6"
                    style="text-shadow: #000000 2px 2px 2px;"
                  >
                    {{ p.title_in_image }}
                  </v-row>
                </div>
              </PacketImage>
              <div class="px-3 pt-2 pb-2">
                <h3
                  class="text-wrap overflow-hidden text-center"
                  style="font-size: 1em; line-height: 1.3em;"
                >
                  {{ p.title }}
                </h3>
                <div class="d-flex justify-center align-center mt-1">
                  <span
                    v-if="p.price_with_discount.total !== p.price_without_discount.total"
                    class="strikethrough-diagonal text-disabled mr-2"
                    style="font-size: small"
                  >
                    {{ utils.formatCurrency(p.price_without_discount.total, p.currency.code) }}
                  </span>
                  <span class="text-primary">
                    {{ utils.formatCurrency(p.price_with_discount.total, p.currency.code) }}
                  </span>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col
            v-for="i in 4"
            :key="i"
            cols="6"
            md="6"
            lg="6"
            xl="6"
          >
            <v-card :flat="flat">
              <v-skeleton-loader
                type="card"
                height="200"
              />
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <Swiper
          :number-of-elements="recommendedPackets.length"
          :per-page-custom="[2,3]"
        >
          <swiper-slide
            v-for="p in recommendedPackets"
            :key="p.id"
            style="height: 300px"
          >
            <v-card class="card-rounded">
              <PacketCard
                :flat="true"
                :small="true"
                :disable-hover="true"
                :packet="p"
              />
            </v-card>
          </swiper-slide>
        </Swiper>
      </div>
    </v-card-text>
    <PacketDetailDialog
      ref="detailDialog"
      :packet="selectedPacket"
    />
  </v-card>
</template>

<script>
import openapiCached from '@/api/openapiCached';

export default {
  props: {
    flat: {
      type: Boolean,
      default: true,
    },
    storeOnly: {
      type: Boolean,
      default: false,
    }
  },
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
      (await openapiCached).shop_getPackets({ recommended: true, limit: 6 }).then((rsp) => {
        this.recommendedPackets = rsp.data;
      });
    },
  },
};
</script>

<style scoped>

</style>
