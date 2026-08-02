<template>
  <div class="vh-home-html">
    <!-- eslint-disable-next-line vue/no-v-html -- trusted admin-authored raw HTML block -->
    <span v-html="html" />
  </div>
</template>

<script>
export default {
  // TODO Explain how to use Vue Axios
  props: {
    html: { type: String, default: '' },
  },
};
</script>

<style scoped>

</style>
