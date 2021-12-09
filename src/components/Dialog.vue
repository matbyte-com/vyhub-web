<template>
  <v-dialog
    scrollable
    v-bind="$attrs"
    v-model="open"
    :max-width="maxWidth"
    :fullscreen="$vuetify.breakpoint.xsOnly">
    <v-card>
      <v-card-title class="primary white--text">
        <v-icon :if="icon != null" left color="white">{{ icon }}</v-icon>
        <span>{{ title }}</span>
        <v-spacer />
        <v-icon color="white" @click="cancel">mdi-close</v-icon>
      </v-card-title>
      <v-card-text :class="textClass" :id="id">
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    textClass: String,
    title: String,
    icon: String,
    maxWidth: {
      type: Number,
      default: 600,
    },
    value: {
      default: null,
      type: Boolean,
    },
    withId: {
      default: null,
      type: Boolean,
    },
  },
  data() {
    return {
      openValue: false,
      item: null,
      id: null,
    };
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
  computed: {
    open: {
      get() {
        if (this.value == null) {
          return this.openValue;
        }

        return this.value;
      },
      set(newValue) {
        if (this.value == null) {
          this.openValue = newValue;
        } else {
          this.$emit('input', newValue);
        }
      },
    },
  },
  watch: {
    open() {
      this.$emit('input', this.open);
      if (!this.open) {
        this.$emit('close');
      }
    },
  },
};
</script>

<style scoped>

</style>
