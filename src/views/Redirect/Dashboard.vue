<template>
  <div />
</template>

<script>
export default {
  name: 'Dashboard',
  beforeMount() {
    this.$router.push({
      name: 'UserDashboard', params: { id: this.$store.getters.user.id },
    });
  },
};
</script>

<style scoped>

</style>
