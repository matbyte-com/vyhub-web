<template>
  <div>
    <!-- Add Message Dialog -->
    <dialog-form
      ref="messageAddDialog"
      :form-schema="messageAddSchema"
      :title="$t('_home.addNews')"
      icon="mdi-newspaper-plus"
      :max-width="1000"
      @submit="addMessage"
    >
      <template #type-after>
        <Editor v-model="message" />
      </template>
    </dialog-form>
    <dialog-form
      ref="messageEditDialog"
      :form-schema="messageAddSchema"
      :title="$t('_home.editNews')"
      icon="mdi-newspaper"
      :max-width="1000"
      @submit="editMessage"
    >
      <template #type-after>
        <Editor v-model="message" />
      </template>
    </dialog-form>
    <delete-confirmation-dialog
      ref="deleteMessageDialog"
      @submit="deleteMessage"
    />
    <v-row class="mb-5">
      <!-- Smartphones Serverstatus + Donation Goal -->
      <v-col
        v-if="$vuetify.display.smAndDown"
        cols="12"
      >
        <v-card
          class="card-rounded pa-3"
          flat
        >
          <Swiper
            :number-of-elements="3"
            :per-page-custom="[1,2,3,3,3]"
          >
            <swiper-slide v-if="showServers">
              <ServerStatus
                ref="serverStatus"
                :outlined="true"
                @loaded="updateServerWidget"
              />
            </swiper-slide>
            <swiper-slide
              v-if="$store.getters.shopConfig &&
                ($store.getters.shopConfig.donation_goal_enabled ||
                  $store.getters.shopConfig.top_donators_enabled)"
            >
              <v-card
                v-if="$store.getters.shopConfig.donation_goal_enabled"
                class="card-rounded pt-3"
                border
              >
                <DonationGoal />
              </v-card>
              <v-card
                v-if="$store.getters.shopConfig.top_donators_enabled"
                class="card-rounded mt-3 pt-3"
                border
              >
                <TopDonators />
              </v-card>
            </swiper-slide>
            <swiper-slide>
              <NewUsers :outlined="true" />
            </swiper-slide>
          </Swiper>
        </v-card>
      </v-col>
      <!-- News -->
      <v-col
        cols="12"
        md="8"
      >
        <!-- News of the Day -->
        <PageTitleFlat
          v-if="getNewsOfTheDay.length !== 0 || $checkProp('news_edit')"
          :title="$t('_home.newsOfTheDay')"
          :hide-triangle="$vuetify.display.smAndDown"
          :no-bottom-border-radius="$vuetify.display.smAndDown"
          :class="{ 'mb-4': $vuetify.display.mdAndUp }"
        >
          <template
            v-if="$checkProp('news_edit')"
            #end
          >
            <div class="text-end">
              <v-btn
                color="success"
                variant="flat"
                size="small"
                data-cy="new-message-button"
                @click="showAddMessageDialog"
              >
                <v-icon start>
                  mdi-plus
                </v-icon>
                <span>{{ $t('_home.addNews') }}</span>
              </v-btn>
            </div>
          </template>
        </PageTitleFlat>
        <v-card
          v-for="(message, index) in getNewsOfTheDay"
          :key="message.id"
          :img="message.background_url"
          flat
          class="news-of-day vh-news-of-day card-rounded-bottom animate__animated
                 animate__fadeIn animate__faster mb-3"
          :class="{ 'card-rounded-top':!$vuetify.display.smAndDown || index !== 0,
                    'no-top-border-radius': $vuetify.display.smAndDown && index === 0 }"
        >
          <v-card-title
            class="d-flex"
            :class="{ 'grey-title': !message.background_url &&
              !$vuetify.theme.current.dark }"
          >
            <span
              :class="{ 'white--text' : !$vuetify.theme.current.dark && message.invert_title_color,
                        'black--text' : $vuetify.theme.current.dark && message.invert_title_color }"
            >
              {{ message.subject }}
            </span>
            <v-spacer />
            <span
              v-if="$checkProp('news_edit')"
              class="text-right"
            >
              <v-btn
                variant="outlined"
                color="primary"
                size="small"
                class="mr-1"
                @click="openEditMessageDialog(message)"
              >
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                variant="outlined"
                color="error"
                size="small"
                @click="openDeleteMessageDialog(message)"
              >
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </span>
          </v-card-title>
          <v-card-text
            class="mt-3 ql-editor"
            style="min-height: 50px"
          >
            <div v-html="message.content" />
          </v-card-text>
          <v-card-actions class="text-disabled pt-0">
            <span
              class="mr-3"
              :class="{ 'white--text' : !$vuetify.theme.current.dark
                          && message.invert_title_color,
                        'black--text' : $vuetify.theme.current.dark && message.invert_title_color }"
            >
              {{ $d(new Date(message.created), 'long') }}
            </span>
            <user-link
              v-if="message.creator"
              :user="message.creator"
            />
          </v-card-actions>
        </v-card>
        <!-- Display News -->
        <PageTitleFlat
          v-if="getNews.length !== 0"
          :title="$t('_home.news')"
          :class="{ 'mt-4': getNewsOfTheDay.length !== 0,
                    'mb-4': $vuetify.display.mdAndUp }"
          :hide-triangle="$vuetify.display.smAndDown"
          :no-bottom-border-radius="$vuetify.display.smAndDown"
        />
        <v-card
          v-for="(message, index) in getNews"
          :key="message.id"
          flat
          border
          :class="{ 'card-rounded-top':!$vuetify.display.smAndDown || index !== 0,
                    'no-top-border-radius': $vuetify.display.smAndDown && index === 0 }"
          class="mb-3 vh-news card-rounded animate__animated animate__fadeIn animate__faster"
          :img="message.background_url"
        >
          <v-card-title
            :class="{ 'grey-title': !message.background_url &&
              !$vuetify.theme.current.dark }"
          >
            <span
              :class="{ 'white--text' : !$vuetify.theme.current.dark && message.invert_title_color,
                        'black--text' : $vuetify.theme.current.dark && message.invert_title_color }"
            >
              {{ message.subject }}
            </span>
            <v-spacer />
            <span
              v-if="$checkProp('news_edit')"
              class="text-right"
            >
              <v-btn
                variant="outlined"
                color="primary"
                size="small"
                class="mr-1"
                @click="openEditMessageDialog(message)"
              >
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                variant="outlined"
                color="error"
                size="small"
                @click="openDeleteMessageDialog(message)"
              >
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </span>
          </v-card-title>
          <v-card-text
            class="mt-3 ql-editor"
            style="min-height: 50px"
          >
            v-html="message.content"
          </v-card-text>
          <v-card-actions class="text-disabled pt-0">
            <span
              class="mr-3"
              :class="{ 'white--text' : !$vuetify.theme.current.dark && message.invert_title_color,
                        'black--text' : $vuetify.theme.current.dark && message.invert_title_color }"
            >
              {{ $d(new Date(message.created), 'long') }}</span>
            <user-link
              v-if="message.creator"
              :user="message.creator"
            />
          </v-card-actions>
        </v-card>
        <!-- Skeleton Loader -->
        <v-card
          v-if="fetching"
          class="card-rounded pa-3"
          flat
        >
          <v-skeleton-loader type="paragraph@2" />
        </v-card>
      </v-col>
      <!-- Sidebar -->
      <v-col
        ref="StatusCol"
        cols="4"
      >
        <div v-if="$vuetify.display.mdAndUp">
          <ServerStatus
            v-if="showServers"
            ref="serverStatus"
            @loaded="updateServerWidget"
          />
          <v-card
            v-if="$store.getters.shopConfig &&
              $store.getters.shopConfig.donation_goal_enabled"
            class="mb-3 card-rounded vh-news-donation-goal"
            flat
          >
            <DonationGoal class="pt-3" />
          </v-card>
          <v-card
            v-if="$store.getters.shopConfig &&
              $store.getters.shopConfig.top_donators_enabled"
            class="mb-3 card-rounded vh-news-top-donators"
            flat
          >
            <TopDonators class="pt-3" />
          </v-card>
          <NewUsers class="" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import NewsAddForm from '@/forms/NewsAddForm';
import config from '../config';
import i18n from '../plugins/i18n';

export default {
  data() {
    return {
      news: [],
      page: 1,
      exhausted: false,
      fetching: false,
      messageAddSchema: NewsAddForm.returnForm(),
      message: '',
      showServers: true,
    };
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
        this.$refs.messageAddDialog.setErrorMessage(i18n.global.t('_home.messages.messageEmpty'));
        return;
      }
      if (data.content.length > this.maxInputLength) {
        this.$refs.messageAddDialog.setErrorMessage(i18n.global.t('maxInputExceeded', { length: config.html_max_input_length }),
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
        this.$refs.messageEditDialog.setErrorMessage(i18n.global.t('_home.messages.messageEmpty'));
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
    updateServerWidget(nonEmpty) {
      this.showServers = nonEmpty;
    },
  },
};
</script>

<style scoped lang="sass">
.news-of-day
  border-style: solid
  border-width: 2px
  border-color: rgb(var(--v-theme-primary))

.grey-title
  background-color: rgb(255, 255, 255)
</style>
