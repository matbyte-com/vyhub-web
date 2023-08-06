<template>
  <div>
    <div v-if="noWrapper">
      <slot />
    </div>
    <v-card tile class="pt-5 pb-5" v-else>
      <v-container>
        <div class="text-center">
          <h2 class="text-h3">{{ title }}</h2>
          <p class="text-subtitle-1">{{ subtitle }}</p>
        </div>
        <slot />
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
  props: ['title', 'subtitle', 'noWrapper'],
};
</script>

<style scoped>

</style>
