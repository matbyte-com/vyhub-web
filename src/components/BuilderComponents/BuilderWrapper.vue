<template>
  <div
    v-for="block in blocksToShow"
    class="vh-home-wrapper"
  >
    <div
      v-if="block.no_wrap"
      class="text-no-wrap"
      :style="`background-color: ${getBackgroundColor(block)}`"
    >
      <TheHeader v-if="block.type === 'DefaultHeader'" />
      <component
        :is="componentInstance(block.type)"
        v-else
        v-bind="block.props_data"
      >
        {{ block.slot }}
      </component>
    </div>
    <v-card
      v-else
      flat
      tile
      :color="block.props_data.backgroundColor"
      :image="block.props_data.imageUrl"
      :height="block.props_data.height"
      class="wrapper-card bg-transparent"
    >
      <div
        class="pt-3 pb-3"
        :style="`background-color: ${getBackgroundColor(block)}`"
      >
        <v-container class="d-flex align-center justify-center wrapper-container pt-0 mt-0">
          <div :style="`margin-top: ${getMarginTop(block)}`">
            <div
              v-if="!block.props_data.noTitleInWrapper"
              class="text-center"
            >
              <h2
                class="text-h3"
                :class="{ 'text-white': block.props_data.whiteText, 'text-black': !block.props_data.whiteText }"
              >
                {{ block.props_data.title }}
              </h2>
              <p
                class="text-subtitle-1"
                :class="{ 'text-white': block.props_data.whiteText, 'text-black': !block.props_data.whiteText }"
              >
                {{ block.props_data.subtitle }}
              </p>
            </div>
            <div>
              <component
                :is="componentInstance(block.type)"
                v-bind="block.props_data"
              >
                {{ block.slot }}
              </component>
            </div>
          </div>
        </v-container>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import {defineAsyncComponent} from "vue";

const props = defineProps({
  blocksToShow: {
    type: Object,
  }
});

const componentMap = {};
props.blocksToShow.forEach((block) => {
  if (!componentMap[block.type]) {
    componentMap[block.type] = defineAsyncComponent(() => import(`./Builder${block.type}.vue`));
  }
});

function getBackgroundColor(block) {
  return block.props_data.backgroundColor ? block.props_data.backgroundColor : '';
}

function getMarginTop(block) {
  return block.props_data.marginTop ? block.props_data.marginTop : 0;
}

function componentInstance(type) {
  return componentMap[type];
}

function addComponent(block) {
  if (!componentMap[block.type]) {
    componentMap[block.type] = defineAsyncComponent(() => import(`./Builder${block.type}.vue`));
  }
}

defineExpose({
  addComponent
})
</script>

<style scoped>
.wrapper-container {
  height: 100%;
}

.wrapper-container > div {
  width: 100%;
}
</style>
