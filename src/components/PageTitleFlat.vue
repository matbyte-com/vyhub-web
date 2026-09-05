<template>
  <v-card
    flat
    :color="attached ? 'primary' : 'transparent'"
    class="d-flex align-center vh-page-title overflow-visible"
    :class="cardClasses"
    style="min-height: 30px"
  >
    <v-card-text
      v-if="!$slots.empty"
      class="pa-2 ml-1"
      :class="{ 'text-white': attached }"
      style="min-width: 0"
    >
      <div
        v-if="$slots.start_or_above"
        class="hidden-sm-and-up"
      >
        <slot name="start_or_above" />
      </div>
      <transition
        enter-active-class="animate__fadeIn animate__animated"
        leave-active-class="absolute"
      >
        <v-row class="justify-center align-center">
          <v-col
            v-if="$slots.start_or_above"
            cols="2"
            class="hidden-xs"
          >
            <slot name="start_or_above" />
          </v-col>
          <v-col v-if="$slots.start">
            <slot name="start" />
          </v-col>
          <v-col
            :class="{ 'justify-center' : $slots.start || centered}"
            class="d-flex align-center"
          >
            <v-icon
              v-if="icon"
              :size="!$vuetify.display.smAndDown ? 'large' : undefined"
              :color="attached ? 'white' : 'primary'"
              start
            >
              {{ icon }}
            </v-icon>
            <h1 :class="headlineClasses">
              {{ title }}
            </h1>
          </v-col>
          <v-col
            v-if="$slots.end"
            cols="auto"
          >
            <slot name="end" />
          </v-col>
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
  props: {
    title: {
      type: String,
      default: '',
    },
    hideTriangle: {
      type: Boolean,
      default: false,
    },
    isMenu: {
      type: Boolean,
      default: false,
    },
    noBottomBorderRadius: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    centered: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    // "Attached" titles sit directly on top of a card/menu below them (tabs,
    // cart, mobile search) and form one visual unit, so they keep the familiar
    // filled primary header. Standalone page titles use the cleaner, more modern
    // accent-bar heading (transparent background, bold heading, primary left bar).
    attached() {
      return this.isMenu || this.noBottomBorderRadius;
    },
    cardClasses() {
      if (!this.attached) {
        return 'vh-page-title--accent';
      }
      return {
        'card-rounded-top': true,
        'no-bottom-border-radius': this.noBottomBorderRadius,
        'card-rounded': !this.isMenu,
        'card-rounded-bottom': this.isMenu && !this.noBottomBorderRadius,
      };
    },
    headlineClasses() {
      let res = '';
      if (this.title && this.title.length > 20 && this.$vuetify.display.smAndDown) res = 'text-h6';
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

/* Standalone page title: a bold heading on the page surface with a primary-colored
   left accent bar. Reads as modern on any theme because the heading text keeps the
   default on-background color (always legible) while the brand color shows in the
   accent bar and icon. */
.vh-page-title--accent {
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 0 8px 8px 0;
}
</style>
