<script setup>
import {ref, watch, onMounted, computed} from 'vue';
import { useUtils} from "@/services/useUtils";
import {useDisplay} from "vuetify"; // Import utils or adjust based on actual location

const props = defineProps({
  textClass: String,
  actionClass: String,
  title: String,
  icon: String,
  maxWidth: {
    type: Number,
    default: 600,
  },
  modelValue: {
    type: Boolean,
    default: null,
  },
  withId: {
    type: Boolean,
    default: null,
  },
  persistent: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['input', 'close', 'cancel', 'update:modelValue']);

const openValue = ref(false);
const item = ref(null);
const id = ref(null);
const display = ref(useDisplay());
const utils = useUtils().data().utils;

const open = computed({
  get() {
    return props.modelValue === null ? openValue.value : props.modelValue;
  },
  set(newValue) {
    if (props.modelValue === null) {
      openValue.value = newValue;
    } else {
      emit('update:modelValue', newValue);
    }
  },
});

onMounted(() => {
  if (props.withId) {
    id.value = utils.random_string(6);
  }
});

watch(open, (newValue) => {
  if (props.modelValue !== null) {
    emit('input', newValue);
  }

  if (!newValue) {
    emit('close');
  }
});

function cancel() {
  close();
  emit('cancel');
}

function show(newItem) {
  open.value = true;
  item.value = newItem;
}

function getItem() {
  return item.value;
}

function close() {
  open.value = false;
}

defineExpose({show, close, getItem, cancel, open, id});
</script>

<template>
  <v-dialog
    v-bind="$attrs"
    v-model="open"
    :class="{ 'ma-3' : !display.xs }"
    scrollable
    :persistent="persistent"
    :max-width="maxWidth"
    :fullscreen="display.xs"
    :z-index="1005"
  >
    <v-card :class="{ 'card-rounded' : !display.xs }">
      <v-card-title class="bg-primary d-flex align-center">
        <v-icon
          :if="icon != null"
          size="small"
          start
        >
          {{ icon }}
        </v-icon>
        <span>{{ title }}</span>
        <v-spacer />
        <v-icon
          @click="cancel"
        >
          mdi-close
        </v-icon>
      </v-card-title>
      <v-card-text
        :id="id"
        class="pt-1"
        :class="textClass"
      >
        <slot />
      </v-card-text>
      <v-card-actions
        v-if="$slots.actions"
        :class="actionClass"
      >
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
