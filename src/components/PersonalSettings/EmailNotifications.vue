<template>
  <v-card class="vh-email-notifications">
    <v-card-title>
      <v-icon start>
        mdi-bell-badge
      </v-icon>
      {{ $t('_personalSettings.emailNotifications') }}
    </v-card-title>
    <v-card-text class="text-body-1">
      <v-switch
        v-model="notificationSwitch"
        :label="$t('_personalSettings.enableEmailNotifications')"
        @update:model-value="updateSettings"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  props: {
    user: {},
  },
  data() {
    return {
      notificationSwitch: false,
    };
  },
  beforeMount() {
    this.notificationSwitch = this.user.email_notification;
  },
  methods: {
    async updateSettings() {
      (await openapi).user_editUser(this.user.id, {
        email_notification: this.notificationSwitch,
      })
        .then((rsp) => {
          this.notificationSwitch = rsp.data.email_notification;
          this.$notify({
            title: this.$t('_messages.toggleSuccess'),
            type: 'success',
          });
          this.$emit('user-changed');
        });
    },
  },
};
</script>

<style scoped>

</style>
