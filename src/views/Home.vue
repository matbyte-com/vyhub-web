<template>
  <div>
    <v-parallax
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">
            G Extension
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col
        class="text-center justify-center"
        cols="4">
          <p>
            Herzlich willkommen auf unserem Server.
            Für Fragen wende dich an uns über das Kontaktformular oder über Teamspeak
          </p>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-overlay
        :absolute="true"
        :value="true"
        color="primary"
      :opacity="0.3">
      </v-overlay>
    </v-parallax>
    <v-divider />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  //
})
export default class Home extends Vue {}
</script>
