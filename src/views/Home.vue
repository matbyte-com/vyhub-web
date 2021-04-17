<template>
  <div>
    <v-parallax
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">
            G Extension
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col
        class="text-center justify-center"
        cols="4">
          <p>
            Herzlich willkommen auf unserem Server.
            Für Fragen wende dich an uns über das Kontaktformular oder über Teamspeak
          </p>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-overlay
        :absolute="true"
        :value="true"
        color="primary"
      :opacity="0.3">
      </v-overlay>
    </v-parallax>
    <v-divider />
    <v-card flat>
      <v-card-title>
        <h2 class="text-h2">{{ $t('home.newsOfTheDay') }}</h2>
      </v-card-title>
    </v-card>
    <!-- Display Newss -->
    <v-card flat v-for="(message, index) in news" :key="index">
      <v-card-title style="background-color: grey">
        {{ message.topic }}
      </v-card-title>
      <v-card-text class="mt-4">
        {{ message.content }}
        <v-divider class="mt-3 mb-1"/>
        <p class="text-disabled">
          {{ message.created }}
          <user-link v-if="message.creator" :user="message.creator"/>
        </p>
      </v-card-text>
    </v-card>
    <div v-if="!exhausted && fetching">
      <v-skeleton-loader type="article" v-if="fetching" />
    </div>
    {{ exhausted }}
  </div>
</template>

<script>

import api from '@/api/api';
import UserLink from '@/components/UserLink.vue';

export default {
  components: { UserLink },
  data() {
    return {
      news: [],
      page: 0,
      exhausted: false,
      fetching: false,
    };
  },
  mounted() {
    this.fetchNews();
    this.scroll();
  },
  methods: {
    fetchNews(page) {
      this.fetching = true;
      api.news.getNews(page).then((rsp) => {
        rsp.data.items.forEach((item) => this.news.push(item));
        if (rsp.data.items.length === 0) {
          this.exhausted = true;
        }
        this.fetching = false;
      });
    },
    scroll() {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 10
          >= document.documentElement.offsetHeight;
        if (bottomOfWindow && !this.fetching) {
          this.page += 1;
          this.fetchNews(this.page);
        }
      };
    },
  },
};
</script>
