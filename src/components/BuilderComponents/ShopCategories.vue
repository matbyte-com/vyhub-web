<template>
  <div class="vh-home-shop-categories">
    <v-row justify="center" v-if="categories">
      <v-col cols="11" sm="10" md="10" lg="9" xl="8"
             style="position: relative">
        <Swiper :number-of-elements="categories.length" :per-page-custom="[1,2,3,3,3]">
          <swiper-slide style="height: 100%"
                        v-for="category in categories" :key="category.id">
            <v-card class="img-hover-zoom overflow-hidden mt-3 mb-3 card-rounded mx-auto"
                    hover max-width="300px"
                    :to="{ name: 'ShopCategory', params: { categoryId: category.id} }">
              <div style="overflow: hidden">
                <v-img style="width: 100%" :aspect-ratio="2"
                       :src="category.image_url" :alt="category.name" />
              </div>
              <div class="text-center text-h5 mt-3">{{ category.name }}</div>
              <div class="text-center mt-3 pb-3">
                <v-btn outlined color="primary"
                       :to="{ name: 'ShopCategory', params: { categoryId: category.id} }">
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
import Swiper from '@/components/Swiper.vue';

export default {
  name: 'ShopPreview',
  components: { Swiper },
  props: ['callToAction'],
  data() {
    return {
      categories: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const api = await openapi;
      api.packet_getCategories()
        .then((rsp) => {
          this.categories = rsp.data;
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

.grow-on-hover {
  transition: all .3s ease-in-out;
}
.grow-on-hover:hover {
  transform: scale(1.03);
}
</style>
