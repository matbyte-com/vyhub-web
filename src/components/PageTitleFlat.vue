<template>
  <v-card flat color="primary" class="card-rounded d-flex align-center title-card">
    <v-card-text class="pa-2 ml-1 white--text">
      <h1 class="text-h5 text-uppercase font-weight-bold">{{ title }}</h1>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'PageTitleFlat',
  props: ['title'],
};
</script>

<style scoped>

</style>
