<template>
  <div>
    <!-- Add Message Dialog -->
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
    <v-row>
      <!-- Smartphones Serverstatus + Donation Goal -->
      <v-card width="100%" v-if="$vuetify.breakpoint.smAndDown">
        <v-expansion-panels multiple flat >
          <v-expansion-panel>
            <v-expansion-panel-header>
              {{ $t('serverStatus') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ServerStatus />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel v-if="donationGoal.enabled">
            <v-expansion-panel-header>
              {{ $t('_shop.labels.donationGoal') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <DonationGoal :donationGoal="donationGoal" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
      <!-- News -->
      <v-col cols="12" md="8">
        <!-- News of the Day -->
        <v-row class="pa-0">
          <v-col cols="8" class="d-flex" v-if="getNewsOfTheDay.length !== 0">
            <v-card flat class="d-flex">
              <v-card-title class="align-center">
                <v-icon color="primary" class="mr-1">mdi-newspaper</v-icon>
                <v-sheet vertical color="primary" width="2" height="25" class="" />
                <h2 class="text-h4 ml-2">{{ $t('home.newsOfTheDay') }}</h2>
              </v-card-title>
            </v-card>
          </v-col>
          <!-- Add News Button -->
          <v-col v-if="$checkProp('news_edit')" class="d-flex">
            <v-spacer v-if="$vuetify.breakpoint.smAndUp"/>
              <v-btn color="success" @click="showAddMessageDialog">
                <v-icon left>mdi-plus</v-icon>
                <span>{{ $t('home.addNews') }}</span>
              </v-btn>
          </v-col>
        </v-row>
        <transition-group  enter-active-class="animate__animated animate__fadeIn"
                           leave-active-class="animate__animated animate__fadeOut">
          <v-card v-for="message in getNewsOfTheDay" :key="message.id" class="mt-3 news-of-day">
            <v-card-title :class="{ 'grey-title': !$vuetify.theme.dark }">
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
            <v-card-text v-html="message.content" class="mt-3 ql-editor" style="min-height: 50px">
            </v-card-text>
            <v-card-actions class="text--disabled pt-0">
              <span class="mr-3">{{ $d(new Date(message.created), 'long') }}</span>
              <user-link v-if="message.creator" :user="message.creator"/>
            </v-card-actions>
          </v-card>
        </transition-group>
        <!-- Display News -->
        <v-row v-if="getNews.length !== 0" class="mt-5">
          <v-col class="d-flex">
            <v-card flat class="d-flex">
              <v-card-title class="align-center">
                <v-icon color="primary" class="mr-1">mdi-newspaper-variant-multiple</v-icon>
                <v-sheet vertical color="primary" width="2" height="25" class="" />
                <h2 class="text-h4 ml-2">{{ $t('home.news') }}</h2>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
        <transition-group enter-active-class="animate__animated animate__fadeIn"
                          leave-active-class="animate__animated animate__fadeOut">
          <v-card flat outlined class="mt-3" v-for="message in getNews" :key="message.id">
            <v-card-title :class="{ 'grey-title': !$vuetify.theme.dark }">
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
            <v-card-text v-html="message.content" class="mt-3 ql-editor" style="min-height: 50px">
            </v-card-text>
            <v-card-actions class="text--disabled pt-0">
              <span class="mr-3">{{ $d(new Date(message.created), 'long') }}</span>
              <user-link v-if="message.creator" :user="message.creator"/>
            </v-card-actions>
          </v-card>
        </transition-group>
        <!-- Skeleton Loader -->
        <v-row class="pa-0">
          <v-col>
            <div v-if="!exhausted && fetching" class="animate__animated animate__fade mt-3">
              <v-skeleton-loader type="article" v-if="fetching" />
            </div>
            <v-card flat v-if="exhausted" class="mt-3">
              <v-card-text class="text-center animate__animated animate__fadeIn">
                {{ $t('home.newsExhausted') }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <!-- Server Status -->
      <v-col ref="StatusCol">
        <div style="position: fixed" :style="{width: `${statusColumnWidth}px`}"
             v-if="$vuetify.breakpoint.mdAndUp">
          <ServerStatus  ref="ServerStatus"/>
          <DonationGoal v-if="donationGoal.enabled" :donationGoal="donationGoal" class="mt-3"/>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import UserLink from '@/components/UserLink.vue';
import NewsAddForm from '@/forms/NewsAddForm';
import { VueEditor } from 'vue2-editor';
import DialogForm from '@/components/DialogForm.vue';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import ServerStatus from '@/components/HomeComponents/ServerStatus.vue';
import DonationGoal from '@/components/HomeComponents/DonationGoal.vue';

export default {
  components: {
    DonationGoal,
    ServerStatus,
    DeleteConfirmationDialog,
    UserLink,
    VueEditor,
    DialogForm,
  },
  data() {
    return {
      news: [],
      page: 0,
      exhausted: false,
      fetching: false,
      messageAddSchema: NewsAddForm,
      message: null,
      statusColumnWidth: 250,
      donationGoal: {},
    };
  },
  mounted() {
    this.fetchNews();
    this.scroll();
    this.setWidth();
    this.setTitle();
    this.getDonationGoalStatus();
  },
  methods: {
    // General Settings queried in App
    async setTitle() {
      if (localStorage.generalSettings) {
        const obj = JSON.parse(localStorage.getItem('generalSettings'));
        document.title = obj.community_name;
      } else {
        (await openapi).design_getGeneralSettings().then((rsp) => {
          document.title = rsp.data.community_name;
        });
      }
    },
    async fetchNews(page) {
      this.fetching = true;
      (await openapi).news_getMessages({ page, size: 15 }).then((rsp) => {
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
        if (bottomOfWindow && !this.fetching && !this.exhausted) {
          this.page += 1;
          this.fetchNews(this.page);
        }
      };
    },
    showAddMessageDialog() {
      this.message = null;
      this.$refs.messageAddDialog.show();
    },
    async addMessage() {
      const data = this.$refs.messageAddDialog.getData();
      data.content = this.message;
      (await openapi).news_addMessage({}, data).then((rsp) => {
        this.$refs.messageAddDialog.closeAndReset();
        this.message = null;
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
    setWidth() {
      this.statusColumnWidth = this.$refs.StatusCol.clientWidth;
    },
    async getDonationGoalStatus() {
      (await openapi).shop_getDonationGoal().then((rsp) => {
        this.donationGoal = rsp.data;
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
  created() {
    window.addEventListener('resize', this.setWidth);
  },
  destroyed() {
    window.removeEventListener('resize', this.setWidth);
  },
};
</script>

<style scoped lang="sass">
.news-of-day
  border-style: solid
  border-width: 3px
  border-color: var(--v-primary-base)

</style>
