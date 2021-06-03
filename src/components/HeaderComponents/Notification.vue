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
      <v-card>
        <v-list dense height="300px" class="overflow-y-auto">
          <v-list-item v-if="notifications.length===0">
            <v-list-item-title>
              {{ $t('notification.noNotification') }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-else
            v-for="notification in notifications"
            :key="notification.id"
          >
            <v-list-item-icon v-if="notification.icon">
              <v-icon>{{ notification.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ notification.category }} {{ notification.message }}
              {{ notification.read }} {{ notification.created_on }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-card-actions>
          <router-link to="/notification">
            {{ $t('notification.viewAll') }}
          </router-link>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import store from '@/store';
import openapi from '@/api/openapi';
import Eventsource from 'eventsource';

export default {
  name: 'Notification.vue',
  mounted() {
    // this.fetchData();
    this.registerSse();
  },
  data() {
    return {
      notifications: [],
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
        const evtSource = new Eventsource(baseURL, {
          headers: {
            Authorization: header,
          },
        });
        evtSource.addEventListener('update', (event) => {
          // Logic to handle status updates
          this.notifications.unshift(...JSON.parse(event.data));
          this.notifications.splice(20);
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
