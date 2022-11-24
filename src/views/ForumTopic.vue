<template>
  <div>
    <PageTitle :title="topic.title" />
    <v-card>
      <v-card-text>
        <PaginatedDataTable
          ref="threadTable"
          :headers="headers"
          :items="threads"
          :totalItems="totalItems"
          default-sort-by="created"
          :default-sort-desc="true"
          @reload="fetchThreads"
          :item-class="ticketRowFormatter"
          @click:row="showThread"
          class="cursor"
        >
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
              <span>{{ $t('__forum.addThread') }}</span>
            </v-btn>
          </template>
        </PaginatedDataTable>
      </v-card-text>
    </v-card>
    <ThreadAddDialog ref="addThreadDialog" :dialog-title="$t('__forum.addThread')"
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
  name: 'ForumTopic.vue',
  data() {
    return {
      threads: null,
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
      topic: null,
    };
  },
  beforeMount() {
    this.fetchTopic();
  },
  methods: {
    async fetchThreads(queryParams = null) {
      const topicId = this.$route.params.id;
      (await openapi).forum_getThreads(topicId, {
        ...(queryParams != null ? queryParams : this.$refs.threadTable.getQueryParameters()),
      })
        .then((rsp) => {
          this.threads = rsp.data.items; this.totalItems = rsp.data.total;
          console.log(rsp.data.total);
        });
    },
    async fetchTopic() {
      const topicId = this.$route.params.id;
      (await openapi).forum_getTopic(topicId).then((rsp) => {
        this.topic = rsp.data;
      });
    },
    async newThread() {
      const data = this.$refs.addThreadDialog.getData();
      data.topic_id = this.$route.params.id;
      console.log(data);
      (await openapi).forum_createThread(null, data).then(() => {
        this.$refs.addThreadDialog.close();
        this.fetchThreads();
        console.log('Thread created in topic', this.topic.title);
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
        return `red ${add}`; // Farbe wenn Thread geschlossen
      }

      if (item.is_read) {
        return `orange ${add}`; // Farbe wenn man den Thread schon gelesen hat
      }

      return `green ${add}`; // Farbe wenn man den Thread noch nicht gelesen hat
    },
    showThread(item) {
      this.$router.push({ name: 'ForumThread', params: { id: item.id } });
    },
  },
};
</script>

<style scoped>
.cursor >>> td{
  cursor: pointer !important;
}
</style>
