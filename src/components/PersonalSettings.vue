<template>
  <Dialog ref="userSettingsDialog"
          :title="$t('_personalSettings.title')"
          icon="mdi-account">
    <Email :user="userCopy" @user-changed="refreshUser" class="mt-3"/>
    <EmailNotifications :user="userCopy" @user-changed="refreshUser" class="mt-3" />
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
  data() {
    return {
      userCopy: Object,
    };
  },
  props: {
    user: Object,
  },
  beforeMount() {
    this.userCopy = this.user;
  },
  methods: {
    async refreshUser() {
      (await openapi).user_getData(this.user.id).then((rsp) => {
        this.userCopy = rsp.data;
      });
    },
    show() {
      this.refreshUser();
      this.$refs.userSettingsDialog.show();
    },
    close() {
      this.$refs.userSettingsDialog.close();
    },
  },
};
</script>

<style scoped>

</style>
