<template>
  <div class="vh-home-carousel">
    <v-carousel hide-delimiters :height="height ? height : '500px'">
      <v-carousel-item v-for="slide in slides" :key="slide.title + slide.imageUrl"
                       :src="slide.imageUrl">
        <div style="width: 100%; height: 100%"
             class="d-flex flex-column justify-center align-center text-center">
          <h1 class="text-h3">{{ slide.title }}</h1>
          <p class="text-subtitle-1 mt-3">{{ slide.subtitle }}</p>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: ['height', 'slides'],
};
</script>

<style scoped>

</style>
