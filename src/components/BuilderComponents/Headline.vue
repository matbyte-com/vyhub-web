<template>
<div>
  <v-card flat :height="height ? height : '300px'" :img="imageUrl">
    <div style="width: 100%; height: 100%" :style="{ backgroundColor: getBackgroundColor }"
         class="d-flex flex-column justify-center align-center text-center">
      <h1 class="text-h3">{{ title }}</h1>
      <p class="text-subtitle-1 mt-3">{{ subtitle }}</p>
    </div>
  </v-card>
</div>
</template>

<script>
export default {
  name: 'FirstComponent',
  props: ['title', 'subtitle', 'height', 'backgroundColor', 'imageUrl'],
  computed: {
    getBackgroundColor() {
      return this.backgroundColor ? this.backgroundColor : '';
    },
  },
};
</script>

<style scoped>

</style>
