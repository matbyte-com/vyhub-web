<template>
  <div>
    <ThreadAddDialog ref="addThreadDialog" :dialog-title="$t('_ticket.addTicket')"
                     @submit="newThread"/>
    <div class="d-flex mb-5">
      <PageTitle icon="mdi-ticket-confirmation">{{ $t('_ticket.tickets') }}</PageTitle>
      <v-spacer />
      <v-card height="20%">
        <v-card-text class="d-flex">
          <v-checkbox v-model="showClosed" :label="$t('_ticket.showClosed')" @change="fetchData"
                      hide-details="true" class="text-capitalize">
          </v-checkbox>
          <v-text-field hide-details="true"
                        class="ml-3"
                        @input="fetchData" v-model="query" :label="$t('search')"/>
          <v-divider vertical class="ml-3" />
          <v-btn color="success" class="ml-5 align-self-center" depressed
                 @click="$refs.addThreadDialog.show()">
            <v-icon left>mdi-plus</v-icon>
            <span>{{ $t('_ticket.addTicket') }}</span>
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
    <div class="d-flex mt-3" v-for="ticket in tickets" :key="ticket.id">
      <v-avatar size="100px">
        <v-img :src="ticket.creator.avatar"/>
      </v-avatar>
      <v-card :to="{ name: 'Thread', params: { id: ticket.id } }" class="ml-10" flat outlined
              width="100%" >
        <v-card-title :class="{ 'grey-title': !$vuetify.theme.dark }">
          <span>{{ ticket.title }}</span>
          <v-spacer />
          <v-chip v-if="ticket.status === 'OPEN'" color="success" class="text-uppercase">
            {{ $t('_ticket.open') }}
          </v-chip>
          <v-chip v-else color="error" class="text-uppercase">
            {{ $t('_ticket.closed') }}
          </v-chip>
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
    <div class="d-flex mt-3">
      <v-spacer />
      <v-btn fab small :disabled="page===1" @click="page = page - 1">
        <v-icon>
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <v-btn fab small class="ml-2" @click="page = page + 1" :disabled="total / 50 <= page">
        <v-icon>
          mdi-chevron-right
        </v-icon>
      </v-btn>
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
      showClosed: false,
      query: '',
      page: 1,
      total: 50,
    };
  },
  beforeMount() {
    if (this.$route.query.page) this.page = this.$route.query.page;
    this.fetchData();
  },
  watch: {
    page() {
      this.$router.replace({ query: { page: this.page } });
      this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      (await openapi).forum_getTickets({
        show_closed: this.showClosed,
        query: this.query,
        page: this.page,
      })
        .then((rsp) => { this.tickets = rsp.data.items; this.total = rsp.data.total; });
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
