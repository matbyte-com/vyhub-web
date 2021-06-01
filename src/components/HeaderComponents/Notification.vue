<template>
  <div class="text-center">
    <v-menu
      open-on-hover
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>
            mdi-bell-outline
          </v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="notification in notifications"
          :key="notification.id"
        >
          <v-list-item-title>{{ notification.category }} {{ notification.message }}
            {{ notification.read }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import store from '@/store';
import openapi from '@/api/openapi';

export default {
  name: 'Notification.vue',
  mounted() {
    this.fetchData();
    this.registerSse();
  },
  data() {
    return {
      notifications: null,
    };
  },
  methods: {
    async fetchData() {
      (await openapi).notification_getNotifications().then((rsp) => {
        this.notifications = rsp.data;
      });
    },
    registerSse() {
      if (store.getters.isLoggedIn && store.getters.accessToken) {
        const header = `Bearer ${store.getters.accessToken}`;
        const baseURL = `${process.env.VUE_APP_BACKEND_CUSTOMER_URL}/notification/stream`;
        const evtSource = new EventSource(baseURL, {
          headers: {
            Authorization: header,
          },
        });
        evtSource.addEventListener('update', (event) => {
          // Logic to handle status updates
          console.log(JSON.parse(event.data));
        });
        evtSource.addEventListener('end', () => {
          evtSource.close();
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
