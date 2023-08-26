<template>
  <div>
    <!-- TODO Place into PageTitleFlat
    <div class="d-flex">
      <PageTitle icon="mdi-forum">{{ $t('_forum.forum') }}</PageTitle>
      <v-spacer/>
      <div v-if="$checkProp('forum_edit')" class="d-flex flex-column">
        <v-btn class="" color="success" small
               @click="$refs.editTopicCategoriesDialog.show()">
          <v-icon left>mdi-card-multiple</v-icon>
          <span>{{ $t('_forum.manageTopicCategories') }}</span>
        </v-btn>
        <v-btn class="mt-1" color="success" small
               @click="$refs.editTopicsDialog.show()"
               :disabled="selectedTopicCategory === null">
          <v-icon left>mdi-card-multiple</v-icon>
          <span>{{ $t('_forum.manageTopics') }}</span>
        </v-btn>
      </div>
    </div>-->
    <!-- TODO Skeleton Loaders to better resemble the strucutre of the page 2 columns multiple
     cards -->
    <v-skeleton-loader v-if="topicCategories === null" type="card-heading@2"/>
    <v-row class="mt-1">
      <v-col cols="12" md="9">
        <PageTitleFlat :title="$t('_forum.welcomeToForum')">
          <template v-slot:end>
            <div class="text-end">
              TODO Buttons Here
            </div>
          </template>
        </PageTitleFlat>
        <v-card v-for="category in topicCategories" :key="category.id" class="mb-3 mt-4 vh-forum">
          <v-card-text>
            <v-list subheader two-line>
              <v-list-group :value="true"
                            class="topicCategory">
                <template v-slot:actions>
                  <v-icon class="icon ml-0 pl-0">$expand</v-icon>
                </template>
                <template v-slot:activator>
                  <v-list-item-title class="ml-5 headerListItem" style="font-size: 1.5em;">
                    {{ category.title }}
                  </v-list-item-title>
                </template>
                <v-divider style="border-width: 2px;"/>
                <div v-for="topic in category.topics" :key="topic.id" class="ml-9 topic mr-3">
                  <v-list-item link :to="{ name: 'ForumTopic', params: { id: topic.id } }">
                    <v-list-item-content>
                      <v-row no-gutters>
                        <v-col class="d-flex" cols="7" md="5" lg="7">
                          <v-icon left v-if="topic.icon">{{ topic.icon }}</v-icon>
                          <div class="align-self-center">
                            <div class="d-flex align-center textOverflow" style="font-size: 1.3em;"
                                 :class="{ 'fill-height':!topic.description }">
                              {{ topic.title }}
                            </div>
                            <div v-if="topic.description"
                                 style="white-space: normal; overflow-wrap: break-word;"
                                 class="text--disabled mt-1 textOverflow">
                              {{ topic.description }}
                            </div>
                          </div>
                        </v-col>
                        <v-col>
                          <v-row no-gutters>
                            <v-col md="4" lg="4"
                                   class="d-flex align-center" v-if="$vuetify.breakpoint.lgAndUp">
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                  <v-icon class="ml-1 mr-1" v-on="on">mdi-comment-multiple</v-icon>
                                </template>
                                <span> {{ $t('_forum.numberOfThreads') }} </span>
                              </v-tooltip>
                              {{ topic.threads_total }}
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                  <v-icon class="ml-2 mr-1" v-on="on">mdi-comment</v-icon>
                                </template>
                                <span> {{ $t('_forum.numberOfPosts') }} </span>
                              </v-tooltip>
                              <span>{{ topic.posts_total }}</span>
                            </v-col>
                            <v-col md="12" lg="8" class="d-flex"
                                   v-if="topic.last_post !== null && $vuetify.breakpoint.mdAndUp">
                              <v-spacer v-if="$vuetify.breakpoint.mdOnly"/>
                              <div class="d-flex">
                                <router-link
                                  :to="{ name: 'UserDashboard',
                           params: { id: topic.last_post.creator.id } }">
                                  <v-avatar class="ma-1 mr-2">
                                    <v-img :src="topic.last_post.creator.avatar"/>
                                  </v-avatar>
                                </router-link>
                                <div class="align-self-center">
                                  <router-link
                                    :to="{ name: 'ForumThread',
                             params: { id: topic.last_post.thread.id } }"
                                    class="hidelinkstyle ml-1 textOverflow">
                                    {{ topic.last_post.thread.title }}
                                  </router-link>
                                  <div class="d-flex align-center textOverflow">
                                    <UserLink :simple="true"
                                              :user="topic.last_post.creator"
                                              class="mr-1"></UserLink>
                                    •
                                    {{ utils.formatTimeForForum(topic.last_post.created) }}
                                  </div>
                                </div>
                              </div>
                            </v-col>
                          </v-row>
                        </v-col>
                        <!-- Mobile -->
                        <v-col v-if="$vuetify.breakpoint.smAndDown">
                          <div class="text-right">
                            {{ topic.posts_total }} {{ $t('_forum.posts') }}
                          </div>
                          <div v-if="topic.last_post" class="text-right text--disabled">
                            {{ utils.formatTimeForForum(topic.last_post.created) }}
                          </div>
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider style="border-width: 1px;"/>
                </div>
              </v-list-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Sidebar -->
      <v-col cols="12" md="3">
        <sidebar/>
      </v-col>
    </v-row>

    <!-- TopicCategoryDialog -->
    <Dialog ref="editTopicCategoriesDialog"
            :title="$t('_forum.manageTopicCategories')" :icon="'mdi-card-multiple'">
      <template>
        <v-list>
          <draggable :list="topicCategories" @change="updateForumCategories = true">
            <v-list-item v-for="category in topicCategories" :key="category.id">
              <v-row>
                <v-col>
                  {{ category.title }}
                </v-col>
                <v-col class="text-right">
                  <v-btn class="mr-1" @click.stop="openTopicCategoryEditDialog(category)"
                         color="primary" outlined small>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    @click.stop="$refs.deleteTopicCategoryConfirmationDialog.show(category);
                $refs.deleteTopicCategoryConfirmationDialog.confirmationTextField = category.title;"
                    color="red" outlined small>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item>
          </draggable>
        </v-list>

      </template>
      <template v-slot:actions>
        <v-btn color="primary" @click="$refs.addTopicCategoryDialog.show()">
          <v-icon>mdi-plus</v-icon>
          {{ $t('_forum.addCategory') }}
        </v-btn>
        <v-btn color="primary" class="mr-0"
               style="border-top-right-radius: 0; border-bottom-right-radius: 0"
               @click="updateCategoryOrder" :disabled="!updateForumCategories">
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn color="primary" class="ma-0"
               style="border-bottom-left-radius: 0; border-top-left-radius: 0"
               @click="fetchData" :disabled="!updateForumCategories">
          <v-icon>mdi-backspace-outline</v-icon>
        </v-btn>
      </template>
    </Dialog>
    <!-- TopicDialog -->
    <Dialog ref="editTopicsDialog" v-if="topicCategories"
            :title="$t('_forum.manageTopics')" :icon="'mdi-card-multiple'">
      <template>
        <v-select :label="$t('_forum.selectTopicCategory')" :items="topicCategories.map(category =>
        ({text: category.title, value: category.id}))"
                  v-model="selectedTopicCategory"/>
        <v-list v-if="getSelectedCategory">
          <draggable :list="getSelectedCategory.topics" @change="updateForumTopics = true">
            <v-list-item v-for="topic in getSelectedCategory.topics" :key="topic.id">
              <v-row>
                <v-col>
                  {{ topic.title }}
                </v-col>
                <v-col class="text-right">
                  <v-btn class="mr-1"
                         @click.stop="openTopicEditDialog(topic, getSelectedCategory.id)"
                         color="primary" outlined small>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn @click.stop="$refs.deleteTopicConfirmationDialog.show(topic);
                $refs.deleteTopicConfirmationDialog.confirmationTextField = topic.title;"
                         color="red" outlined small>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item>
          </draggable>
        </v-list>
      </template>
      <template v-slot:actions>
        <v-btn color="primary" @click="openAddTopicDialog">
          <v-icon>mdi-plus</v-icon>
          {{ $t('_forum.addTopic') }}
        </v-btn>
        <v-btn color="primary" class="mr-0"
               style="border-top-right-radius: 0; border-bottom-right-radius: 0"
               @click="updateTopicOrder()" :disabled="!updateForumTopics">
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn color="primary" class="ma-0"
               style="border-bottom-left-radius: 0; border-top-left-radius: 0"
               @click="fetchData" :disabled="!updateForumTopics">
          <v-icon>mdi-backspace-outline</v-icon>
        </v-btn>
      </template>
    </Dialog>
    <ConfirmationDialog ref="deleteTopicCategoryConfirmationDialog"
                        @submit="deleteTopicCategory" :use-text-field="true"/>
    <ConfirmationDialog ref="deleteTopicConfirmationDialog"
                        @submit="deleteTopic" :countdown="true"/>
    <DialogForm :form-schema="topicCategoryForm"
                @submit="newTopicCategory" :title="$t('_forum.addTopicCategory')"
                ref="addTopicCategoryDialog" :icon="'mdi-plus'"/>
    <DialogForm :form-schema="TopicForm"
                @submit="newTopic" :title="$t('_forum.addTopic')"
                ref="addTopicDialog" :icon="'mdi-plus'"/>
    <DialogForm :form-schema="topicCategoryForm"
                @submit="editTopicCategory" :title="$t('_forum.editTopicCategory')"
                ref="editTopicCategoryDialog" :icon="'mdi-pencil'"/>
    <DialogForm :form-schema="TopicForm"
                @submit="editTopic" :title="$t('_forum.editTopic')"
                ref="editTopicDialog" :icon="'mdi-pencil'"/>
  </div>
</template>

<script>
import ForumAddTopicCategory from '@/forms/ForumAddTopicCategoryForm';
import ForumAddTopicForm from '@/forms/ForumAddTopicForm';
import Dialog from '@/components/Dialog.vue';
import DialogForm from '@/components/DialogForm.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import UserLink from '@/components/UserLink.vue';
import Sidebar from '@/components/ForumComponents/Sidebar.vue';
import PageTitleFlat from '@/components/PageTitleFlat.vue';
import openapi from '../api/openapi';

export default {
  components: {
    PageTitleFlat,
    Sidebar,
    UserLink,
    DialogForm,
    Dialog,
    ConfirmationDialog,
  },
  name: 'Forum.vue',
  data() {
    return {
      topicCategories: null,
      selectedTopicCategory: null,
      updateForumCategories: false,
      updateForumTopics: false,
      topicCategoryForm: ForumAddTopicCategory,
      TopicForm: ForumAddTopicForm,
      latestPosts: null,
      latestThreads: null,
      totalPosts: null,
      totalThreads: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).forum_getTopicCategories().then((rsp) => {
        this.topicCategories = rsp.data;
        if (this.topicCategories.length > 0) {
          this.selectedTopicCategory = this.topicCategories[0].id;
        }
        if (this.updateForumCategories === true) {
          this.updateForumCategories = false;
        }
        if (this.updateForumTopics === true) {
          this.updateForumTopics = false;
        }
      });
    },
    // Hinzufügen
    async newTopicCategory() {
      const data = this.$refs.addTopicCategoryDialog.getData();
      (await openapi).forum_createTopicCategory(null, data).then(() => {
        this.fetchData();
        this.$refs.addTopicCategoryDialog.closeAndReset();
        this.$notify({
          title: this.$t('_messages.createSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addTopicCategoryDialog.setError(err);
      });
    },
    async newTopic() {
      const data = this.$refs.addTopicDialog.getData();
      (await openapi).forum_createTopic(null, data).then(() => {
        this.fetchData();
        this.$refs.addTopicDialog.closeAndReset();
        this.$notify({
          title: this.$t('_messages.createSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addTopicDialog.setError(err);
      });
    },
    // Bearbeiten
    openTopicCategoryEditDialog(item) {
      const data = item;
      if (data.requirement_set) data.requirement_set_id = data.requirement_set.id;
      this.$refs.editTopicCategoryDialog.show(data);
      this.$refs.editTopicCategoryDialog.setData(data);
    },
    async editTopicCategory(item) {
      const data = this.$refs.editTopicCategoryDialog.getData();
      if (!data.requirement_set_id) data.requirement_set_id = null;
      (await openapi).forum_editTopicCategory(item.id, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_.messages.editSuccess'),
          type: 'success',
        });
        this.$refs.editTopicCategoryDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.editTopicCategoryDialog.setError(err);
      });
    },
    openTopicEditDialog(item, categoryId) {
      const data = item;
      this.$refs.editTopicDialog.show(data);
      data.admin_ids = data.admins.map((admin) => admin.id);
      data.topic_category_id = categoryId;
      this.$refs.editTopicDialog.setData(data);
    },
    async editTopic(item) {
      const data = this.$refs.editTopicDialog.getData();
      (await openapi).forum_editTopic(item.id, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
        this.$refs.editTopicDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.editTopicDialog.setError(err);
      });
    },
    // Löschen
    async deleteTopicCategory(item) {
      (await openapi).forum_deleteTopicCategory(item.id).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteTopicCategoryConfirmationDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.deleteTopicCategoryConfirmationDialog.setError(err);
      });
    },
    async deleteTopic(item) {
      (await openapi).forum_deleteTopic(item.id).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteTopicConfirmationDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.deleteTopicConfirmationDialog.setError(err);
      });
    },
    // Update
    async updateCategoryOrder() {
      const res = [];
      this.topicCategories.forEach((item) => {
        res.push(item.id);
      });
      (await openapi).forum_updateTopicCategoryOrder(null, res).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.updateOrderSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(`${err}`);
      });
    },
    async updateTopicOrder() {
      const category = this.topicCategories.find((item) => item.id === this.selectedTopicCategory);
      const res = [];
      category.topics.forEach((item) => {
        res.push(item.id);
      });
      (await openapi).forum_updateTopicOrder(null, res).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.updateOrderSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(`${err}`);
      });
    },
    openAddTopicDialog() {
      this.$refs.addTopicDialog.show();
      this.$refs.addTopicDialog.setData({ topic_category_id: this.selectedTopicCategory });
    },
  },
  computed: {
    getSelectedCategory() {
      if (!this.topicCategories) return {};
      return this.topicCategories.find((category) => category.id === this.selectedTopicCategory);
    },
  },
};
</script>

<style scoped>
.cursor::v-deep td {
  cursor: pointer !important;
}

.icon {
  order: 0;
}

.headerListItem {
  order: 1
}

.textOverflow {
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hidelinkstyle {
  text-decoration: none
}

.hidelinkstyle:hover {
  color: var(--v-secondary-darken1) !important;
}

.listItem:hover {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
  background-color: rgba(var(--color), 0.5) !important;
}
</style>
