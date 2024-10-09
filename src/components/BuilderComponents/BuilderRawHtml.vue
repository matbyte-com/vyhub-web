<template>
  <div class="vh-home-html">
    <span v-html="html" />
  </div>
</template>

<script>
export default {
  // TODO Explain how to use Vue Axios
  props: ['html'],
};
</script>

<style scoped>

</style>
