<template>
  <div>
    <PageTitle icon="mdi-ticket-confirmation">{{ $t('_ticket.tickets') }}</PageTitle>
    <v-card>
      <v-card-text>
        <PaginatedDataTable
          ref="ticketTable"
          :headers="headers"
          :items="tickets"
          :totalItems="totalItems"
          default-sort-by="created"
          :default-sort-desc="true"
          @reload="fetchData"
          :item-class="ticketRowFormatter"
          @click:row="showTicket"
          class="cursor"
        >
          <template v-slot:header>
            <v-checkbox v-model="show_closed" :label="$t('_ticket.showClosed')" @change="fetchData"
                        class="text-capitalize">
            </v-checkbox>
          </template>
          <template v-slot:item.created="{ item }">
            {{ utils.formatDate(item.created) }}
          </template>
          <template v-slot:item.creator="{ item }">
            <v-avatar class="ma-1">
              <v-img v-if="item.creator" :src="item.creator.avatar"/>
              <v-img v-else src="https://www.gravatar.com/avatar/{}?d=retro&s=200"/>
            </v-avatar>
            <UserLink v-if="item.creator" @click.prevent :user="item.creator"></UserLink>
          </template>
          <template v-slot:item.last_post="{ item }">
            <span v-if="item.last_post" class="text-right">
              {{ utils.formatDate(item.last_post.created) }}
              <UserLink @click.prevent :user="item.last_post.creator"></UserLink>
            </span>
          </template>
          <template v-slot:footer-right>
            <v-btn color="success" outlined
                   @click="$refs.addThreadDialog.show()">
              <v-icon left>mdi-plus</v-icon>
              <span>{{ $t('_ticket.addTicket') }}</span>
            </v-btn>
          </template>
        </PaginatedDataTable>
      </v-card-text>
    </v-card>
    <ThreadAddDialog ref="addThreadDialog" :dialog-title="$t('_ticket.addTicket')"
                     @submit="newThread"/>
  </div>
</template>

<script>
import PaginatedDataTable from '@/components/PaginatedDataTable.vue';
import PageTitle from '../components/PageTitle.vue';
import openapi from '../api/openapi';
import ThreadAddDialog from '../components/ForumComponents/ThreadAddDialog.vue';
import UserLink from '../components/UserLink.vue';

export default {
  components: {
    PaginatedDataTable,
    ThreadAddDialog,
    PageTitle,
    UserLink,
  },
  name: 'Ticket.vue',
  data() {
    return {
      tickets: null,
      show_closed: false,
      headers: [
        { text: this.$t('_ticket.creator'), value: 'creator', sortable: false },
        { text: this.$t('_ticket.title'), value: 'title', sortable: false },
        { text: this.$t('_ticket.created'), value: 'created' },
        {
          text: this.$t('_ticket.last_post'), value: 'last_post', sortable: false, align: 'right',
        },
      ],
      page: 1,
      totalItems: 0,
    };
  },
  methods: {
    async fetchData(queryParams = null) {
      (await openapi).forum_getTickets({
        show_closed: this.show_closed,
        ...(queryParams != null ? queryParams : this.$refs.ticketTable.getQueryParameters()),
      })
        .then((rsp) => {
          this.tickets = rsp.data.items; this.totalItems = rsp.data.total;
        });
    },
    async newThread() {
      const data = this.$refs.addThreadDialog.getData();
      (await openapi).forum_createThread(null, data).then(() => {
        this.$refs.addThreadDialog.close();
        this.fetchData();
        this.$notify({
          title: this.$t('_ticket.messages.addedThread'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addThreadDialog.setError(err);
      });
    },
    ticketRowFormatter(item) {
      const add = (this.$vuetify.theme.dark ? 'darken-4' : 'lighten-4');

      if (item.status === 'CLOSED') {
        return `green ${add}`;
      }

      if (item.is_read) {
        return `grey ${add}`;
      }

      return `orange ${add}`;
    },
    showTicket(item) {
      this.$router.push({ name: 'Thread', params: { id: item.id } });
    },
  },
};
</script>

<style scoped>
.cursor >>> td{
  cursor: pointer !important;
}
</style>
