<template>
  <v-card
    class="card-rounded"
    flat
  >
    <v-tabs
      color="primary"
      v-model="tab"
      grow
    >
      <v-tab>
        <v-icon start>
          mdi-chart-bar
        </v-icon>
        {{ $t('statistics') }}
      </v-tab>
      <v-tab>
        <v-icon start>
          mdi-format-list-bulleted
        </v-icon>
        {{ $t('_forum.lastActivity') }}
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item>
        <v-card
          class="vh-dashboard-forum card-rounded"
          flat
        >
          <v-card-text>
            <v-row class="d-flex text-center">
              <v-col cols="4">
                <v-icon class="mr-2">
                  mdi-forum
                </v-icon>
                {{ $t('_forum.threads') }}:
                <b>{{ threads }}</b>
              </v-col>
              <v-col cols="4">
                <v-icon class="mr-2">
                  mdi-message-text
                </v-icon>
                {{ $t('_forum.posts') }}:
                <b>{{ posts }}</b>
              </v-col>
              <v-col cols="4">
                <v-icon class="mr-2">
                  mdi-thumb-up
                </v-icon>
                {{ $t('_forum.reactions') }}:
                <b>{{ reactions }}</b>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tabs-window-item>
      <v-tabs-window-item>
        <v-card>
          <v-card-text
            v-for="lastPost in lastPosts"
            :key="lastPost.id"
            class="d-flex"
          >
            <v-card
              flat
              width="100%"
              @click="$router.push({ name: 'ForumThread', params:
                { id: lastPost.thread.id } })"
            >
              <v-row>
                <v-col cols="8">
                  <v-icon class="mr-2">
                    mdi-forum
                  </v-icon>
                  {{ lastPost.thread.title }}
                </v-col>
                <v-col cols="4">
                  <v-icon class="mr-2">
                    mdi-clock-time-four-outline
                  </v-icon>
                  {{ utils.formatDate(lastPost.created) }}
                </v-col>
              </v-row>
            </v-card>
          </v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
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
      tab: null,
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
