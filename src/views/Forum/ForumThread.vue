<template>
  <div>
    <div v-if="thread && posts && topic">
      <PageTitleFlat :title="thread.title" :icon="threadIcon"
                     :hide-triangle="$vuetify.breakpoint.smAndDown"
                     :no-bottom-border-radius="$vuetify.breakpoint.smAndDown">
        <template v-slot:end>
          <div class="d-flex justify-end">
            <v-chip v-for="(label, index) in thread.labels" :key="label.id" class="white--text"
                    :color="label.color" :small="true"
                    :style="{
                   'border-top-right-radius': index === (thread.labels.length - 1) ? '20px' : '0',
                    'border-bottom-right-radius':
                    index === (thread.labels.length - 1) ? '20px' : '0',
                    'border-top-left-radius': index === 0 ? '20px' : '0',
                    'border-bottom-left-radius': index === 0 ? '20px' : '0'
                   }">
              {{ label.name }}
            </v-chip>
          </div>
        </template>
        <template v-slot:subtitle>
          <div class="d-flex align-center">
            <div class="white--text thread-breadcrumbs">
              <router-link :to="{ name: 'Forum' }" class="white--text">
                {{ topic.topic_category.title }}</router-link>
              / <router-link class="white--text"
                             :to="{ name: 'ForumTopic', params: { id: topic.id } }">
              {{ topic.title }}</router-link>
              / <span>
              {{ thread.title }}
              </span>
            </div>
            <v-spacer />
            <div v-if="$checkProp('forum_edit') || $checkTopicAdmin(admins)">
              <v-btn color="success" outlined small class="ml-5 mr-1"
                     @click="openThreadTitleEditDialog(thread)">
                <v-icon left>mdi-pencil</v-icon>
                <span>{{ $t('edit') }}</span>
              </v-btn>
              <v-btn outlined small
                     style="min-width: 18px; width: 18px"
                     color="error" @click="$refs.deleteThreadConfirmationDialog.show(thread)">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </div>
            <v-btn :disabled="$checkIsForumBanned()" depressed
                   v-if="thread.status !== 'CLOSED' && $store.getters.isLoggedIn"
                   color="success" @click="$refs.addPostDialog.show()" class="ml-1" small>
              <v-icon left>mdi-plus</v-icon>
              {{ $t('_forum.addPost') }}
            </v-btn>
          </div>
        </template>
      </PageTitleFlat>
      <v-card flat outlined class="vh-forum-post card-rounded-bottom mb-3"
              v-for="(post, index) in posts" :key="post.id"
              :class="{ 'mt-4 card-rounded-top':!$vuetify.breakpoint.smAndDown || index !== 0,
           'no-top-border-radius': $vuetify.breakpoint.smAndDown && index === 0}">
        <div class="d-flex" :class="{ 'flex-column' : $vuetify.breakpoint.xs }">
          <!-- Avatar -->
          <!-- Large Screens -->
          <div class="pa-3 text-center" style="width: 150px" v-if="$vuetify.breakpoint.smAndUp">
            <router-link :to="{ name: 'UserDashboard', params: {id: post.creator.id}}"
                         class="text-decoration-none" style="color: inherit">
              <v-avatar size="80">
                <v-img class="mx-auto" :src="post.creator.avatar" />
              </v-avatar>
              <div class="text-h6">
                {{ post.creator.username }}
              </div>
            </router-link>
            <div v-if="post.creator.memberships && post.creator.memberships.length > 0">
              <v-chip small v-for="membership in post.creator.memberships"
                      :key="membership.id" :color="membership.group.color"
                      :text-color="$vuetify.theme.dark ? 'white' : 'black'" outlined
                      class="mt-2 d-block">
                <p class="text-ellipsis">{{ membership.group.name }}</p>
              </v-chip>
            </div>

          </div>
          <!-- Small Screens -->
          <div v-else class="pt-3 px-3">
            <router-link :to="{ name: 'UserDashboard', params: {id: post.creator.id}}"
                         class="text-decoration-none d-flex justify-center align-center"
                         style="color: inherit">
              <v-avatar size="40">
                <v-img class="mx-auto" :src="post.creator.avatar" />
              </v-avatar>
              <div class="text-h6 ml-1">
                {{ post.creator.username }}
              </div>
            </router-link>
            <div v-if="post.creator.memberships && post.creator.memberships.length > 0">
              <v-chip small v-for="membership in post.creator.memberships"
                      :key="membership.id" :color="membership.group.color"
                      :text-color="$vuetify.theme.dark ? 'white' : 'black'" outlined
                      class="mt-2 d-block text-center">
                <p class="text-ellipsis">{{ membership.group.name }}</p>
              </v-chip>
            </div>
          </div>
          <v-divider vertical v-if="$vuetify.breakpoint.smAndUp"/>
          <div style="width: 100%">
            <div>
              <!-- TOP START -->
              <!-- ORIGINAL POSTER HINT -->
              <v-card-text class="d-flex align-center">
                <div v-if="post.creator && thread.creator
                    && post.creator.id === thread.creator.id">
                  <v-chip :color="$vuetify.theme.dark ? '#1c1c1c' : '#c5c5c5'" small label
                          class="vh-forum-post-op">
                    OP
                  </v-chip>
                </div>
                <!-- Post created -->
                <span class="font-weight-light ml-1">
                  <b class="mr-1">·</b>{{ utils.formatDate(post.created) }}
                </span>
                <!-- ORIGINAL POSTER HINT END -->
                <!-- ADMIN HINT -->
                <div class="ml-auto">
                  <v-chip round outlined color="red" small
                          v-if="$checkTopicAdmin(admins, post.creator)">
                    <v-icon small left>mdi-shield-sword-outline</v-icon>
                    <span>{{ $t('_forum.admin') }}</span>
                  </v-chip>
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
                  <div v-if="post.last_edit" class="text--disabled mr-2"
                       style="font-size: 0.9em">
                    <span>{{ $t('_forum.edited') }}:
                      {{ utils.formatTimeForForum(post.last_edit) }}
                    </span>
                  </div>

                  <!-- POST REACTIONS -->
                  <div class="d-flex flex-row flex-wrap align-center">
                    <div v-for="icon in icons" :key="icon">
                      <span class="mr-2 d-flex align-center">
                        <!-- BTN when logged in -->
                        <v-btn :class="{ 'text--disabled':
                               getReactionAccumulated(post, icon).count === 0}"
                               small outlined depressed v-if="$store.getters.isLoggedIn"
                               class="pa-1 ma-0 reaction-btn"
                               :style="getReactionAccumulated(post, icon).has_reacted ?
                               `background-color: ${$vuetify.theme.currentTheme.primary}1A;
                                border-color: ${$vuetify.theme.currentTheme.primary}` : ''"
                               style="min-width: 30px; border-color: transparent"
                               @click="toggleReaction(post, icon)">
                          <span class="reaction-icon">{{ icon }}</span>
                          <span class="ml-1 animate__animated animate__fadeInUp animate__faster"
                                v-if="getReactionAccumulated(post, icon).count !== 0">
                          {{ getReactionAccumulated(post, icon).count }}
                          </span>
                        </v-btn>
                        <span v-else
                              :class="{ 'text--disabled':
                              getReactionAccumulated(post, icon).count === 0}">
                          {{ icon }}
                          <span v-if="getReactionAccumulated(post, icon).count !== 0">
                            {{ getReactionAccumulated(post, icon).count }}
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                  <v-spacer />
                  <div class="d-flex align-center justify-end">
                    <v-btn small outlined @click.stop="openEditPostDialog(post)"
                           color="primary"
                           class="mr-2"
                           v-if="postEditable(post)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn small outlined
                           v-if="postEditable(post) && posts[0].id !== post.id"
                           @click.stop="$refs.deletePostConfirmationDialog.show(post)"
                           color="error"
                           class="">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card>
      <v-pagination v-if="totalPages > 1"
                    v-model="page"
                    :length="totalPages"
                    :total-visible="5"
                    @input="fetchData"/>
      <div class="mt-3" v-if="(thread.status !== 'CLOSED'
      || ($checkProp('forum_edit') || $checkTopicAdmin(admins))) && posts.length >= 1
      && $vuetify.breakpoint.mdAndUp && $store.getters.isLoggedIn">
        <v-card flat outlined class="card-rounded">
          <v-card-text>
            <v-card v-if="$checkIsForumBanned()" color="error darken-1"
                    flat class="small-card mb-2">
              <v-card-text class="d-flex" style="color: white; align-items: center; height: 100%">
                <v-icon class="mr-2">mdi-information-box</v-icon>
                {{ $t('_forum.messages.banned') }}
              </v-card-text>
            </v-card>
            <v-card v-if="!$checkIsForumBanned() && threadIsOld" color="warning darken-1"
                    flat class="small-card mb-2">
              <v-card-text class="d-flex" style="color: white; align-items: center; height: 100%">
                <v-icon class="mr-2">mdi-information-box</v-icon>
                {{ $t('_forum.messages.oldThread') }}
              </v-card-text>
            </v-card>
            <v-card v-if="!$checkIsForumBanned() && thread.status === 'CLOSED'"
                    color="warning darken-1" flat class="small-card mb-2">
              <v-card-text class="d-flex" style="color: white; align-items: center; height: 100%">
                <v-icon class="mr-2">mdi-information-box</v-icon>
                {{ $t('_forum.messages.closedThread') }}
              </v-card-text>
            </v-card>
            <editor v-if="!$checkIsForumBanned()" v-model="message.content"/>
            <div class="d-flex">
              <v-btn class="mt-3" depressed color="success" v-if="!$checkIsForumBanned()"
                     @click="newPost(message.content)">
                <v-icon left>mdi-plus</v-icon>
                {{ $t('_forum.addPost') }}
              </v-btn>
              <v-checkbox class="ml-4" v-if="!$checkIsForumBanned()
              && ($checkProp('forum_edit') || $checkTopicAdmin(admins))"
                          v-model="closeWithPost" :label="$t('_forum.lockWithAnswer')"/>
            </div>
          </v-card-text>
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
                       @submit="newPost" :hide-title-input="true" />
      <ThreadAddDialog ref="editPostDialog"
                       :dialog-title="`${$t('_forum.editPost')}`"
                       @submit="editPost" :hide-title-input="true" />
      <EditThreadDialog ref="editThreadTitleDialog"
                  :dialog-title="`${$t('_forum.editThread')}`"
                  @submit="editThreadTitle" />
      <DeleteConfirmationDialog ref="deletePostConfirmationDialog"
                                @submit="deletePost" />
      <DeleteConfirmationDialog ref="deleteThreadConfirmationDialog"
                                @submit="deleteThread" />
    </div>
    <div v-else>
      <PageTitleFlat />
      <v-card class="card-rounded mt-3" flat v-for="i in 3" :key="i">
        <v-card-text>
          <v-row>
            <v-col cols="3" sm="2" md="1" class="d-flex">
              <v-skeleton-loader type="avatar" />
            </v-col>
            <v-divider vertical />
            <v-col>
              <v-skeleton-loader type="paragraph" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import editor from '@/components/Editor.vue';
import EditThreadDialog from '@/components/ForumComponents/EditThreadDialog.vue';
import PageTitleFlat from '@/components/PageTitleFlat.vue';
import openapi from '../../api/openapi';
import ThreadAddDialog from '../../components/ForumComponents/ThreadAddDialog.vue';
import ForumPost from '../../forms/ForumPost';

export default {
  name: 'ForumThread',
  components: {
    PageTitleFlat,
    EditThreadDialog,
    DeleteConfirmationDialog,
    ThreadAddDialog,
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
      admins: [],
      page: 1,
      totalPages: 1,
      icons: ['😀', '😂', '🤨', '😐', '😕', '🙄', '👍', '👎', '❤️', '🏆'],
      menuOpen: false,
      cooldown: false,
      closeWithPost: false,
      threadIsOld: false,
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
            const posts = rsp.data.items;
            posts.forEach((p) => {
              // eslint-disable-next-line no-param-reassign
              p.accumulated_reactions = {};

              // eslint-disable-next-line no-param-reassign
              p.accumulated_reactions = p.reactions.reduce((acc, obj) => {
                if (!acc[obj.name]) {
                  acc[obj.name] = { count: 1, has_reacted: false };
                } else {
                  acc[obj.name].count += 1;
                }

                if (this.$store.getters.user) {
                  const user_id = this.$store.getters.user.id;
                  if (obj.user && obj.user.id === user_id) {
                    acc[obj.name].has_reacted = true;
                  }
                }

                return acc;
              }, {});

              this.icons.forEach((i) => {
                if (!(i in p.accumulated_reactions)) {
                  // eslint-disable-next-line no-param-reassign
                  p.accumulated_reactions[i] = { count: 0, has_reacted: false };
                }
              });

              // eslint-disable-next-line no-param-reassign
              p.creator.memberships = this.sortedMemberships(p.creator.memberships);
            });

            this.posts = posts;
            const lastPostDate = new Date(this.posts[this.posts.length - 1].created);
            const today = new Date();
            const diffTime = Math.abs(today - lastPostDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays > 90) {
              this.threadIsOld = true;
            }
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
        this.admins = [...this.topic.admins, ...this.topic.admin_groups];
      });
    },
    postEditable(post) {
      if (!this.topic || !this.$store.getters.user || !this.posts) return false;
      return (this.$checkProp('forum_edit') || this.$checkTopicAdmin(this.admins)
        || (this.$store.getters.user.id === post.creator.id && this.topic.edit_post));
    },
    openEditPostDialog(post) {
      this.$refs.editPostDialog.show(post);
      this.$refs.editPostDialog.content = post.content;
    },
    async newPost(content) {
      const data = this.$refs.addPostDialog.getData() || {};
      if (content) { data.content = content; }
      if (data.content === '') {
        this.$refs.addPostDialog.setError(this.$t('_forum.messages.emptyPost'));
        return;
      }
      if (this.thread.status === 'CLOSED' && (this.$checkProp('forum_edit') || this.$checkTopicAdmin(this.admins))) {
        await this.toggleStatus(true);
      }
      (await openapi).forum_createPost(this.threadId, data).then(() => {
        this.$refs.addPostDialog.close();
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
        if (this.closeWithPost) {
          this.toggleStatus(true);
        }
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
      this.$refs.editThreadTitleDialog.setData(data, this.topic.id);
    },
    async editThreadTitle() {
      const data = this.$refs.editThreadTitleDialog.getData();
      if (data.status !== this.thread.status) {
        this.toggleStatus();
      }
      delete data.status;
      (await openapi).forum_editThread(this.threadId, data).then(() => {
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
        this.getThread();
        this.$refs.editThreadTitleDialog.close();
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
    async toggleStatus(silent = false) {
      (await openapi).forum_toggleStatus(this.threadId).then((rsp) => {
        this.thread = rsp.data;
        if (!silent) {
          this.$notify({
            title: this.$t('_messages.toggleSuccess'),
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
      if (this.cooldown) return;
      this.cooldown = true;
      if (post.accumulated_reactions[icon].has_reacted) {
        const reaction = post.reactions
          .find((r) => r.user && r.user.id === this.$store.getters.user.id && r.name === icon);
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
      }
      setTimeout(() => {
        this.cooldown = false;
      }, 200);
    },
    sortedMemberships(memberships) {
      if (!memberships || memberships.length === 0) return [];
      return [memberships.sort((a, b) => b.group.permission_level - a.group.permission_level)[0]];
    },
  },
  computed: {
    threadIcon() {
      if (!this.thread) return null;
      if (this.thread.pinned) return 'mdi-pin';
      if (this.thread.status === 'CLOSED') return 'mdi-lock';
      return null;
    },
  },
};
</script>

<style scoped>
.clicked {
  background-color: rgba(84, 113, 252, 0.1);
  border: 1px solid var(--v-primary-lighten3);
  border-radius: 5px;
}

.thread-breadcrumbs {
  font-size: smaller;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 40%
}

.reaction-btn {
  transition: all 0.2s ease-in-out;
}

.small-card {
  height: 40px;
}
</style>
