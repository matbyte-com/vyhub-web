<template>
  <v-chip @click="$router.push({ name: 'UserDashboard', params: {id: user.id}})"
          outlined color="primary">
    <v-icon small>mdi-account</v-icon>
    {{ user.username }}
  </v-chip>
</template>

<script>
export default {
  name: 'UserLink',
  props: {
    user: Object,
  },
};
</script>

<style scoped>

</style>
