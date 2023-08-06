<template>
  <div>
    <span v-html="html">
    </span>
  </div>
</template>

<script>
export default {
  name: 'RawHtml',
  props: ['html'],
};
</script>

<style scoped>

</style>
