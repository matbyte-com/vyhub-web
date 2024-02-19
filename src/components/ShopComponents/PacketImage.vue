<template>
  <v-img v-bind="$attrs" :src="packet.image_url" v-if="packet.image_url">
    <slot></slot>
  </v-img>
  <v-img v-bind="$attrs" src="https://cdn.vyhub.net/vyhub/packet.jpg" v-else>
    <slot></slot>
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
