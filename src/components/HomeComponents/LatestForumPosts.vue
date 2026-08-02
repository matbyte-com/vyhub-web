<template>
  <v-card
    class="vh-forum-latest-posts card-rounded mb-3"
    flat
    :border="outlined"
  >
    <v-card-title class="d-block pb-0 pt-3">
      <CardTitle
        icon="mdi-message-text-clock"
        :title="$t('_forum.latestPosts')"
      />
    </v-card-title>
    <div
      v-if="latestPosts && latestPosts.length === 0"
      class="text-disabled px-4 py-3"
    >
      {{ $t('noDataAvailable') }}
    </div>
    <v-list
      v-else-if="latestPosts"
      density="compact"
    >
      <v-list-item
        v-for="post in latestPosts"
        :key="post.id"
        class="listItem"
        :to="{ name: 'ForumThread', params: { id: post.thread.id },
               query: { lastPage: true } }"
      >
        <div class="d-flex align-center">
          <router-link
            v-if="post.creator"
            :to="{ name: 'UserDashboard',
                   params: { id: post.creator.id } }"
          >
            <v-avatar
              class="ma-1 mr-2"
              size="35"
            >
              <v-img :src="post.creator.avatar" />
            </v-avatar>
          </router-link>
          <div>
            <div>
              <router-link
                :to="{ name: 'ForumThread', params: { id: post.thread.id },
                       query: { lastPage: true } }"
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
</template>

<script>
import openapi from '@/api/openapi';
import CardTitle from '../CardTitle.vue';

export default {
  name: 'LatestForumPosts',
  components: { CardTitle },
  props: {
    outlined: { type: Boolean },
  },
  data() {
    return {
      latestPosts: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).forum_getPosts({ sort_by: 'created', sort_desc: true, size: 5 })
        .then((rsp) => {
          this.latestPosts = rsp.data.items;
        });
    },
  },
};
</script>

<style scoped>

</style>
