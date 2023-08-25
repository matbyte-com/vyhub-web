<template>
  <v-card flat color="primary" class="card-rounded d-flex align-center vh-page-title"
          :class="{ 'title-card': !hideTriangle, 'card-rounded': !isMenu }">
    <v-card-text class="pa-2 ml-1 white--text">
      <transition enter-active-class="animate__fadeIn animate__animated"
                  leave-active-class="absolute">
        <div class="d-flex align-center">
          <slot name="start" />
          <v-spacer v-if="$slots.start"/>
          <h1 class="text-h5 text-uppercase font-weight-bold">{{ title }}</h1>
          <v-spacer v-if="$slots.end"/>
          <slot name="end" />
        </div>
      </transition>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'PageTitleFlat',
  props: ['title', 'hideTriangle', 'isMenu', 'open'],
};
</script>

<style scoped>
.absolute {
  position: absolute;
  opacity: 0;
}
</style>
