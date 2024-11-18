<script setup>
import {ref, watch} from "vue";

defineEmits(['close-overlay']);

const props = defineProps({
  welcomeOverlay: Boolean,
  welcomeAnimation: Boolean,
});

const isOverlayVisible = ref(props.welcomeOverlay);
// Watch for changes in the prop to update the local state
watch(() => props.welcomeOverlay, (newVal) => {
  isOverlayVisible.value = newVal;
});

const open = ref(true);
</script>

<template>
  <v-overlay
    v-model="isOverlayVisible"
    theme="light"
  >
    <v-row
      justify="center"
      align="center"
      style="width: 100vw; height: 100vh;"
    >
      <v-card
        width="750"
        max-width="90%"
        :class="{ 'get-started-animation': welcomeAnimation }"
      >
        <v-card-text>
          <v-stepper
            flat
            :items="['Welcome', 'Theme', 'Tutorial']"
            non-linear
            color="primary"
          >
            <template
              #item.1
            >
              <div class="text-center">
                <v-card-title>
                  Welcome to your new VyHub instance!
                </v-card-title>
                <video
                  loop
                  autoplay
                  muted
                  width="200px"
                >
                  <source
                    src="https://cdn.vyhub.net/central/welcome-img/server-animated.mp4"
                    type="video/mp4"
                  >
                  <img
                    src="https://cdn.vyhub.net/central/welcome-img/server-fallback.png"
                    alt="Fallback Server img"
                  >
                </video>
              </div>
            </template>
            <template #item.2>
              <div class="pa-1">
                <ThemePicker
                  :no-download="true"
                />
              </div>
            </template>
            <template #item.3>
              <div class="text-center">
                <div>
                  Follow the tutorial in the bottom right to get started. <br>
                </div>
                <v-btn
                  class="mt-5 mb-5"
                  size="x-large"
                  color="success"
                  @click="$emit('close-overlay')"
                >
                  Get Started
                  <v-icon size="large">
                    mdi-chevron-right
                  </v-icon>
                </v-btn>
              </div>
            </template>
          </v-stepper>
        </v-card-text>
      </v-card>
    </v-row>
    <!--<v-img
      class="arrowBottomRight animate__animated animate__pulse animate__infinite
         animate__delay-2s"
      max-width="100px"
      max-height="100px"
      src="https://cdn.vyhub.net/central/welcome-img/arrow-right.png"
    />-->
  </v-overlay>
</template>

<style scoped lang="sass">
@keyframes closeAnimation
  0%
    background-color: #FFFFFF
  100%
    scale: 30%
    opacity: 10%

.get-started-animation
  animation: closeAnimation 0.5s ease-in-out

</style>
