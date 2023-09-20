<template>
<div class="vh-home-headline" :class="{ 'container':container}" :style="`margin-top: ${marginTop}`">
  <v-card flat :height="height ? height : '300px'" :img="imageUrl" :tile="!container"
          :class="{ 'card-rounded':container}">
    <div style="width: 100%; height: 100%" :style="{ backgroundColor: getBackgroundColor }"
         class="d-flex flex-column justify-center align-center text-center">
      <div>
        <div v-if="logoUrl">
          <v-img v-if="imageUrl" :src="logoUrl"
                 :alt="title" height="100px" contain class="mb-5"/>
        </div>
        <h1 class="text-h3" :class="{ 'white--text': whiteText }">{{ title }}</h1>
        <p class="text-subtitle-1 mt-3" :class="{ 'white--text': whiteText }">{{ subtitle }}</p>
        <div class="d-flex flex-row flex-wrap justify-center">
          <v-btn depressed rounded v-for="(button, index) in buttons" :key="index" class="ml-3"
                 :href="(!localLink(button) ? button.link : null)"
                 :to="localLink(button) ? getLocalLink(button) : null">
            {{ button.btnText }}
          </v-btn>
        </div>
      </div>
    </div>
  </v-card>
</div>
</template>

<script>
export default {
  name: 'FirstComponent',
  props: ['title', 'subtitle', 'height', 'backgroundColor2', 'imageUrl', 'buttons', 'logoUrl', 'whiteText', 'container', 'marginTop'],
  computed: {
    getBackgroundColor() {
      return this.backgroundColor2 ? this.backgroundColor2 : '';
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
