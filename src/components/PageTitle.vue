<template>
  <div class="ma-3">
    <h1 class="display-3">{{ title }}</h1>
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
