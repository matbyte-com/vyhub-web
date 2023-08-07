<template>
<div>
  <v-card flat :height="height ? height : '300px'" :img="imageUrl">
    <div style="width: 100%; height: 100%" :style="{ backgroundColor: getBackgroundColor }"
         class="d-flex flex-column justify-center align-center text-center">
      <h1 class="text-h3">{{ title }}</h1>
      <p class="text-subtitle-1 mt-3">{{ subtitle }}</p>
      <div class="d-flex flex-row flex-wrap">
        <v-btn v-for="(button, index) in buttons" :key="index" class="ml-3"
               outlined :href="(!localLink(button) ? button.link : null)"
               :to="localLink(button) ? getLocalLink(button) : null">
          {{ button.btnText }}
          {{ button.link }}
        </v-btn>
      </div>
    </div>
  </v-card>
</div>
</template>

<script>
export default {
  name: 'FirstComponent',
  props: ['title', 'subtitle', 'height', 'backgroundColor', 'imageUrl', 'buttons'],
  computed: {
    getBackgroundColor() {
      return this.backgroundColor ? this.backgroundColor : '';
    },
  },
  methods: {
    getLocalLink(btn) {
      if (!btn.link) return '';
      if (this.localLink) { return btn.link.substring(window.location.origin.length); }
      return btn.link;
    },
    localLink(btn) {
      if (!btn.link) return false;
      if (window) {
        return !!btn.link.includes(window.location.hostname);
      }
      return false;
    },
  },
};
</script>

<style scoped>

</style>
