<template>
  <v-dialog
    scrollable
    v-bind="$attrs"
    v-model="open"
    :fullscreen="$vuetify.breakpoint.xsOnly">
    <v-card>
      <v-card-title class="primary white--text">
        <v-icon :if="titleIcon != null" left color="white">{{ icon }}</v-icon>
        <span>{{ title }}</span>
        <v-spacer />
        <v-icon color="white" @click="cancel">mdi-close</v-icon>
      </v-card-title>
      <v-card-text :class="textClass">
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
  data() {
    return {
      open: false,
    };
  },
  props: {
    textClass: String,
    title: String,
    icon: String,
  },
  methods: {
    cancel() {
      this.open = false;
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>

</style>
