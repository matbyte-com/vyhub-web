<template>
  <div :class="{ 'swiper-margins' : $vuetify.breakpoint.mdAndUp }">
    <div v-if="numberOfElements" style="position: relative">
      <div>
        <swiper-container ref="carousel" grid-rows="3"
                          class="" :slides-per-view="perPage"
                          @slidechange="slideChanged()"
                          :key="perPage" :space-between="12">
          <slot />
        </swiper-container>
      </div>
      <span v-if="$vuetify.breakpoint.mdAndUp && !isLocked">
        <div style="position: absolute; z-index: 5; left: -50px; top: 0; height: 100%"
             class="d-flex flex-column">
          <v-spacer />
          <v-btn :disabled="isBeginning"
                 fab small depressed outlined
                 @click="prev"><v-icon>mdi-chevron-left</v-icon></v-btn>
          <v-spacer />
        </div>
        <div style="position: absolute; z-index: 5; right: -50px; top: 0; height: 100%"
             class="d-flex flex-column">
          <v-spacer />
        <v-btn :disabled="isEnd"
               fab small depressed outlined
               @click="next"><v-icon>mdi-chevron-right</v-icon></v-btn>
          <v-spacer />
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  // TODO Swiper is responsive, but not during a live update of the breakpoint size
  //  -> Remount needed
  name: 'Swiper',
  props: ['numberOfElements', 'perPageCustom'],
  data() {
    return {
      currentSlide: 0,
      swiperEl: null,
      isEnd: null,
      isBeginning: null,
      isLocked: null,
    };
  },
  mounted() {
    this.swiperEl = document.querySelector('swiper-container');
    this.isEnd = this.swiperEl.swiper.isEnd;
    this.isBeginning = this.swiperEl.swiper.isBeginning;
    this.isLocked = this.swiperEl.swiper.isLocked;
  },
  methods: {
    prev() {
      this.swiperEl.swiper.slidePrev();
      this.currentSlide = this.swiperEl.swiper.activeIndex;
    },

    next() {
      this.swiperEl.swiper.slideNext();
      this.currentSlide = this.swiperEl.swiper.activeIndex;
    },
    slideChanged() {
      this.currentSlide = this.swiperEl.activeIndex;
      this.isEnd = this.swiperEl.swiper.isEnd;
      this.isBeginning = this.swiperEl.swiper.isBeginning;
    },
  },
  computed: {
    perPage() {
      // Uneven Numbers for small preview of next slide
      if (!this.numberOfElements) return 0;
      let res = 1;
      if (this.$vuetify.breakpoint.xs) {
        // eslint-disable-next-line prefer-destructuring
        res = this.perPageCustom[0];
        res += 0.15;
      }
      if (this.$vuetify.breakpoint.sm) {
        // eslint-disable-next-line prefer-destructuring
        res = this.perPageCustom[1];
        res += 0.15;
      }
      if (this.$vuetify.breakpoint.md) {
        // eslint-disable-next-line prefer-destructuring
        res = this.perPageCustom[2];
      }
      if (this.$vuetify.breakpoint.lg) {
        // eslint-disable-next-line prefer-destructuring
        res = this.perPageCustom[3];
      }
      if (this.$vuetify.breakpoint.xl) {
        // eslint-disable-next-line prefer-destructuring
        res = this.perPageCustom[4];
      }
      if (res > this.numberOfElements) {
        res = this.numberOfElements;
      }
      return res;
    },
  },
};
</script>

<style scoped>
.swiper-margins {
  margin-left: 50px;
  margin-right: 50px;
}
</style>
