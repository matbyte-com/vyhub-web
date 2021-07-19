<template>
  <div>
    <h5 class="text-h5"><slot></slot></h5>
    <v-divider v-if="divider" class="mb-1"></v-divider>
  </div>
</template>

<script>
export default {
  name: 'SettingTitle',
  props: {
    divider: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>

</style>
