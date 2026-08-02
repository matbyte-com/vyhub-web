<template>
  <v-chip @click="$emit('click')">
    {{ label }}: {{ value }}
  </v-chip>
</template>

<script>
export default {
  name: 'LogLabel',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  emits: ['click'],
};
</script>

<style scoped>

</style>
