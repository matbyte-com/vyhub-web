<template>
  <v-card flat color="primary" class="card-rounded-top d-flex align-center vh-page-title"
          :class="{ 'title-card': !hideTriangle,
           'no-bottom-border-radius': noBottomBorderRadius,
           'card-rounded': !isMenu, 'card-rounded-bottom': isMenu &&
            !noBottomBorderRadius}" style="min-height: 30px">
    <v-card-text class="pa-2 ml-1 text-white" v-if="!$slots.empty">
      <transition enter-active-class="animate__fadeIn animate__animated"
                  leave-active-class="absolute">
        <v-row class="justify-center align-center">
          <v-col v-if="$slots.start"><slot name="start" /></v-col>
          <v-col :class="{ 'justify-center' : $slots.start || centered}"
                 class="d-flex align-center">
            <v-icon :size="!$vuetify.breakpoint.smAndDown ? 'large' : undefined"
                    color="white" start v-if="icon">{{ icon }}</v-icon>
            <h1 :class="headlineClasses">{{ title }}</h1>
          </v-col>
          <v-col v-if="$slots.end"><slot name="end" /></v-col>
        </v-row>
      </transition>
      <slot name="subtitle" />
    </v-card-text>
    <slot name="empty" />
  </v-card>
</template>

<script>
export default {
  name: 'PageTitleFlat',
  props: ['title', 'hideTriangle', 'isMenu', 'noBottomBorderRadius', 'icon', 'centered'],
  computed: {
    headlineClasses() {
      let res = '';
      if (this.title && this.title.length > 20 && this.$vuetify.breakpoint.smAndDown) res = 'text-h6';
      else res = 'text-h5 font-weight-bold';
      return res;
    },
  },
};
</script>

<style scoped>
.absolute {
  position: absolute;
  opacity: 0;
}
</style>
