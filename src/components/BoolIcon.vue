<template>
  <div>
    <v-icon
      v-if="value"
      color="green"
    >
      mdi-check-circle
    </v-icon>
    <v-icon
      v-else
      color="red"
    >
      mdi-close-circle
    </v-icon>
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
