<template>
  <v-img
    v-if="packet.image_url"
    cover
    v-bind="$attrs"
    :src="packet.image_url"
  >
    <slot />
  </v-img>
  <v-img
    v-else
    cover
    v-bind="$attrs"
    src="https://cdn.vyhub.net/vyhub/packet.jpg"
  >
    <slot />
  </v-img>
</template>

<script>
export default {
  props: {
    packet: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
