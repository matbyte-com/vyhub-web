<template>
  <div>
    <v-card
      class="vh-forum-latest-posts card-rounded"
      flat
    >
      <v-card-title class="pb-0">
        <CardTitle
          icon="mdi-message-text-clock"
          :title="$t('_forum.latestPosts')"
        />
      </v-card-title>
      <v-list
        v-if="latestPosts"
        density="compact"
      >
        <v-list-item
          v-for="post in latestPosts"
          :key="post.id"
          class="listItem pt-0 pb-0"
          :to="{ name: 'ForumThread', params: { id: post.thread.id },
                 query: {lastPage: true}}"
        >
          <div class="d-flex align-center">
            <router-link
              v-if="post.creator"
              :to="{ name: 'UserDashboard',
                     params: { id: post.creator.id } }"
            >
              <v-avatar
                class="ma-1 mr-2"
                size="30"
              >
                <v-img :src="post.creator.avatar" />
              </v-avatar>
            </router-link>
            <div>
              <div>
                <router-link
                  :to="{ name: 'ForumThread', params: { id: post.thread.id },
                         query: {lastPage: true} }"
                  class="vh-forum-link"
                  style="font-size: 1em; white-space: nowrap;
                                      text-overflow: ellipsis; color: inherit;
                                       text-decoration: none"
                >
                  {{ post.thread.title }}
                </router-link>
              </div>
              <div
                v-if="post.creator"
                class="text-disabled"
              >
                <span class="vh-forum-link">
                  {{ utils.formatTimeForForum(post.created) }} {{ $t('_forum.by') }}
                </span>
                <UserLink
                  :simple="true"
                  :user="post.creator"
                />
              </div>
            </div>
          </div>
        </v-list-item>
      </v-list>
      <v-skeleton-loader
        v-else
        dark
        style="background-color: rgba(0,0,0,0)"
        type="list-item-avatar, divider, list-item-avatar,
       divider, list-item-avatar"
      />
    </v-card>
    <v-card
      class="mt-3 vh-forum-latest-threads card-rounded"
      flat
    >
      <v-card-title class="d-block pb-0">
        <CardTitle
          icon="mdi-forum"
          :title="$t('_forum.latestThreads')"
        />
      </v-card-title>
      <v-list
        v-if="latestThreads"
        density="compact"
      >
        <v-list-item
          v-for="thread in latestThreads"
          :key="thread.id"
          class="listItem"
          :to="{ name: 'ForumThread', params: { id: thread.id } }"
        >
          <div class="d-flex align-center">
            <router-link
              v-if="thread.creator"
              :to="{ name: 'UserDashboard',
                     params: { id: thread.creator.id } }"
            >
              <v-avatar
                class="ma-1 mr-2"
                size="35"
              >
                <v-img :src="thread.creator.avatar" />
              </v-avatar>
            </router-link>
            <div>
              <div>
                <router-link
                  :to="{ name: 'ForumThread', params: { id: thread.id } }"
                  style="font-size: 1em; white-space: nowrap;
                                      text-overflow: ellipsis; color: inherit;
                                       text-decoration: none"
                  class="vh-forum-link"
                >
                  {{ thread.title }}
                </router-link>
              </div>
              <div
                v-if="thread.creator"
                class="text-disabled"
              >
                <span class="vh-forum-link">
                  {{ utils.formatTimeForForum(thread.created) }} {{ $t('_forum.by') }}
                </span>
                <UserLink
                  :simple="true"
                  :user="thread.creator"
                />
              </div>
            </div>
          </div>
        </v-list-item>
      </v-list>
      <v-skeleton-loader
        v-else
        dark
        style="background-color: rgba(0,0,0,0)"
        type="list-item-avatar, divider, list-item-avatar,
       divider, list-item-avatar"
      />
    </v-card>
    <v-card
      class="mt-3 vh-forum-statistics card-rounded"
      flat
    >
      <v-card-title>
        <CardTitle
          icon="mdi-counter"
          :title="$t('statistics')"
        />
      </v-card-title>
      <v-card-text v-if="totalThreads != null && totalPosts != null && totalReactions != null">
        <span class="font-weight-bold">{{ totalThreads }}</span> {{ $t('_forum.threads') }},
        <span class="font-weight-bold">{{ totalPosts }}</span> {{ $t('_forum.posts') }},
        <span class="font-weight-bold">{{ totalReactions }}</span> {{ $t('_forum.reactions') }}
      </v-card-text>
      <v-card-text
        v-else
        class="d-flex"
      >
        <v-skeleton-loader
          height="26px"
          tile
          type="chip"
          dark
          style="background-color: rgba(0,0,0,0)"
        />
        <v-skeleton-loader
          height="26px"
          tile
          type="chip"
          dark
          style="background-color: rgba(0,0,0,0)"
          class="ml-1"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CardTitle from '@/components/CardTitle.vue';
import openapi from '@/api/openapi';
import UserLink from '@/components/UserLink.vue';

export default {
  name: 'Sidebar.vue',
  components: { CardTitle, UserLink },
  data() {
    return {
      latestPosts: null,
      latestThreads: null,
      totalPosts: null,
      totalThreads: null,
      totalReactions: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const api = await openapi;
      api.forum_getPosts({ sort_by: 'created', sort_desc: true, size: 5 }).then((rsp) => {
        this.latestPosts = rsp.data.items;
        this.totalPosts = rsp.data.total;
      });
      api.forum_getThreads({ sort_by: 'created', sort_desc: true, size: 5 }).then((rsp) => {
        this.latestThreads = rsp.data.items;
        this.totalThreads = rsp.data.total;
      });
      api.forum_getStats().then((rsp) => {
        this.totalReactions = rsp.data.reactions_count;
      });
    },
  },
};
</script>

<style scoped>

</style>
