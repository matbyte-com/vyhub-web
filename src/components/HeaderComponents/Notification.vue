<template>
  <div class="text-center">
    <v-menu
      @input="newMessages = false"
      open-on-hover
      offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-badge color="warning"
                 :value="newMessages"
                 dot
                 transition="fade-transition"
                 offset-x="10px"
                 offset-y="10px">
          <v-btn icon
                 style="min-width: 30px; width: 34px; height: 34px"
                 v-bind="attrs"
                 v-on="on">
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
              {{ $t('_notification.noNotification') }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-else
            v-for="notification in notifications"
            :key="notification.id"
            @click="rowClick(notification)">
            <v-list-item-icon>
              <v-icon>{{ notification.message.kwargs.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content :class="{ 'font-weight-medium': !notification.read }">
              {{ $t(`_notification.${notification.message.name}`,
              { ...notification.message.kwargs }) }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-card-actions>
          <v-btn color="primary" small outlined to="/notification" class="mr-5">
            {{ $t('_notification.viewAll') }}
          </v-btn>
          <v-btn x-small outlined @click="requestPermission" v-if="reqNotificationButton">
            {{ $t('_notification.browserNotifications') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import Eventsource from 'eventsource';
import store from '@/store/index';
import openapi from '@/api/openapi';
import EventBus from '@/services/EventBus';
import config from '@/config';
import SessionService from '@/services/SessionService';

export default {
  name: 'Notification.vue',
  data() {
    return {
      notifications: [],
      newMessages: null,
      evtSource: null,
      serverName: 'VyHub',
      timer: '',
    };
  },
  methods: {
    async fetchData() {
      // return if this window was not the last active VyHub window
      if (!SessionService.lastActiveWindow()) {
        return;
      }

      if (!this.$store.getters.isLoggedIn) {
        return;
      }

      let lastNotificationId = 0;
      if (this.notifications.length >= 1) {
        lastNotificationId = this.notifications[0].id;
      }
      await (await openapi).notification_getPreviewNotifications().then((rsp) => {
        this.notifications = rsp.data;
      }).catch(() => {
        this.stopTimer();
      });

      if (this.notifications.length >= 1) {
        if (this.notifications.filter((n) => !n.read).length > 0) {
          if (this.notifications[0].id !== lastNotificationId) {
            this.newMessages = true;
            this.notifyBrowser(this.notifications[0].message);
          }
        }
      }
    },
    startTimer() {
      if (this.$store.getters.isLoggedIn) {
        this.fetchData();
        this.timer = setInterval(this.fetchData, 30000);
      }
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    registerSse() {
      // TODO Fix and Enable for Production
      return;
      // eslint-disable-next-line no-unreachable
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
        // eslint-disable-next-line no-unreachable
        this.evtSource.addEventListener('end', () => {
          this.evtSource.close();
        });
        // eslint-disable-next-line no-unreachable
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
      this.startTimer();
    },
    afterLogout() {
      if (this.evtSource != null) {
        this.evtSource.close();
      }
      this.stopTimer();
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
          body: this.$t(`_notification.${data.name}`,
            { ...data.kwargs }),
        }, {});
      }
    },
    requestPermission() {
      this.$notification.requestPermission()
        .then(console.log);
    },
    async getServerName() {
      if (this.$store.getters.generalConfig) {
        this.serverName = this.$store.getters.generalConfig.community_name;
      }
    },
    async toggleReadStatus(item) {
      if (item.read !== true) {
        (await openapi).notification_markAsRead(null, { id: [item.id] });
        // eslint-disable-next-line no-param-reassign
        item.read = !item.read;
      }
    },
  },
  beforeDestroy() {
    if (this.evtSource) this.evtSource.close();
    this.stopTimer();
  },
  mounted() {
    this.getServerName();
    // Emitted in AuthService.ts
    EventBus.on('login', this.afterLogin);
    EventBus.on('logout', this.afterLogout);
    setTimeout(() => { this.registerSse(); }, 700);
    this.startTimer();
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
