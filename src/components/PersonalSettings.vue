<template>
  <Dialog ref="dialog" @cancel="$router.push($route.path)" :title="$t('_personalSettings.title')"
          @close="$router.push($route.path)"
          icon="mdi-account">
    <Email :user-prop="user" class="mt-3"/>
    <EmailNotifications :user="user" class="mt-3" />
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue';
import Email from '@/components/PersonalSettings/Email.vue';
import EmailNotifications from '@/components/PersonalSettings/EmailNotifications.vue';
import openapi from '@/api/openapi';

export default {
  name: 'PersonalSettings',
  components: { EmailNotifications, Email, Dialog },
  watch: {
    $route(to) {
      if (to.query.personal_settings === 'true') {
        this.$refs.dialog.show();
      } else {
        this.$refs.dialog.close();
      }
    },
  },
  data() {
    return {
      user: {},
    };
  },
  beforeMount() {
    this.getUser();
  },
  methods: {
    async getUser() {
      (await openapi).user_getCurrentUser().then((rsp) => {
        this.user = rsp.data;
      });
    },
  },
};
</script>

<style scoped>

</style>
