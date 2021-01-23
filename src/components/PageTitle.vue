<template>
  <div class="mt-3 mb-3">
    <h1 class="text-h2">{{ title }}</h1>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    title: String,
  },
};
</script>

<style scoped>

</style>
