<template>
  <div class="vh-home-wrapper">
    <div
      v-if="no_wrap"
      class="text-no-wrap"
      :style="`background-color: ${backgroundColor}`"
    >
      <slot />
    </div>
    <v-card
      v-else
      flat
      tile
      :color="backgroundColor"
      :img="imageUrl"
      :height="height"
      class="wrapper-card bg-transparent"
    >
      <div
        class="pt-3 pb-3"
        :style="`background-color: ${getBackgroundColor}`"
      >
        <v-container class="d-flex align-center justify-center wrapper-container pt-0 mt-0">
          <div :style="`margin-top: ${getMarginTop}`">
            <div
              v-if="!noTitleInWrapper"
              class="text-center"
            >
              <h2
                class="text-h3"
                :class="{ 'white--text': whiteText, 'black--text': !whiteText }"
              >
                {{ title }}
              </h2>
              <p
                class="text-subtitle-1"
                :class="{ 'white--text': whiteText, 'black--text': !whiteText }"
              >
                {{ subtitle }}
              </p>
            </div>
            <div>
              <slot />
            </div>
          </div>
        </v-container>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
  props: ['title', 'subtitle', 'no_wrap', 'height', 'css', 'backgroundColor', 'whiteText', 'imageUrl', 'noTitleInWrapper', 'marginTop'],
  computed: {
    getBackgroundColor() {
      return this.backgroundColor ? this.backgroundColor : '';
    },
    getMarginTop() {
      if (!this.marginTop) return 0;
      // check if string is only number. If so, add px
      if (/^\d+$/.test(this.marginTop)) return `${this.marginTop}px`;
      return this.marginTop;
    },
  },
};
</script>

<style scoped>
.wrapper-container {
  height: 100%;
}
.wrapper-container > div {
  width: 100%;
}
</style>
