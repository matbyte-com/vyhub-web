<template>
  <v-chip @click="$router.push({ name: 'UserDashboard', params: {id: user.id}})"
          :outlined="outline" color="primary">
    <v-icon small>mdi-account</v-icon>
    {{ user.username }}
  </v-chip>
</template>

<script>
export default {
  name: 'UserLink',
  props: {
    user: Object,
    outline: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>

</style>
