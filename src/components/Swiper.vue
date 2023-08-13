<template>
  <div>
    <div v-if="numberOfElements" style="position:relative;">
      <swiper-container ref="carousel"
                        class="mx-auto" :slides-per-view="perPage"
                        :per-page="perPage" :key="perPage" :space-between="12">
        <slot />
      </swiper-container>
      <v-btn v-if="currentSlide !== 0"
             fab small style="position: absolute; z-index: 50; left: 0px; top: 31%;"
             @click="prev"><v-icon>mdi-chevron-left</v-icon></v-btn>
      <v-btn v-if="currentSlide !== maxSlides"
             fab small style="position: absolute; z-index: 50; right: 0px; top: 31%;"
             @click="next"><v-icon>mdi-chevron-right</v-icon></v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: ['numberOfElements'],
  data() {
    return {
      currentSlide: 0,
      swiperEl: null,
    };
  },
  methods: {
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
      if (!this.numberOfElements) return 0;
      let res = 1;
      if (this.$vuetify.breakpoint.xs) {
        if (this.numberOfElements < 1) res = this.numberOfElements;
        else res = 1;
      }
      if (this.$vuetify.breakpoint.sm) {
        if (this.numberOfElements < 2) res = this.numberOfElements;
        else res = 2;
      }
      if (this.$vuetify.breakpoint.md) {
        if (this.numberOfElements < 3) res = this.numberOfElements;
        else res = 3;
      }
      if (this.$vuetify.breakpoint.lg) {
        if (this.numberOfElements < 4) res = this.numberOfElements;
        else res = 4;
      }
      if (this.$vuetify.breakpoint.xl) {
        if (this.numberOfElements < 4) res = this.numberOfElements;
        else res = 4;
      }
      return res + 0.15;
    },
    maxSlides() {
      if (!this.numberOfElements) return 0;
      const quotient = this.numberOfElements / this.perPage;
      if (quotient <= 1) return 0;
      return Math.floor(quotient - 1);
    },
  },
};
</script>

<style scoped>
</style>
