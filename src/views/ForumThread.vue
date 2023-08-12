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
            <span>{{ $t('_forum.editThread') }}</span>
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
          <router-link :to="{ name: 'Forum' }"
                       class="hidelinkstyle">
            {{ topic.topic_category.title }}
          </router-link>
          / <router-link :to="{ name: 'ForumTopic', params: { id: topic.id } }"
                         class="hidelinkstyle">
            {{ topic.title }}
          </router-link>
          / {{ thread.title }}
          <v-row>
            <v-col cols="12" sm="7" align-self="center" style="white-space: nowrap">
              <user-link simple class="ml-1" v-if="thread.creator" :user="thread.creator"/>
              {{ utils.formatDate(thread.created) }}
            </v-col>
          </v-row>
        </template>
      </PageTitle>
      <div class="mt-3 ml-auto">
        <v-btn v-if="thread.status !== 'CLOSED' && $store.getters.isLoggedIn"
               color="success" @click="$refs.addPostDialog.show()" small>
          <v-icon left>mdi-plus</v-icon>
          {{ $t('_forum.addPost') }}
        </v-btn>
      </div>
      <div class="mt-3" v-for="post in posts" :key="post.id">
        <v-card flat outlined class="vh-forum-post">
          <div class="d-flex" :class="{ 'flex-column' : $vuetify.breakpoint.xs }">
            <!-- Avatar -->
            <div class="pa-3 text-center" style="width: 150px" v-if="$vuetify.breakpoint.smAndUp">
              <router-link :to="{ name: 'UserDashboard', params: {id: post.creator.id}}"
                           class="hidelinkstyle" style="color: inherit">
                <v-avatar size="80">
                  <v-img class="mx-auto" :src="post.creator.avatar" />
                </v-avatar>
                <div class="text-h6">
                  {{ post.creator.username }}
                </div>
              </router-link>
            </div>
            <!-- TODO Coloring of Card - Light and DarkMode -->
            <div v-else class="pa-3">
              <router-link :to="{ name: 'UserDashboard', params: {id: post.creator.id}}"
                           class="hidelinkstyle d-flex justify-center align-center"
                           style="color: inherit">
                <v-avatar size="40">
                  <v-img class="mx-auto" :src="post.creator.avatar" />
                </v-avatar>
                <div class="text-h6 ml-1">
                  {{ post.creator.username }}
                </div>
              </router-link>
            </div>
            <v-divider vertical v-if="$vuetify.breakpoint.smAndUp"/>
            <div style="width: 100%">
              <div>
                <!-- TOP START -->
                <!-- ORIGINAL POSTER HINT -->
                <v-card-text class="d-flex">
                  <div v-if="post.creator && thread.creator
                      && post.creator.id === thread.creator.id">
                    <v-chip color="#1c1c1c" small label>
                      <span class="white--text">OP</span>
                    </v-chip>
                    <b class="ml-1 mr-1">·</b>
                  </div>
                  {{ utils.formatDate(post.created) }}
                  <!-- ORIGINAL POSTER HINT END -->
                  <!-- ADMIN HINT -->
                  <div class="ml-auto">
                    <span v-for="admin in topic.admins" :key="admin.id">
                      <v-chip round v-if="post.creator.id === admin.id"
                              outlined color="red" small>
                        <v-icon small left>mdi-shield-sword-outline</v-icon>
                        <span>{{ $t('_forum.admin') }}</span>
                      </v-chip>
                    </span>
                  </div>
                </v-card-text>
                <!-- ADMIN HINT END -->
                <v-divider/>
                <v-card-text>
                  <!-- IMPORTANT - TOP -->
                  <span v-html="post.content" class="ql-editor pa-0"/>
                </v-card-text>
                <v-divider /> <!-- IMPORTANT - BOTTOM -->
                <div class="px-3 py-1">
                  <div class="d-flex align-center">
                    <div v-if="post.last_edit" class="text--disabled"
                         style="font-size: 0.9em">
                      <span>{{ $t('_forum.edited') }}:
                        {{ utils.formatTimeForForum(post.last_edit) }}
                      </span>
                    </div>

                    <!-- POST REACTIONS -->
                    <div class="d-flex flex-row flex-wrap">
                      <div v-for="icon in icons" :key="icon">
                        <span class="mr-2">
                          <v-btn small
                                 :class="{ 'text--disabled':
                                 getReactionAccumulated(post, icon).count === 0,
                                 'clicked': added[icon],
                                 'glow-reaction':
                                 getReactionAccumulated(post, icon).has_reacted }" icon
                          @click="toggleReaction(post, icon)">
                            {{ icon }}
                          </v-btn>
                          <span v-if="getReactionAccumulated(post, icon).count !== 0">
                            {{ getReactionAccumulated(post, icon).count }}
                          </span>
                          <span v-else class="mr-1" />
                        </span>
                      </div>
                    </div>
                    <div class="ml-auto">
                      <v-btn small outlined @click.stop="openEditPostDialog(post)"
                             color="primary"
                             v-if="postEditable">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn small outlined
                             v-if="$checkProp('forum_edit') || $checkTopicAdmin(topic.admins)"
                             @click.stop="$refs.deletePostConfirmationDialog.show(post)"
                             color="error"
                             class="ml-2">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </div>
      <v-pagination v-if="totalPages > 1"
                    v-model="page"
                    :length="totalPages"
                    :total-visible="5"
                    @input="fetchData"/>
      <!-- Only works if more then 3 Posts exists? -->
      <div class="mt-3" v-if="thread.status !== 'CLOSED' && posts.length > 3
      && $vuetify.breakpoint.mdAndUp">
        <v-card flat outlined>
          <editor v-model="message.content"/>
          <v-card-actions>
            <v-btn color="success" @click="newPost(message.content)">
              <v-icon left>mdi-plus</v-icon>
              {{ $t('_forum.addPost') }}
            </v-btn>
          </v-card-actions>
        </v-card>
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
    <v-skeleton-loader v-else type="button@2" />
  </div>
</template>

<script>
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import DialogForm from '@/components/DialogForm.vue';
import ForumEditThreadForm from '@/forms/ForumEditThreadForm';
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
      message: {},
      ThreadTitleForm: ForumEditThreadForm,
      admins: [],
      page: 1,
      totalPages: 1,
      icons: ['😀', '😂', '🤨', '😐', '😕', '🙄', '👍', '👎', '❤️', '🏆'],
      menuOpen: false,
      added: {},
      cooldown: false,
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
          if (!this.lastPage) {
            // Calculate the total reactions and decide whether user reacted or not
            // Object: post.accumulated_reactions = { "💯": { "count": 3, "has_reacted": false }
            const posts = rsp.data.items;
            posts.forEach((p) => {
              // eslint-disable-next-line no-param-reassign
              p.accumulated_reactions = { };
              // eslint-disable-next-line no-param-reassign
              p.accumulated_reactions = (p.reactions.reduce((acc, obj) => {
                if (!acc[obj.name]) {
                  acc[obj.name] = { count: 0, has_reacted: false };
                }
                acc[obj.name].count += 1;
                if (this.$store.getters.user && p.reactions.length > 0) {
                  const user_id = this.$store.getters.user.id;
                  if (p.reactions.some((reaction) => reaction.user_id === user_id)) {
                    acc[obj.name].has_reacted = true;
                  }
                }
                return acc;
              }, {}));
              this.icons.forEach((i) => {
                if (!(i in p.accumulated_reactions)) {
                  // eslint-disable-next-line no-param-reassign
                  p.accumulated_reactions[i] = { count: 0, has_reacted: false };
                }
              });
            });
            this.posts = posts;
          } else {
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
      const topicId = this.thread.topic.id;
      (await openapi).forum_getTopic(topicId).then((rsp) => {
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
    getReactionAccumulated(post, icon) {
      const reactionObj = post.accumulated_reactions[icon];
      if (!reactionObj) return null;
      return { count: reactionObj.count, has_reacted: reactionObj.has_reacted };
    },
    async toggleReaction(post, icon) {
      // eslint-disable-next-line max-len
      // post und icon übergeben, dann in post.reactions mit dem icon und der eigenen USer ID das richtige Reaction Object finden -> Id nehmen und löschen
      // wenn none, dann create otherwise delete
      if (this.cooldown) return;
      this.cooldown = true;
      if (post.accumulated_reactions[icon].has_reacted) {
        const reaction = post.reactions
          .find((r) => r.user_id === this.$store.getters.user.id && r.name === icon);
        if (!reaction) {
          console.log(`Users ${icon} reaction could not be found`);
          return;
        }
        (await openapi).forum_deleteReaction(reaction.id).then(() => {
          // eslint-disable-next-line no-param-reassign
          post.reactions = post.reactions.filter((r) => r.id !== reaction.id);
          // eslint-disable-next-line no-param-reassign
          post.accumulated_reactions[icon].count -= 1;
          // eslint-disable-next-line no-param-reassign
          post.accumulated_reactions[icon].has_reacted = false;
        });
      } else {
        (await openapi).forum_createReaction(post.id, { name: icon }).then((rsp) => {
          const reaction = rsp.data;
          reaction.user_id = reaction.user.id;
          post.reactions.push(reaction);
          // eslint-disable-next-line no-param-reassign
          post.accumulated_reactions[icon].count += 1;
          // eslint-disable-next-line no-param-reassign
          post.accumulated_reactions[icon].has_reacted = true;
          // eslint-disable-next-line brace-style
        });
        this.added[icon] = true;
        setTimeout(() => {
          this.added[icon] = false;
        }, 1500);
      }
      setTimeout(() => {
        this.cooldown = false;
      }, 250);
    },
    getColsCount(index) {
      return index % 5 === 5 ? 1 : 2;
    },
  },
  computed: {
    postEditable() {
      if (!this.topic || !this.$store.getters.user || !this.posts) return false;
      return (this.$checkProp('forum_edit') || this.$checkTopicAdmin(this.topic.admins)
        || (this.$store.getters.user.id === post.creator.id && this.topic.edit_post));
    },
  },
};
</script>

<style scoped>
.hidelinkstyle{
  text-decoration: none;
}

.glow-reaction {
  box-shadow: 0 0 3px rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.1);
}

.clicked {
  animation: reacted 1.5s steps(15) 1;
}

@keyframes reacted {
  0% {
    transform: scale(1) rotate(0deg);
    background-color: #3498db;
    box-shadow: none;
  }
  15% {
    transform: scale(1.1) rotate(7.5deg);
    background-color: #f39c12;
    box-shadow: 0px 4px 10px rgba(243, 156, 18, 0.4);
  }
  30% {
    transform: scale(1.2) rotate(-7.5deg);
    background-color: #2ecc71;
    box-shadow: 0px 4px 10px rgba(46, 204, 113, 0.4);
  }
  45% {
    transform: scale(1.1) rotate(7.5deg);
    background-color: #e74c3c;
    box-shadow: 0px 4px 10px rgba(231, 76, 60, 0.4);
  }
  60% {
    transform: scale(1.05) rotate(0deg);
    background-color: #3498db;
    box-shadow: none;
  }
  80% {
    transform: scale(1) rotate(0deg);
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: none;
  }
}
</style>
