<script setup>
import {computed, onMounted, ref, useTemplateRef} from 'vue';
import {useDisplay, useTheme} from "vuetify";
import { useVyHubStore } from '@/store';
import NewsAddForm from "@/forms/NewsAddForm";
import openapi from "@/api/openapi";
import {notify} from "@kyvg/vue3-notification";
import {useI18n} from "vue-i18n";

const display = ref(useDisplay())
const theme = ref(useTheme())
const store = useVyHubStore()
const i18n = useI18n()

const news = ref([])
const page = ref(1)
const exhausted = ref(false)
const fetching = ref(false)
const messageAddSchema = ref(NewsAddForm.returnForm())
const showServers = ref(true)
const messageAddDialog = useTemplateRef('messageAddDialog')
const deleteMessageDialog = useTemplateRef('deleteMessageDialog')
const messageEditDialog = useTemplateRef('messageEditDialog')

const getNews = computed(() => news.value.filter((n) => n.type === 'DEFAULT'))
const getNewsOfTheDay = computed(() => news.value.filter((n) => n.type === 'PINNED'))
const shopConfig = store.shopConfig
const forumEnabled = computed(() => !!(store.generalConfig
  && store.generalConfig.enable_forum))

onMounted(() => {
  fetchNews()
  scroll()
})

async function fetchNews(page) {
  fetching.value = true;
  (await openapi).news_getMessages({page, size: 15}).then((rsp) => {
    rsp.data.items.forEach((item) => news.value.push(item));
    if (rsp.data.items.length === 0) {
      exhausted.value = true;
    }
    fetching.value = false;
  });
}

function scroll() {
  window.onscroll = () => {
    const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 10
      >= document.documentElement.offsetHeight;
    if (bottomOfWindow && !fetching.value && !exhausted.value) {
      page.value += 1;
      fetchNews(page.value);
    }
  };
}

function showAddMessageDialog() {
  console.log(messageAddDialog);
  messageAddDialog.value.show();
}

async function addMessage() {
  const data = messageAddDialog.value.getData();
  (await openapi).news_addMessage(null, data).then((rsp) => {
    messageAddDialog.value.closeAndReset();
    news.value.unshift(rsp.data);
    notify({
      title: i18n.t('_messages.addSuccess'),
      type: 'success',
    });
  }).catch((err) => messageAddDialog.setError(err));
}

function openDeleteMessageDialog(message) {
  deleteMessageDialog.value.show(message);
}

async function deleteMessage(message) {
  (await openapi).news_deleteMessage(message.id)
    .then(() => {
      deleteMessageDialog.value.closeAndReset();
      notify({
        title: i18n.t('_messages.deleteSuccess'),
        type: 'success',
      });
    })
    .catch((err) => deleteMessageDialog.value.setError(err));
  const index = news.value.findIndex((n) => n.id === message.id);
  if (index > -1) {
    news.value.splice(index, 1);
  }
}

function openEditMessageDialog(message) {
  messageEditDialog.value.show(message, message);
}

async function editMessage(message) {
  const data = messageEditDialog.value.getData();
  (await openapi).news_editMessage(message.id, data)
    .then((rsp) => {
      const index = news.value.findIndex((n) => n.id === rsp.data.id);
      if (index > -1) {
        news.value.splice(index, 1, rsp.data);
      }
      messageEditDialog.value.closeAndReset();
      notify({
        title: i18n.t('_messages.editSuccess'),
        type: 'success',
      });
    }).catch((err) => messageEditDialog.value.setError(err));
}

</script>

<template>
  <div>
    <!-- Add Message Dialog -->
    <dialog-form
      ref="messageAddDialog"
      :form-schema="messageAddSchema"
      :title="$t('_home.addNews')"
      icon="mdi-newspaper-plus"
      :max-width="1100"
      @submit="addMessage"
    >
      <template #custom-editor="context">
        <EditorForForm v-bind="context" />
      </template>
      <template #custom-image="context">
        <ImageUpload
          v-bind="context"
        />
      </template>
    </dialog-form>
    <dialog-form
      ref="messageEditDialog"
      :form-schema="messageAddSchema"
      :title="$t('_home.editNews')"
      icon="mdi-newspaper"
      :max-width="1100"
      @submit="editMessage"
    >
      <template #custom-editor="context">
        <EditorForForm v-bind="context" />
      </template>
      <template #custom-image="context">
        <ImageUpload
          v-bind="context"
        />
      </template>
    </dialog-form>
    <delete-confirmation-dialog
      ref="deleteMessageDialog"
      @submit="deleteMessage"
    />
    <v-row class="mb-5">
      <!-- Smartphones Serverstatus + Donation Goal -->
      <v-col
        v-if="display.smAndDown"
        cols="12"
      >
        <v-card
          class="card-rounded pa-3"
          flat
        >
          <Swiper
            :number-of-elements="forumEnabled ? 4 : 3"
            :per-page-custom="[1,1,3,3,3,3]"
          >
            <swiper-slide
              v-if="showServers"
              :hidden="$refs.serverStatus && !$refs.serverStatus.nonEmpty"
            >
              <ServerStatus
                ref="serverStatus"
                :outlined="true"
                @loaded="updateServerWidget"
              />
            </swiper-slide>
            <swiper-slide
              v-if="store.shopConfig &&
                (store.shopConfig.donation_goal_enabled ||
                  store.shopConfig.top_donators_enabled)"
            >
              <v-card
                v-if="store.shopConfig.donation_goal_enabled"
                class="card-rounded pt-3"
                border
              >
                <DonationGoal />
              </v-card>
              <v-card
                v-if="store.shopConfig.top_donators_enabled"
                class="card-rounded mt-3 pt-3"
                border
              >
                <TopDonators />
              </v-card>
            </swiper-slide>
            <swiper-slide v-if="forumEnabled">
              <LatestForumPosts :outlined="true" />
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
          :hide-triangle="display.smAndDown"
          :no-bottom-border-radius="display.smAndDown"
          :class="{ 'mb-4': display.mdAndUp }"
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
          :image="message.background_url"
          flat
          class="news-of-day vh-news-of-day card-rounded-bottom animate__animated
                 animate__fadeIn animate__faster mb-3"
          :class="{ 'card-rounded-top':!display.smAndDown || index !== 0,
                    'no-top-border-radius': display.smAndDown && index === 0 }"
        >
          <v-card-title
            class="d-flex"
            :class="{ 'grey-title': !message.background_url &&
              !theme.current.dark }"
          >
            <span
              :class="{ 'text-white' : !theme.current.dark && message.invert_title_color,
                        'text-black' : theme.current.dark && message.invert_title_color }"
              style="text-wrap: wrap"
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
                <v-icon size="small">
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                variant="outlined"
                color="error"
                size="small"
                @click="openDeleteMessageDialog(message)"
              >
                <v-icon size="small">
                  mdi-delete
                </v-icon>
              </v-btn>
            </span>
          </v-card-title>
          <v-card-text
            class="ql-editor ck-content"
            style="min-height: 50px"
          >
            <!-- eslint-disable-next-line vue/no-v-html -- trusted admin/staff-authored content -->
            <div v-html="message.content" />
          </v-card-text>
          <v-card-actions class="text-disabled pt-0">
            <span
              class="mr-3"
              :class="{ 'text-white' : !theme.current.dark
                          && message.invert_title_color,
                        'text-black' : theme.current.dark && message.invert_title_color }"
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
                    'mb-4': display.mdAndUp }"
          :hide-triangle="display.smAndDown"
          :no-bottom-border-radius="display.smAndDown"
        />
        <v-card
          v-for="(message, index) in getNews"
          :key="message.id"
          flat
          border
          :class="{ 'card-rounded-top':!display.smAndDown || index !== 0,
                    'no-top-border-radius': display.smAndDown && index === 0 }"
          class="mb-3 vh-news card-rounded animate__animated animate__fadeIn animate__faster"
          :image="message.background_url"
        >
          <v-card-title
            class="d-flex"
            :class="{ 'grey-title': !message.background_url &&
              !$vuetify.theme.current.dark }"
          >
            <span
              :class="{ 'text-white' : !theme.current.dark && message.invert_title_color,
                        'text-black' : theme.current.dark && message.invert_title_color }"
              style="text-wrap: wrap"
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
                <v-icon size="small">
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                variant="outlined"
                color="error"
                size="small"
                @click="openDeleteMessageDialog(message)"
              >
                <v-icon size="small">
                  mdi-delete
                </v-icon>
              </v-btn>
            </span>
          </v-card-title>
          <v-card-text
            class="mt-3 ql-editor ck-content"
            style="min-height: 50px"
          >
            <!-- eslint-disable-next-line vue/no-v-html -- trusted admin/staff-authored content -->
            <div v-html="message.content" />
          </v-card-text>
          <v-card-actions class="text-disabled pt-0">
            <span
              class="mr-3"
              :class="{ 'text-white' : !theme.current.dark && message.invert_title_color,
                        'text-black' : theme.current.dark && message.invert_title_color }"
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
        <div v-if="display.mdAndUp">
          <ServerStatus
            v-if="showServers"
            ref="serverStatus"
            @loaded="updateServerWidget"
          />
          <v-card
            v-if="store.shopConfig &&
              store.shopConfig.donation_goal_enabled"
            class="mb-3 card-rounded vh-news-donation-goal"
            flat
          >
            <DonationGoal class="pt-3" />
          </v-card>
          <v-card
            v-if="store.shopConfig &&
              store.shopConfig.top_donators_enabled"
            class="mb-3 card-rounded vh-news-top-donators"
            flat
          >
            <TopDonators class="pt-3" />
          </v-card>
          <LatestForumPosts v-if="forumEnabled" />
          <NewUsers class="" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="sass">
.news-of-day
  border-style: solid
  border-width: 2px
  border-color: rgb(var(--v-theme-primary))

.grey-title
  background-color: rgb(255, 255, 255)
</style>
