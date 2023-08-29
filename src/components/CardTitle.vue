<template>
  <div class="d-flex align-center grow">
    <v-spacer v-if="centered" />
    <v-icon color="primary" left v-if="!noIcon">{{ icon }}</v-icon>
    <!--<v-sheet vertical color="primary" width="2" height="25" v-if="!noIcon">
    </v-sheet>-->
    <span class="mr-1">
      {{ title }}
    </span>
    <v-spacer v-if="centered"/>
  </div>
</template>

<script>
export default {
  name: 'CardTitle',
  props: {
    icon: String,
    title: String,
    noIcon: Boolean,
    centered: Boolean,
  },
};
</script>

<style scoped>

</style>
