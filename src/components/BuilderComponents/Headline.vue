<template>
<div>
  <v-card flat :height="height ? height : '300px'" :img="imageUrl">
    <div style="width: 100%; height: 100%" :style="{ backgroundColor: getBackgroundColor }"
         class="d-flex flex-column justify-center align-center text-center">
      <h1 class="text-h3">{{ title }}</h1>
      <p class="text-subtitle-1 mt-3">{{ subtitle }}</p>
      <v-btn v-if="btnText" outlined :href="(!localLink ? btnUrl : null)"
             :to="localLink ? getLocalLink : null">
        {{ btnText }}
      </v-btn>
    </div>
  </v-card>
</div>
</template>

<script>
export default {
  name: 'FirstComponent',
  props: ['title', 'subtitle', 'height', 'backgroundColor', 'imageUrl', 'btnText', 'btnUrl'],
  computed: {
    getBackgroundColor() {
      return this.backgroundColor ? this.backgroundColor : '';
    },
    getLocalLink() {
      if (!this.btnUrl) return '';
      if (this.localLink) { return this.btnUrl.substring(window.location.origin.length); }
      return this.btnUrl;
    },
    localLink() {
      if (!this.btnUrl) return false;
      if (window) {
        return !!this.btnUrl.includes(window.location.hostname);
      }
      return false;
    },

  },
};
</script>

<style scoped>

</style>
