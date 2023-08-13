<template>
  <div :style="`background-color: ${backgroundColor}`">
    <div v-if="no_wrap">
      <slot />
    </div>
    <div class="pt-5 pb-5" :style="`height: ${height}`" v-else>
      <v-container class="d-flex align-center justify-center wrapper-container">
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
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
  props: ['title', 'subtitle', 'no_wrap', 'height', 'css', 'backgroundColor', 'whiteText'],
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
