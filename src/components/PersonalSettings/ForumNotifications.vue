<template>
  <v-card class="vh-forum-notifications card-rounded">
    <v-card-title class="d-flex align-center">
      <v-icon start>
        mdi-forum
      </v-icon>
      {{ $t('_personalSettings.forumNotifications') }}
    </v-card-title>
    <v-card-text class="text-body-1">
      <v-switch
        v-model="notificationSwitch"
        color="primary"
        hide-details="auto"
        :label="$t('_personalSettings.enableForumNotifications')"
        @update:model-value="updateSettings"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  props: {
    user: { type: Object, default: null },
  },
  emits: ['user-changed'],
  data() {
    return {
      notificationSwitch: false,
    };
  },
  beforeMount() {
    this.notificationSwitch = this.user.forum_notification;
  },
  methods: {
    async updateSettings() {
      (await openapi).user_editUser(this.user.id, {
        forum_notification: this.notificationSwitch,
      })
        .then((rsp) => {
          this.notificationSwitch = rsp.data.forum_notification;
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
