<template>
  <v-img
    v-if="packet.image_url"
    v-bind="$attrs"
    :src="packet.image_url"
  >
    <slot />
  </v-img>
  <v-img
    v-else
    v-bind="$attrs"
    src="https://cdn.vyhub.net/vyhub/packet.jpg"
  >
    <slot />
  </v-img>
</template>

<script>
export default {
  name: 'PacketImage',
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
