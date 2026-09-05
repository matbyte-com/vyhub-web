<template>
  <div class="d-flex align-center flex-grow-1 vh-card-title">
    <v-spacer v-if="centered" />
    <v-icon
      v-if="!noIcon"
      color="primary"
      size="small"
      start
    >
      {{ icon }}
    </v-icon>
    <span
      class="mr-1 vh-card-title__text"
      style="white-space: nowrap"
    >
      {{ title }}
    </span>
    <v-spacer v-if="centered" />
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    noIcon: Boolean,
    centered: Boolean,
  },
};
</script>

<style scoped>
/* Canonical card-heading typography. Mirrors the global `.v-card-title` rule in
   main.scss so headers look identical whether authored via this component or as
   a raw <v-card-title>. Kept explicit here so CardTitle is self-contained even
   when used outside a <v-card-title> wrapper. */
.vh-card-title__text {
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.0125em;
}
</style>
