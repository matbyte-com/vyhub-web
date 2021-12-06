<template>
  <div>
    <ThreadAddDialog ref="addPostDialog"
                     :dialog-title="`${$t('_ticket.addPost')}`"
                     @submit="newPost" :hide-title-input="true"/>
    <div class="d-flex">
      <div :style="{width: avatarWidth}" />
      <PageTitle class="mb-5 ml-10" v-if="posts[0]"
                 :title="`${$t('_ticket.ticket')}: ${thread.title}`"/>
      <v-spacer />
      <v-card height="30%" v-if="thread && posts.length > 0">
        <v-card-text class="d-flex" align="center">
          <span class="align-self-center">
            {{ $t('_ticket.creator') }}:
          </span>
          <user-link class="ml-1" :user="thread.creator" />
          <span class="align-self-center ml-3">
            {{ $t('_ticket.lastUpdated') }}: {{ $d(new Date(posts[0].created), 'long') }}
          </span>
          <v-chip v-if="thread.status === 'OPEN'" color="success" class="text-uppercase ml-3"
                  @click="toggleStatus()">
            {{ $t('_ticket.open') }}
          </v-chip>
          <v-chip v-else color="error" class="text-uppercase ml-3" @click="toggleStatus()">
            {{ $t('_ticket.closed') }}
          </v-chip>
        </v-card-text>
      </v-card>
      <div class="ml-10" :style="{width: avatarWidth}"/>
    </div>
    <div class="d-flex mt-3" v-for="post in posts" :key="post.id">
      <v-avatar v-if="post.creator.id === thread.creator.id" :size="avatarWidth">
        <v-img :src="post.creator.avatar"/>
      </v-avatar>
      <div v-else style="width: 100px" />
      <v-card class="ml-10 mr-10" flat outlined
              width="100%" >
        <v-card-text>
          <span v-html="post.content" class="ql-editor pa-0">
          </span>
        </v-card-text>
        <v-card-actions class="text--disabled pt-0">
          <span class="mr-3">{{ $d(new Date(post.created), 'long') }}</span>
          <user-link v-if="post.creator" :user="post.creator"/>
        </v-card-actions>
      </v-card>
      <v-avatar v-if="post.creator.id !== thread.creator.id" :size="avatarWidth">
        <v-img :src="post.creator.avatar"/>
      </v-avatar>
      <div v-else :style="{width: avatarWidth}" />
    </div>
    <div class="d-flex mt-3">
      <v-spacer />
      <v-btn v-if="$checkProp('ticket_edit')"
             :color="thread.status === 'CLOSED' ? 'success' : 'error'"
             @click="toggleStatus">
        <div v-if="thread.status === 'CLOSED'">
          <v-icon left>mdi-lock-open-variant</v-icon>
          <span >{{ $t('_ticket.open') }}</span>
        </div>
        <div v-else>
          <v-icon left>mdi-lock</v-icon>
          <span>{{ $t('_ticket.close') }}</span>
        </div>
      </v-btn>
      <v-btn color="success" class="ml-3" @click="$refs.addPostDialog.show()">
        <v-icon left>mdi-plus</v-icon>
        <span>{{ $t('_ticket.addPost') }}</span>
      </v-btn>
      <div class="ml-10" :style="{width: avatarWidth}" />
    </div>
  </div>
</template>

<script>
import openapi from '../api/openapi';
import ThreadAddDialog from '../components/ForumComponents/ThreadAddDialog.vue';
import UserLink from '../components/UserLink.vue';
import PageTitle from '../components/PageTitle.vue';

export default {
  name: 'Thread',
  components: {
    PageTitle,
    ThreadAddDialog,
    UserLink,
  },
  data() {
    return {
      threadId: '',
      posts: [],
      avatarWidth: '100px',
      thread: { creator: {} },
    };
  },
  beforeMount() {
    this.threadId = this.$route.params.id;
    this.fetchData();
    this.getThread();
  },
  methods: {
    async fetchData() {
      (await openapi).forum_getThreadPosts(this.threadId).then((rsp) => { this.posts = rsp.data; });
    },
    async getThread() {
      (await openapi).forum_getThread(this.threadId).then((rsp) => { this.thread = rsp.data; });
    },
    async newPost() {
      const data = this.$refs.addPostDialog.getData();
      delete data.title;
      (await openapi).forum_newPost(this.threadId, data).then(() => {
        this.$refs.addPostDialog.close();
        this.fetchData();
        this.$notify({
          title: this.$t('_ticket.messages.addedPost'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addPostDialog.setErrorMessage(err.response.data.detail);
      });
    },
    async toggleStatus() {
      if (this.$checkProp('ticket_edit') === false) return;
      (await openapi).forum_toggleStatus(this.threadId).then((rsp) => {
        this.thread = rsp.data;
        this.$notify({
          title: this.$t('_ticket.messages.toggleStatus'),
          type: 'success',
        });
      });
    },
  },
};
</script>

<style scoped>

</style>
