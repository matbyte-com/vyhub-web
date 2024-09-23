<template>
  <div>
    <div v-if="thread && posts && topic">
      <PageTitleFlat
        :title="thread.title"
        :icon="threadIcon"
        :hide-triangle="$vuetify.display.smAndDown"
        :no-bottom-border-radius="$vuetify.display.smAndDown"
      >
        <template #end>
          <div class="d-flex justify-end">
            <v-chip
              v-for="(label, index) in thread.labels"
              :key="label.id"
              class="text-white"
              :color="label.color"
              :size="true ? 'small' : undefined"
              :style="{
                'border-top-right-radius': index === (thread.labels.length - 1) ? '20px' : '0',
                'border-bottom-right-radius':
                  index === (thread.labels.length - 1) ? '20px' : '0',
                'border-top-left-radius': index === 0 ? '20px' : '0',
                'border-bottom-left-radius': index === 0 ? '20px' : '0'
              }"
            >
              {{ label.name }}
            </v-chip>
          </div>
        </template>
        <template #subtitle>
          <div class="d-flex align-center">
            <div class="text-white thread-breadcrumbs">
              <router-link
                :to="{ name: 'Forum' }"
                class="text-white"
              >
                {{ topic.topic_category.title }}
              </router-link>
              / <router-link
                class="text-white"
                :to="{ name: 'ForumTopic', params: { id: topic.id } }"
              >
                {{ topic.title }}
              </router-link>
              / <span>
                {{ thread.title }}
              </span>
            </div>
            <v-spacer />
            <div v-if="$checkProp('forum_edit') || $checkTopicAdmin(admins)">
              <v-btn
                color="success"
                variant="outlined"
                size="small"
                class="ml-5 mr-1"
                @click="openThreadTitleEditDialog(thread)"
              >
                <v-icon start>
                  mdi-pencil
                </v-icon>
                <span>{{ $t('edit') }}</span>
              </v-btn>
              <v-btn
                variant="outlined"
                size="small"
                style="min-width: 18px; width: 18px"
                color="error"
                @click="$refs.deleteThreadConfirmationDialog.show(thread)"
              >
                <v-icon size="small">
                  mdi-delete
                </v-icon>
              </v-btn>
            </div>
            <v-btn
              v-if="thread.status !== 'CLOSED' && $store.getters.isLoggedIn"
              :disabled="$checkIsForumBanned()"
              variant="flat"
              color="success"
              class="ml-1"
              size="small"
              @click="$refs.addPostDialog.show()"
            >
              <v-icon start>
                mdi-plus
              </v-icon>
              {{ $t('_forum.addPost') }}
            </v-btn>
          </div>
        </template>
      </PageTitleFlat>
      <v-card
        v-for="(post, index) in posts"
        :key="post.id"
        flat
        border
        class="vh-forum-post card-rounded-bottom mb-3"
        :class="{ 'mt-4 card-rounded-top':!$vuetify.display.smAndDown || index !== 0,
                  'no-top-border-radius': $vuetify.display.smAndDown && index === 0}"
      >
        <div
          class="d-flex"
          :class="{ 'flex-column' : $vuetify.display.xs }"
        >
          <!-- Avatar -->
          <!-- Large Screens -->
          <div
            v-if="$vuetify.display.smAndUp"
            class="pa-3 text-center"
            style="width: 200px"
          >
            <router-link
              v-if="!post.creator.deleted"
              :to="{ name: 'UserDashboard', params: {id: post.creator.id}}"
              class="text-decoration-none"
              style="color: inherit"
            >
              <v-avatar size="80">
                <v-img
                  class="mx-auto"
                  :src="post.creator.avatar"
                />
              </v-avatar>
              <div class="text-h6">
                {{ post.creator.username }}
              </div>
            </router-link>
            <div v-else>
              <v-avatar size="80">
                <v-img
                  class="mx-auto"
                  :src="post.creator.avatar"
                />
              </v-avatar>
              <div class="text-h6">
                {{ post.creator.username }}
              </div>
              <v-icon
                color="red"
                class="mt-2"
              >
                mdi-account-remove
              </v-icon>
            </div>
            <div v-if="post.creator.memberships && post.creator.memberships.length > 0">
              <div
                v-for="membership in post.creator.memberships"
                :key="membership.id"
                class="justify-center"
              >
                <v-tooltip location="bottom">
                  <template #activator="{ props }">
                    <v-chip
                      size="small"
                      :color="membership.group.color"
                      v-bind="props"
                      :text-color="$vuetify.theme.dark ? 'white' : 'black'"
                      variant="outlined"
                      class="mt-2"
                      style="max-width: 150px"
                    >
                      <div style="max-width: 150px; width: 100%;">
                        <p class="text-ellipsis mt-4">
                          {{ membership.group.name }}
                        </p>
                      </div>
                    </v-chip>
                  </template>
                  {{ membership.group.name }}
                </v-tooltip>
              </div>
            </div>
          </div>
          <!-- Small Screens -->
          <div
            v-else
            class="pt-3 px-3"
          >
            <router-link
              v-if="!post.creator.deleted"
              :to="{ name: 'UserDashboard', params: {id: post.creator.id}}"
              class="text-decoration-none d-block text-center"
              style="color: inherit"
            >
              <v-avatar size="40">
                <v-img
                  class="mx-auto"
                  :src="post.creator.avatar"
                />
              </v-avatar>
              <div class="text-h6">
                {{ post.creator.username }}
              </div>
            </router-link>
            <div
              v-else
              class="d-block text-center"
            >
              <v-avatar size="40">
                <v-img
                  class="mx-auto"
                  :src="post.creator.avatar"
                />
              </v-avatar>
              <div class="text-h6">
                {{ post.creator.username }}
              </div>
              <v-icon color="red">
                mdi-account-remove
              </v-icon>
            </div>
            <div v-if="post.creator.memberships && post.creator.memberships.length > 0">
              <v-chip
                v-for="membership in post.creator.memberships"
                :key="membership.id"
                size="small"
                :color="membership.group.color"
                :text-color="$vuetify.theme.dark ? 'white' : 'black'"
                variant="outlined"
                class="mt-2 d-block text-center"
              >
                <p class="text-ellipsis">
                  {{ membership.group.name }}
                </p>
              </v-chip>
            </div>
          </div>
          <v-divider
            v-if="$vuetify.display.smAndUp"
            vertical
          />
          <div style="width: 100%">
            <div>
              <!-- TOP START -->
              <!-- ORIGINAL POSTER HINT -->
              <v-card-text class="d-flex align-center">
                <div
                  v-if="post.creator && thread.creator
                    && post.creator.id === thread.creator.id"
                >
                  <v-chip
                    :color="$vuetify.theme.dark ? '#1c1c1c' : '#c5c5c5'"
                    size="small"
                    label
                    class="vh-forum-post-op"
                  >
                    OP
                  </v-chip>
                  <b class="ml-2 mr-1">·</b>
                </div>
                <!-- Post created -->
                <span class="font-weight-light ml-1">
                  {{ utils.formatDate(post.created) }}
                </span>
                <!-- ORIGINAL POSTER HINT END -->
                <!-- ADMIN HINT -->
                <div class="ml-auto">
                  <v-chip
                    v-if="$checkTopicAdmin(admins, post.creator)"
                    round
                    variant="outlined"
                    color="red"
                    size="small"
                  >
                    <v-icon
                      size="small"
                      start
                    >
                      mdi-shield-sword-outline
                    </v-icon>
                    <span>{{ $t('_forum.admin') }}</span>
                  </v-chip>
                </div>
              </v-card-text>
              <!-- ADMIN HINT END -->
              <v-divider />
              <v-card-text>
                <!-- IMPORTANT - TOP -->
                <span
                  class="ql-editor pa-0 text-break"
                  v-html="post.content"
                />
              </v-card-text>
              <v-divider /> <!-- IMPORTANT - BOTTOM -->
              <div class="px-3 py-1">
                <div class="d-flex align-center">
                  <div
                    v-if="post.last_edit"
                    class="text--disabled mr-2"
                    style="font-size: 0.9em"
                  >
                    <span>{{ $t('_forum.edited') }}:
                      {{ utils.formatTimeForForum(post.last_edit) }}
                    </span>
                  </div>

                  <!-- POST REACTIONS -->
                  <div class="d-flex flex-row flex-wrap align-center">
                    <div
                      v-for="icon in icons"
                      :key="icon"
                    >
                      <span class="mr-2 d-flex align-center">
                        <!-- BTN when logged in -->
                        <v-btn
                          v-if="$store.getters.isLoggedIn"
                          :class="{ 'text--disabled':
                            getReactionAccumulated(post, icon).count === 0}"
                          size="small"
                          variant="outlined"
                          variant="flat"
                          class="pa-1 ma-0 reaction-btn"
                          :style="getReactionAccumulated(post, icon).has_reacted ?
                            `background-color: ${$vuetify.theme.current.primary}1A;
                                border-color: ${$vuetify.theme.current.primary}` : ''"
                          style="min-width: 30px; border-color: transparent"
                          @click="toggleReaction(post, icon)"
                          @click.right.prevent="showAllReactors(post, icon)"
                        >
                          <span class="reaction-icon">{{ icon }}</span>
                          <span
                            v-if="getReactionAccumulated(post, icon).count !== 0"
                            class="ml-1 animate__animated animate__fadeInUp animate__faster"
                          >
                            {{ getReactionAccumulated(post, icon).count }}
                          </span>
                        </v-btn>
                        <span
                          v-else
                          :class="{ 'text--disabled':
                            getReactionAccumulated(post, icon).count === 0}"
                        >
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
                    <v-btn
                      v-if="postEditable(post)"
                      size="small"
                      variant="outlined"
                      color="primary"
                      class="mr-2"
                      @click.stop="openEditPostDialog(post)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      v-if="postEditable(post) && posts[0].id !== post.id"
                      size="small"
                      variant="outlined"
                      color="error"
                      @click.stop="$refs.deletePostConfirmationDialog.show(post)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card>
      <v-pagination
        v-if="totalPages > 1"
        v-model="page"
        :length="totalPages"
        :total-visible="5"
        @update:model-value="fetchData"
      />
      <div
        v-if="(thread.status !== 'CLOSED'
          || ($checkProp('forum_edit') || $checkTopicAdmin(admins))) && posts.length >= 1
          && $vuetify.display.mdAndUp && $store.getters.isLoggedIn"
        class="mt-3"
      >
        <v-card
          flat
          border
          class="card-rounded"
        >
          <v-card-text>
            <v-card
              v-if="$checkIsForumBanned()"
              color="error-darken-1"
              flat
              class="small-card mb-2"
            >
              <v-card-text
                class="d-flex"
                style="color: white; align-items: center; height: 100%"
              >
                <v-icon class="mr-2">
                  mdi-information-box
                </v-icon>
                {{ $t('_forum.messages.banned') }}
              </v-card-text>
            </v-card>
            <v-card
              v-if="!$checkIsForumBanned() && threadIsOld"
              color="warning-darken-1"
              flat
              class="small-card mb-2"
            >
              <v-card-text
                class="d-flex"
                style="color: white; align-items: center; height: 100%"
              >
                <v-icon class="mr-2">
                  mdi-information-box
                </v-icon>
                {{ $t('_forum.messages.oldThread') }}
              </v-card-text>
            </v-card>
            <v-card
              v-if="!$checkIsForumBanned() && thread.status === 'CLOSED'"
              color="warning-darken-1"
              flat
              class="small-card mb-2"
            >
              <v-card-text
                class="d-flex"
                style="color: white; align-items: center; height: 100%"
              >
                <v-icon class="mr-2">
                  mdi-information-box
                </v-icon>
                {{ $t('_forum.messages.closedThread') }}
              </v-card-text>
            </v-card>
            <editor
              v-if="!$checkIsForumBanned()"
              v-model="message.content"
            />
            <div class="d-flex">
              <v-btn
                v-if="!$checkIsForumBanned()"
                class="mt-3"
                variant="flat"
                color="success"
                @click="newPost(message.content)"
              >
                <v-icon start>
                  mdi-plus
                </v-icon>
                {{ $t('_forum.addPost') }}
              </v-btn>
              <v-checkbox
                v-if="!$checkIsForumBanned()
                  && ($checkProp('forum_edit') || $checkTopicAdmin(admins))"
                v-model="closeWithPost"
                class="ml-4"
                :label="$t('_forum.lockWithAnswer')"
              />
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div
        v-if="thread.status === 'CLOSED'
          && !($checkProp('forum_edit') || $checkTopicAdmin(admins))"
      >
        <v-row class="justify-center mt-3">
          <v-col
            cols="4"
            lg="2"
            sm="3"
          >
            <v-alert
              variant="outlined"
              color="red"
              class="text-center"
            >
              {{ $t('_forum.locked') }}
            </v-alert>
          </v-col>
        </v-row>
      </div>
      <ThreadAddDialog
        ref="addPostDialog"
        :dialog-title="`${$t('_forum.addPost')}`"
        :hide-title-input="true"
        @submit="newPost"
      />
      <ThreadAddDialog
        ref="editPostDialog"
        :dialog-title="`${$t('_forum.editPost')}`"
        :hide-title-input="true"
        @submit="editPost"
      />
      <EditThreadDialog
        ref="editThreadTitleDialog"
        :dialog-title="`${$t('_forum.editThread')}`"
        @submit="editThreadTitle"
      />
      <DeleteConfirmationDialog
        ref="deletePostConfirmationDialog"
        @submit="deletePost"
      />
      <DeleteConfirmationDialog
        ref="deleteThreadConfirmationDialog"
        @submit="deleteThread"
      />
      <v-dialog
        ref="showAllReactorsDialog"
        v-model="menuOpen"
        max-width="350px"
      >
        <template v-if="selectedReaction">
          <v-card class="card-rounded">
            <v-card-title class="text-h5 bg-primary">
              {{ selectedReaction.emoji }} | {{ $t('_forum.reactions') }}
            </v-card-title>
            <v-card-text>
              <v-list>
                <template v-for="(user, index) in selectedReaction.users">
                  <v-list-item
                    :key="user.id"
                    class="align-center"
                    :to="{ name: 'UserDashboard', params: { id: user.id } }"
                  >
                    <v-list-item-avatar class="mr-2">
                      <v-avatar size="30">
                        <v-img :src="user.avatar" />
                      </v-avatar>
                    </v-list-item-avatar>

                    <v-list-item-title>{{ user.username }}</v-list-item-title>
                  </v-list-item>
                  <v-divider
                    v-if="index < selectedReaction.users.length - 1"
                    :key="`divider-${index}`"
                  />
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </div>
    <div v-else>
      <PageTitleFlat />
      <v-card
        v-for="i in 3"
        :key="i"
        class="card-rounded mt-3"
        flat
      >
        <v-card-text>
          <v-row>
            <v-col
              cols="3"
              sm="2"
              md="1"
              class="d-flex"
            >
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
      selectedReaction: null,
    };
  },
  computed: {
    threadIcon() {
      if (!this.thread) return null;
      if (this.thread.pinned) return 'mdi-pin';
      if (this.thread.status === 'CLOSED') return 'mdi-lock';
      return null;
    },
  },
  watch: {
    page(newVal) {
      this.$router.replace({ query: { page: newVal } });
    },
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
  methods: {
    async fetchData() {
      (await openapi).forum_getThreadPosts({ uuid: this.threadId, page: this.page, size: 20 })
        .then((rsp) => {
          this.totalPages = Math.ceil(rsp.data.total / rsp.data.size);
          if (!this.lastPage) {
            const posts = rsp.data.items;
            posts.forEach((p) => {
               
              p.accumulated_reactions = {};

               
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

               
              p.content = p.content.replace(
                /<iframe([^>]*)src="([^"]+)"([^>]*)><\/iframe>/g,
                (_, iframeAttrsBefore, src, iframeAttrsAfter) => {
                  const iFrameID = `iFrame${Math.random().toString(36).slice(2, 9)}`;
                  const spoilerDiv = `
                    <div class="vh-iframe-closed" style="
                        border: 2px solid var(--v-warning-darken3);
                        cursor: pointer;
                        width: 30%;
                        min-height: 100px;
                        text-align: center;
                        transition: all 0.3s ease;
                        border-radius: 10px;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        background-color: rgba(100, 100, 100, 0.4);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                      " onclick="
                        var iframe = document.getElementById('${iFrameID}');
                        iframe.src = iframe.getAttribute('data-src');
                        iframe.style.display = 'block';
                        this.style.display = 'none';
                    ">
                      <i class="vh-iframe-icon v-icon mdi mdi-eye-off" style="
                          font-size: 40px;
                          color: var(--v-warning-darken3);
                          transition: all 0.3s ease;
                      "></i>
                      <p class="vh-iframe-text" style="color: var(--v-warning-darken3); font-size: 14px;">${src}</p>
                  </div>`;
                  const iFrameElement = `
                  <iframe id="${iFrameID}" data-src="${src}" ${iframeAttrsBefore} style="
                      display: none;
                      width: 100%;
                      height: 500px;
                      border: none;
                      border-top: 2px solid var(--v-warning-darken3);
                      border-radius: 0 0 10px 10px;
                  " class="vh-iframe-open" ${iframeAttrsAfter}></iframe>`;
                  return `<div style="display: flex; justify-content: center;">${spoilerDiv}</div>${iFrameElement}`;
                },
              );

              this.icons.forEach((i) => {
                if (!(i in p.accumulated_reactions)) {
                   
                  p.accumulated_reactions[i] = { count: 0, has_reacted: false };
                }
              });

              if (!p.creator) {
                 
                p.creator = {
                  username: this.$t('deletedUser'),
                  avatar: 'https://cdn.vyhub.net/vyhub/avatars/default.png',
                  deleted: true,
                };
              } else {
                 
                p.creator.memberships = this.sortedMemberships(p.creator.memberships);
              }
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
           
          post.reactions = post.reactions.filter((r) => r.id !== reaction.id);
           
          post.accumulated_reactions[icon].count -= 1;
           
          post.accumulated_reactions[icon].has_reacted = false;
        });
      } else {
        (await openapi).forum_createReaction(post.id, { name: icon }).then((rsp) => {
          const reaction = rsp.data;
          reaction.user_id = reaction.user.id;
          post.reactions.push(reaction);
           
          post.accumulated_reactions[icon].count += 1;
           
          post.accumulated_reactions[icon].has_reacted = true;
           
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
    showAllReactors(post, selectedEmoji) {
      this.selectedReaction = {};
      if (post.reactions && post.reactions.length > 0) {
        this.selectedReaction.users = post.reactions
          .filter((reaction) => reaction.name === selectedEmoji)
          .map((reaction) => reaction.user);
      } else {
        this.selectedReaction.users = [];
      }
      this.selectedReaction.emoji = selectedEmoji;

      if (this.selectedReaction.users.length > 0) {
        this.menuOpen = true;
      }
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
