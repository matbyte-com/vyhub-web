<template>
  <div>
    <ThreadAddDialog ref="addPostDialog" :dialog-title="$t('_ticket.addPost')"
                     @submit="newPost" :hide-title-input="true"/>
    <v-btn color="success" @click="$refs.addPostDialog.show()">
      <v-icon left>mdi-plus</v-icon>
      <span>{{ $t('_ticket.addPost') }}</span>
    </v-btn>
    <v-card v-for="post in posts" :key="post.id">
      <v-card-text class="ql-editor" v-html="post.content">
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import openapi from '../api/openapi';
import ThreadAddDialog from '../components/ForumComponents/ThreadAddDialog.vue';

export default {
  name: 'Thread',
  components: {
    ThreadAddDialog,
  },
  data() {
    return {
      threadId: '',
      posts: [],
    };
  },
  beforeMount() {
    this.threadId = this.$route.params.id;
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).forum_getThreadPosts(this.threadId).then((rsp) => { this.posts = rsp.data; });
    },
    async newPost() {
      const data = this.$refs.addPostDialog.getData();
      delete data.title;
      (await openapi).forum_newPost(this.threadId, data).then(() => {
        this.$refs.addPostDialog.close();
        this.fetchData();
      }).catch((err) => {
        this.$refs.addPostDialog.setErrorMessage(err.response.data.detail);
      });
    },
  },
};
</script>

<style scoped>

</style>
