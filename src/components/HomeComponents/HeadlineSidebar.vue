<template>
  <div class="d-flex align-center">
      <v-icon color="primary" class="mr-1" v-if="!noIcon">{{ icon }}</v-icon>
      <v-sheet vertical color="primary" width="2" height="25" v-if="!noIcon">
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
    noIcon: Boolean,
  },
};
</script>

<style scoped>

</style>
