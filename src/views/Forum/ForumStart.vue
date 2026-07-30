<template>
  <div>
    <v-row class="mt-1">
      <v-col
        cols="12"
        lg="9"
      >
        <div v-if="showSkeletonLoaders">
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
        <div
          v-for="subforum in subforums"
          :key="subforum.id"
          class="mb-5"
        >
          <PageTitleFlat
            :title="subforum.title"
            :icon="subforum.icon || 'mdi-forum'"
            :hide-triangle="$vuetify.display.smAndDown || isCollapsed(subforum.id)"
            :no-bottom-border-radius="$vuetify.display.smAndDown"
            style="cursor: pointer;"
            @click="toggleSubforum(subforum.id)"
          >
            <template #end>
              <div class="d-flex justify-end">
                <v-icon color="white">
                  {{ isCollapsed(subforum.id) ? 'mdi-chevron-down' : 'mdi-chevron-up' }}
                </v-icon>
              </div>
            </template>
            <template
              v-if="subforum.description"
              #subtitle
            >
              <div class="text-body-2 text-white mt-1">
                {{ subforum.description }}
              </div>
            </template>
          </PageTitleFlat>
          <v-expand-transition>
            <div v-show="!isCollapsed(subforum.id)">
              <v-alert
                v-if="subforum.topic_categories.length === 0"
                color="info"
                variant="tonal"
                class="mt-3"
              >
                {{ $t('noDataAvailable') }}
              </v-alert>
              <v-card
                v-for="(category, index) in subforum.topic_categories"
                :key="category.id"
                class="mb-3 vh-forum card-rounded-bottom"
                flat
                :class="{ 'mt-4 card-rounded-top':!$vuetify.display.smAndDown,
                          'no-top-border-radius': $vuetify.display.smAndDown && index === 0,
                          'card-rounded-top': index !== 0 }"
              >
                <v-card-text class="pa-0 ma-0">
                  <v-list
                    :opened="categoryOpened(category.id)"
                    class="pb-0 pt-0"
                    @update:opened="val => toggleCategory(category.id, val)"
                  >
                    <v-list-group
                      value="group"
                      class="vh-topic-category"
                    >
                      <template #activator="{ props }">
                        <v-list-item
                          color="primary"
                          v-bind="props"
                          style="font-size: 1.5em;"
                        >
                          {{ category.title }}
                        </v-list-item>
                      </template>
                      <div
                        v-for="topic in category.topics"
                        :key="topic.id"
                        class="topic"
                      >
                        <v-divider style="border-width: 1px;" />
                        <v-list-item
                          density="compact"
                          class="ml-0 pl-4"
                          link
                          :to="{ name: 'ForumTopic', params: { id: topic.id } }"
                        >
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
                              <!-- Thread/post counts: fixed width so the icons
                                   align across topics regardless of last-post content -->
                              <div
                                v-if="$vuetify.display.lgAndUp"
                                class="d-flex align-center mr-1"
                                style="width: 120px"
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
                              <!-- Last post: fixed width (reserved even when empty)
                                   so the counts keep a consistent position -->
                              <div
                                v-if="$vuetify.display.mdAndUp"
                                class="d-flex justify-end"
                                style="width: 260px"
                              >
                                <template v-if="topic.last_post !== null">
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
                                      style="text-decoration: none"
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
                                </template>
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
                                v-if="!$vuetify.display.xs && topic.last_post"
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
                        </v-list-item>
                      </div>
                    </v-list-group>
                  </v-list>
                </v-card-text>
              </v-card>
            </div>
          </v-expand-transition>
        </div>
      </v-col>
      <!-- Sidebar -->
      <v-col
        cols="12"
        lg="3"
      >
        <ForumSidebar @manage="$refs.manageForumDialog.show()" />
      </v-col>
    </v-row>

    <!-- ManageForumDialog -->
    <Dialog
      ref="manageForumDialog"
      :max-width="1000"
      :title="$t('_forum.manageForum')"
      :icon="'mdi-card-multiple'"
    >
      <v-alert
        v-if="subforums && subforums.length === 0"
        color="info"
        icon="mdi-information"
      >
        {{ $t('noDataAvailable') }}
      </v-alert>
      <VueDraggable
        v-model="subforums"
        class="mt-5"
        style="width: 100%"
        handle=".subforum-drag"
        @dragend="updateSubforumOrder"
      >
        <v-card
          v-for="subforum in subforums"
          :key="subforum.id"
          variant="outlined"
          class="mb-2"
        >
          <div class="d-flex align-center pa-2">
            <v-icon
              v-if="subforum.icon"
              start
            >
              {{ subforum.icon }}
            </v-icon>
            {{ subforum.title }}
            <v-chip
              class="ml-2"
              size="x-small"
            >
              {{ subforum.topic_categories.length }}
            </v-chip>
            <v-spacer />
            <v-btn
              class="mr-1"
              color="primary"
              variant="outlined"
              size="small"
              @click.stop="openManageCategories(subforum)"
            >
              <v-icon start>
                mdi-format-list-bulleted
              </v-icon>
              {{ $t('_forum.manageCategories') }}
            </v-btn>
            <DragDropIcon class="subforum-drag mr-1" />
            <v-btn
              class="mr-1"
              color="primary"
              variant="outlined"
              size="small"
              @click.stop="openSubforumEditDialog(subforum)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              color="red"
              variant="outlined"
              size="small"
              @click.stop="$refs.deleteSubforumConfirmationDialog.show(subforum);
                           $refs.deleteSubforumConfirmationDialog.confirmationTextField = subforum.title;"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-card>
      </VueDraggable>
      <!-- Subforum Actions -->
      <template #actions>
        <v-btn
          variant="outlined"
          color="success"
          @click="$refs.addSubforumDialog.show()"
        >
          <v-icon>mdi-plus</v-icon>
          {{ $t('_forum.addSubforum') }}
        </v-btn>
      </template>
    </Dialog>

    <!-- ManageSubforumCategoriesDialog -->
    <Dialog
      ref="manageSubforumDialog"
      :max-width="1000"
      :title="activeSubforum
        ? `${$t('_forum.manageCategories')} — ${activeSubforum.title}`
        : $t('_forum.manageCategories')"
      :icon="'mdi-format-list-bulleted'"
    >
      <template v-if="activeSubforum">
        <v-alert
          v-if="activeSubforum.topic_categories.length === 0"
          color="info"
          icon="mdi-information"
        >
          {{ $t('noDataAvailable') }}
        </v-alert>
        <!-- Topic Categories -->
        <VueDraggable
          v-model="activeSubforum.topic_categories"
          class="mt-3"
          handle=".category-drag"
          @dragend="updateCategoryOrder(activeSubforum)"
        >
          <v-card
            v-for="category in activeSubforum.topic_categories"
            :key="category.id"
            variant="outlined"
            class="mb-2"
          >
            <div class="d-flex align-center pa-2">
              {{ category.title }}
              <v-spacer />
              <DragDropIcon class="category-drag mr-1" />
              <v-btn
                class="mr-1"
                color="primary"
                variant="outlined"
                size="x-small"
                @click.stop="openTopicCategoryEditDialog(category)"
              >
                <v-icon size="small">
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                color="red"
                variant="outlined"
                size="x-small"
                @click.stop="$refs.deleteTopicCategoryConfirmationDialog.show(category);
                             $refs.deleteTopicCategoryConfirmationDialog.confirmationTextField = category.title;"
              >
                <v-icon size="small">
                  mdi-delete
                </v-icon>
              </v-btn>
            </div>
            <v-divider />
            <!-- Topics -->
            <v-list v-if="category.topics && category.topics.length">
              <VueDraggable
                v-model="category.topics"
                handle=".topic-drag"
                @dragend="updateTopicOrder(category)"
              >
                <v-list-item
                  v-for="topic in category.topics"
                  :key="topic.id"
                >
                  <v-row>
                    <v-col>
                      <v-icon start>
                        {{ topic.icon }}
                      </v-icon>
                      {{ topic.title }}
                    </v-col>
                    <v-col class="text-right">
                      <DragDropIcon class="topic-drag mr-1" />
                      <v-btn
                        class="ml-1 mr-1"
                        color="primary"
                        variant="outlined"
                        size="x-small"
                        @click.stop="openTopicEditDialog(topic, category.id)"
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
                  <v-divider class="mt-3" />
                </v-list-item>
              </VueDraggable>
            </v-list>
            <!-- Topic Actions -->
            <div class="d-flex align-center justify-end pb-1 pr-4">
              <v-btn
                color="success"
                size="small"
                variant="outlined"
                @click="openAddTopicDialog(category)"
              >
                <v-icon size="small">
                  mdi-plus
                </v-icon>
                {{ $t('_forum.addTopic') }}
              </v-btn>
            </div>
          </v-card>
        </VueDraggable>
      </template>
      <!-- Category Actions -->
      <template #actions>
        <v-btn
          variant="outlined"
          color="success"
          @click="openAddCategoryDialog(activeSubforum)"
        >
          <v-icon>mdi-plus</v-icon>
          {{ $t('_forum.addCategory') }}
        </v-btn>
      </template>
    </Dialog>
    <ConfirmationDialog
      ref="deleteSubforumConfirmationDialog"
      :use-text-field="true"
      @submit="deleteSubforum"
    />
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
      ref="addSubforumDialog"
      :form-schema="subforumForm"
      :title="$t('_forum.addSubforum')"
      :icon="'mdi-plus'"
      @submit="newSubforum"
    />
    <DialogForm
      ref="editSubforumDialog"
      :form-schema="subforumForm"
      :title="$t('_forum.editSubforum')"
      :icon="'mdi-pencil'"
      @submit="editSubforum"
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
import ForumAddSubforumForm from '@/forms/ForumAddSubforumForm';
import ForumAddTopicCategory from '@/forms/ForumAddTopicCategoryForm';
import ForumAddTopicForm from '@/forms/ForumAddTopicForm';
import openapi from '../../api/openapi';
import {VueDraggable} from "vue-draggable-plus";

export default {
  components: {VueDraggable},
  data() {
    return {
      subforums: [],
      subforumForm: ForumAddSubforumForm,
      topicCategoryForm: ForumAddTopicCategory,
      TopicForm: ForumAddTopicForm,
      activeSubforum: null,
      collapsedSubforums: {},
      collapsedCategories: {},
      showSkeletonLoaders: true,
    };
  },
  beforeMount() {
    this.loadCollapseState();
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).forum_getSubforums().then((rsp) => {
        this.subforums = rsp.data;
        if (this.activeSubforum) {
          this.activeSubforum = this.subforums
            .find((s) => s.id === this.activeSubforum.id) || null;
        }
        this.showSkeletonLoaders = false;
      });
    },
    openManageCategories(subforum) {
      this.activeSubforum = subforum;
      this.$refs.manageSubforumDialog.show();
    },
    loadCollapseState() {
      this.collapsedSubforums = this.readCollapseState('forum.collapsedSubforums');
      this.collapsedCategories = this.readCollapseState('forum.collapsedCategories');
    },
    readCollapseState(key) {
      try {
        return JSON.parse(localStorage.getItem(key)) || {};
      } catch (e) {
        return {};
      }
    },
    isCollapsed(id) {
      return !!this.collapsedSubforums[id];
    },
    toggleSubforum(id) {
      this.collapsedSubforums[id] = !this.collapsedSubforums[id];
      localStorage.setItem('forum.collapsedSubforums', JSON.stringify(this.collapsedSubforums));
    },
    categoryOpened(id) {
      return this.collapsedCategories[id] ? [] : ['group'];
    },
    toggleCategory(id, opened) {
      if (opened.includes('group')) {
        delete this.collapsedCategories[id];
      } else {
        this.collapsedCategories[id] = true;
      }
      localStorage.setItem('forum.collapsedCategories', JSON.stringify(this.collapsedCategories));
    },
    // Subforum
    async newSubforum() {
      const data = this.$refs.addSubforumDialog.getData();
      (await openapi).forum_createSubforum(null, data).then(() => {
        this.fetchData();
        this.$refs.addSubforumDialog.closeAndReset();
        this.$notify({
          title: this.$t('_messages.createSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addSubforumDialog.setError(err);
      });
    },
    openSubforumEditDialog(item) {
      const data = item;
      if (data.requirement_set) data.requirement_set_id = data.requirement_set.id;
      this.$refs.editSubforumDialog.show(data);
      this.$refs.editSubforumDialog.setData(data);
    },
    async editSubforum(item) {
      const data = this.$refs.editSubforumDialog.getData();
      if (!data.requirement_set_id) data.requirement_set_id = null;
      (await openapi).forum_editSubforum(item.id, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
        this.$refs.editSubforumDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.editSubforumDialog.setError(err);
      });
    },
    async deleteSubforum(item) {
      (await openapi).forum_deleteSubforum(item.id).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteSubforumConfirmationDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.deleteSubforumConfirmationDialog.setError(err);
      });
    },
    async updateSubforumOrder() {
      const res = this.subforums.map((item) => item.id);
      (await openapi).forum_updateSubforumOrder(null, res).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.updateOrderSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(`${err}`);
      });
    },
    // Topic Category
    openAddCategoryDialog(subforum) {
      this.$refs.addTopicCategoryDialog.show();
      this.$refs.addTopicCategoryDialog.setData({ subforum_id: subforum.id });
    },
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
    openTopicCategoryEditDialog(item) {
      const data = item;
      if (data.requirement_set) data.requirement_set_id = data.requirement_set.id;
      if (data.subforum) data.subforum_id = data.subforum.id;
      this.$refs.editTopicCategoryDialog.show(data);
      this.$refs.editTopicCategoryDialog.setData(data);
    },
    async editTopicCategory(item) {
      const data = this.$refs.editTopicCategoryDialog.getData();
      if (!data.requirement_set_id) data.requirement_set_id = null;
      (await openapi).forum_editTopicCategory(item.id, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
        this.$refs.editTopicCategoryDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.editTopicCategoryDialog.setError(err);
      });
    },
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
    async updateCategoryOrder(subforum) {
      const res = subforum.topic_categories.map((item) => item.id);
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
    // Topic
    openAddTopicDialog(category) {
      this.$refs.addTopicDialog.show();
      this.$refs.addTopicDialog.setData({ topic_category_id: category.id });
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
    async updateTopicOrder(category) {
      const res = category.topics.map((item) => item.id);
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
  },
};
</script>

<style scoped>
</style>
