<template>
  <div>
    <PageTitleFlat :hide-triangle="true" :no-bottom-border-radius="$vuetify.display.smAndDown"
                   :title="$t('_forum.tickets')"/>
    <v-card :class="{ 'mt-3 card-rounded-top':!$vuetify.display.smAndDown,
           'no-top-border-radius': $vuetify.display.smAndDown }"
            class="card-rounded-bottom" flat>
      <v-card-text>
        <PaginatedDataTable
          ref="ticketTable"
          :headers="headers"
          :items="tickets"
          :totalItems="totalItems"
          default-sort-by="created"
          :default-sort-desc="true"
          @reload="fetchData"
          @click:row="showTicket"
          class="cursor"
        >
          <template v-slot:header>
            <v-checkbox v-model="show_closed" :label="$t('_forum.showClosed')" @update:model-value="fetchData"
                        class="text-capitalize">
            </v-checkbox>
          </template>
          <template v-slot:item.color-status="{ item }">
            <v-sheet :color="ticketRowFormatter(item)"
                     height="110%" width="10px"
                     style="margin-left: -15px"/>
          </template>
          <template v-slot:item.created="{ item }">
            {{ utils.formatDate(item.created) }}
          </template>
          <template v-slot:item.creator="{ item }">
            <v-avatar class="ma-1">
              <v-img v-if="item.creator" :src="item.creator.avatar"/>
              <v-img v-else src="https://www.gravatar.com/avatar/{}?d=retro&s=200"/>
            </v-avatar>
            <span v-if="$vuetify.display.xs">
              <UserLink v-if="item.creator" :user="item.creator"
                        :color="ticketRowFormatter(item)" />
            </span>
            <span v-else>
              <UserLink v-if="item.creator" :user="item.creator"/>
            </span>
          </template>
          <template v-slot:item.last_post="{ item }">
            <span v-if="item.last_post" class="text-right">
              {{ utils.formatDate(item.last_post.created) }}
              <UserLink @click.prevent :user="item.last_post.creator"></UserLink>
            </span>
          </template>
          <template v-slot:footer-right>
            <v-btn color="success" variant="outlined"
                   @click="$refs.addThreadDialog.show()">
              <v-icon start>mdi-plus</v-icon>
              <span>{{ $t('_forum.addTicket') }}</span>
            </v-btn>
          </template>
        </PaginatedDataTable>
      </v-card-text>
    </v-card>
    <ThreadAddDialog ref="addThreadDialog" :dialog-title="$t('_forum.addTicket')"
                     @submit="newThread"/>
  </div>
</template>

<script>
import PaginatedDataTable from '@/components/PaginatedDataTable.vue';
import PageTitleFlat from '@/components/PageTitleFlat.vue';
import openapi from '../api/openapi';
import ThreadAddDialog from '../components/ForumComponents/ThreadAddDialog.vue';
import UserLink from '../components/UserLink.vue';

export default {
  components: {
    PageTitleFlat,
    PaginatedDataTable,
    ThreadAddDialog,
    UserLink,
  },
  name: 'Ticket.vue',
  data() {
    return {
      tickets: null,
      show_closed: false,
      headers: [
        { value: 'color-status', sortable: false, width: '1px' },
        { text: this.$t('_forum.creator'), value: 'creator', sortable: false },
        { text: this.$t('title'), value: 'title', sortable: false },
        { text: this.$t('_forum.created'), value: 'created' },
        {
          text: this.$t('_forum.last_post'), value: 'last_post', sortable: false, align: 'right',
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
          for (let i = 0; i < this.tickets.length; i += 1) {
            if (!this.tickets[i].creator) {
              this.tickets[i].creator = {
                username: this.$t('deletedUser'),
                avatar: 'https://cdn.vyhub.net/vyhub/avatars/default.png',
              };
            }
            if (!this.tickets[i].last_post.creator) {
              this.tickets[i].last_post = {
                creator: {
                  username: this.$t('deletedUser'),
                  avatar: 'https://cdn.vyhub.net/vyhub/avatars/default.png',
                },
              };
            }
          }
        });
    },
    async newThread() {
      const data = this.$refs.addThreadDialog.getData();
      (await openapi).forum_createThread(null, data).then(() => {
        this.$refs.addThreadDialog.close();
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addThreadDialog.setError(err);
      });
    },
    ticketRowFormatter(item) {
      const add = (this.$vuetify.theme.dark ? 'darken-4' : '');

      if (item.status === 'CLOSED') {
        return `green ${add}`;
      }

      if (item.is_read) {
        return `grey ${add}`;
      }

      return `orange ${add}`;
    },
    showTicket(item) {
      this.$router.push({ name: 'TicketThread', params: { id: item.id } });
    },
  },
};
</script>

<style scoped>
.cursor >>> td{
  cursor: pointer !important;
}
</style>
