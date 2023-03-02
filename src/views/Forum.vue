<template>
  <div>
    <PageTitle icon="mdi-forum">{{ $t('_forum.title') }}</PageTitle>
    <v-card>
      <v-list subheader two-line>
        <v-list-group :value="true" v-for="category in topicCategories" :key="category.id"
                      class="topicCategory">
          <template v-slot:actions><v-icon class="icon ml-0 pl-0">$expand</v-icon></template>
          <template v-slot:activator>
            <v-list-item-title class="ml-5 headerListItem">{{ category.title }}</v-list-item-title>
          </template>
          <v-divider style="border-width: 1px;"/>
          <div v-for="topic in category.topics" :key="topic.id" class="ml-9 topic mr-3">
            <v-list-item link :to="{ name: 'ForumTopic', params: { id: topic.id } }">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>{{ topic.icon }}</v-icon>
                {{ topic.title }}
              </v-list-item-title>
              <v-list-item-subtitle style="white-space: normal; overflow-wrap: break-word;"
                                    class="ml-1">
                {{ topic.description }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <div v-if="topic.last_post !== null && $vuetify.breakpoint.mdAndUp" class="mr-8 d-flex">
              <router-link
                :to="{ name: 'UserDashboard', params: { id: topic.last_post.creator.id } }">
                <v-avatar class="ma-1 mr-2">
                  <v-img :src="topic.last_post.creator.avatar"/>
                </v-avatar>
              </router-link>
              <div class="align-self-center">
                <router-link
                    :to="{ name: 'ForumThread', params: { id: topic.last_post.thread.id } }"
                    class="hidelinkstyle ml-1">
                  {{ topic.last_post.thread.title }}
                </router-link>
                <div class="d-flex align-center">
                  <UserLink :simple="true"
                            :user="topic.last_post.creator" class="mr-1"></UserLink>
                  •
                  {{ utils.formatTimeForForum(topic.last_post.created) }}
                </div>
              </div>
            </div>

            <div class="mr-7 ml-3" v-if="$vuetify.breakpoint.mdAndUp">
              <v-row>
                <v-col cols="12" sm="3" md="6" align-self="center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">mdi-comment-multiple</v-icon>
                    </template>
                    <span> {{ $t('_forum.numberOfThreads') }} </span>
                  </v-tooltip>
                  {{ topic.threads_total }}
                </v-col>
                <v-col cols="12" sm="3" md="6" align-self="center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">mdi-comment</v-icon>
                    </template>
                    <span> {{ $t('_forum.numberOfPosts') }} </span>
                  </v-tooltip>
                  {{ topic.posts_total }}
                </v-col>
              </v-row>
            </div>

            <div v-if="$vuetify.breakpoint.smAndDown">
              <div>
                {{ topic.posts_total }} {{ $t('_forum.posts') }}
              </div>
              <span v-if="topic.last_post">
                {{ utils.formatTimeForForum(topic.last_post.created) }}
              </span>
            </div>
            </v-list-item>
            <v-divider style="border-width: 0.5px;"/>
          </div>

        </v-list-group>
        <template>
          <div class="text-right" v-if="$checkProp('forum_edit')">
            <v-btn class="mr-3 mt-3" color="success" outlined
                   @click="$refs.editTopicCategoriesDialog.show()">
              <v-icon left>mdi-card-multiple</v-icon>
              <span>{{ $t('_forum.manageTopicCategories') }}</span>
            </v-btn>
            <v-btn class="mr-3 mt-3" color="success" outlined
                   @click="$refs.editTopicsDialog.show()"
                   :disabled="selectedTopicCategory === null">
              <v-icon left>mdi-card-multiple</v-icon>
              <span>{{ $t('_forum.manageTopics') }}</span>
            </v-btn>
          </div>
        </template>
      </v-list>
    </v-card>
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
                  <v-btn @click.stop="$refs.deleteTopicCategoryConfirmationDialog.show(category);
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
import PageTitle from '../components/PageTitle.vue';
import openapi from '../api/openapi';

export default {
  components: {
    UserLink,
    DialogForm,
    Dialog,
    PageTitle,
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
      last_post: null,
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
          title: this.$t('_forum.messages.topicCategoryCreated'),
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
          title: this.$t('_forum.messages.topicCreated'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addTopicDialog.setError(err);
      });
    },
    // Bearbeiten
    openTopicCategoryEditDialog(item) {
      const data = item;
      this.$refs.editTopicCategoryDialog.show(data);
      this.$refs.editTopicCategoryDialog.setData(data);
    },
    async editTopicCategory(item) {
      const data = this.$refs.editTopicCategoryDialog.getData();
      (await openapi).forum_editTopicCategory(item.id, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_forum.messages.topicCategoryEdited'),
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
          title: this.$t('_forum.messages.topicEdited'),
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
          title: this.$t('_forum.messages.categoryDeleteSuccess'),
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
          title: this.$t('_forum.messages.topicDeleteSuccess'),
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
          title: this.$t('_forum.messages.updatedOrder'),
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
          title: this.$t('_forum.messages.updatedOrder'),
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
.cursor >>> td{
  cursor: pointer !important;
}

.icon {
  order: 0;
}

.headerListItem {
  order: 1;
}

.topic:hover {
  box-shadow: #545454 0px 0px 5px 0px;
}

.hidelinkstyle {
  text-decoration: none;
}

.hidelinkstyle:hover {
  color: var(--v-secondary-darken1) !important;
}
</style>
