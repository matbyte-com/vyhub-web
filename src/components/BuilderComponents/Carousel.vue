<template>
  <div class="vh-home-carousel">
    <v-card tile flat>
      <v-carousel hide-delimiters :height="height ? height : '500px'" cycle>
        <v-carousel-item v-for="slide in slides" :key="slide.title + slide.imageUrl"
                         :src="slide.imageUrl">
          <div style="width: 100%; height: 100%" :class="{ 'white--text': whiteText }"
               class="d-flex flex-column justify-center align-center text-center">
            <h1 class="text-h3">{{ slide.title }}</h1>
            <p class="text-subtitle-1 mt-3">{{ slide.subtitle }}</p>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: ['height', 'slides', 'whiteText'],
};
</script>

<style scoped>

</style>
