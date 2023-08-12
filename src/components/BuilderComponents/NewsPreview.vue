<template>
  <div>
    <v-row v-if="news.length > 0" justify="center">
      <v-col cols="12" md="6" lg="5"
             class="d-flex align-content-space-between" v-if="getNewsOfTheDay.length > 0">
        <v-card class="flex-grow-1 flex-column d-flex" :max-height="maxColumnHeight"
                :to="{ name: 'News' }">
          <v-card-title>{{ getNewsOfTheDay[0].subject }}</v-card-title>
          <v-card-text class="content-preview">
            <p v-html="getNewsOfTheDay[0].content"/>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="5"
             class="d-flex align-content-space-between" v-if="getNews.length !== 0">
        <div class="flex-grow-1 flex-column d-flex">
          <v-card :height="maxColumnHeight / 2" v-if="getNews.length >= 1" :to="{ name: 'News' }">
            <v-card-title>{{ getNews[0].subject }}</v-card-title>
            <v-card-text class="content-preview">
              <p :style="`height: ${maxColumnHeight / 2 - 64}px`" v-html="getNews[0].content"/>
            </v-card-text>
          </v-card>
          <v-card class="mt-3" :height="maxColumnHeight / 2" v-if="getNews.length === 2"
                  :to="{ name: 'News' }">
            <v-card-title>{{ getNews[1].subject }}</v-card-title>
            <v-card-text class="content-preview">
              <p :style="`height: ${maxColumnHeight / 2 - 64}px`" v-html="getNews[1].content"/>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="d-flex align-content-space-between">
        <v-card class="flex-grow-1 flex-column d-flex">
          <v-card-text><v-skeleton-loader type="paragraph@2"/></v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="flex-grow-1 flex-column d-flex">
          <v-card-text><v-skeleton-loader type="paragraph@1"/></v-card-text>
        </v-card>
        <v-card class="mt-3">
          <v-card-text><v-skeleton-loader type="paragraph@1"/></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import openapiCached from '@/api/openapiCached';

export default {
  name: 'BlogPreview',
  props: {
    maxColumnHeight: {
      type: Number,
      default: 210,
    },
  },
  data() {
    return {
      news: [],
    };
  },
  beforeMount() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      this.fetching = true;
      (await openapiCached).news_getMessages({ page: 1, size: 6 }).then((rsp) => {
        this.news = rsp.data.items;
      });
    },
  },
  computed: {
    getNews() {
      return this.news.filter((n) => n.type === 'DEFAULT');
    },
    getNewsOfTheDay() {
      return this.news.filter((n) => n.type === 'PINNED');
    },
  },
};
</script>

<style scoped>
.content-preview {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
