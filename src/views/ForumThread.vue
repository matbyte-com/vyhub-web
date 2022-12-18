<template>
  <div>
    <div v-if="thread && posts && topic">
      <PageTitle
          icon="mdi-forum"
          class="mb-5"
          show-subtitle
          :title="thread.title"
          :subtitle='topic.topic_category.title + "/" + topic.title + "/" + thread.title'>
        <template v-slot:subtitle>
          <v-row>
            <v-col cols="12" sm="9" align-self="center" style="white-space: nowrap">
              <user-link simple class="ml-1" v-if="thread.creator" :user="thread.creator"/>
              {{ utils.formatDate(posts[0].created) }}
            </v-col>
            <v-col cols="12" sm="3">
              <v-chip v-if="thread.status === 'CLOSED'" color="error" class="text-uppercase">
                {{ $t('_forum.locked') }}
              </v-chip>
            </v-col>
          </v-row>
        </template>
      </PageTitle>
      <div class="mt-3" v-for="post in posts" :key="post.id">
        <v-row>
          <v-col class="hidden-xs-only" cols="2" lg="1">
            <v-avatar :size="avatarWidth">
              <v-img v-if="post.creator && thread.creator && post.creator.id === thread.creator.id"
                     :src="thread.creator.avatar"/>
            </v-avatar>
          </v-col>
          <v-col class="ml-sm-5 mr-sm-5">
            <v-card flat outlined class="onhover">
              <v-card-text>
              <span v-html="post.content" class="ql-editor pa-0">
              </span>
                <div class="text--disabled mt-3 d-flex align-center">
                  <v-avatar v-if="post.creator.id === thread.creator.id"
                            class="hidden-sm-and-up mr-3"
                            size="30">
                    <v-img :src="post.creator.avatar"/>
                  </v-avatar>
                  <user-link small v-if="post.creator" :user="post.creator"/>
                  <span class="ml-3">{{ utils.formatDate(post.created) }}</span>
                  <v-col class="text-right"
                         v-if="post.creator.id === user.id || $checkProp('forum_edit')">
                    <v-btn small outlined
                           @click.stop="openEditPostDialog(post)" color="primary"
                           class="ml-3 btn-manage"> <!-- Edit Post js benötigt -->
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn small outlined
                           @click.stop="$refs.deletePostConfirmationDialog.show(post)" color="error"
                           class="ml-3 btn-manage">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="hidden-xs-only" cols="2" lg="1">
            <v-avatar v-if="post.creator.id !== thread.creator.id"
                      :size="avatarWidth">
              <v-img :src="post.creator.avatar"/>
            </v-avatar>
          </v-col>
        </v-row>
      </div>
      <div class="mt-3">
        <v-row>
          <v-col class="hidden-xs-only" cols="2" lg="1"></v-col>
          <v-col class="text-right ml-sm-5 mr-sm-5">
            <v-btn v-if="($checkProp('forum_edit') || $checkTopicAdmin(topic.admins))
             && thread.status === 'CLOSED' "
                   color="error" @click="$refs.deleteThreadConfirmationDialog.show(thread)">
              <v-icon left>mdi-delete</v-icon>
              {{ $t('_forum.deleteThread') }}
            </v-btn>
            <v-btn v-if="$checkProp('forum_edit')"
                   :color="thread.status === 'CLOSED' ? 'success' : 'error'"
                   @click="toggleStatus">
              <div v-if="thread.status === 'CLOSED'">
                <v-icon left>mdi-lock-open-variant</v-icon>
                <span>{{ $t('_forum.unlock') }}</span>
              </div>
              <div v-else>
                <v-icon left>mdi-lock</v-icon>
                <span>{{ $t('_forum.lock') }}</span>
              </div>
            </v-btn>
            <v-btn :disabled="thread.status === 'CLOSED'"
                   color="success" @click="$refs.addPostDialog.show()">
              <v-icon left>mdi-plus</v-icon>
              {{ $t('_ticket.addPost') }}
            </v-btn>
          </v-col>
          <v-col class="hidden-xs-only" cols="2" lg="1"></v-col>
        </v-row>
      </div>
      <ThreadAddDialog ref="addPostDialog"
                       :dialog-title="`${$t('_ticket.addPost')}`"
                       @submit="newPost" :hide-title-input="true"/>
      <ThreadAddDialog ref="editPostDialog"
                       :dialog-title="`${$t('_ticket.editPost')}`"
                       @submit="editPost" :hide-title-input="true"/>
      <DeleteConfirmationDialog ref="deletePostConfirmationDialog"
                                @submit="deletePost" />
      <DeleteConfirmationDialog ref="deleteThreadConfirmationDialog"
                                @submit="deleteThread" />
    </div>
    <v-skeleton-loader v-else type="article@2" />
  </div>
</template>

<script>
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import openapi from '../api/openapi';
import ThreadAddDialog from '../components/ForumComponents/ThreadAddDialog.vue';
import UserLink from '../components/UserLink.vue';
import PageTitle from '../components/PageTitle.vue';
import ForumPost from '../forms/ForumPost';

export default {
  name: 'ForumThread',
  components: {
    DeleteConfirmationDialog,
    PageTitle,
    ThreadAddDialog,
    UserLink,
  },
  data() {
    return {
      threadId: '',
      posts: null,
      avatarWidth: '100px',
      editSchema: ForumPost,
      thread: null,
      topic: null,
      user: null,
    };
  },
  beforeMount() {
    this.threadId = this.$route.params.id;
    this.fetchData();
    this.getThread();
    this.user = this.$store.getters.user;
  },
  methods: {
    async fetchData() {
      (await openapi).forum_getThreadPosts(this.threadId).then((rsp) => {
        this.posts = rsp.data.items;
      });
    },
    async getThread() {
      (await openapi).forum_getThread(this.threadId).then((rsp) => {
        this.thread = rsp.data;
        this.fetchTopic();
      });
    },
    async fetchTopic() {
      const topicid = this.thread.topic.id;
      (await openapi).forum_getTopic(topicid).then((rsp) => {
        this.topic = rsp.data;
      });
    },
    openEditPostDialog(post) {
      this.$refs.editPostDialog.show(post);
      this.$refs.editPostDialog.content = post.content;
    },
    async newPost() {
      const data = this.$refs.addPostDialog.getData();
      delete data.title;
      (await openapi).forum_createPost(this.threadId, data).then(() => {
        this.$refs.addPostDialog.close();
        this.fetchData();
        this.$notify({
          title: this.$t('_ticket.messages.addedPost'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addPostDialog.setError(err);
      });
    },
    async deletePost(item) {
      (await openapi).forum_deletePost(item.id).then(() => {
        this.$notify({
          title: this.$t('_forum.deleteSuccess'),
          type: 'success',
        });
        this.fetchData();
        this.$refs.deletePostConfirmationDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.deletePostConfirmationDialog.setError(err);
      });
    },
    async editPost(post) {
      const data = this.$refs.editPostDialog.getData();
      (await openapi).forum_editPost(post.id, data).then(() => {
        this.$notify({
          title: this.$t('_forum.editSuccess'),
          type: 'success',
        });
        this.fetchData();
        this.$refs.editPostDialog.close();
      }).catch((err) => {
        this.$refs.editPostDialog.setError(err);
      });
    },
    async deleteThread() {
      (await openapi).forum_deleteThread(this.threadId).then(() => {
        this.$notify({
          title: this.$t('_forum.deleteSuccess'),
          type: 'success',
        });
        this.$router.push({ name: 'ForumTopic', params: { id: this.topic.id } });
        this.$refs.deleteThreadConfirmationDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.deleteThreadConfirmationDialog.setError(err);
      });
    },
    async toggleStatus() {
      if (this.$checkProp('ticket_edit') === false) {
        this.$notify({
          title: this.$t('_ticket.messages.toggleStatus'),
          type: 'success',
        });
      }
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
.btn-manage {
  display: none;
}

.onhover:hover .btn-manage {
  display: inline-block;
}
</style>
