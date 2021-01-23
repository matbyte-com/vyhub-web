<template>
  <div class="mb-1">
    <h4 class="text-h4 mb-2">{{ title }}</h4>
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
