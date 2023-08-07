<template>
<div>
  <v-row class="justify-center">
    <v-col class="d-flex align-center"
           :class="{ 'order-2 justify-start': inverted, 'justify-end': !inverted }"
           cols="12" md="6">
      <div>
        <div class="text-h3">{{ headline }}</div>
        <v-img width="300px" class="mt-3 mx-auto"
               :class="{ 'invert-color': !$vuetify.theme.dark}"
               src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0b544a3e3c7c05753bcd_full_logo_white_RGB.png"/>
      </div>
    </v-col>
    <v-col cols="12" md="6" :class="{ 'text-start': !inverted, 'text-end': inverted }">
      <div v-html="discordWidget"></div>
    </v-col>
  </v-row>
</div>
</template>

<script>
export default {
  name: 'Discord',
  props: {
    headline: {
      type: String,
      default: 'Join our Community on',
    },
    discordWidget: {
      type: String,
    },
    inverted: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.invert-color {
  filter: invert(70%);
}
</style>
