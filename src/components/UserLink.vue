<template>
  <router-link :to="{ name: 'UserDashboard', params: {id: user.id}}">
    {{ user.username }}
  </router-link>
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
