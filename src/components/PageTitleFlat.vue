<template>
  <v-card flat color="primary" class="card-rounded d-flex align-center title-card">
    <v-card-text class="pa-2 ml-1 white--text">
      <transition enter-active-class="animate__fadeIn animate__animated"
                  leave-active-class="absolute">
        <h1 class="text-h5 text-uppercase font-weight-bold">{{ title }}</h1>
      </transition>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'PageTitleFlat',
  props: ['title'],
};
</script>

<style scoped>
.absolute {
  position: absolute;
  opacity: 0;
}
</style>
