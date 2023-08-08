<template>
  <div>
    <div v-if="no_wrap">
      <slot />
    </div>
    <v-card tile class="pt-5 pb-5" :height="height" v-else>
      <v-container class="d-flex align-center justify-center wrapper-container">
        <div>
          <div class="text-center">
            <h2 class="text-h3">{{ title }}</h2>
            <p class="text-subtitle-1">{{ subtitle }}</p>
          </div>
          <div>
            <slot />
          </div>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
  props: ['title', 'subtitle', 'no_wrap', 'height', 'css'],
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
