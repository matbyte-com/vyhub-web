<template>
  <div />
</template>

<script>
import { useVyHubStore } from '@/store';

export default {
  computed: {
    store() {
      return useVyHubStore();
    },
    user() {
      return this.store.user;
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
