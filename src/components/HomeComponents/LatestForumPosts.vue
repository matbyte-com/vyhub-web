<template>
  <v-card
    class="vh-latest-forum-posts card-rounded mb-3"
    flat
    :border="outlined"
  >
    <v-card-title class="pb-0 pt-3">
      <CardTitle
        icon="mdi-message-text-clock"
        :title="$t('_forum.latestPosts')"
      />
    </v-card-title>
    <v-card-text
      v-if="latestPosts != null"
      style="width: inherit"
    >
      <div
        v-if="latestPosts.length === 0"
        class="text-medium-emphasis text-caption mt-3"
      >
        {{ $t('noDataAvailable') }}
      </div>
      <v-list
        v-else
        density="compact"
        class="pt-0 mt-3"
      >
        <v-list-item
          v-for="post in latestPosts"
          :key="post.id"
          class="px-0"
          :to="{ name: 'ForumThread', params: { id: post.thread.id },
                 query: { lastPage: true } }"
        >
          <div class="d-flex align-center">
            <v-avatar
              class="mr-2 flex-shrink-0"
              size="30"
            >
              <v-img :src="post.creator.avatar" />
            </v-avatar>
            <div style="min-width: 0">
              <div class="text-truncate font-weight-medium">
                {{ post.thread.title }}
              </div>
              <div class="text-disabled text-caption text-truncate">
                {{ utils.formatTimeForForum(post.created) }} {{ $t('_forum.by') }}
                <UserLink
                  :simple="true"
                  :user="post.creator"
                />
              </div>
            </div>
          </div>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-text v-else>
      <v-skeleton-loader type="paragraph" />
    </v-card-text>
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
