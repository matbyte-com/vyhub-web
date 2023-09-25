<template>
  <div>
    <!-- Add Message Dialog -->
    <dialog-form ref="messageAddDialog" :form-schema="messageAddSchema"
                 :title="$t('_home.addNews')" icon="mdi-newspaper-plus"
                 :max-width="1000"
                 @submit="addMessage">
      <template v-slot:type-after>
        <Editor v-model="message"/>
      </template>
    </dialog-form>
    <dialog-form ref="messageEditDialog" :form-schema="messageAddSchema"
                 :title="$t('_home.editNews')" icon="mdi-newspaper"
                 :max-width="1000"
                 @submit="editMessage">
      <template v-slot:type-after>
        <Editor v-model="message"/>
      </template>
    </dialog-form>
    <delete-confirmation-dialog ref="deleteMessageDialog" @submit="deleteMessage"/>
    <v-row class="mb-5">
      <!-- Smartphones Serverstatus + Donation Goal -->
      <v-col cols="12" v-if="$vuetify.breakpoint.smAndDown">
        <v-card class="card-rounded pa-3" flat>
          <Swiper :number-of-elements="3" :per-page-custom="[1,2,3,3,3]">
            <swiper-slide>
              <ServerStatus :outlined="true" ref="serverStatus" />
            </swiper-slide>
            <swiper-slide v-if="$store.getters.shopConfig">
              <v-card class="card-rounded pt-3" outlined>
                <DonationGoal v-if="$store.getters.shopConfig.donation_goal_enabled"/>
              </v-card>
              <v-card class="card-rounded mt-3 pt-3" outlined>
                <TopDonators v-if="$store.getters.shopConfig.top_donators_enabled"/>
              </v-card>
            </swiper-slide>
            <swiper-slide>
              <NewUsers :outlined="true" />
            </swiper-slide>
          </Swiper>
        </v-card>
      </v-col>
      <!-- News -->
      <v-col cols="12" md="8">
        <!-- News of the Day -->
        <PageTitleFlat :title="$t('_home.newsOfTheDay')"
                       v-if="getNewsOfTheDay.length !== 0 || $checkProp('news_edit')"
                       :hide-triangle="$vuetify.breakpoint.smAndDown"
                       :no-bottom-border-radius="$vuetify.breakpoint.smAndDown"
                       :class="{ 'mb-4': $vuetify.breakpoint.mdAndUp }">
          <template v-slot:end v-if="$checkProp('news_edit')">
            <div class="text-end">
              <v-btn color="success" depressed small
                     @click="showAddMessageDialog" data-cy="new-message-button">
                <v-icon left>mdi-plus</v-icon>
                <span>{{ $t('_home.addNews') }}</span>
              </v-btn>
            </div>
          </template>
        </PageTitleFlat>
        <v-card v-for="(message, index) in getNewsOfTheDay" :key="message.id"
                :img="message.background_url" flat
                class="news-of-day vh-news-of-day card-rounded-bottom animate__animated
                 animate__fadeIn animate__faster mb-3"
                :class="{ 'card-rounded-top':!$vuetify.breakpoint.smAndDown || index !== 0,
           'no-top-border-radius': $vuetify.breakpoint.smAndDown && index === 0 }">
          <v-card-title :class="{ 'grey-title': !message.background_url &&
                         !$vuetify.theme.dark }">
            <span
              :class="{ 'white--text' : !$vuetify.theme.dark && message.invert_title_color,
               'black--text' : $vuetify.theme.dark && message.invert_title_color }">
              {{ message.subject }}
            </span>
            <v-spacer />
            <span v-if="$checkProp('news_edit')" class="text-right">
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
            </span>
          </v-card-title>
          <v-card-text v-html="message.content" class="mt-3 ql-editor" style="min-height: 50px">
          </v-card-text>
          <v-card-actions class="text--disabled pt-0">
            <span class="mr-3"
                  :class="{ 'white--text' : !$vuetify.theme.dark
                  && message.invert_title_color,
                 'black--text' : $vuetify.theme.dark && message.invert_title_color }">
              {{ $d(new Date(message.created), 'long') }}
            </span>
            <user-link v-if="message.creator" :user="message.creator"/>
          </v-card-actions>
        </v-card>
        <!-- Display News -->
        <PageTitleFlat :title="$t('_home.news')" v-if="getNews.length !== 0"
                       :class="{ 'mt-4': getNewsOfTheDay.length !== 0,
                        'mb-4': $vuetify.breakpoint.mdAndUp }"
                       :hide-triangle="$vuetify.breakpoint.smAndDown"
                       :no-bottom-border-radius="$vuetify.breakpoint.smAndDown"/>
        <v-card flat outlined
                :class="{ 'card-rounded-top':!$vuetify.breakpoint.smAndDown || index !== 0,
           'no-top-border-radius': $vuetify.breakpoint.smAndDown && index === 0 }"
                class="mb-3 vh-news card-rounded animate__animated animate__fadeIn animate__faster"
                v-for="(message, index) in getNews" :key="message.id" :img="message.background_url">
          <v-card-title :class="{ 'grey-title': !message.background_url &&
                         !$vuetify.theme.dark }">
            <span :class="{ 'white--text' : !$vuetify.theme.dark && message.invert_title_color,
               'black--text' : $vuetify.theme.dark && message.invert_title_color }">
              {{ message.subject }}
            </span>
            <v-spacer />
            <span v-if="$checkProp('news_edit')" class="text-right">
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
            </span>
          </v-card-title>
          <v-card-text v-html="message.content" class="mt-3 ql-editor" style="min-height: 50px">
          </v-card-text>
          <v-card-actions class="text--disabled pt-0">
            <span class="mr-3"
                  :class="{ 'white--text' : !$vuetify.theme.dark && message.invert_title_color,
                 'black--text' : $vuetify.theme.dark && message.invert_title_color }">
              {{ $d(new Date(message.created), 'long') }}</span>
            <user-link v-if="message.creator" :user="message.creator"/>
          </v-card-actions>
        </v-card>
        <!-- Skeleton Loader -->
        <v-card class="card-rounded pa-3" flat v-if="fetching">
          <v-skeleton-loader type="paragraph@2" />
        </v-card>
      </v-col>
      <!-- Sidebar -->
      <v-col ref="StatusCol" cols="4">
        <div v-if="$vuetify.breakpoint.mdAndUp">
          <ServerStatus class="mb-3" ref="serverStatus"/>
          <v-card class="mb-3 card-rounded vh-news-donation-goal"
                  flat v-if="$store.getters.shopConfig &&
           $store.getters.shopConfig.donation_goal_enabled">
            <DonationGoal class="pt-3"/>
          </v-card>
          <v-card class="mb-3 card-rounded vh-news-top-donators"
                  flat v-if="$store.getters.shopConfig &&
           $store.getters.shopConfig.top_donators_enabled">
            <TopDonators class="pt-3"/>
          </v-card>
          <NewUsers class="" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import UserLink from '@/components/UserLink.vue';
import NewsAddForm from '@/forms/NewsAddForm';
import DialogForm from '@/components/DialogForm.vue';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import ServerStatus from '@/components/HomeComponents/ServerStatus.vue';
import DonationGoal from '@/components/ShopComponents/DonationGoal.vue';
import Editor from '@/components/Editor.vue';
import TopDonators from '@/components/ShopComponents/TopDonators.vue';
import Swiper from '@/components/Swiper.vue';
import PageTitleFlat from '@/components/PageTitleFlat.vue';
import NewUsers from '../components/HomeComponents/NewUsers.vue';
import config from '../config';
import i18n from '../plugins/i18n';

export default {
  components: {
    PageTitleFlat,
    Swiper,
    TopDonators,
    Editor,
    NewUsers,
    DonationGoal,
    ServerStatus,
    DeleteConfirmationDialog,
    UserLink,
    DialogForm,
  },
  data() {
    return {
      news: [],
      page: 1,
      exhausted: false,
      fetching: false,
      messageAddSchema: NewsAddForm.returnForm(),
      message: '',
    };
  },
  mounted() {
    this.fetchNews();
    this.scroll();
  },
  methods: {
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
      if (!this.message) {
        this.$refs.messageAddDialog.setErrorMessage(i18n.t('_home.messages.messageEmpty'));
        return;
      }
      if (data.content.length > this.maxInputLength) {
        this.$refs.messageAddDialog.setErrorMessage(i18n.t('maxInputExceeded', { length: config.html_max_input_length }),
          { length: config.html_max_input_length });
        return;
      }
      (await openapi).news_addMessage(null, data).then((rsp) => {
        this.$refs.messageAddDialog.closeAndReset();
        this.message = null;
        this.news.unshift(rsp.data);
        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
      }).catch((err) => this.$refs.messageAddDialog.setError(err));
    },
    openDeleteMessageDialog(message) {
      this.$refs.deleteMessageDialog.show(message);
    },
    async deleteMessage(message) {
      (await openapi).news_deleteMessage(message.id)
        .then(() => {
          this.$refs.deleteMessageDialog.closeAndReset();
          this.$notify({
            title: this.$t('_messages.deleteSuccess'),
            type: 'success',
          });
        })
        .catch((err) => this.$refs.deleteMessageDialog.setError(err));
      const index = this.news.findIndex((n) => n.id === message.id);
      if (index > -1) {
        this.news.splice(index, 1);
      }
    },
    openEditMessageDialog(message) {
      this.$refs.messageEditDialog.show(message);
      this.$refs.messageEditDialog.setData(message);
      this.message = message.content;
    },
    async editMessage(message) {
      if (!this.message) {
        this.$refs.messageEditDialog.setErrorMessage(i18n.t('_home.messages.messageEmpty'));
        return;
      }
      const data = this.$refs.messageEditDialog.getData();
      data.content = this.message;
      (await openapi).news_editMessage(message.id, data)
        .then((rsp) => {
          const index = this.news.findIndex((n) => n.id === rsp.data.id);
          if (index > -1) {
            this.news.splice(index, 1, rsp.data);
          }
          this.$refs.messageEditDialog.closeAndReset();
          this.$notify({
            title: this.$t('_messages.editSuccess'),
            type: 'success',
          });
        }).catch((err) => this.$refs.messageEditDialog.setError(err));
    },
  },
  computed: {
    getNews() {
      return this.news.filter((n) => n.type === 'DEFAULT');
    },
    getNewsOfTheDay() {
      return this.news.filter((n) => n.type === 'PINNED');
    },
    shopConfig() {
      return this.$store.getters.shopConfig;
    },
  },
};
</script>

<style scoped lang="sass">
.news-of-day
  border-style: solid
  border-width: 2px
  border-color: var(--v-primary-base)

.grey-title
  background-color: rgb(255,255,255)
</style>
