<template>
  <div class="vh-home-news-preview">
    <v-row class="justify-center">
      <v-col
        class="d-flex align-center"
        :class="{ 'order-2 text-start': inverted && $vuetify.display.mdAndUp,
                  'justify-end text-end': !inverted && $vuetify.display.mdAndUp,
                  'justify-center text-center': $vuetify.display.smAndDown }"
        cols="12"
        md="6"
      >
        <div>
          <div
            class="text-h3"
            :class="{ 'white--text': whiteText }"
          >
            {{ title }}
          </div>
          <div
            class="text-h5"
            :class="{ 'white--text': whiteText }"
          >
            {{ subtitle }}
          </div>
        </div>
      </v-col>
      <v-col
        v-if="newsToShow !== null"
        cols="12"
        md="6"
        :class="{ 'text-start': !inverted && $vuetify.display.mdAndUp,
                  'text-end': inverted && $vuetify.display.mdAndUp,
                  'text-center': $vuetify.display.smAndDown }"
      >
        <div v-if="newsToShow.length > 0">
          <v-card
            border
            class="card-rounded"
            flat
          >
            <v-card-text>
              <div
                v-for="(n, index) in newsToShow"
                :key="n.id"
              >
                <v-card
                  border
                  :max-height="maxColumnHeight"
                  :to="{ name: 'News' }"
                  :img="n.background_url"
                >
                  <v-card-title>
                    <span
                      :class="{ 'white--text' : !$vuetify.theme.current.dark && n.invert_title_color,
                                'black--text' : $vuetify.theme.current.dark && n.invert_title_color }"
                    >
                      {{ n.subject }}
                    </span>
                  </v-card-title>
                  <v-card-text class="ql-editor">
                    <p
                      class="content-preview"
                      :style="`height: ${maxColumnHeight - 68}px`"
                      style="cursor: pointer"
                      v-html="n.content"
                    />
                  </v-card-text>
                </v-card>
                <v-divider
                  v-if="index === 0 && newsToShow.length > 1"
                  class="mb-2 mt-2"
                />
              </div>
            </v-card-text>
          </v-card>
        </div>
        <div v-else>
          <v-card
            border
            class="card-rounded"
            flat
          >
            <v-card-text>
              {{ $t('noDataAvailable') }}
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col
        v-else
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-text><v-skeleton-loader type="paragraph@2" /></v-card-text>
        </v-card>
        <v-card class="mt-2">
          <v-card-text><v-skeleton-loader type="paragraph@1" /></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// TODO Mach mal Hübsch..
import openapiCached from '@/api/openapiCached';

export default {
  props: {
    maxColumnHeight: {
      type: Number,
      default: 150,
    },
    inverted: {
      type: Boolean,
      default: false,
    },
    whiteText: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
  },
  data() {
    return {
      news: [],
    };
  },
  computed: {
    getNews() {
      return this.news.filter((n) => n.type === 'DEFAULT');
    },
    getNewsOfTheDay() {
      return this.news.filter((n) => n.type === 'PINNED');
    },
    newsToShow() {
      const res = [];
      // News
      if (this.getNews.length >= 1) {
        res.push(this.getNews[0]);
        if (this.getNewsOfTheDay.length >= 1) {
          res.push(this.getNewsOfTheDay[0]);
        } else if (this.getNews.length >= 2) {
          res.push(this.getNews[1]);
        }
      }
      if (this.getNewsOfTheDay.length >= 1 && res.length < 2) {
        res.push(this.getNewsOfTheDay[0]);
        if (this.getNewsOfTheDay.length >= 2 && res.length < 2) {
          res.push(this.getNewsOfTheDay[1]);
        }
      }
      return res;
    },
  },
  beforeMount() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      (await openapiCached).news_getMessages({ page: 1, size: 6 }).then((rsp) => {
        this.news = rsp.data.items;
      });
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
