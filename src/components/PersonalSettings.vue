<template>
  <Dialog
    ref="userSettingsDialog"
    :title="$t('personalSettings')"
    icon="mdi-account"
    @close="$router.push($route.path)"
    @cancel="$router.push($route.path)"
  >
    <Email
      :user="userCopy"
      class="mt-3"
      @user-changed="refreshUser"
    />
    <EmailNotifications
      :user="userCopy"
      class="mt-3"
      @user-changed="refreshUser"
    />
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
  props: {
    user: Object,
  },
  data() {
    return {
      userCopy: Object,
    };
  },
  beforeMount() {
    this.userCopy = this.user;
  },
  methods: {
    async refreshUser(fromChange = true) {
      (await openapi).user_getUser(this.user.id).then((rsp) => {
        this.userCopy = rsp.data;
      });

      if (fromChange) {
        this.$emit('user-changed');
      }
    },
    show() {
      this.refreshUser(false);
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
