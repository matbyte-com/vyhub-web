<template>
  <Dialog ref="dialog" @cancel="$router.push($route.path, query: {} )">
    Test
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue';

export default {
  name: 'PersonalSettings',
  components: { Dialog },
  watch: {
    $route(to) {
      if (to.query.personal_settings === 'true') {
        this.$refs.dialog.show();
      } else {
        this.$refs.dialog.close();
      }
    },
  },
};
</script>

<style scoped>

</style>
