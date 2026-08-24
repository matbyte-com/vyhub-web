<template>
  <div
    v-if="blurFill"
    class="packet-image-square"
  >
    <img
      class="packet-image-blur"
      :src="imgSrc"
      alt=""
      aria-hidden="true"
    >
    <img
      class="packet-image-fg"
      :src="imgSrc"
      :alt="alt"
    >
    <div class="packet-image-content">
      <slot />
    </div>
  </div>
  <v-img
    v-else-if="packet.image_url"
    :cover="cover"
    v-bind="$attrs"
    :src="packet.image_url"
    :alt="alt"
  >
    <slot />
  </v-img>
  <v-img
    v-else
    cover
    v-bind="$attrs"
    src="https://cdn.vyhub.net/vyhub/packet.jpg"
    :alt="alt"
  >
    <slot />
  </v-img>
</template>

<script>
export default {
  props: {
    cover: {
      type: Boolean,
      default: true,
    },
    packet: {
      type: Object,
      required: true,
    },
    blurFill: {
      type: Boolean,
      default: false,
    },
    alt: {
      type: String,
      default: '',
    },
  },
  computed: {
    imgSrc() {
      return this.packet.image_url || 'https://cdn.vyhub.net/vyhub/packet.jpg';
    },
  },
};
</script>

<style scoped>
/* Fixed box so every card is the same height regardless of image aspect ratio. Kept at 16:9
   because packet artwork is typically wider than tall, and a taller box only adds blurred filler
   above and below it. */
.packet-image-square {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.packet-image-blur {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(18px) brightness(0.9);
  transform: scale(1.15);
}

.packet-image-fg {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.packet-image-content {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
}
</style>
