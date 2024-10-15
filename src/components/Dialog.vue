<template>
  <v-dialog
    v-bind="$attrs"
    v-model="open"
    scrollable
    :max-width="maxWidth"
    :fullscreen="$vuetify.display.xs"
    :z-index="2000"
  >
    <v-card :class="{ 'card-rounded' : !$vuetify.display.xs }">
      <v-card-title class="bg-primary d-flex">
        <v-icon
          :if="icon != null"
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
        :class="textClass"
      >
        <slot />
      </v-card-text>
      <v-card-actions :class="actionClass">
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    textClass: String,
    actionClass: String,
    title: String,
    icon: String,
    maxWidth: {
      type: Number,
      default: 600,
    },
    modelValue: {
      default: null,
      type: Boolean,
    },
    withId: {
      default: null,
      type: Boolean,
    },
  },
  emits: ['input', 'close', 'cancel', 'update:modelValue'],
  data() {
    return {
      openValue: false,
      item: null,
      id: null,
    };
  },
  computed: {
    open: {
      get() {
        if (this.modelValue == null) {
          return this.openValue;
        }

        return this.modelValue;
      },
      set(newValue) {
        if (this.modelValue == null) {
          this.openValue = newValue;
        } else {
        this.$emit('update:modelValue', newValue);
        }
      },
    },
  },
  watch: {
    open() {
      if (this.modelValue != null) {
        this.$emit('input', this.open);
      }

      if (!this.open) {
        this.$emit('close');
      }
    },
  },
  mounted() {
    if (this.withId) {
      this.id = this.utils.random_string(6);
    }
  },
  methods: {
    cancel() {
      this.close();
      this.$emit('cancel');
    },
    show(item) {
      this.open = true;
      this.item = item;
    },
    getItem() {
      return this.item;
    },
    close() {
      this.open = false;
    },
  },
};
</script>

<style scoped>

</style>
