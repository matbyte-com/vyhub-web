<template>
  <Dialog ref="dialog" @cancel="$router.push($route.path)" :title="$t('_personalSettings.title')"
          @close="$router.push($route.path)"
          icon="mdi-account">
    <Email class="mt-3"/>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue';
import Email from '@/components/PersonalSettings/Email.vue';

export default {
  name: 'PersonalSettings',
  components: { Email, Dialog },
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
