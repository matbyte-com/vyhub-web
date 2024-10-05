<template>
  <div>
    <v-row class="mt-1">
      <v-col
        cols="12"
        md="9"
      >
        <PageTitleFlat
          :title="$t('_forum.welcomeToForum')"
          :hide-triangle="$vuetify.display.smAndDown"
          :no-bottom-border-radius="$vuetify.display.smAndDown"
        >
          <template #end>
            <div
              v-if="$checkProp('forum_edit')"
              class="d-flex flex-column"
            >
              <v-btn
                class="ml-auto"
                color="success"
                size="small"
                variant="flat"
                @click="$refs.editTopicCategoriesDialog.show()"
              >
                <v-icon start>
                  mdi-card-multiple
                </v-icon>
                <span>{{ $t('_forum.manageTopicCategories') }}</span>
              </v-btn>
            </div>
          </template>
        </PageTitleFlat>
        <div v-if="topicCategories == null">
          <v-card
            class="card-rounded mt-3"
            flat
          >
            <v-skeleton-loader type="heading" />
          </v-card>
          <v-card
            class="card-rounded mt-3"
            flat
          >
            <v-skeleton-loader type="heading" />
          </v-card>
        </div>
        <v-card
          v-for="(category, index) in topicCategories"
          :key="category.id"
          class="mb-3 vh-forum card-rounded-bottom"
          flat
          :class="{ 'mt-4 card-rounded-top':!$vuetify.display.smAndDown,
                    'no-top-border-radius': $vuetify.display.smAndDown && index === 0,
                    'card-rounded-top': index !== 0 }"
        >
          <v-card-text class="pa-0">
            <v-list
              subheader
              class="pb-0"
            >
              <v-list-group
                :value="true"
                class="vh-topic-category"
              >
                <template #actions>
                  <v-icon class="icon ml-0 pl-0">
                    $expand
                  </v-icon>
                </template>
                <template #activator>
                  <v-list-item-title style="font-size: 1.5em;">
                    {{ category.title }}
                  </v-list-item-title>
                </template>
                <div
                  v-for="topic in category.topics"
                  :key="topic.id"
                  class="topic"
                >
                  <v-divider style="border-width: 1px;" />
                  <v-list-item
                    density="compact"
                    link
                    :to="{ name: 'ForumTopic', params: { id: topic.id } }"
                  >
                    <v-list-item-content class="pa-0 ma-0">
                      <v-row
                        no-gutters
                        style="width: 100%"
                      >
                        <!-- Topic Title -->
                        <v-col
                          class="d-flex"
                          cols="8"
                          md="6"
                          lg="6"
                          xl="7"
                        >
                          <v-card
                            v-if="topic.icon"
                            class="d-flex align-center justify-center pa-1 my-2 mr-1"
                            flat
                          >
                            <v-icon>{{ topic.icon }}</v-icon>
                          </v-card>
                          <div class="align-self-center text-ellipsis my-2">
                            <div
                              class="text-ellipsis"
                              style="font-size: 1.3em;"
                              :class="{ 'fill-height':!topic.description }"
                            >
                              {{ topic.title }}
                            </div>
                            <div
                              v-if="topic.description"
                              style="white-space: normal; overflow-wrap: break-word;"
                              class="text-disabled mt-1 text-ellipsis"
                            >
                              {{ topic.description }}
                            </div>
                          </div>
                        </v-col>
                        <v-col
                          v-if="!$vuetify.display.smAndDown"
                          cols="5"
                          md="6"
                          lg="6"
                          xl="5"
                          class="d-flex align-center justify-end"
                        >
                          <div
                            v-if="$vuetify.display.lgAndUp"
                            class="d-flex align-center mr-1"
                          >
                            <v-tooltip location="bottom">
                              <template #activator="{ props }">
                                <v-icon
                                  class="ml-1 mr-1"
                                  v-bind="props"
                                >
                                  mdi-comment-multiple
                                </v-icon>
                              </template>
                              <span> {{ $t('_forum.numberOfThreads') }} </span>
                            </v-tooltip>
                            {{ topic.threads_total }}
                            <v-tooltip location="bottom">
                              <template #activator="{ props }">
                                <v-icon
                                  class="ml-2 mr-1"
                                  v-bind="props"
                                >
                                  mdi-comment
                                </v-icon>
                              </template>
                              <span> {{ $t('_forum.numberOfPosts') }} </span>
                            </v-tooltip>
                            <span>{{ topic.posts_total }}</span>
                          </div>
                          <div
                            v-if="topic.last_post !== null && $vuetify.display.mdAndUp"
                            class="d-flex justify-end"
                          >
                            <router-link
                              v-if="topic.last_post.creator"
                              :to="{ name: 'UserDashboard',
                                     params: { id: topic.last_post.creator.id } }"
                            >
                              <v-avatar class="ma-1 mr-2">
                                <v-img :src="topic.last_post.creator.avatar" />
                              </v-avatar>
                            </router-link>
                            <!-- Last Thread Title -->
                            <div
                              class="align-self-center text-ellipsis"
                              style="width: 200px"
                            >
                              <router-link
                                :to="{ name: 'ForumThread',
                                       params: { id: topic.last_post.thread.id } }"
                                class="ml-1"
                              >
                                {{ topic.last_post.thread.title }}
                              </router-link>
                              <div class="d-flex align-center">
                                <UserLink
                                  :simple="true"
                                  :user="topic.last_post.creator"
                                  class="mr-1 text-ellipsis"
                                />
                                •
                                {{ utils.formatTimeForForum(topic.last_post.created) }}
                              </div>
                            </div>
                          </div>
                        </v-col>
                        <!-- Mobile -->
                        <v-col
                          v-if="$vuetify.display.smAndDown"
                          cols="4"
                          class="d-flex justify-end align-center"
                        >
                          <div class="text-right">
                            <div>
                              {{ topic.posts_total }} {{ $t('_forum.posts') }}
                            </div>
                            <div
                              v-if="topic.last_post"
                              class="text-disabled"
                            >
                              {{ utils.formatTimeForForum(topic.last_post.created) }}
                            </div>
                          </div>
                          <div
                            v-if="!$vuetify.display.xs"
                            class="ml-1"
                          >
                            <router-link
                              :to="{ name: 'UserDashboard',
                                     params: { id: topic.last_post.creator.id } }"
                            >
                              <v-avatar class="ma-1 mr-2">
                                <v-img :src="topic.last_post.creator.avatar" />
                              </v-avatar>
                            </router-link>
                          </div>
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </v-list-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Sidebar -->
      <v-col
        cols="12"
        md="3"
      >
        <sidebar />
      </v-col>
    </v-row>

    <!-- TopicCategoryDialog -->
    <Dialog
      ref="editTopicCategoriesDialog"
      :max-width="1000"
      :title="$t('_forum.manageTopicCategories')"
      :icon="'mdi-card-multiple'"
    >
      <v-expansion-panels
        v-model="expansionPanel"
        class="mt-5"
        flat
      >
        <draggable
          :list="topicCategories"
          style="width: 100%"
          @change="updateForumCategories = true"
        >
          <v-expansion-panel
            v-for="category in topicCategories"
            :key="category.id"
          >
            <v-expansion-panel-title>
              <!-- Topic Category -->
              <div class="d-flex align-center">
                {{ category.title }}
                <v-spacer />
                <v-btn
                  class="mr-1"
                  color="primary"
                  variant="outlined"
                  size="small"
                  @click.stop="openTopicCategoryEditDialog(category)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  color="red"
                  class="mr-3"
                  variant="outlined"
                  size="small"
                  @click.stop="$refs.deleteTopicCategoryConfirmationDialog.show(category);
                               $refs.deleteTopicCategoryConfirmationDialog.confirmationTextField = category.title;"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <!-- Topic -->
              <v-card border>
                <v-list v-if="selectedTopicCategory">
                  <draggable
                    :list="selectedTopicCategory.topics"
                    @change="updateForumTopics = true"
                  >
                    <v-list-item
                      v-for="topic in selectedTopicCategory.topics"
                      :key="topic.id"
                    >
                      <v-row>
                        <v-col>
                          {{ topic.title }}
                        </v-col>
                        <v-col class="text-right">
                          <v-btn
                            class="mr-1"
                            color="primary"
                            variant="outlined"
                            size="x-small"
                            @click.stop="openTopicEditDialog(topic,selectedTopicCategory.id)"
                          >
                            <v-icon size="small">
                              mdi-pencil
                            </v-icon>
                          </v-btn>
                          <v-btn
                            color="red"
                            variant="outlined"
                            size="x-small"
                            @click.stop="$refs.deleteTopicConfirmationDialog.show(topic);
                                         $refs.deleteTopicConfirmationDialog.confirmationTextField = topic.title;"
                          >
                            <v-icon size="small">
                              mdi-delete
                            </v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-list-item>
                  </draggable>
                </v-list>
                <!-- Topic Actions -->
                <div class="d-flex align-center justify-end pb-1 pr-4">
                  <v-btn
                    color="success"
                    size="small"
                    variant="outlined"
                    @click="openAddTopicDialog"
                  >
                    <v-icon size="small">
                      mdi-plus
                    </v-icon>
                    {{ $t('_forum.addTopic') }}
                  </v-btn>
                  <v-btn
                    color="primary"
                    size="small"
                    class="mr-0 ml-3"
                    variant="outlined"
                    style="border-top-right-radius: 0; border-bottom-right-radius: 0"
                    :disabled="!updateForumTopics"
                    @click="updateTopicOrder()"
                  >
                    <v-icon size="small">
                      mdi-check
                    </v-icon>
                  </v-btn>
                  <v-btn
                    color="primary"
                    size="small"
                    class="ma-0"
                    variant="outlined"
                    style="border-bottom-left-radius: 0; border-top-left-radius: 0"
                    :disabled="!updateForumTopics"
                    @click="fetchData"
                  >
                    <v-icon size="small">
                      mdi-backspace-outline
                    </v-icon>
                  </v-btn>
                </div>
              </v-card>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </draggable>
      </v-expansion-panels>
      <!-- Topic Category Actions -->
      <template #actions>
        <v-btn
          variant="outlined"
          color="success"
          @click="$refs.addTopicCategoryDialog.show()"
        >
          <v-icon>mdi-plus</v-icon>
          {{ $t('_forum.addCategory') }}
        </v-btn>
        <v-btn
          color="primary"
          variant="outlined"
          class="mr-0"
          style="border-top-right-radius: 0; border-bottom-right-radius: 0"
          :disabled="!updateForumCategories"
          @click="updateCategoryOrder"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn
          color="primary"
          variant="outlined"
          class="ma-0"
          style="border-bottom-left-radius: 0; border-top-left-radius: 0"
          :disabled="!updateForumCategories"
          @click="fetchData"
        >
          <v-icon>mdi-backspace-outline</v-icon>
        </v-btn>
      </template>
    </Dialog>
    <ConfirmationDialog
      ref="deleteTopicCategoryConfirmationDialog"
      :use-text-field="true"
      @submit="deleteTopicCategory"
    />
    <ConfirmationDialog
      ref="deleteTopicConfirmationDialog"
      :countdown="true"
      @submit="deleteTopic"
    />
    <DialogForm
      ref="addTopicCategoryDialog"
      :form-schema="topicCategoryForm"
      :title="$t('_forum.addTopicCategory')"
      :icon="'mdi-plus'"
      @submit="newTopicCategory"
    />
    <DialogForm
      ref="addTopicDialog"
      :form-schema="TopicForm"
      :title="$t('_forum.addTopic')"
      :icon="'mdi-plus'"
      @submit="newTopic"
    />
    <DialogForm
      ref="editTopicCategoryDialog"
      :form-schema="topicCategoryForm"
      :title="$t('_forum.editTopicCategory')"
      :icon="'mdi-pencil'"
      @submit="editTopicCategory"
    />
    <DialogForm
      ref="editTopicDialog"
      :form-schema="TopicForm"
      :title="$t('_forum.editTopic')"
      :icon="'mdi-pencil'"
      @submit="editTopic"
    />
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
import openapi from '../../api/openapi';

export default {
  name: 'Forum.vue',
  components: {
    PageTitleFlat,
    Sidebar,
    UserLink,
    DialogForm,
    Dialog,
    ConfirmationDialog,
  },
  data() {
    return {
      topicCategories: null,
      updateForumCategories: false,
      updateForumTopics: false,
      topicCategoryForm: ForumAddTopicCategory,
      TopicForm: ForumAddTopicForm,
      expansionPanel: null,
    };
  },
  computed: {
    selectedTopicCategory() {
      if (this.expansionPanel == null || !this.topicCategories) return null;
      return this.topicCategories[this.expansionPanel];
    },
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).forum_getTopicCategories().then((rsp) => {
        this.topicCategories = rsp.data;
        this.updateForumCategories = false;
        this.updateForumTopics = false;
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
      data.admin_group_ids = data.admin_groups.map((admin) => admin.id);
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
      const res = [];
      this.selectedTopicCategory.topics.forEach((item) => {
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
      this.$refs.addTopicDialog.setData({ topic_category_id: this.selectedTopicCategory.id });
    },
  },
};
</script>

<style scoped>
.cursor::v-deep td {
  cursor: pointer !important;
}

.v-list-item--link::before {
  border-bottom-right-radius: 10px !important;
  border-bottom-left-radius: 10px !important;
}

::v-deep .v-list-group__header::before {
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
}
</style>
