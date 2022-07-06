<template>
  <div></div>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  name: 'UserProfile',
  beforeMount() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      const api = await openapi;

      api.user_getUser({
        identifier: this.$route.params.id,
        type: this.$route.params.type.toUpperCase(),
      }).then((rsp) => {
        const user = rsp.data;

        this.$router.push({
          name: 'UserDashboard', params: { id: user.id },
        });
      }).catch(() => {
        this.$router.push({
          name: 'Home',
        });
      });
    },
  },
};
</script>

<style scoped>

</style>
