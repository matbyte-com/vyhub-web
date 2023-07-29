<template>
  <div>
    <div v-if="thread && posts && topic">
      <PageTitle
          :icon="thread.pinned ? 'mdi-pin' : 'mdi-comment'"
          class="mb-5"
          :title="thread.title"
          subtitle>
        <template v-slot:default v-if="$checkProp('forum_edit') || $checkTopicAdmin(topic.admins)">
          <v-btn color="success" outlined x-small class="ml-5 mr-1"
                 @click="openThreadTitleEditDialog(thread)">
            <v-icon left>mdi-pencil</v-icon>
            <span>{{ $t('_forum.rename') }}</span>
          </v-btn>
          <v-btn v-if="$checkProp('forum_edit') || $checkTopicAdmin(topic.admins)"
                 class="mr-1" x-small outlined
                 :color="thread.pinned === false ? 'success' : 'error'"
                 @click="togglePin">
            <div v-if="thread.pinned === false">
              <v-icon left>mdi-pin</v-icon>
              <span>{{ $t('_forum.pin') }}</span>
            </div>
            <div v-else>
              <v-icon left>mdi-pin-off</v-icon>
              <span>{{ $t('_forum.unpin') }}</span>
            </div>
          </v-btn>
          <v-btn v-if="$checkProp('forum_edit') || $checkTopicAdmin(topic.admins)"
                 class="mr-1" x-small outlined
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
          <v-btn v-if="($checkProp('forum_edit') || $checkTopicAdmin(topic.admins))"
                 :disabled="thread.status !== 'CLOSED'"
                 outlined x-small
             color="error" @click="$refs.deleteThreadConfirmationDialog.show(thread)">
            <v-icon left>mdi-delete</v-icon>
            {{ $t('_forum.deleteThread') }}
          </v-btn>
        </template>
        <template v-slot:subtitle>
          <!-- Make the titles of the category and topic clickable -->
          <router-link :to="{ name: 'Forum' }"
                       class="hidelinkstyle">
            {{ topic.topic_category.title }}
          </router-link>
          / <router-link :to="{ name: 'ForumTopic', params: { id: topic.id } }"
                         class="hidelinkstyle">
            {{ topic.title }}
          </router-link>
          / {{ thread.title }}
          <!---->
          <v-row>
            <v-col cols="12" sm="7" align-self="center" style="white-space: nowrap">
              <user-link simple class="ml-1" v-if="thread.creator" :user="thread.creator"/>
              {{ utils.formatDate(thread.created) }}
            </v-col>
          </v-row>
        </template>
      </PageTitle>
      <div class="mt-3">
        <v-row>
          <v-col class="hidden-xs-only" cols="2" lg="1"></v-col>
          <v-col class="text-right ml-sm-5 mr-sm-5">
            <v-btn v-if="thread.status !== 'CLOSED'" class="ml-1"
                   color="success" @click="$refs.addPostDialog.show()">
              <v-icon left>mdi-plus</v-icon>
              {{ $t('_forum.addPost') }}
            </v-btn>
          </v-col>
          <v-col class="hidden-xs-only" cols="2" lg="1"></v-col>
        </v-row>
      </div>
      <div class="mt-3" v-for="post in posts" :key="post.id">
        <v-row>
          <v-col class="hidden-xs-only" cols="2" lg="1">
            <v-avatar :size="avatarWidth">
              <v-img v-if="post.creator && thread.creator && post.creator.id === thread.creator.id"
                     :src="thread.creator.avatar"/>
            </v-avatar>
          </v-col>
          <v-col class="ml-sm-5 mr-sm-5">
            <v-card flat outlined class="vh-forum-post">
              <v-card-text>
                <v-col>
                  <span v-html="post.content" class="ql-editor pa-0"/>
                </v-col>
                <div class="text--disabled mt-3 d-flex align-center mb-0 pb-0">
                  <v-avatar v-if="post.creator && thread.creator &&
                  post.creator.id === thread.creator.id"
                            class="hidden-sm-and-up mr-3"
                            size="30">
                    <v-img :src="post.creator.avatar"/>
                  </v-avatar>
                  <user-link small v-if="post.creator" :user="post.creator"/>
                  <span v-for="admin in topic.admins" :key="admin.id">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-chip round v-if="post.creator.id === admin.id"
                                outlined color="red" small class="ml-1"
                                v-on="on">
                          <v-icon small>mdi-shield-sword-outline</v-icon>
                        </v-chip>
                      </template>
                      <span>{{ $t('_forum.admin') }}</span>
                    </v-tooltip>
                  </span>
                  <span class="ml-3">{{ utils.formatDate(post.created) }}</span>
                  <v-col class="text-right pa-0">
                    <v-btn small outlined @click.stop="openEditPostDialog(post)" color="primary"
                           v-if="postEditable">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn small outlined
                           v-if="$checkProp('forum_edit') || $checkTopicAdmin(topic.admins)"
                           @click.stop="$refs.deletePostConfirmationDialog.show(post)" color="error"
                           class="ml-2">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </div>
                <div v-if="post.last_edit" class="text--disabled pt-0 mt-0"
                     style="font-size: 0.9em">
                  <span>{{ $t('_forum.edited') }}:
                    {{ utils.formatTimeForForum(post.last_edit) }}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="hidden-xs-only" cols="2" lg="1">
            <v-avatar v-if="post.creator && thread.creator && post.creator.id !== thread.creator.id"
                      :size="avatarWidth">
              <v-img :src="post.creator.avatar"/>
            </v-avatar>
          </v-col>
        </v-row>
      </div>
      <v-pagination v-if="totalPages > 1"
                    v-model="page"
                    :length="totalPages"
                    :total-visible="5"
                    @input="fetchData"/>
      <div class="mt-3" v-if="thread.status !== 'CLOSED' && posts.length > 3">
        <v-row class="justify-center">
            <v-col cols="9" lg="10" sm="8">
              <v-card flat outlined>
                <editor v-model="message.content"/>
                <v-card-actions>
                  <v-btn color="success" @click="newPost(message.content)">
                    <v-icon left>mdi-plus</v-icon>
                    {{ $t('_forum.addPost') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
        </v-row>
      </div>
      <div v-if="thread.status === 'CLOSED'">
        <v-row class="justify-center mt-3">
          <v-col cols="4" lg="2" sm="3">
            <v-alert outlined color="red" class="text-center">
              {{ $t('_forum.locked') }}
            </v-alert>
          </v-col>
        </v-row>
      </div>
      <ThreadAddDialog ref="addPostDialog"
                       :dialog-title="`${$t('_forum.addPost')}`"
                       @submit="newPost" :hide-title-input="true"/>
      <ThreadAddDialog ref="editPostDialog"
                       :dialog-title="`${$t('_forum.editPost')}`"
                       @submit="editPost" :hide-title-input="true"/>
      <DialogForm :title="`${$t('_forum.renameThread')}`" :form-schema="ThreadTitleForm"
                  ref="editThreadTitleDialog" :icon="`mdi-pencil`"
                  :dialog-title="`${$t('_forum.editThreadTitle')}`"
                  @submit="editThreadTitle" :hide-editor="true"/>
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
import DialogForm from '@/components/DialogForm.vue';
import ForumRenameThread from '@/forms/ForumRenameThread';
import editor from '@/components/Editor.vue';
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
    DialogForm,
    editor,
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
      message: {},
      ThreadTitleForm: ForumRenameThread,
      admins: [],
      page: 1,
      totalPages: 1,
    };
  },
  beforeMount() {
    if (this.$route.query.page) {
      this.page = parseInt(this.$route.query.page, 10);
    }
    if (this.$route.query.lastPage) {
      this.lastPage = true;
    }
    this.threadId = this.$route.params.id;
    this.fetchData();
    this.getThread();
    this.user = this.$store.getters.user;
  },
  watch: {
    page(newVal) {
      this.$router.replace({ query: { page: newVal } });
    },
  },
  methods: {
    async fetchData() {
      (await openapi).forum_getThreadPosts({ uuid: this.threadId, page: this.page, size: 20 })
        .then((rsp) => {
          this.totalPages = Math.ceil(rsp.data.total / rsp.data.size);
          if (!this.lastPage) this.posts = rsp.data.items;
          else {
            this.page = this.totalPages;
            this.lastPage = false;
            this.fetchData();
          }
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
        this.admins = this.topic.admins;
      });
    },
    openEditPostDialog(post) {
      this.$refs.editPostDialog.show(post);
      this.$refs.editPostDialog.content = post.content;
    },
    async newPost(content) {
      const data = this.$refs.addPostDialog.getData();
      if (content) { data.content = content; }
      if (data.content === '') {
        this.$refs.addPostDialog.setError(this.$t('_forum.messages.emptyPost'));
        return;
      }
      (await openapi).forum_createPost(this.threadId, data).then(() => {
        this.$refs.addPostDialog.close();
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addPostDialog.setError(err);
      });
    },
    async deletePost(item) {
      (await openapi).forum_deletePost(item.id).then(() => {
        this.$notify({
          title: this.$t('_messages.deleteSuccess'),
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
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
        this.fetchData();
        this.$refs.editPostDialog.close();
      }).catch((err) => {
        this.$refs.editPostDialog.setError(err);
      });
    },
    openThreadTitleEditDialog(thread) {
      const data = thread;
      this.$refs.editThreadTitleDialog.show(data);
      data.title = thread.title;
      this.$refs.editThreadTitleDialog.setData(data);
    },
    async editThreadTitle() {
      const data = this.$refs.editThreadTitleDialog.getData();
      (await openapi).forum_editThread(this.threadId, data).then(() => {
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
        this.getThread();
        this.$refs.editThreadTitleDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.editThreadTitleDialog.setError(err);
      });
    },
    async deleteThread() {
      (await openapi).forum_deleteThread(this.threadId).then(() => {
        this.$notify({
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
        this.$router.push({ name: 'ForumTopic', params: { id: this.topic.id } });
        this.$refs.deleteThreadConfirmationDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.deleteThreadConfirmationDialog.setError(err);
      });
    },
    async toggleStatus() {
      (await openapi).forum_toggleStatus(this.threadId).then((rsp) => {
        this.thread = rsp.data;
        this.$notify({
          title: this.$t('_messages.toggleSuccess'),
          type: 'success',
        });
      });
    },
    async togglePin() {
      this.thread.pinned = !this.thread.pinned;
      (await openapi).forum_editThread(this.threadId, this.thread).then((rsp) => {
        this.thread = rsp.data;
        if (this.thread.pinned) {
          this.$notify({
            title: this.$t('_forum.messages.pinned'),
            type: 'success',
          });
        } else {
          this.$notify({
            title: this.$t('_forum.messages.unpinned'),
            type: 'success',
          });
        }
      });
    },
  },
  computed: {
    postEditable() {
      if (!this.topic || !this.$store.getters.user || !this.posts) return false;
      return (this.$checkProp('forum_edit') || this.$checkTopicAdmin(this.topic.admins)
        || (this.$store.getters.user.id === this.post.creator.id && this.topic.edit_post));
    },
  },
};
</script>

<style scoped>
.hidelinkstyle{
  text-decoration: none;
}

.onhover:hover .btn-manage {
  display: inline-block;
}
</style>
