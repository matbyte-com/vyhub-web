<template>
  <div class="vh-home-shop-categories">
    <v-row justify="center" v-if="packets">
      <v-col cols="11" sm="10" md="10" lg="9" xl="8"
             style="max-height: 500px">
        <Swiper :number-of-elements="packets.length" :per-page-custom="[1,2,3,3,4]">
          <swiper-slide v-for="packet in packets" :key="packet.id">
            <v-card class="img-hover-zoom overflow-hidden mt-3 mb-3 card-rounded mx-auto"
                    hover max-width="300px"
                    :to="{ name: 'ShopCategory', params: { categoryId: packet.category.id} }">
              <div>
                <v-img :src="packet.image_url" :alt="packet.title"
                       class="card-rounded-top">
                  <div class="d-flex flex-column" style="height: 100%;">
                    <v-row justify="center" align="center"
                           style="height: 100%; text-shadow: #000000 2px 2px 2px;"
                           class="white--text text-h6 text-center title-in-image ml-1 mr-1"
                           v-if="packet.title_in_image">
                      {{ packet.title_in_image }}
                    </v-row>
                  </div>
                </v-img>
              </div>
              <div class="text-center text-h5 mt-3">{{ packet.title }}</div>
              <div class="text-center mt-1">{{ packet.subtitle }}</div>
              <div class="text-center mt-3 pb-3">
                <v-btn outlined color="primary"
                       :to="{ name: 'ShopCategory', params: { categoryId: packet.category.id} }">
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
import Swiper from '@/components/Swiper.vue';
import openapi from '@/api/openapi';

export default {
  name: 'RecommendedPackets',
  props: ['callToAction'],
  components: { Swiper },
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
.img-hover-zoom {
}

/* [2] Transition property for smooth transformation of images */
.img-hover-zoom .v-image {
  transition: transform .3s ease;
}

/* [3] Finally, transforming the image when container gets hovered */
.img-hover-zoom:hover .v-image {
  transform: scale(1.08);
}
</style>
