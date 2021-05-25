<template>
<div>
  Notify
</div>
</template>

<script>
import store from '@/store';
import EventSource from 'eventsource';

export default {
  name: 'Notification.vue',
  mounted() {
    this.registerSse();
  },
  methods: {
    registerSse() {
      if (store.getters.accessToken) {
        const header = `Bearer ${store.getters.accessToken}`;
        const baseURL = `${process.env.VUE_APP_BACKEND_CUSTOMER_URL}/notification/stream`;
        const evtSource = new EventSource(baseURL, {
          headers: {
            Authorization: header,
          },
        });
        evtSource.addEventListener('update', (event) => {
          // Logic to handle status updates
          console.log(event);
          console.log(event.data);
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
