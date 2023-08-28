<template>
<div>
  <v-card class="vh-forum-latest-posts card-rounded">
    <v-card-title style="word-break: break-word">
      <HeadlineSidebar icon="mdi-message-text-clock" :title="$t('_forum.latestPosts')"/>
    </v-card-title>
    <v-divider class="ml-3 mr-3"/>
    <v-list dense v-if="latestPosts">
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
    <v-skeleton-loader type="list-item-avatar, divider, list-item-avatar,
       divider, list-item-avatar" v-else/>
  </v-card>
  <v-card class="mt-3 vh-forum-latest-threads card-rounded">
    <v-card-title style="word-break: break-word">
      <HeadlineSidebar icon="mdi-forum" :title="$t('_forum.latestThreads')"/>
    </v-card-title>
    <v-divider class="ml-3 mr-3"/>
    <v-list dense v-if="latestThreads">
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
    <v-skeleton-loader type="list-item-avatar, divider, list-item-avatar,
       divider, list-item-avatar" v-else/>
  </v-card>
  <v-card class="mt-3 vh-forum-statistics card-rounded">
    <v-card-title style="word-break: break-word">
      <HeadlineSidebar icon="mdi-counter" :title="$t('_forum.statistics')"/>
    </v-card-title>
    <v-divider class="ml-3 mr-3"/>
    <v-card-text v-if="totalThreads && totalPosts && totalReactions">
      <span class="font-weight-bold">{{ totalThreads }}</span>{{ $t('_forum.threads') }},
      <span class="font-weight-bold">{{ totalPosts }}</span> {{ $t('_forum.posts') }},
      <span class="font-weight-bold">{{ totalReactions }}</span> {{ $t('_forum.reactions') }}
    </v-card-text>
    <v-card-text v-else class="d-flex">
      <v-skeleton-loader height="26px" tile type="chip"/>
      <v-skeleton-loader height="26px" tile type="chip" class="ml-1"/>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import HeadlineSidebar from '@/components/HomeComponents/HeadlineSidebar.vue';
import openapi from '@/api/openapi';
import UserLink from '@/components/UserLink.vue';
import openapiCached from '@/api/openapiCached';

export default {
  name: 'Sidebar.vue',
  components: { HeadlineSidebar, UserLink },
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
