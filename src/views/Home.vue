<template>
  <div>
    <!--<v-parallax
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
    <v-divider />-->
    <!-- Add Message Dialo -->
    <dialog-form ref="messageAddDialog" :form-schema="messageAddSchema"
                 :title="$t('home.addNews')"
                 :max-width="1000"
                 @submit="addMessage"
    >
      <template slot="type-after">
        <vue-editor v-model="message" />
      </template>
    </dialog-form>
    <!-- News of the Day -->
    <v-row>
      <v-col>
        <v-card flat>
          <h2 class="text-h4">{{ $t('home.newsOfTheDay') }}</h2>
        </v-card>
      </v-col>
      <v-col class="text-right">
        <v-btn outlined color="success" @click="showAddMessageDialog">
          <v-icon left>mdi-plus</v-icon>
          <span>{{ $t('home.addNews') }}</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider />
    <v-card v-for="(message, index) in getNewsOfTheDay" :key="index" class="mt-3">
      <v-card-title class="grey lighten-2">
        {{ message.subject }}
      </v-card-title>
      <v-card-text v-html="message.content">
      </v-card-text>
      <v-card-actions class="text--disabled">
        <span class="mr-3">{{ $d(new Date(message.created), 'long') }}</span>
        <user-link v-if="message.creator" :user="message.creator"/>
      </v-card-actions>
    </v-card>
    <!-- Display News -->
    <v-card flat>
      <h2 class="text-h4">{{ $t('home.news') }}</h2>
    </v-card>
    <v-divider />
    <v-card flat outlined v-for="(message, index) in getNews" :key="index" class="mt-3">
      <v-card-title class="grey lighten-2">
        {{ message.subject }}
      </v-card-title>
      <v-card-text v-html="message.content">
        {{ message.content }}
      </v-card-text>
      <v-card-actions class="text--disabled">
        <span class="mr-3">{{ $d(new Date(message.created), 'long') }}</span>
        <user-link v-if="message.creator" :user="message.creator"/>
      </v-card-actions>
    </v-card>
    <!-- Skeleton Loader -->
    <div v-if="!exhausted && fetching">
      <v-skeleton-loader type="article" v-if="fetching" />
    </div>
    <v-card flat v-if="exhausted">
      <v-card-text class="text-center">
        {{ $t('home.newsExhausted') }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

import api from '@/api/api';
import UserLink from '@/components/UserLink.vue';
import NewsAddForm from '@/forms/NewsAddForm';
import { VueEditor } from 'vue2-editor';
import DialogForm from '@/components/DialogForm.vue';

export default {
  components: { UserLink, VueEditor, DialogForm },
  data() {
    return {
      news: [],
      page: 0,
      exhausted: false,
      fetching: false,
      messageAddSchema: NewsAddForm,
      message: null,
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
    showAddMessageDialog() {
      this.message = null;
      this.$refs.messageAddDialog.show();
    },
    addMessage() {
      const data = this.$refs.messageAddDialog.getData();
      data.content = this.message;
      api.news.addNews(data).then((rsp) => {
        this.$refs.messageAddDialog.closeAndReset();
        this.message = null;
        this.fetchNews();
      }).catch((err) => this.$refs.messageAddDialog.setErrorMessage(err.response.data.detail));
    },
  },
  computed: {
    getNews() {
      return this.news.filter((n) => n.type === 'NEWS');
    },
    getNewsOfTheDay() {
      return this.news.filter((n) => n.type === 'PINNED');
    },
  },
};
</script>
