<template>
  <div class="vh-home-news-preview">
    <v-row class="justify-center">
      <v-col class="d-flex align-center"
             :class="{ 'order-2 text-start': inverted && $vuetify.breakpoint.mdAndUp,
          'justify-end text-end': !inverted && $vuetify.breakpoint.mdAndUp,
           'justify-center text-center': $vuetify.breakpoint.smAndDown }"
             cols="12" md="6">
        <div>
          <div class="text-h3" :class="{ 'white--text': whiteText }">{{ title }}</div>
          <div class="text-h5" :class="{ 'white--text': whiteText }">{{ subtitle }}</div>
        </div>
      </v-col>
      <v-col cols="12" md="6" :class="{ 'text-start': !inverted && $vuetify.breakpoint.mdAndUp,
   'text-end': inverted && $vuetify.breakpoint.mdAndUp,
    'text-center': $vuetify.breakpoint.smAndDown }" v-if="newsToShow !== null">
        <div v-if="newsToShow.length > 0">
          <v-card border class="card-rounded" flat>
            <v-card-text>
              <div v-for="(n, index) in newsToShow" :key="n.id">
                <v-card border :max-height="maxColumnHeight" :to="{ name: 'News' }"
                        :img="n.background_url">
                  <v-card-title>
                    <span
                :class="{ 'white--text' : !$vuetify.theme.dark && n.invert_title_color,
                 'black--text' : $vuetify.theme.dark && n.invert_title_color }">
                {{ n.subject }}
                    </span>
                  </v-card-title>
                  <v-card-text class="ql-editor">
                    <p class="content-preview" :style="`height: ${maxColumnHeight - 68}px`"
                       v-html="n.content" style="cursor: pointer"/>
                  </v-card-text>
                </v-card>
                <v-divider class="mb-2 mt-2" v-if="index === 0 && newsToShow.length > 1"/>
              </div>
            </v-card-text>
          </v-card>
        </div>
        <div v-else>
          <v-card border class="card-rounded" flat>
            <v-card-text>
              {{ $t('noDataAvailable') }}
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" md="6" v-else>
        <v-card>
          <v-card-text><v-skeleton-loader type="paragraph@2"/></v-card-text>
        </v-card>
        <v-card class="mt-2">
          <v-card-text><v-skeleton-loader type="paragraph@1"/></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// TODO Mach mal Hübsch..
import openapiCached from '@/api/openapiCached';

export default {
  name: 'NewsPreview',
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
};
</script>

<style scoped>
.content-preview {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
