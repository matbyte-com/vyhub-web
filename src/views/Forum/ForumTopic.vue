<template>
  <div>
    <div v-if="topic">
      <PageTitleFlat :title="topic.title" :icon="topic.icon"
                     :hide-triangle="$vuetify.breakpoint.smAndDown"
                     :no-bottom-border-radius="$vuetify.breakpoint.smAndDown">
        <template v-slot:subtitle v-if="false">
          <div class="d-flex align-center">
            <div class="text-ellipsis mt-1" style="width: 50%; max-width: 300px">
              <router-link :to="{ name: 'Forum' }"
                           class="white--text">
                {{ topic.topic_category.title }}</router-link>
              / {{ topic.title }}
            </div>
            <v-spacer v-if="!$vuetify.breakpoint.xs"/>
            <div v-if="!$vuetify.breakpoint.xs">
              {{ topic.description }}
            </div>
          </div>
        </template>
      </PageTitleFlat>
      <v-card class="vh-forum-topic card-rounded-bottom" flat
              :class="{ 'mt-4 card-rounded-top':!$vuetify.breakpoint.smAndDown,
           'no-top-border-radius': $vuetify.breakpoint.smAndDown }">
        <v-card-text class="mt-0 pt-0">
          <PaginatedDataTable
            :mobile-breakpoint="0"
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
              <div v-if="topic.admins.length >= 1 || topic.admin_groups.length >= 1">
                {{ $t('_forum.topicAdmins') }}
                <v-chip outlined small v-for="admin in topic.admin_groups" :key="admin.id"
                        :color="admin.color" text-color="white" class="mr-1">
                  {{ admin.name }}
                </v-chip>
                <UserLink v-for="admin in topic.admins" small
                          :key="admin.id" :user="admin" class="mr-1"/>
              </div>
            </template>
            <template v-slot:item.last_post="{ item }">
              <div v-if="item.last_post && item.last_post.creator" class="d-flex align-center">
                <v-spacer/>
                <div class="mr-3 align-center d-flex">
                  <v-tooltip bottom v-if="item.pinned === false">
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on" v-if="item.status === 'CLOSED'">mdi-lock</v-icon>
                    </template>
                    <span> {{ $t('_forum.locked') }} </span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on" v-if="item.pinned === true" class="mr-1 mdi-rotate-45">
                        mdi-pin
                      </v-icon>
                    </template>
                    <span> {{ $t('_forum.pinned') }} </span>
                  </v-tooltip>
                  <div class="d-flex align-center">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon class="mr-1" v-on="on">mdi-comment</v-icon>
                      </template>
                      <span> {{ $t('_forum.numberOfPosts') }} </span>
                    </v-tooltip>
                    {{ item.posts_total }}
                  </div>
                </div>
                <div class="align-self-center d-flex flex-column text-ellipsis">
                  <UserLink @click.prevent :small="true" :user="item.last_post.creator"
                            :simple="true"/>
                  {{ utils.formatTimeForForum(item.last_post.created) }}
                </div>
                <router-link
                  :to="{ name: 'UserDashboard', params: { id: item.last_post.creator.id } }">
                  <v-avatar class="ma-1 ml-2">
                    <v-img :src="item.last_post.creator.avatar"/>
                  </v-avatar>
                </router-link>
              </div>
            </template>
            <template v-slot:item.title="{ item }">
              <div class="d-flex align-center">
                <router-link v-if="item.creator"
                  :to="{ name: 'UserDashboard', params: { id: item.creator.id } }">
                  <v-avatar class="ma-1 mr-2">
                    <v-img :src="item.creator.avatar"/>
                  </v-avatar>
                </router-link>
                <div class="align-center align-self-center">
                  <div>
                    <router-link
                      :to="{ name: 'ForumThread', params: { id: item.id } }"
                      :class="{ 'font-weight-bold' : !item.is_read }"
                      class="text-decoration-none ml-1" style="font-size: larger">
                      {{ item.title }}
                    </router-link>
                  </div>
                  <user-link :user="item.creator" :simple="true"/>
                  <b class="ml-1">·</b>
                  <span>
                    {{ new Date(item.created).toLocaleDateString() }}
                  </span>
                  <v-chip label x-small class="white--text ml-1" :color="l.color"
                          v-for="l in item.labels" :key="l.id">
                    {{ l.name }}
                  </v-chip>
                </div>
              </div>
            </template>
            <template v-slot:item.last_post_sm="{ item }">
              <div class="d-flex">
                <v-spacer />
                <div v-if="item.last_post">
                  <div :class="{ 'font-weight-bold' : !item.is_read }">
                    {{ item.posts_total }} {{ $t('_forum.posts') }}
                  </div>
                  <span v-if="topic.last_post" :class="{ 'font-weight-bold' : !item.is_read }">
                {{ utils.formatTimeForForum(item.last_post.created) }}
              </span>
                </div>
              </div>
            </template>
            <template v-slot:footer-right>
              <v-tooltip bottom v-if="$checkIsForumBanned()">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" color="error" class="mr-2">
                    mdi-gavel
                  </v-icon>
                </template>
                {{ $t('_forum.messages.banned') }}
              </v-tooltip>
              <v-btn color="success" outlined :disabled="$checkIsForumBanned()"
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
    <div v-else>
      <PageTitleFlat/>
      <v-card flat class="card-rounded mt-4">
        <v-skeleton-loader type="table-heading, list-item-avatar, divider,
         list-item-avatar,divider, list-item-avatar, divider, list-item-avatar"/>
      </v-card>
    </div>
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
          { text: this.$t('title'), value: 'title', sortable: false },
          {
            text: this.$t('_forum.last_post'), value: 'last_post', align: 'right', sortable: false,
          },
        ];
      }
      return [
        { text: this.$t('title'), value: 'title', sortable: false },
        {
          text: this.$t('_forum.last_post'), value: 'last_post_sm', align: 'right', sortable: false,
        },
      ];
    },
  },
  methods: {
    async fetchTopic() {
      const topicId = this.$route.params.id;
      (await openapi).forum_getTopic(topicId).then((rsp) => {
        if (rsp.data) {
          rsp.data.admin_groups.sort((a, b) => a.permission_level + b.permission_level);
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
