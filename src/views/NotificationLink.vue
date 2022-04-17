<template>
<div>
  <v-card>
    <v-card-text>
      <v-progress-circular indeterminate />
      {{ $t('redirect') }}
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import openapi from '../api/openapi';

export default {
  name: 'NotificationLink',
  data() {
    return {
      notificationId: null,
    };
  },
  beforeMount() {
    this.notificationId = this.$route.params.id;
    this.fetchNotification();
  },
  methods: {
    async fetchNotification() {
      (await openapi).notification_getNotification(this.notificationId).then((rsp) => {
        const item = rsp.data;
        if (item.link) this.$router.push({ name: item.link.name, params: { ...item.link.kwargs } });
        else this.$router.push('/');
      });
    },
  },
};
</script>

<style scoped>

</style>
