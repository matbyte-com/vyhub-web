<template>
  <div>
    <v-card>
      <v-card-text>
        <v-list dense>
          <v-list-item v-for="message in messages" :key="message.id">
            <UserLink :user="message.user" />
            <v-spacer />
            {{ message.message }}
            <v-spacer />
            {{ utils.formatDate(message.created_on) }}
          </v-list-item>
        </v-list>
        <v-text-field
          v-model="message"
          label="Message"
          single-line
          hide-details
        ></v-text-field>
        <v-btn @click="send_message">
          Submit
        </v-btn>
      </v-card-text>
    </v-card>
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
      messages: [],
      message: '',
      connection: '',
    };
  },
  mounted() {
    this.connect();
  },
  methods: {
    connect() {
      const backendURL = config.backend_url;
      console.log('PreConnect');
      this.connection = new WebSocket('ws://localhost:5050/v1/chat/ws');

      this.connection.onmessage = (event) => {
        this.messages.push(JSON.parse(event.data));
      };

      this.connection.onopen = (event) => {
        console.log('Connected');
      };
    },
    send() {
      this.connection.send(this.message);
      this.message = '';
    },
    async send_message() {
      (await openapi).chat_createMessage(undefined, {
        message: this.message,
      }).then(() => {
        console.log('sent');
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
  },
};
</script>

<style scoped>

</style>
