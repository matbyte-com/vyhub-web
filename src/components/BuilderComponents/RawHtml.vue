<template>
  <div>
    <span v-html="html">
    </span>
  </div>
</template>

<script>
export default {
  // TODO Explain how to use Vue Axios
  name: 'RawHtml',
  props: ['html'],
};
</script>

<style scoped>

</style>
