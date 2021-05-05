<template>
  <div>
    <v-icon color="green" v-if="value">mdi-check-circle</v-icon>
    <v-icon color="red" v-else>mdi-close-circle</v-icon>
  </div>
</template>

<script>
export default {
  name: 'BoolIcon',
  props: {
    value: Boolean,
  },
};
</script>

<style scoped>

</style>
