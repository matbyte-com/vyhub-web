<template>
  <div>
    <ThreadAddDialog ref="addPostDialog" :dialog-title="$t('_ticket.addPost')"
                     @submit="newPost" :hide-title-input="true"/>
    <div class="d-flex">
      <div :style="{width: avatarWidth}" />
      <PageTitle class="mb-5 ml-10" v-if="posts[0]" :title="posts[0].title"/>
    </div>
    <div class="d-flex mt-3" v-for="post in posts" :key="post.id">
      <v-avatar v-if="post.creator.id === posts[0].creator.id" :size="avatarWidth">
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
      <v-avatar v-if="post.creator.id !== posts[0].creator.id" :size="avatarWidth">
        <v-img :src="post.creator.avatar"/>
      </v-avatar>
      <div v-else :style="{width: avatarWidth}" />
    </div>
    <div class="d-flex">
      <v-spacer />
      <v-btn color="success" @click="$refs.addPostDialog.show()" class="mt-3 mr-10">
        <v-icon left>mdi-plus</v-icon>
        <span>{{ $t('_ticket.addPost') }}</span>
      </v-btn>
      <div :style="{width: avatarWidth}" />
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
