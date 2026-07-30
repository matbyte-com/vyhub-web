<script setup>
import welcomeForm from "@/forms/WelcomeForm";
import {nextTick, onMounted, ref, useTemplateRef, watch} from "vue";
import openapi from "@/api/openapi";
import {notify} from "@kyvg/vue3-notification";
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";
import {useUtils} from "@/services/useUtils";

defineEmits(['close-overlay']);

const props = defineProps({
  welcomeOverlay: Boolean,
  welcomeAnimation: Boolean,
});

const welcomeSchema = welcomeForm.form()
const welcomeGenForm = useTemplateRef('welcomeGenForm');
const i18n = useI18n();
const store = useStore();
const utils = useUtils().data().utils;

const generalData = ref(null);

onMounted(() => {
  getGeneralData();
});

const isOverlayVisible = ref(props.welcomeOverlay);
// Watch for changes in the prop to update the local state
watch(() => props.welcomeOverlay, (newVal) => {
  isOverlayVisible.value = newVal;
});

const open = ref(true);

async function setData() {
  const data = welcomeGenForm.value.getData();
  (await openapi).general_editConfig(null, data).then(() => {
    notify({
      title: i18n.t('_messages.editSuccess'),
      type: 'success',
    });
    welcomeGenForm.value.setData(data);
  }).catch((err) => {
    welcomeGenForm.value.setError(err);
  });
}

async function getGeneralData() {
  if (!store.getters.generalConfig) {
    await utils.getGeneralConfig();
  }
  generalData.value = { ...store.getters.generalConfig };
}

function setFormData() {
  nextTick(() => {
    welcomeGenForm.value.setData(generalData.value);
  });
}
</script>

<template>
  <v-overlay
    v-model="isOverlayVisible"
  >
    <v-row
      justify="center"
      align="center"
      style="width: 100vw; height: 100vh;"
      class="overflow-y-scroll"
      no-gutters
    >
      <v-card
        min-height="350px"
        min-width="60%"
        max-width="90%"
        :class="{ 'get-started-animation': welcomeAnimation }"
      >
        <v-card-text>
          <v-stepper
            flat
            :items="['Welcome', 'Theme', 'General', 'Done']"
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
                <v-alert
                  type="info"
                  class="mb-3"
                >
                  You can change the theme later in the settings
                </v-alert>
                <ThemePicker
                  :no-download="true"
                />
              </div>
            </template>
            <template #item.3>
              <GenForm
                ref="welcomeGenForm"
                :form-schema="welcomeSchema"
                :settings-mode="true"
                @mounted="setFormData"
                @submit="setData"
              />
            </template>
            <template #item.4>
              <div class="text-center">
                <div>
                  Follow the tutorial in the bottom right to get started. <br>
                </div>
                <v-btn
                  class="mt-5 mb-5 get-started-btn"
                  size="x-large"
                  color="success"
                  @click="$emit('close-overlay')"
                >
                  Get Started
                  <v-icon
                    size="large"
                  >
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

.get-started-btn :deep(i)
  transition: all 0.2s ease-in-out

.get-started-btn:hover :deep(i)
  transform: translateX(7px)
</style>
