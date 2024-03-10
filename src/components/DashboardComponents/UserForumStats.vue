<template>
  <v-card class="card-rounded">
    <v-tabs grow>
      <v-tab>
        <v-icon left>
          mdi-chart-bar
        </v-icon>
        {{ $t('statistics') }}
      </v-tab>
      <v-tab-item>
        <v-card class="vh-dashboard-forum card-rounded" flat>
          <v-card-text>
            <v-row class="d-flex text-center">
              <v-col cols="4">
                <v-icon class="mr-2">mdi-forum</v-icon>
                {{ $t('_forum.threads') }}:
                <b>{{ this.threads }}</b>
              </v-col>
              <v-col cols="4">
                <v-icon class="mr-2">mdi-message-text</v-icon>
                {{ $t('_forum.posts') }}:
                <b>{{ this.posts }}</b>
              </v-col>
              <v-col cols="4">
                <v-icon class="mr-2">mdi-thumb-up</v-icon>
                {{ $t('_forum.reactions') }}:
                <b>{{ this.reactions }}</b>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab>
        <v-icon left>
          mdi-format-list-bulleted
        </v-icon>
        {{ $t('_forum.lastActivity') }}
      </v-tab>
      <v-tab-item>
        <v-card>
          <v-card-text class="d-flex" v-for="lastPost in lastPosts" :key="lastPost.id">
            <v-card @click="$router.push({ name: 'ForumThread', params:
                   { id: lastPost.thread.id } })" flat width="100%">
              <v-row>
                <v-col cols="8">
                  <v-icon class="mr-2">mdi-forum</v-icon>
                  {{ lastPost.thread.title }}
                </v-col>
                <v-col cols="4">
                  <v-icon class="mr-2">mdi-clock-time-four-outline</v-icon>
                  {{ utils.formatDate(lastPost.created) }}
                </v-col>
              </v-row>
            </v-card>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  props: {
    user: Object,
  },
  data() {
    return {
      threads: null,
      posts: null,
      reactions: null,
      lastPosts: null,
    };
  },
  mounted() {
    this.getForumStats();
  },
  methods: {
    async getForumStats() {
      (await openapi).forum_getStats(this.user.id).then((rsp) => {
        this.threads = rsp.data.threads_count;
        this.posts = rsp.data.posts_count;
        this.reactions = rsp.data.reactions_count;
      }).catch(() => {
        this.threads = 0;
        this.posts = 0;
        this.reactions = 0;
      });

      (await openapi).forum_getPosts({
        user_id: this.user.id, sort_by: 'created', sort_desc: true, size: 3,
      }).then((rsp) => {
        this.lastPosts = rsp.data.items;
      }).catch(() => {
        this.lastPosts = [];
      });
    },
  },
};
</script>

<style scoped>

</style>
