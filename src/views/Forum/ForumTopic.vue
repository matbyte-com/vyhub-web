<template>
  <div>
    <div v-if="topic">
      <PageTitleFlat
        :title="topic.title"
        :icon="topic.icon"
        :hide-triangle="$vuetify.display.smAndDown"
        :no-bottom-border-radius="$vuetify.display.smAndDown"
      >
        <template
          v-if="false"
          #subtitle
        >
          <div class="d-flex align-center">
            <div
              class="text-ellipsis mt-1"
              style="width: 50%; max-width: 300px"
            >
              <router-link
                :to="{ name: 'Forum' }"
                class="text-white"
              >
                {{ topic.topic_category.title }}
              </router-link>
              / {{ topic.title }}
            </div>
            <v-spacer v-if="!$vuetify.display.xs" />
            <div v-if="!$vuetify.display.xs">
              {{ topic.description }}
            </div>
          </div>
        </template>
      </PageTitleFlat>
      <v-card
        class="vh-forum-topic card-rounded-bottom"
        flat
        :class="{ 'mt-4 card-rounded-top':!$vuetify.display.smAndDown,
                  'no-top-border-radius': $vuetify.display.smAndDown }"
      >
        <v-card-text class="mt-0 pt-0">
          <PaginatedDataTable
            ref="threadTable"
            :mobile-breakpoint="0"
            :headers="headers"
            :items="threads"
            :total-items="totalItems"
            default-sort-by="last_post"
            :default-sort-desc="true"
            class="cursor"
            @reload="fetchTopic"
            @click:row="showThread"
          >
            <template #header>
              <v-checkbox
                v-model="hide_closed"
                :label="$t('_forum.hideClosed')"
                class="text-capitalize"
                @update:model-value="fetchTopic"
              />
              <div v-if="topic.admins.length >= 1 || topic.admin_groups.length >= 1">
                {{ $t('_forum.topicAdmins') }}
                <v-chip
                  v-for="admin in topic.admin_groups"
                  :key="admin.id"
                  variant="outlined"
                  size="small"
                  :color="admin.color"
                  class="mr-1"
                >
                  {{ admin.name }}
                </v-chip>
                <UserLink
                  v-for="admin in topic.admins"
                  :key="admin.id"
                  small
                  :user="admin"
                  class="mr-1"
                />
              </div>
            </template>
            <template #item.last_post="{ item }">
              <div
                v-if="item.last_post && item.last_post.creator"
                class="d-flex align-center"
              >
                <v-spacer />
                <div class="mr-3 align-center d-flex">
                  <v-tooltip
                    v-if="item.pinned === false"
                    location="bottom"
                  >
                    <template #activator="{ props }">
                      <v-icon
                        v-if="item.status === 'CLOSED'"
                        v-bind="props"
                      >
                        mdi-lock
                      </v-icon>
                    </template>
                    <span> {{ $t('_forum.locked') }} </span>
                  </v-tooltip>
                  <v-tooltip location="bottom">
                    <template #activator="{ props }">
                      <v-icon
                        v-if="item.pinned === true"
                        v-bind="props"
                        class="mr-1 mdi-rotate-45"
                      >
                        mdi-pin
                      </v-icon>
                    </template>
                    <span> {{ $t('_forum.pinned') }} </span>
                  </v-tooltip>
                  <div class="d-flex align-center">
                    <v-tooltip location="bottom">
                      <template #activator="{ props }">
                        <v-icon
                          class="mr-1"
                          v-bind="props"
                        >
                          mdi-comment
                        </v-icon>
                      </template>
                      <span> {{ $t('_forum.numberOfPosts') }} </span>
                    </v-tooltip>
                    {{ item.posts_total }}
                  </div>
                </div>
                <div class="align-self-center d-flex flex-column text-ellipsis">
                  <UserLink
                    :small="true"
                    :user="item.last_post.creator"
                    :simple="true"
                    @click.prevent
                  />
                  {{ utils.formatTimeForForum(item.last_post.created) }}
                </div>
                <router-link
                  :to="{ name: 'UserDashboard', params: { id: item.last_post.creator.id } }"
                >
                  <v-avatar class="ma-1 ml-2">
                    <v-img :src="item.last_post.creator.avatar" />
                  </v-avatar>
                </router-link>
              </div>
            </template>
            <template #item.title="{ item }">
              <div class="d-flex align-center">
                <router-link
                  v-if="item.creator"
                  :to="{ name: 'UserDashboard', params: { id: item.creator.id } }"
                >
                  <v-avatar class="ma-1 mr-2">
                    <v-img :src="item.creator.avatar" />
                  </v-avatar>
                </router-link>
                <div class="align-center align-self-center">
                  <div>
                    <router-link
                      :to="{ name: 'ForumThread', params: { id: item.id } }"
                      :class="{ 'font-weight-bold' : !item.is_read }"
                      class="text-decoration-none ml-1"
                      style="font-size: larger"
                    >
                      {{ item.title }}
                    </router-link>
                  </div>
                  <user-link
                    :user="item.creator"
                    :simple="true"
                  />
                  <b class="ml-1">·</b>
                  <span>
                    {{ new Date(item.created).toLocaleDateString() }}
                  </span>
                  <v-chip
                    v-for="l in item.labels"
                    :key="l.id"
                    label
                    size="x-small"
                    class="text-white ml-1"
                    :color="l.color"
                  >
                    {{ l.name }}
                  </v-chip>
                </div>
              </div>
            </template>
            <template #item.last_post_sm="{ item }">
              <div class="d-flex">
                <v-spacer />
                <div v-if="item.last_post">
                  <div :class="{ 'font-weight-bold' : !item.is_read }">
                    {{ item.posts_total }} {{ $t('_forum.posts') }}
                  </div>
                  <span
                    v-if="topic.last_post"
                    :class="{ 'font-weight-bold' : !item.is_read }"
                  >
                    {{ utils.formatTimeForForum(item.last_post.created) }}
                  </span>
                </div>
              </div>
            </template>
            <template #footer-right>
              <v-tooltip
                v-if="$checkIsForumBanned()"
                location="bottom"
              >
                <template #activator="{ props }">
                  <v-icon
                    v-bind="props"
                    color="error"
                    class="mr-2"
                  >
                    mdi-gavel
                  </v-icon>
                </template>
                {{ $t('_forum.messages.banned') }}
              </v-tooltip>
              <v-btn
                v-if="!topic.prohibit_create_threads && $store.getters.isLoggedIn
                  || ($checkProp('forum_edit') || $checkTopicAdmin(topic.admins))"
                color="success"
                variant="outlined"
                :disabled="$checkIsForumBanned()"
                @click="$refs.addThreadDialog.show()"
              >
                <v-icon start>
                  mdi-plus
                </v-icon>
                <span>{{ $t('_forum.addThread') }}</span>
              </v-btn>
            </template>
          </PaginatedDataTable>
        </v-card-text>
      </v-card>
      <ThreadAddDialog
        ref="addThreadDialog"
        :dialog-title="$t('_forum.addThread')"
        @submit="newThread"
      />
    </div>
    <div v-else>
      <PageTitleFlat />
      <v-card
        flat
        class="card-rounded mt-4"
      >
        <v-skeleton-loader
          type="table-heading, list-item-avatar, divider,
         list-item-avatar,divider, list-item-avatar, divider, list-item-avatar"
        />
      </v-card>
    </div>
  </div>
</template>

<script>
import openapi from '../../api/openapi';

export default {
  data() {
    return {
      threads: null,
      page: 1,
      totalItems: 0,
      hide_closed: false,
      topic: null,
      breadcrumbs: [],
    };
  },
  computed: {
    headers() {
      if (this.$vuetify.display.mdAndUp) {
        return [
          { title: this.$t('title'), key: 'title', sortable: false },
          {
            title: this.$t('_forum.last_post'), value: 'last_post', align: 'end', sortable: false,
          },
        ];
      }
      return [
        { title: this.$t('title'), value: 'title', sortable: false },
        {
          title: this.$t('_forum.last_post'), value: 'last_post_sm', align: 'end', sortable: false,
        },
      ];
    },
  },
  beforeMount() {
    this.fetchTopic();
  },
  methods: {
    async fetchTopic() {
      const topicId = this.$route.params.id;
      (await openapi).forum_getTopic(topicId).then((rsp) => {
        if (rsp.data) {
          rsp.data.admin_groups.sort((a, b) => a.permission_level + b.permission_level);
          this.topic = rsp.data;
          this.breadcrumbs = [
            { text: this.$t('title'), to: { name: 'Forum' } },
            {
              text: this.topic.topic_category.title,
              to: { name: 'ForumCategory', params: { id: this.topic.topic_category.id } },
            },
            { text: this.topic.title },
          ];
          this.fetchThreads();
        }
      });
    },
    async fetchThreads(queryParams = null) {
      const topicId = this.$route.params.id;
      (await openapi).forum_getTopicThreads({
        uuid: topicId,
        hide_closed: this.hide_closed,
        ...(queryParams != null ? queryParams : this.$refs.threadTable.getQueryParameters()),
      })
        .then((rsp) => {
          this.threads = rsp.data.items;
          this.totalItems = rsp.data.total;
        });
    },
    async newThread() {
      const data = this.$refs.addThreadDialog.getData();
      data.topic_id = this.$route.params.id;
      (await openapi).forum_createThread(null, data).then((rsp) => {
        this.$refs.addThreadDialog.close();
        this.showThread(null, { item: rsp.data});
        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addThreadDialog.setError(err);
      });
    },
    showThread(event, row) {
      this.$router.push({ name: 'ForumThread', params: { id: row.item.id } });
    },
  },
};
</script>

<style scoped>
.cursor :deep(td) {
  cursor: pointer !important;
}
</style>
