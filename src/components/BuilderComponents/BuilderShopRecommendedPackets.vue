<template>
  <div class="vh-home-shop-categories">
    <v-row
      v-if="packets"
      justify="center"
    >
      <v-col
        cols="11"
        sm="10"
        md="10"
        lg="9"
        xl="8"
        style="max-height: 500px"
      >
        <Swiper
          :number-of-elements="packets.length"
          :per-page-custom="[1,2,3,3,4,4]"
        >
          <swiper-slide
            v-for="packet in packets"
            :key="packet.id"
            style="height: auto;"
          >
            <v-card
              class="img-hover-zoom overflow-hidden mt-3 mb-3 card-rounded mx-auto
             d-flex flex-column"
              hover
              max-width="350px"
              height="95%"
              :to="{ name: 'ShopCategory', params: { categoryId: packet.category.id} }"
            >
              <div class="card-rounded-top overflow-hidden">
                <PacketImage
                  :blur-fill="true"
                  :packet="packet"
                  :alt="packet.title"
                >
                  <div
                    class="d-flex flex-column"
                    style="height: 100%;"
                  >
                    <v-row
                      v-if="packet.title_in_image"
                      justify="center"
                      align="center"
                      style="height: 100%; text-shadow: #000000 2px 2px 2px;"
                      class="text-white text-h6 text-center title-in-image ml-1 mr-1"
                    >
                      {{ packet.title_in_image }}
                    </v-row>
                  </div>
                </PacketImage>
              </div>
              <div class="text-center text-h5 mt-3 mx-1">
                {{ packet.title }}
              </div>
              <div class="text-center mt-1 mx-1">
                {{ packet.subtitle }}
              </div>
              <v-spacer />
              <div class="text-center mt-3 pb-3">
                <v-btn
                  variant="flat"
                  color="primary"
                  :to="{ name: 'ShopCategory', params: { categoryId: packet.category.id} }"
                >
                  {{ callToAction }}
                </v-btn>
              </div>
            </v-card>
          </swiper-slide>
        </Swiper>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  props: {
    callToAction: { type: String, default: '' },
  },
  data() {
    return {
      packets: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).shop_getPackets({ recommended: true, limit: 8 }).then((rsp) => {
        this.packets = rsp.data;
      });
    },
  },
};
</script>

<style scoped>
.img-hover-zoom :deep(.packet-image-fg) {
  transition: transform .3s ease;
}

.img-hover-zoom:hover :deep(.packet-image-fg) {
  transform: scale(1.08);
}
</style>
