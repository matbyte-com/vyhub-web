<template>
  <v-chip @click="$emit('click')">
    {{ label }}: {{ value }}
  </v-chip>
</template>

<script>
export default {
  name: 'LogLabel',
  props: {
    label: String,
    value: String,
  },
};
</script>

<style scoped>

</style>
