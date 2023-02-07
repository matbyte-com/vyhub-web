<template>
  <div>
    <PageTitle icon="mdi-ticket-confirmation">{{ $t('_forum.TopicCategories') }}</PageTitle>
    <v-card>
      <v-list subheader two-line>
        <v-list-group
            sub-group
          :value="true"
          v-for="category in topicCategories" :key="category.id"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ category.title }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="topic in category.topics" :key="topic.id"
            link
            :to="{ name: 'ForumTopic', params: { id: topic.id } }"
            class="ml-9 topic mr-3"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon class="mr-3">{{ topic.icon }}</v-icon>
                {{ topic.title }}
              </v-list-item-title>
              <v-list-item-subtitle style="white-space: normal; overflow-wrap: break-word;">
                {{ topic.description }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

        </v-list-group>
        <template>
          <div class="text-right" v-if="$checkProp('forum_edit')">
            <v-btn class="mr-3 mt-3" color="success" outlined
                   @click="$refs.editTopicCategoriesDialog.show()">
              <v-icon left>mdi-card-multiple</v-icon>
              <span>{{ $t('_forum.manageTopicCategories') }}</span>
            </v-btn>
            <v-btn class="mr-3 mt-3" color="success" outlined
                   @click="$refs.editTopicsDialog.show()">
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
        <v-btn @click="$refs.addTopicCategoryDialog.show()">
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
        <v-btn @click="$refs.addTopicDialog.show()">
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
import PageTitle from '../components/PageTitle.vue';
import openapi from '../api/openapi';

export default {
  components: {
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
      TopicDescriptionLimit: 75, // Hardcoded to solve some problems on small screens
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).forum_getTopicCategories().then((rsp) => {
        this.topicCategories = rsp.data;
        this.selectedTopicCategory = this.topicCategories[0].id;
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
      if (data.description.length > this.TopicDescriptionLimit) {
        this.$refs.addTopicDialog.setErrorMessage(this.$t('_forum.messages.topicDescriptionTooLong'));
        return;
      }
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
      data.admin_ids = data.admins;
      data.topic_category_id = categoryId;
      this.$refs.editTopicDialog.setData(data);
    },
    async editTopic(item) {
      const data = this.$refs.editTopicDialog.getData();
      if (data.description.length > this.TopicDescriptionLimit) {
        this.$refs.editTopicDialog.setErrorMessage(this.$t('_forum.messages.topicDescriptionTooLong'));
        return;
      }
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

.topic:hover {
  box-shadow: #545454 0px 0px 5px 0px;
}
</style>
