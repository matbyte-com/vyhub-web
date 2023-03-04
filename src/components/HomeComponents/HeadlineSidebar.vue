<template>
  <div class="d-flex align-center">
      <v-icon color="primary" class="mr-1">{{ icon }}</v-icon>
      <v-sheet vertical color="primary" width="2" height="25">
      </v-sheet>
      <span class="ml-2 mr-1">
            {{ title }}
          </span>
  </div>
</template>

<script>
export default {
  name: 'HeadlineSidebar',
  props: {
    icon: String,
    title: String,
  },
};
</script>

<style scoped>

</style>
