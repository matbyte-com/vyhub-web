<template>
  <div>
    <ConfirmationDialog ref="deleteThreadDialog"
                                @submit="deleteThread" />
    <ThreadAddDialog ref="addPostDialog"
                     :dialog-title="`${$t('_forum.addPost')}`"
                     @submit="newPost" :hide-title-input="true"/>
    <PageTitleFlat :title="thread ? thread.title : ''"
                   :class="{ 'mb-4':!$vuetify.display.smAndDown}"
                   :no-bottom-border-radius="$vuetify.display.smAndDown"
                   :hide-triangle="$vuetify.display.smAndDown"
                   :open="$vuetify.display.smAndDown">
      <template v-slot:end>
        <div class="d-flex flex-column">
          <v-chip v-if="thread && thread.status === 'OPEN'"
                  color="success"  class="text-uppercase ml-auto">
            {{ $t('_forum.open') }}
          </v-chip>
          <v-chip v-else color="error" class="text-uppercase ml-auto">
            {{ $t('_forum.closed') }}
          </v-chip>
        </div>
      </template>
    </PageTitleFlat>
    <div v-if="thread">
      <v-card flat border class="vh-forum-post card-rounded mb-3"
              :class="{ 'card-rounded-top':!$vuetify.display.smAndDown && index === 0,
           'no-top-border-radius': $vuetify.display.smAndDown && index === 0 }"
              v-for="(post, index) in posts" :key="post.id">
        <div class="d-flex" :class="{ 'flex-column' : $vuetify.display.xs }">
          <div class="pa-3 text-center" style="width: 200px" v-if="$vuetify.display.smAndUp">
            <router-link :to="{ name: 'UserDashboard', params: {id: post.creator.id}}"
                         class="stylelint" style="color: inherit" v-if="post.creator">
              <v-avatar size="80">
                <v-img class="mx-auto" :src="post.creator.avatar" />
              </v-avatar>
              <div class="text-h6">
                {{ post.creator.username }}
              </div>
            </router-link>
            <div v-else>
              <v-avatar size="80">
                <v-img class="mx-auto" src="https://cdn.vyhub.net/vyhub/avatars/default.png" />
              </v-avatar>
              <div class="text-h6">
                {{ $t('deletedUser') }}
              </div>
              <v-icon color="red" class="mt-2">mdi-account-remove</v-icon>
            </div>
          </div>
          <div v-else class="pa-3">
            <router-link :to="{ name: 'UserDashboard', params: {id: post.creator.id}}"
                         class="stylelint d-flex justify-center align-center"
                         style="color: inherit" v-if="!post.creator.deleted">
              <v-avatar size="40">
                <v-img class="mx-auto" :src="post.creator.avatar" />
              </v-avatar>
              <div class="text-h6 ml-1">
                {{ post.creator.username }}
              </div>
            </router-link>
            <div v-else class="d-block text-center">
              <v-avatar size="40">
                <v-img class="mx-auto" src="https://cdn.vyhub.net/vyhub/avatars/default.png" />
              </v-avatar>
              <div class="text-h6 ml-1">
                {{ $t('deletedUser') }}
              </div>
              <v-icon color="red" class="mt-2">mdi-account-remove</v-icon>
            </div>
          </div>
          <v-divider vertical v-if="$vuetify.display.smAndUp"/>
          <div style="width: 100%">
            <div>
              <v-card-text class="d-flex">
                {{ utils.formatDate(post.created) }}
                <div class="ml-auto">
                  <v-chip v-if="post.creator && thread.creator &&
                  post.creator.id !== thread.creator.id && !post.creator.deleted"
                          color="primary" size="small" round>
                    <v-icon size="small" start>
                      mdi-shield-sword-outline
                    </v-icon>
                    <span>
                      {{ $t('staff') }}
                    </span>
                  </v-chip>
                </div>
              </v-card-text>
              <v-divider/>
              <v-card-text>
                <span v-html="post.content" class="ql-editor pa-0"/>
              </v-card-text>
            </div>
          </div>
        </div>
      </v-card>
    </div>
    <div v-if="thread" class="d-flex align-center flex-wrap">
      <v-pagination v-if="totalPages > 1"
                    v-model="page"
                    :length="totalPages"
                    :total-visible="5"
                    @update:model-value="fetchData"/>
      <v-spacer/>
      <v-btn v-if="$checkProp('ticket_edit') && thread.status === 'CLOSED'"
             color="error" variant="flat" @click="$refs.deleteThreadDialog.show()">
        <v-icon start>mdi-delete</v-icon>
        <span>{{ $t('delete') }}</span>
      </v-btn>
      <v-btn v-if="thread.ban" color="primary" :to="{ name: 'Bans',
       params: {banId: thread.ban.id} }" class="mr-3">
        <v-icon start>mdi-eye</v-icon>
        {{ $t('_forum.showBan') }}
      </v-btn>
      <v-btn v-if="$checkProp('ticket_edit')" class="ml-3"
             :color="thread.status === 'CLOSED' ? 'success' : 'error'"
             @click="toggleStatus" variant="flat">
        <div v-if="thread.status === 'CLOSED'">
          <v-icon start>mdi-lock-open-variant</v-icon>
          <span>{{ $t('_forum.open') }}</span>
        </div>
        <div v-else>
          <v-icon start>mdi-lock</v-icon>
          <span>{{ $t('_forum.close') }}</span>
        </div>
      </v-btn>
      <v-btn color="success" variant="flat" class="ml-3" @click="$refs.addPostDialog.show()">
        <v-icon start>mdi-plus</v-icon>
        <span>{{ $t('_forum.addPost') }}</span>
      </v-btn>
    </div>
    <div v-if="!posts">
      <v-skeleton-loader type="article" class="card-rounded"/>
      <v-skeleton-loader class="mt-3 card-rounded" type="article"/>
    </div>
  </div>
</template>

<script>
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import openapi from '../api/openapi';
import ThreadAddDialog from '../components/ForumComponents/ThreadAddDialog.vue';
import PageTitleFlat from '../components/PageTitleFlat.vue';

export default {
  name: 'Thread',
  components: {
    ConfirmationDialog,
    ThreadAddDialog,
    PageTitleFlat,
  },
  data() {
    return {
      threadId: '',
      posts: null,
      avatarWidth: '100px',
      thread: null,
      page: 1,
      totalPages: 1,
    };
  },
  beforeMount() {
    this.threadId = this.$route.params.id;
    if (this.$route.query.page) {
      this.page = parseInt(this.$route.query.page, 10);
    }
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
      (await openapi)
        .forum_getThreadPosts({ uuid: this.threadId, page: this.page, size: 25 }).then((rsp) => {
          this.posts = rsp.data.items;
          for (let i = 0; i < this.posts.length; i += 1) {
            if (!this.posts[i].creator) {
              this.posts[i].creator = {
                username: this.$t('deletedUser'),
                avatar: 'https://cdn.vyhub.net/vyhub/avatars/default.png',
                deleted: true,
              };
            }
          }
          this.totalPages = Math.ceil(rsp.data.total / rsp.data.size);
        });
    },
    async getThread() {
      (await openapi).forum_getThread(this.threadId).then((rsp) => {
        this.thread = rsp.data;
      });
    },
    async newPost() {
      const data = this.$refs.addPostDialog.getData();
      delete data.title;
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
    async toggleStatus() {
      if (this.$checkProp('ticket_edit') === false) return;
      (await openapi).forum_toggleStatus(this.threadId).then((rsp) => {
        this.thread = rsp.data;
        this.$notify({
          title: this.$t('_messages.toggleSuccess'),
          type: 'success',
        });
      });
    },
    async deleteThread() {
      (await openapi).forum_deleteThread(this.threadId).then(() => {
        this.$router.push({ name: 'Ticket' });
        this.$notify({
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
      });
    },
  },
};
</script>

<style scoped>

</style>
