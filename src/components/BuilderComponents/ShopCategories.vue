<template>
  <div>
    <v-row justify="center" v-if="categories">
      <v-col cols="11" sm="10" md="10" lg="9" xl="8"
             style="position: relative">
        <swiper-container ref="carousel" class="mx-auto" :slides-per-view="perPage"
                          :per-page="perPage" :key="perPage" :space-between="5">
          <swiper-slide style="height: 100%"
               v-for="(category) in categories" :key="category.id">
            <v-card max-width="400" width="90%" class="grow-on-hover
            img-hover-zoom mx-auto overflow-hidden mt-3 mb-3">
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
        </swiper-container>
        <v-btn v-if="currentSlide !== 0"
               fab small style="position: absolute; z-index: 50; left: 0px; top: 31%;"
               @click="prev"><v-icon>mdi-chevron-left</v-icon></v-btn>
        <v-btn v-if="currentSlide !== maxSlides"
               fab small style="position: absolute; z-index: 50; right: 0px; top: 31%;"
               @click="next"><v-icon>mdi-chevron-right</v-icon></v-btn>
        <v-card>
          {{ maxSlides }}</v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  name: 'ShopPreview',
  props: ['headline', 'subtitle', 'callToAction'],
  data() {
    return {
      categories: null,
      currentSlide: 0,
      swiperEl: null,
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
    prev() {
      if (!this.swiperEl) this.swiperEl = document.querySelector('swiper-container');
      this.swiperEl.swiper.slidePrev();
      this.currentSlide = this.swiperEl.swiper.activeIndex;
    },

    next() {
      if (!this.swiperEl) this.swiperEl = document.querySelector('swiper-container');
      this.swiperEl.swiper.slideNext();
      this.currentSlide = this.swiperEl.swiper.activeIndex;
    },
  },
  computed: {
    perPage() {
      if (!this.categories) return 0;
      if (this.$vuetify.breakpoint.xs) {
        if (this.categories.length < 1) return this.categories.length;
        return 1;
      }
      if (this.$vuetify.breakpoint.sm) {
        if (this.categories.length < 2) return this.categories.length;
        return 2;
      }
      if (this.$vuetify.breakpoint.md) {
        if (this.categories.length < 3) return this.categories.length;
        return 3;
      }
      if (this.$vuetify.breakpoint.lg) {
        if (this.categories.length < 4) return this.categories.length;
        return 4;
      }
      if (this.$vuetify.breakpoint.xl) {
        if (this.categories.length < 4) return this.categories.length;
        return 4;
      }
      return 1;
    },
    maxSlides() {
      if (!this.categories) return 0;
      const quotient = this.categories.length / this.perPage;
      if (quotient <= 1) return 0;
      return Math.floor(quotient - 1);
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
