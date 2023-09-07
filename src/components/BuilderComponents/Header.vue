<template>
  <div>
    <v-app-bar :fixed="fixed" :dense="dense" :app="app" :color="backgroundColor"
               :flat="!app" style="z-index: 4;" :src="backgroundImage">
      <!-- burger menu on the left-->
      <!-- Logo -->
      <v-container class="d-flex align-center">
        <div>
          <v-img alt="Community Logo" class="shrink py-1" contain v-if="logoUrl" :src="logoUrl"
                 transition="scale-transition" :width="logo_width" height="50"/>
        </div>
        <!-- Do not overflow on bigger screens -->
        <div v-if="$vuetify.breakpoint.mdAndUp" class="mr-1">
          <v-toolbar-title class="ml-3" :class="{ 'white--text': whiteText }">
            {{ headline }}
          </v-toolbar-title>
        </div>
        <!-- Overflow ellipsis (...) on smaller screens -->
        <v-toolbar-title v-else class="ml-3" :class="{ 'white--text': whiteText }">
          {{ headline }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn v-for="l in links" :key="l.text" :class="{ 'white--text': whiteText }"
               text class="my-1" :href="(!utils.localLink(l) ? l.link : null)"
               :to="utils.localLink(l) ? utils.getLocalLink(l) : null">
          <v-icon :left="!(l.btnText == null || l.btnText === '')" v-if="l.icon">
            {{ l.icon }}
          </v-icon>
          {{ l.btnText }}
        </v-btn>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['headline', 'logoUrl', 'logo_width', 'app', 'backgroundColor', 'whiteText', 'links', 'dense', 'fixed', 'backgroundImage'],
};
</script>

<style scoped>

</style>
