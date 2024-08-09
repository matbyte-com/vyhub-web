<template>
<div class="vh-home-discord">
  <v-row class="justify-center">
    <v-col class="d-flex align-center"
           :class="{ 'order-2 justify-start': inverted && $vuetify.breakpoint.mdAndUp,
            'justify-end': !inverted && $vuetify.breakpoint.mdAndUp,
             'justify-center': $vuetify.breakpoint.smAndDown }"
           cols="12" md="6">
      <div>
        <div class="text-h3" :class="{ 'white--text': whiteText }">{{ headline }}</div>
        <a :href="inviteLink">
          <v-img width="300px" class="mt-3 mx-auto"
                 :class="{ 'invert-color': !whiteText}"
                 src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0b544a3e3c7c05753bcd_full_logo_white_RGB.png"/>
        </a>
      </div>
    </v-col>
    <v-col cols="12" md="6" :class="{ 'text-start': !inverted && $vuetify.breakpoint.mdAndUp,
     'text-end': inverted && $vuetify.breakpoint.mdAndUp,
      'text-center': $vuetify.breakpoint.smAndDown }">
      <div style="max-width: 100%" v-html="discordWidget"></div>
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
    whiteText: {
      type: Boolean,
      default: true,
    },
    inviteLink: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
.invert-color {
  filter: invert(70%);
}
</style>
