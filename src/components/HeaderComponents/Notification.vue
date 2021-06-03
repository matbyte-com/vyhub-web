<template>
  <div class="text-center">
    <v-menu
      @input="newMessages = false"
      open-on-hover
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-badge color="warning"
                 :value="newMessages"
                 dot
                 transition="fade-transition"
                 offset-x="20px"
                 offset-y="20px">
          <v-btn icon
                 dark
                 v-bind="attrs"
                 v-on="on"
          >
            <v-icon>
              mdi-bell-outline
            </v-icon>
          </v-btn>
        </v-badge>
      </template>
      <v-card>
        <v-list dense max-height="300px" class="overflow-y-auto">
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
            <v-list-item-content :class="{ 'font-weight-medium': !notification.read }">
              {{ $t(`notification.${notification.message.name}`,
              { ...notification.message.kwargs }) }}
            </v-list-item-content>
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
import EventBus from '@/services/EventBus';

export default {
  name: 'Notification.vue',
  mounted() {
    // this.fetchData();
    this.registerSse();
  },
  data() {
    return {
      notifications: [],
      newMessages: null,
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
          this.newMessages = true;
          EventBus.emit('notification');
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
