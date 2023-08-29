<template>
  <div>
    <div v-if="topic">
      <PageTitleFlat :title="topic.title" :icon="topic.icon"
                     :hide-triangle="$vuetify.breakpoint.smAndDown"
                     :no-bottom-border-radius="$vuetify.breakpoint.smAndDown">
        <template v-slot:start>
          <router-link :to="{ name: 'Forum' }"
                       class="white--text">
            {{ topic.topic_category.title }}</router-link>
          / {{ topic.title }}
        </template>
        <template v-slot:end>
          <div class="text-end">
            {{ topic.description }}
          </div>
        </template>
      </PageTitleFlat>
      <v-card class="vh-forum-topic card-rounded-bottom"
              :class="{ 'mt-4 card-rounded-top':!$vuetify.breakpoint.smAndDown,
           'no-top-border-radius': $vuetify.breakpoint.smAndDown }">
        <v-card-text>
          <PaginatedDataTable
            ref="threadTable"
            :headers="headers"
            :items="threads"
            :totalItems="totalItems"
            default-sort-by="last_post"
            :default-sort-desc="true"
            @reload="fetchTopic"
            @click:row="showThread"
            class="cursor">
            <template v-slot:header>
              <v-checkbox v-model="hide_closed" :label="$t('_forum.hideClosed')"
                          @change="fetchTopic" class="text-capitalize"/>
              <div v-if="topic.admins.length >= 1">
                {{ $t('_forum.topicAdmins') }}
                <UserLink v-for="admin in topic.admins" small
                          :key="admin.id" :user="admin" class="mr-1"/>
              </div>
            </template>
            <template v-slot:item.created="{ item }">
              <span :class="{ 'font-weight-bold' : !item.is_read }">
                {{ utils.formatDate(item.created) }}
              </span>
            </template>
            <template v-slot:item.creator="{ item }">
              <v-avatar class="ma-1">
                <v-img v-if="item.creator" :src="item.creator.avatar"/>
                <v-img v-else src="https://www.gravatar.com/avatar/{}?d=retro&s=200"/>
              </v-avatar>
              <UserLink v-if="item.creator" @click.prevent :user="item.creator"></UserLink>
            </template>
            <template v-slot:item.title="{ item }">
              <router-link :to="{ name: 'ForumThread', params: { id: item.id } }"
                           :class="{ 'font-weight-bold' : !item.is_read }"
                           style="color: inherit; text-decoration: none">
                <div class="d-flex align-center">
                  <v-chip small v-for="label in item.labels" :key="label.id" :color="label.color"
                          text-color="white" class="mr-1">
                    {{ label.name }}
                  </v-chip>
                  <span>{{ item.title }}</span>
                </div>
              </router-link>
            </template>
            <template v-slot:item.last_post="{ item }">
              <div v-if="item.last_post" class="d-flex">
                <v-spacer/>
                <div class="mr-3 align-self-center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on" v-if="item.status === 'CLOSED'">mdi-lock</v-icon>
                    </template>
                    <span> {{ $t('_forum.threadLocked') }} </span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on" v-if="item.pinned === true" class="mr-1 mdi-rotate-45">
                        mdi-pin
                      </v-icon>
                    </template>
                    <span> {{ $t('_forum.threadPinned') }} </span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">mdi-comment</v-icon>
                    </template>
                    <span> {{ $t('_forum.numberOfPosts') }} </span>
                  </v-tooltip>
                  {{ item.posts_total }}
                </div>
                <router-link
                  :to="{ name: 'UserDashboard', params: { id: item.last_post.creator.id } }">
                  <v-avatar class="ma-1 mr-2">
                    <v-img :src="item.last_post.creator.avatar"/>
                  </v-avatar>
                </router-link>
                <div class="align-self-center d-flex flex-column" style="width: 125px">
                  <UserLink @click.prevent :small="true" :user="item.last_post.creator"></UserLink>
                  {{ utils.formatTimeForForum(item.last_post.created) }}
                </div>
              </div>
            </template>
            <!-- For mobile devices -->
            <template v-slot:item.title_sm="{ item }">
              <div class="d-flex">
                <router-link
                  :to="{ name: 'UserDashboard', params: { id: item.creator.id } }">
                  <v-avatar class="ma-1 mr-2">
                    <v-img :src="item.creator.avatar"/>
                  </v-avatar>
                </router-link>
                <div class="align-self-center">
                  <div>
                    <router-link
                      :to="{ name: 'ForumThread', params: { id: item.id } }"
                      class="hidelinkstyle ml-1">
                      <v-chip x-small v-if="item.label" :color="item.label.color"
                              text-color="white">
                        {{ item.label.name }}
                      </v-chip>
                      {{ item.title }}
                    </router-link>
                  </div>
                  <user-link :user="item.creator" :simple="true"/>
                </div>
              </div>
            </template>
            <template v-slot:item.last_post_sm="{ item }">
              <div class="d-flex">
                <v-spacer />
                <v-icon v-if="item.pinned === true" class="mr-1 mdi-rotate-45">
                  mdi-pin
                </v-icon>
                <v-icon v-if="item.status === 'CLOSED'" class="mr-3">mdi-lock</v-icon>
                <div v-if="item.last_post">
                  <div :class="{ 'font-weight-bold' : !item.is_read }">
                    {{ topic.posts_total }} {{ $t('_forum.posts') }}
                  </div>
                  <span v-if="topic.last_post" :class="{ 'font-weight-bold' : !item.is_read }">
                {{ utils.formatTimeForForum(item.last_post.created) }}
              </span>
                </div>
              </div>
            </template>
            <template v-slot:footer-right>
              <v-btn color="success" outlined
                     @click="$refs.addThreadDialog.show()"
                     v-if="!topic.prohibit_create_threads && $store.getters.isLoggedIn
                     || ($checkProp('forum_edit') || $checkTopicAdmin(topic.admins))">
                <v-icon left>mdi-plus</v-icon>
                <span>{{ $t('_forum.addThread') }}</span>
              </v-btn>
            </template>
          </PaginatedDataTable>
        </v-card-text>
      </v-card>
      <ThreadAddDialog ref="addThreadDialog" :dialog-title="$t('_forum.addThread')"
                       @submit="newThread"/>
    </div>
    <v-skeleton-loader v-else type="article@2"/>
  </div>
</template>

<script>
import PaginatedDataTable from '@/components/PaginatedDataTable.vue';
import PageTitleFlat from '@/components/PageTitleFlat.vue';
import openapi from '../../api/openapi';
import ThreadAddDialog from '../../components/ForumComponents/ThreadAddDialog.vue';
import UserLink from '../../components/UserLink.vue';

export default {
  components: {
    PageTitleFlat,
    PaginatedDataTable,
    ThreadAddDialog,
    UserLink,
  },
  name: 'ForumTopic.vue',
  data() {
    return {
      threads: null,
      page: 1,
      totalItems: 0,
      hide_closed: false,
      topic: null,
      breadcrumbs: [],
    };
  },
  beforeMount() {
    this.fetchTopic();
  },
  computed: {
    headers() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return [
          {
            text: this.$t('_forum.creator'), value: 'creator', sortable: false,
          },
          { text: this.$t('title'), value: 'title', sortable: false },
          { text: this.$t('_forum.created'), value: 'created' },
          { value: 'total_posts', sortable: false },
          { text: this.$t('_forum.last_post'), value: 'last_post', align: 'right' },
        ];
      }
      return [
        { text: this.$t('title'), value: 'title_sm', sortable: false },
        { text: this.$t('_forum.last_post'), value: 'last_post_sm', align: 'right' },
      ];
    },
  },
  methods: {
    async fetchTopic() {
      const topicId = this.$route.params.id;
      (await openapi).forum_getTopic(topicId).then((rsp) => {
        if (rsp.data) {
          this.topic = rsp.data;
          this.breadcrumbs = [
            { text: this.$t('title'), to: { name: 'Forum' } },
            {
              text: this.topic.topic_category.title,
              to: { name: 'ForumCategory', params: { id: this.topic.topic_category.id } },
            },
            { text: this.topic.title },
          ];
          this.fetchThreads();
        }
      });
    },
    async fetchThreads(queryParams = null) {
      const topicId = this.$route.params.id;
      (await openapi).forum_getTopicThreads({
        uuid: topicId,
        hide_closed: this.hide_closed,
        ...(queryParams != null ? queryParams : this.$refs.threadTable.getQueryParameters()),
      })
        .then((rsp) => {
          this.threads = rsp.data.items;
          this.totalItems = rsp.data.total;
        });
    },
    async newThread() {
      const data = this.$refs.addThreadDialog.getData();
      data.topic_id = this.$route.params.id;
      (await openapi).forum_createThread(null, data).then((rsp) => {
        this.$refs.addThreadDialog.close();
        this.showThread(rsp.data);
        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addThreadDialog.setError(err);
      });
    },
    showThread(item) {
      this.$router.push({ name: 'ForumThread', params: { id: item.id } });
    },
  },
};
</script>

<style scoped>
.cursor >>> td {
  cursor: pointer !important;
}
</style>
