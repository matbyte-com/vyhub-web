<template>
  <div>
    <v-app-bar :fixed="fixed" :dense="dense" :app="app" :color="backgroundColor"
               :flat="!app" style="z-index: 3;" :src="backgroundImage">
      <!-- burger menu on the left-->
      <!-- Logo -->
      <v-container class="d-flex align-center">
        <div>
          <v-img alt="Community Logo" class="shrink py-1" contain v-if="logoUrl" :src="logoUrl"
                 @click="$router.push('/')"
                 transition="scale-transition" :width="logo_width" height="50"/>
        </div>
        <!-- Do not overflow on bigger screens -->
        <div v-if="$vuetify.breakpoint.mdAndUp" class="mr-1">
          <v-toolbar-title class="ml-3" :class="{ 'white--text': whiteText }"
                           @click="$router.push('/')">
            {{ headline }}
          </v-toolbar-title>
        </div>
        <!-- Overflow ellipsis (...) on smaller screens -->
        <v-toolbar-title v-else class="ml-3" :class="{ 'white--text': whiteText }"
                         @click="$router.push('/')">
          {{ headline }}
        </v-toolbar-title>
        <v-spacer />
        <!-- TODO fix the links -->
        <v-btn v-for="l in links" :key="l.text" :to="l.link" :class="{ 'white--text': whiteText }"
               text class="my-1">
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
