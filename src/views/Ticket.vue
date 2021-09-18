<template>
  <div>
    <ThreadAddDialog ref="addThreadDialog" :dialog-title="$t('_ticket.addTicket')"
                     @submit="newThread"/>
    <div class="d-flex mb-5">
      <PageTitle icon="mdi-ticket-confirmation">{{ $t('_ticket.tickets') }}</PageTitle>
      <v-spacer />
      <v-btn color="success" @click="$refs.addThreadDialog.show()">
        <v-icon left>mdi-plus</v-icon>
        <span>{{ $t('_ticket.addTicket') }}</span>
      </v-btn>
    </div>
    <div class="d-flex mt-3" v-for="ticket in tickets" :key="ticket.id">
      <v-avatar size="100px">
        <v-img :src="ticket.creator.avatar"/>
      </v-avatar>
      <v-card :to="{ name: 'Thread', params: { id: ticket.id } }" class="ml-10" flat outlined
              width="100%" >
        <v-card-title :class="{ 'grey-title': !$vuetify.theme.dark }">
          <v-row>
            <v-col>
              {{ ticket.title }}
            </v-col>
            <v-col v-if="$checkProp('news_edit')" class="text-right">
              <v-btn outlined color="primary" small
                     @click="openEditMessageDialog()" class="mr-1">
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn outlined color="error" small @click="openDeleteMessageDialog()">
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="mt-3">
          <span v-html="ticket.content.substr(0,300)" class="ql-editor"/>
          <div class="d-flex align-center" v-if="ticket.content.length > 300">
            <v-icon>mdi-arrow-right-top</v-icon>
            <span>... {{ $t('_ticket.readMore') }}</span>
          </div>
        </v-card-text>
        <v-card-actions class="text--disabled pt-0">
          <span class="mr-3">{{ $d(new Date(ticket.created), 'long') }}</span>
          <user-link v-if="ticket.creator" :user="ticket.creator"/>
        </v-card-actions>
      </v-card>
    </div>
    <v-card v-if="tickets === []">
      {{ $t('_ticket.noTickets') }}
    </v-card>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue';
import openapi from '../api/openapi';
import ThreadAddDialog from '../components/ForumComponents/ThreadAddDialog.vue';
import UserLink from '../components/UserLink.vue';

export default {
  components: {
    ThreadAddDialog,
    PageTitle,
    UserLink,
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
