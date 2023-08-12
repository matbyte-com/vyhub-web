Homepag<template>
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
      <v-col v-if="$vuetify.breakpoint.smAndDown">
        <v-card width="100%" >
          <v-expansion-panels multiple flat>
            <v-expansion-panel>
              <v-expansion-panel-header>
                {{ $t('serverStatus') }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <ServerStatus ref="serverStatus" />
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel v-if="$store.getters.shopConfig &&
             $store.getters.shopConfig.donation_goal_enabled">
              <v-expansion-panel-header>
                {{ shopConfig.donation_goal_display_title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <DonationGoal />
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel v-if="$store.getters.shopConfig &&
             $store.getters.shopConfig.top_donators_enabled">
              <v-expansion-panel-header>
                {{ shopConfig.top_donators_display_title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <TopDonators />
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                {{ $t('_user.labels.newUsers') }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <NewUsers />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
      <!-- News -->
      <v-col cols="12" md="8">
        <!-- News of the Day -->
        <v-row class="pa-0" v-if="getNewsOfTheDay.length !== 0 || $checkProp('news_edit')">
          <v-col>
            <v-card flat color="primary" class="card-rounded d-flex align-center news-card">
              <v-card-text class="text-h5 pa-2 ml-1">{{ $t('_home.newsOfTheDay') }}</v-card-text>
              <v-btn color="success" small class="mr-3" v-if="$checkProp('news_edit')"
                     @click="showAddMessageDialog" data-cy="new-message-button">
                <v-icon left>mdi-plus</v-icon>
                <span>{{ $t('_home.addNews') }}</span>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
        <transition-group  enter-active-class="animate__animated animate__fadeIn"
                           leave-active-class="animate__animated animate__fadeOut">
          <v-card v-for="message in getNewsOfTheDay" :key="message.id"
                  class="mt-4 news-of-day vh-news-of-day card-rounded">
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
        <v-row class="pa-0" v-if="getNews.length !== 0"
               :class="{ 'mt-3': getNewsOfTheDay.length !== 0 }">
          <v-col>
            <v-card flat color="primary" class="card-rounded d-flex align-center news-card">
              <v-card-text class="pa-2 ml-1 text-h5">{{ $t('_home.news') }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <transition-group enter-active-class="animate__animated animate__fadeIn"
                          leave-active-class="animate__animated animate__fadeOut">
          <v-card flat outlined class="mt-4 vh-news card-rounded"
                  v-for="message in getNews" :key="message.id">
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
        <v-row justify="center" class="pa-0" v-if="exhausted || fetching">
          <v-progress-circular v-if="fetching" indeterminate
                               class="animate__animated animate__fade mt-3" />
        </v-row>
      </v-col>
      <!-- Sidebar -->
      <v-col ref="StatusCol" cols="4">
        <div style="overflow-y: hidden; overflow-x: hidden;"
             :style="{width: `${statusColumnWidth}px`}"
             v-if="$vuetify.breakpoint.mdAndUp">
          <ServerStatus ref="serverStatus"/>
          <v-row v-if="$store.getters.shopConfig &&
           $store.getters.shopConfig.donation_goal_enabled">
            <v-col>
              <DonationGoal />
            </v-col>
          </v-row>
          <v-row v-if="$store.getters.shopConfig &&
           $store.getters.shopConfig.top_donators_enabled">
            <v-col>
              <TopDonators />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <NewUsers />
            </v-col>
          </v-row>
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
import DonationGoal from '@/components/HomeComponents/DonationGoal.vue';
import Editor from '@/components/Editor.vue';
import TopDonators from '@/components/HomeComponents/TopDonators.vue';
import NewUsers from '../components/HomeComponents/NewUsers.vue';
import config from '../config';
import i18n from '../plugins/i18n';

export default {
  components: {
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
      messageAddSchema: NewsAddForm,
      statusColumnWidth: 250,
      message: '',
    };
  },
  mounted() {
    this.fetchNews();
    this.scroll();
    this.setWidth();
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
    setWidth() {
      this.statusColumnWidth = this.$refs.StatusCol.clientWidth;
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

.news-card:before
  content: ""
  width: 0px
  height: 0px
  position: absolute
  border-left: 10px solid transparent
  border-right: 10px solid transparent
  border-top: 10px solid var(--v-primary-base)
  border-bottom: 10px solid transparent
  left: 15%
  bottom: -19px
</style>
