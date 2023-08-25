<template>
  <v-card flat color="primary" class="card-rounded-top d-flex align-center vh-page-title"
          :class="{ 'title-card': !hideTriangle, 'no-bottom-border-radius': open,
           'card-rounded': !isMenu, 'card-rounded-bottom': isMenu && !open }">
    <v-card-text class="pa-2 ml-1 white--text">
      <transition enter-active-class="animate__fadeIn animate__animated"
                  leave-active-class="absolute">
        <v-row class="justify-center align-center">
          <v-col><slot name="start" /></v-col>
          <v-col class="text-center">
            <h1 class="text-h5 text-uppercase font-weight-bold">{{ title }}</h1>
          </v-col>
          <v-col><slot name="end" /></v-col>
        </v-row>
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
