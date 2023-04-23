<template>
  <div>
    <!-- Add Message Dialog -->
    <dialog-form ref="messageAddDialog" :form-schema="messageAddSchema"
                 :title="$t('_home.addNews')" icon="mdi-newspaper-plus"
                 :max-width="1000"
                 @submit="addMessage"
    >
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

          <v-expansion-panel v-if="topDonators.length > 0">
            <v-expansion-panel-header>
              {{ $t('_shop.labels.topDonators') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <TopDonators :topDonators="topDonators" :currency="donationGoal.currency" />
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
      <!-- News -->
      <v-col cols="12" md="8">
        <!-- News of the Day -->
        <v-row class="pa-0">
          <v-col v-if="getNewsOfTheDay.length !== 0">
            <PageTitle icon="mdi-newspaper" :title="$t('_home.newsOfTheDay')"/>
          </v-col>
          <!-- Add News Button -->
          <v-col v-if="$checkProp('news_edit')" class="d-flex">
            <v-spacer v-if="$vuetify.breakpoint.smAndUp"/>
              <v-btn color="success" @click="showAddMessageDialog" data-cy="new-message-button">
                <v-icon left>mdi-plus</v-icon>
                <span>{{ $t('_home.addNews') }}</span>
              </v-btn>
          </v-col>
        </v-row>
        <transition-group  enter-active-class="animate__animated animate__fadeIn" class="mb-5"
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
        <v-row v-if="getNews.length !== 0" class="mt-3">
          <v-col>
            <PageTitle icon="mdi-newspaper-variant-multiple" :title="$t('_home.news')"/>
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
                {{ $t('_home.newsExhausted') }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <!-- Sidebar -->
      <v-col ref="StatusCol" cols="4">
        <div style="overflow-y: hidden; overflow-x: hidden;"
             :style="{width: `${statusColumnWidth}px`}"
             v-if="$vuetify.breakpoint.mdAndUp">
          <v-row>
            <v-col>
              <ServerStatus ref="ServerStatus"/>
            </v-col>
          </v-row>
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
import PageTitle from '@/components/PageTitle.vue';
import Editor from '@/components/Editor.vue';
import TopDonators from '@/components/HomeComponents/TopDonators.vue';
import NewUsers from '../components/HomeComponents/NewUsers.vue';
import config from '../config';
import i18n from '../plugins/i18n';

export default {
  components: {
    TopDonators,
    Editor,
    PageTitle,
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
      donationGoal: {},
      topDonators: {},
      maxInputLength: 10000,
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
          title: this.$t('_home.messages.addSuccess'),
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
            title: this.$t('_home.messages.deleteSuccess'),
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
            title: this.$t('_home.messages.editSuccess'),
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
