<template>
  <div
    class="vh-home-headline"
    :class="{ 'v-container':container}"
    :style="`margin-top: ${marginTop}`"
  >
    <v-card
      flat
      :height="height ? height : '300px'"
      :image="imageUrl"
      :tile="!container"
      :class="{ 'card-rounded':container}"
    >
      <div
        style="width: 100%; height: 100%"
        :style="{ backgroundColor: getBackgroundColor }"
        class="d-flex flex-column justify-center align-center text-center"
      >
        <div>
          <div v-if="logoUrl">
            <v-img
              :src="logoUrl"
              :alt="title"
              height="100px"
              class="mb-5"
            />
          </div>
          <h1
            class="text-h3"
            :class="{ 'text-white': whiteText }"
          >
            {{ title }}
          </h1>
          <p
            class="text-subtitle-1 mt-3"
            :class="{ 'text-white': whiteText }"
          >
            {{ subtitle }}
          </p>
          <div class="d-flex flex-row flex-wrap justify-center">
            <v-btn
              v-for="(l, index) in buttons"
              :key="index"
              variant="flat"
              rounded
              class="ml-3"
              :href="(!utils.localLink(l) ? l.link : null)"
              :to="utils.localLink(l) ? utils.getLocalLink(l) : null"
            >
              {{ l.btnText }}
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['title', 'subtitle', 'height', 'backgroundColor2', 'imageUrl', 'buttons', 'logoUrl', 'whiteText', 'container', 'marginTop'],
  computed: {
    getBackgroundColor() {
      return this.backgroundColor2 ? this.backgroundColor2 : '';
    },
  },
};
</script>

<style scoped>

</style>
