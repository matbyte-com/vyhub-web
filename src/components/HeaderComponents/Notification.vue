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
      <v-card min-width="150px">
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
            @click="rowClick(notification)"
          >
            <v-list-item-icon>
              <v-icon>{{ notification.message.kwargs.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content :class="{ 'font-weight-medium': !notification.read }">
              {{ $t(`notification.${notification.message.name}`,
              { ...notification.message.kwargs }) }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-card-actions>
          <v-btn color="primary" small outlined to="/notification" class="mr-5">
            {{ $t('notification.viewAll') }}
          </v-btn>
          <v-btn x-small outlined @click="requestPermission" v-if="reqNotificationButton">
            {{ $t('notification.browserNotifications') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import store from '@/store/index';
import openapi from '@/api/openapi';
import openapiCached from '@/api/openapiCached';
import Eventsource from 'eventsource';
import EventBus from '@/services/EventBus';
import config from '@/config';

export default {
  name: 'Notification.vue',
  data() {
    return {
      notifications: [],
      newMessages: null,
      evtSource: null,
      serverName: 'VyHub',
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
        const baseURL = `${config.backend_url}/notification/stream`;
        this.evtSource = new Eventsource(baseURL, {
          headers: {
            Authorization: header,
          },
        });
        this.evtSource.addEventListener('update', (event) => {
          // Logic to handle status updates
          this.notifications.unshift(...JSON.parse(event.data));
          this.notifications.splice(20);
          this.newMessages = true;
          EventBus.emit('notification');
          this.notifyBrowser(JSON.parse(event.data)[0].message);
        });
        this.evtSource.addEventListener('end', () => {
          this.evtSource.close();
        });
        this.evtSource.onerror = (err) => {
          this.utils.notifyUnexpectedError(err);
          console.log('Notification Stream Closed');
          if (this.evtSource != null) {
            this.evtSource.close();
            throw (err);
          }
        };
      }
    },
    afterLogin() {
      this.notifications = [];
      this.registerSse();
    },
    afterLogout() {
      if (this.evtSource != null) {
        this.evtSource.close();
      }
      this.notifications = [];
    },
    rowClick(item) {
      this.toggleReadStatus(item);
      if (item.link) this.$router.push({ name: item.link.name, params: { ...item.link.kwargs } });
    },
    notifyBrowser(data) {
      if (!('Notification' in window)) {
        console.log('This browser does not support desktop notification');
      } else if (Notification.permission === 'granted') {
        this.$notification.show(this.serverName, {
          body: this.$t(`notification.${data.name}`,
            { ...data.kwargs }),
        }, {});
      }
    },
    requestPermission() {
      this.$notification.requestPermission()
        .then(console.log);
    },
    async getServerName() {
      if (localStorage.getItem('generalSettings')) {
        const obj = JSON.parse(localStorage.getItem('generalSettings'));
        this.serverName = obj.community_name;
      }
      (await openapiCached).design_getGeneralSettings().then((rsp) => {
        this.serverName = rsp.data.community_name;
        localStorage.setItem('serverName', JSON.stringify(rsp.data));
      });
    },
    async toggleReadStatus(item) {
      (await openapi).notification_markAsRead(null, { id: [item.id] });
      // eslint-disable-next-line no-param-reassign
      item.read = !item.read;
    },
  },
  beforeDestroy() {
    if (this.evtSource) this.evtSource.close();
  },
  mounted() {
    this.getServerName();
    // Emitted in AuthService.ts
    EventBus.on('login', this.afterLogin);
    EventBus.on('logout', this.afterLogout);
    setTimeout(() => { this.registerSse(); }, 700);
  },
  created() {
    window.addEventListener('beforeunload', () => {
      if (this.evtSource) this.evtSource.close();
    }, false);
  },
  computed: {
    reqNotificationButton() {
      return Notification.permission !== 'granted';
    },
  },
};
</script>

<style scoped>

</style>
