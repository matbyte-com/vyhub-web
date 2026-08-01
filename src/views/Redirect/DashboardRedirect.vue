<template>
  <div />
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  watch: {
    // The user object is loaded asynchronously after login, so it may still be
    // null when this redirect mounts. Wait until it (and its id) are available
    // before forwarding to the dashboard.
    user: {
      immediate: true,
      handler(user) {
        if (user && user.id) {
          this.$router.replace({
            name: 'UserDashboard', params: { id: user.id },
          });
        }
      },
    },
  },
};
</script>

<style scoped>

</style>
