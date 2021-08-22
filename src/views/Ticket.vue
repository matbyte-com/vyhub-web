<template>
  <div>
    <ThreadAddDialog ref="addThreadDialog" :dialog-title="$t('_ticket.addTicket')"
                     @submit="newThread"/>
    <div class="d-flex">
      <PageTitle icon="mdi-ticket-confirmation">{{ $t('_ticket.tickets') }}</PageTitle>
      <v-spacer />
      <v-btn color="success" @click="$refs.addThreadDialog.show()">
        <v-icon left>mdi-plus</v-icon>
        <span>{{ $t('_ticket.addTicket') }}</span>
      </v-btn>
    </div>
    <v-card v-for="ticket in tickets" :key="ticket.id" class="mb-3"
            :to="{ name: 'Thread', params: { id: ticket.id } }">
      <v-card-title>
        <v-avatar>
          <v-img :src="ticket.creator.avatar"/>
        </v-avatar>
        <span class="ml-3">{{ ticket.title }}</span>
        <v-spacer />
        <span class="text--disabled subtitle-2">
          {{ $d(new Date(ticket.created), 'long') }}
        </span>
        <span class="ml-3 mb-1">
          <v-btn outlined color="primary" small
                 @click="openEditMessageDialog(message)" class="mr-1">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn outlined color="error" small @click="openDeleteMessageDialog(message)">
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </span>
      </v-card-title>
      <v-card-text class="ql-editor ml-15">
        <span v-html="ticket.content.substr(0,300)" />
        <div class="d-flex align-center" v-if="ticket.content.length > 3">
          <v-icon left>mdi-arrow-right-bottom-bold</v-icon>
          <span>{{ $t('_ticket.readMore') }}</span>
        </div>
      </v-card-text>
    </v-card>
    <v-card v-if="tickets === []">
      {{ $t('_ticket.noTickets') }}
    </v-card>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue';
import openapi from '../api/openapi';
import ThreadAddDialog from '../components/ForumComponents/ThreadAddDialog.vue';

export default {
  components: {
    ThreadAddDialog,
    PageTitle,
  },
  name: 'Ticket.vue',
  data() {
    return {
      tickets: [],
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).forum_getTickets().then((rsp) => { this.tickets = rsp.data; });
      return true;
    },
    async newThread() {
      const data = this.$refs.addThreadDialog.getData();
      data.category = 'TICKET';
      (await openapi).forum_newThread(null, data).then(() => {
        this.$refs.addThreadDialog.close();
        this.fetchData();
      }).catch((err) => {
        this.$refs.addThreadDialog.setErrorMessage(err.response.data.detail);
      });
    },
  },
};
</script>

<style scoped>

</style>
