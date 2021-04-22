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
    <dialog-form ref="messageEditDialog" :form-schema="messageAddSchema"
                 :title="$t('home.editNews')"
                 :max-width="1000"
                 @submit="editMessage">
      <template slot="type-after">
        <vue-editor v-model="message" />
      </template>
    </dialog-form>
    <delete-confirmation-dialog ref="deleteMessageDialog" @submit="deleteMessage"/>
    <!-- News of the Day -->
    <v-row>
      <v-col v-if="getNewsOfTheDay.length !== 0">
        <v-card flat>
          <h2 class="text-h4">{{ $t('home.newsOfTheDay') }}</h2>
        </v-card>
      </v-col>
      <!-- News Add Button -->
      <v-col v-if="$checkProp('news_edit')" class="text-right">
        <v-btn outlined color="success" @click="showAddMessageDialog">
          <v-icon left>mdi-plus</v-icon>
          <span>{{ $t('home.addNews') }}</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider />
    <transition-group  enter-active-class="animate__animated animate__fadeIn"
                       leave-active-class="animate__animated animate__fadeOut">
      <v-card v-for="message in getNewsOfTheDay" :key="message.id" class="ma-10">
        <v-card-title class="grey lighten-2">
          <v-row>
            <v-col>
              {{ message.subject }}
            </v-col>
            <v-col v-if="$checkProp('news_edit')" class="text-right">
              <v-btn outlined color="primary" small
                     @click="openEditMessageDialog(message)" class="mr-1">
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn outlined color="error" small @click="openDeleteMessageDialog(message)">
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text v-html="message.content" class="mt-3 pb-0">
        </v-card-text>
        <v-card-actions class="text--disabled pt-0">
          <span class="mr-3">{{ $d(new Date(message.created), 'long') }}</span>
          <user-link v-if="message.creator" :user="message.creator"/>
        </v-card-actions>
      </v-card>
    </transition-group>
    <!-- Display News -->
    <v-card flat class="mt-10">
      <h2 class="text-h4">{{ $t('home.news') }}</h2>
    </v-card>
    <v-divider />
    <transition-group enter-active-class="animate__animated animate__fadeIn"
                      leave-active-class="animate__animated animate__fadeOut">
      <v-card flat outlined class="mt-3" v-for="message in getNews" :key="message.id">
        <v-card-title class="grey lighten-2">
          <v-row>
            <v-col>
              {{ message.subject }}
            </v-col>
            <v-col v-if="$checkProp('news_edit')" class="text-right">
              <v-btn outlined color="primary" small
                     @click="openEditMessageDialog(message)" class="mr-1">
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn outlined color="error" small @click="openDeleteMessageDialog(message)">
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text v-html="message.content" class="mt-3 pb-0">
          {{ message.content }}
        </v-card-text>
        <v-card-actions class="text--disabled pt-0">
          <span class="mr-3">{{ $d(new Date(message.created), 'long') }}</span>
          <user-link v-if="message.creator" :user="message.creator"/>
        </v-card-actions>
      </v-card>
    </transition-group>
    <!-- Skeleton Loader -->
    <div v-if="!exhausted && fetching" class="animate__animated animate__bounce">
      <v-skeleton-loader type="article" v-if="fetching" />
    </div>
    <v-card flat v-if="exhausted">
      <v-card-text class="text-center animate__animated animate__fadeIn">
        {{ $t('home.newsExhausted') }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

import api from '@/api/api';
import openapi from '@/api/openapi';
import UserLink from '@/components/UserLink.vue';
import NewsAddForm from '@/forms/NewsAddForm';
import { VueEditor } from 'vue2-editor';
import DialogForm from '@/components/DialogForm.vue';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';

export default {
  components: {
    DeleteConfirmationDialog, UserLink, VueEditor, DialogForm,
  },
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
        console.log(rsp.data);
        this.news.unshift(rsp.data);
      }).catch((err) => this.$refs.messageAddDialog.setErrorMessage(err.response.data.detail));
    },
    openDeleteMessageDialog(message) {
      this.$refs.deleteMessageDialog.show(message);
    },
    async deleteMessage(message) {
      (await openapi).news_deleteMessage(message.id)
        .then(this.$refs.deleteMessageDialog.closeAndReset)
        .catch((err) => this.$refs.deleteMessageDialog.setErrorMessage(err.response.data.detail));
      const index = this.news.findIndex((n) => n.id === message.id);
      if (index > -1) {
        this.news.splice(index, 1);
      }
    },
    openEditMessageDialog(message) {
      this.$refs.messageEditDialog.show(message);
      this.message = message.content;
      this.$refs.messageEditDialog.setData(message);
    },
    async editMessage(message) {
      const data = this.$refs.messageEditDialog.getData();
      data.content = this.message;
      (await openapi).news_editMessage(message.id, data)
        .then((rsp) => {
          const index = this.news.findIndex((n) => n.id === rsp.data.id);
          if (index > -1) {
            this.news.splice(index, 1, rsp.data);
          }
          this.$refs.messageEditDialog.closeAndReset();
        }).catch((err) => this.$refs.messageEditDialog.setErrorMessage(err.response.data.detail));
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
