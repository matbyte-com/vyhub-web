<template>
  <div class="vh-home-wrapper">
    <div class="no-wrap" v-if="no_wrap" :style="`background-color: ${backgroundColor}`">
      <slot />
    </div>
    <v-card flat tile :color="backgroundColor" :img="imageUrl" :height="height"
            class="wrapper-card transparent" v-else>
      <div class="pt-3 pb-3" :style="{ backgroundColor: getBackgroundColor }">
        <v-container class="d-flex align-center justify-center wrapper-container pt-0 mt-0">
          <div>
            <div class="text-center">
              <h2 class="text-h3" :class="{ 'white--text': whiteText }">{{ title }}</h2>
              <p class="text-subtitle-1" :class="{ 'white--text': whiteText }">{{ subtitle }}</p>
            </div>
            <div>
              <slot />
            </div>
          </div>
        </v-container>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
  props: ['title', 'subtitle', 'no_wrap', 'height', 'css', 'backgroundColor', 'whiteText', 'imageUrl'],
  computed: {
    getBackgroundColor() {
      return this.backgroundColor ? this.backgroundColor : '';
    },
  },
};
</script>

<style scoped>
.wrapper-container {
  height: 100%;
}
.wrapper-container > div {
  width: 100%;
}
</style>
