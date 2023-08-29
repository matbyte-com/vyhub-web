<template>
<div>
<v-row justify="center">
  <v-col class="d-flex" cols="11" sm="6" lg="5">
    <v-card v-if="latestPosts" class="vh-forum-latest-posts flex-grow-1 flex-column d-flex">
      <v-card-title style="word-break: break-word">
        <CardTitle icon="mdi-message-text-clock" :title="$t('_forum.latestPosts')"/>
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
  </v-col>
  <v-col class="d-flex" cols="11" sm="6" lg="5">
    <v-card class="vh-forum-latest-threads flex-grow-1 flex-column d-flex"
            v-if="latestThreads">
      <v-card-title style="word-break: break-word">
        <CardTitle icon="mdi-forum" :title="$t('_forum.latestThreads')"/>
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
  </v-col>
</v-row>
</div>
</template>

<script>
import openapi from '@/api/openapi';
import UserLink from '@/components/UserLink.vue';
import CardTitle from '@/components/CardTitle.vue';

export default {
  name: 'ForumLatestActivity',
  components: { CardTitle, UserLink },
  data() {
    return {
      latestPosts: [],
      latestThreads: [],
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
