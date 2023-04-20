<template>
  <div>
    <v-menu v-model="menu" :close-on-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-fade-transition>
          <div style="position: fixed; left: 0; bottom: 0; z-index: 150">
            <v-badge v-if="!menu" overlap :content="newMessages" :value="newMessages">
              <v-btn v-bind="attrs" v-on="on" class="ml-3 mb-3" @click="newMessages = 0">
                <v-icon left>mdi-chat</v-icon>
                {{ $t('chat') }}
              </v-btn>
            </v-badge>
          </div>
        </v-fade-transition>
      </template>
      <v-card width="500px" @click.stop flat>
        <v-card-title class="primary white--text" >
          <v-icon color="white" left>mdi-chat</v-icon>
          {{ $t('chat') }}
          <v-spacer />
          <v-icon large color="white" @click="menu = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-skeleton-loader v-if="!messages" type="list-item@3"/>
          <v-list dense class="pt-0 d-flex flex-column-reverse" style="overflow: auto"
                  max-height="300px">
            <div v-for="(key, value) in messages" :key="key+1">
              <v-list-item>
                <v-divider/>
                <span class="ml-2 mr-2">{{ value }}</span>
                <v-divider/>
              </v-list-item>
              <div v-for="(message, key) in messages[value]" :key="message.id">
                <v-divider v-if="key !== 0"/>
                <v-list-item
                             class="text-sm-body-1">
                  <v-row no-gutters>
                    <v-col cols="5" class="d-flex align-center" style="overflow: hidden">
                      <div>
                        {{
                          new Date(message.created_on).toLocaleTimeString([],
                            {hour: '2-digit', minute: '2-digit'})
                        }}
                      </div>
                      <UserLink class="ml-1" :small="true" :user="message.user"/>
                    </v-col>
                    <v-col class="ml-3">{{ message.message }}</v-col>
                  </v-row>
                </v-list-item>
              </div>
            </div>
          </v-list>
          <div v-if="$store.getters.isLoggedIn">
            <v-text-field
              @click.stop
              v-model="message"
              @keydown.space.stop
              label="Message"
              single-line
              hide-details
              @keydown.enter="sendMessage">
              <template v-slot:append-outer>
                <v-icon @click="sendMessage" color="primary" :disabled="message === ''">
                  mdi-send
                </v-icon>
              </template>
            </v-text-field>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import config from '@/config';
import store from '@/store';
import openapi from '@/api/openapi';
import UserLink from '@/components/UserLink.vue';

export default {
  name: 'Chat.vue',
  components: { UserLink },
  data() {
    return {
      messages: null,
      message: '',
      connection: '',
      menu: false,
      newMessages: 0,
    };
  },
  mounted() {
    this.connect();
    this.fetchData();
  },
  methods: {
    connect() {
      const backendURL = config.backend_url;
      this.connection = new WebSocket('ws://localhost:5050/v1/chat/ws');

      this.connection.onmessage = (event) => {
        const date = new Date().toLocaleDateString();
        if (!this.messages[date]) {
          this.messages[date] = [];
        }
        this.messages[date].push(JSON.parse(event.data));
        if (!this.menu) this.newMessages += 1;
      };

      this.connection.onopen = (event) => {
        console.log('Chat Connected');
      };
    },
    async sendMessage() {
      if (this.message === '') {
        return;
      }
      (await openapi).chat_createMessage(undefined, {
        message: this.message,
      }).then(() => {
        this.message = '';
      }).catch((err) => {
        console.log(err);
      });
    },
    async fetchData() {
      const res = {};
      await (await openapi).chat_getMessages().then((rsp) => {
        const reverseMessages = rsp.data;
        reverseMessages.forEach((m) => {
          const date = new Date(m.created_on).toLocaleDateString();
          if (!res[date]) {
            res[date] = [];
          }
          res[date].push(m);
        });
      });
      Object.entries(res).forEach(([key, value]) => {
        res[key] = value.reverse();
      });
      this.messages = res;
    },
  },
};
</script>

<style scoped>

</style>
