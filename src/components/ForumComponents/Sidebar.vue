<template>
<div>
  <v-card v-if="latestPosts" class="vh-forum-latest-posts">
    <v-card-title style="word-break: break-word">
      <HeadlineSidebar icon="mdi-message-text-clock" :title="$t('_forum.latestPosts')"/>
    </v-card-title>
    <v-divider class="ml-3 mr-3"/>
    <v-list dense>
      <v-list-item v-for="post in latestPosts" :key="post.id" class="listItem pt-0 pb-0"
                   :to="{ name: 'ForumThread', params: { id: post.thread.id },
                    query: {lastPage: true}}">
        <v-list-item-content>
          <div class="d-flex">
            <router-link
              :to="{ name: 'UserDashboard',
                           params: { id: post.creator.id } }">
              <v-avatar class="ma-1 mr-2" size="30">
                <v-img :src="post.creator.avatar"/>
              </v-avatar>
            </router-link>
            <div class="align-self-center">
              <div>
                <router-link :to="{ name: 'ForumThread', params: { id: post.thread.id },
                 query: {lastPage: true} }"
                             style="font-size: 1em; white-space: nowrap;
                                      text-overflow: ellipsis; color: inherit;
                                       text-decoration: none">
                  {{ post.thread.title }}
                </router-link>
              </div>
              <div class="text--disabled">
                {{ utils.formatTimeForForum(post.created) }} {{ $t('_forum.by') }}
                <UserLink :simple="true" :user="post.creator"></UserLink>
              </div>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
  <v-skeleton-loader type="card" v-else class="mt-3"/>
  <v-card class="mt-3 vh-forum-latest-threads" v-if="latestThreads">
    <v-card-title style="word-break: break-word">
      <HeadlineSidebar icon="mdi-forum" :title="$t('_forum.latestThreads')"/>
    </v-card-title>
    <v-divider class="ml-3 mr-3"/>
    <v-list dense>
      <v-list-item v-for="thread in latestThreads" :key="thread.id" class="listItem"
                   :to="{ name: 'ForumThread', params: { id: thread.id } }">
        <v-list-item-content>
          <div class="d-flex">
            <router-link
              :to="{ name: 'UserDashboard',
                           params: { id: thread.creator.id } }">
              <v-avatar class="ma-1 mr-2" size="35">
                <v-img :src="thread.creator.avatar"/>
              </v-avatar>
            </router-link>
            <div class="align-self-center">
              <div>
                <router-link :to="{ name: 'ForumThread', params: { id: thread.id } }"
                             style="font-size: 1em; white-space: nowrap;
                                      text-overflow: ellipsis; color: inherit;
                                       text-decoration: none">
                  {{ thread.title }}
                </router-link>
              </div>
              <div class="text--disabled">
                {{ utils.formatTimeForForum(thread.created) }} {{ $t('_forum.by') }}
                <UserLink :simple="true" :user="thread.creator"></UserLink>
              </div>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
  <v-skeleton-loader type="card" v-else />
  <v-card class="mt-3 vh-forum-statistics" v-if="latestPosts && latestThreads">
    <v-card-title style="word-break: break-word">
      <HeadlineSidebar icon="mdi-counter" :title="$t('_forum.statistics')"/>
    </v-card-title>
    <v-divider class="ml-3 mr-3"/>
    <v-card-text>
      <span class="font-weight-bold">{{ totalThreads }}</span> {{ $t('_forum.threads') }},
      <span class="font-weight-bold">{{ totalPosts }}</span> {{ $t('_forum.posts') }}
    </v-card-text>
  </v-card>
  <v-skeleton-loader type="card" class="mt-3" v-else />
</div>
</template>

<script>
import HeadlineSidebar from '@/components/HomeComponents/HeadlineSidebar.vue';
import openapi from '@/api/openapi';
import UserLink from '@/components/UserLink.vue';

export default {
  name: 'Sidebar.vue',
  components: { HeadlineSidebar, UserLink },
  data() {
    return {
      latestPosts: null,
      latestThreads: null,
      totalPosts: null,
      totalThreads: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).forum_getPosts({ sort_by: 'created', sort_desc: true, size: 5 }).then((rsp) => {
        this.latestPosts = rsp.data.items;
        this.totalPosts = rsp.data.total;
      });
      (await openapi).forum_getThreads({ sort_by: 'created', sort_desc: true, size: 5 }).then((rsp) => {
        this.latestThreads = rsp.data.items;
        this.totalThreads = rsp.data.total;
      });
    },
  },
};
</script>

<style scoped>

</style>
