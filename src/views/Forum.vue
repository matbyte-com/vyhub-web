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
            class="ml-9 cat mr-3"
          >
            <v-icon>{{ topic.icon }}</v-icon>
            <v-list-item-title class="ml-3">{{ topic.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ topic.description }}</v-list-item-subtitle>
          </v-list-item>

        </v-list-group>
        <!--
        <v-subheader inset>Forum is WIP</v-subheader>
        <v-list-item v-for="item in topicCategories" :key="item.id">
          <v-list-item-avatar>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content @click="showTopicCategory" items="topicCategory">
            <template class="cursor">
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.content }}
              </v-list-item-subtitle>
            </template>
          </v-list-item-content>
        </v-list-item>-->
        <template>
          <div class="text-right">
            <v-btn class="mr-3 mt-3" color="success" outlined
                   @click="$refs.editTopicCategoriesDialog.show()">
              <v-icon left>mdi-plus</v-icon>
              <span>{{ $t('_forum.addTopicCategory') }}</span>
            </v-btn>
            <v-btn class="mr-3 mt-3" color="success" outlined
                   @click="$refs.editTopicsDialog.show()">
              <v-icon left>mdi-plus</v-icon>
              <span>{{ $t('_forum.addTopic') }}</span>
            </v-btn>
          </div>
        </template>
      </v-list>
    </v-card>
    <!-- TopicCategoryDialog -->
    <Dialog ref="editTopicCategoriesDialog"
            :title="$t('_forum.editTopicCategory')">
      <template>
        <v-list>
          <draggable :list="topicCategories">
            <v-list-item v-for="category in topicCategories" :key="category.id">
              <v-row>
                <v-col>
                  {{ category.title }}
                </v-col>
                <v-col class="text-right">
                  <v-btn class="mr-1" @click.stop="$refs.editTopicCategoryDialog.show(category)"
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
        <v-btn @click="$refs.addTopicCategoryDialog.show()">{{ $t('_forum.addCategory') }}</v-btn>
        <v-btn @click="updateCategoryOrder">{{ $t('_forum.save') }}</v-btn>
      </template>
    </Dialog>
    <!-- TopicDialog -->
    <Dialog ref="editTopicsDialog" v-if="topicCategories">
      <template>
        <v-select :items="topicCategories.map(category =>
        ({text: category.title, value: category.id}))"
                  v-model="selectedTopicCategory"/>
        <v-list v-if="getSelectedCategory">
          <draggable>
            <v-list-item v-for="topic in getSelectedCategory.topics" :key="topic.id">
              <v-row>
                <v-col>
                  {{ topic.title }}
                </v-col>
                <v-col class="text-right">
                  <v-btn @click.stop="openTopicEditDialog(topic)"
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
        <v-btn @click="$refs.addTopicDialog.show()">Add Topic</v-btn>
      </template>
    </Dialog>
    <!--
    <DeleteTopicCategoryDialog ref="deleteTopicCategoryConfirmationDialog"
                              @submit="deleteTopicCategory"/>-->
    <ConfirmationDialog ref="deleteTopicCategoryConfirmationDialog"
                        @submit="deleteTopicCategory"
                        :confirmation-text-field-label="$t('_forum.deleteCategory')"/>
    <ConfirmationDialog ref="deleteTopicConfirmationDialog"
                        @submit="deleteTopic"
                        :confirmation-text-field-label="$t('_forum.deleteTopic')"/>
    <DialogForm :form-schema="TopicCategoryForm"
              @submit="newTopicCategory"
              ref="addTopicCategoryDialog"/>
    <DialogForm :form-schema="TopicForm"
                @submit="newTopic"
                ref="addTopicDialog"/>
    <DialogForm :form-schema="TopicCategoryForm"
                @submit="editTopicCategory"
                ref="editTopicCategoryDialog"/>
    <DialogForm :form-schema="TopicForm"
                @submit="editTopic"
                ref="editTopicDialog"/>
    <!-- OLD
    <TopicAddDialog ref="addTopicDialog" :dialog-title="$t('__forum.addTopic')"
                     @submit="newTopicCategory"/>-->
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
      TopicCategoryForm: ForumAddTopicCategory,
      TopicForm: ForumAddTopicForm,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).forum_getTopicCategories().then((rsp) => {
        this.topicCategories = rsp.data;
      });
    },
    /* OLD
    async newTopicCategory() {
      const data = this.$refs.addTopicDialog.getData();
      (await openapi).forum_createTopicCategory(null, data).then(() => {
        this.$refs.addTopicDialog.close();
        this.fetchData();
        this.$notify({
          title: this.$t('__forum.TopicCategoryCreated'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addTopicDialog.setError(err);
      });
    },
    */
    /*
    ticketRowFormatter(item) {
      const add = (this.$vuetify.theme.dark ? 'darken-4' : 'lighten-4');

      if (item.status === 'CLOSED') {
        return `red ${add}`;
      }

      return `green ${add}`;
    },
    */
    // Hinzufügen
    async newTopicCategory() {
      const data = this.$refs.addTopicCategoryDialog.getData();
      (await openapi).forum_createTopicCategory(null, data).then(() => {
        this.fetchData();
        this.$refs.addTopicCategoryDialog.closeAndReset();
        this.$notify({
          title: this.$t('_forum.messages.TopicCategoryCreated'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addTopicCategoryDialog.setError(err);
      });
    },
    async newTopic() {
      const data = this.$refs.addTopicDialog.getData();
      data.topic_category_id = data.category.id; // Okay, es funktioniert...
      if (data.description.length > 75) {
        this.$refs.addTopicDialog.setErrorMessage(this.$t('_forum.messages.TopicDescriptionTooLong'));
        return;
      }
      (await openapi).forum_createTopic(null, data).then(() => {
        this.fetchData();
        this.$refs.addTopicDialog.closeAndReset();
        this.$notify({
          title: this.$t('_forum.messages.TopicCreated'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addTopicDialog.setError(err);
      });
    },
    // Bearbeiten
    async editTopicCategory(item) {
      const data = this.$refs.editTopicCategoryDialog.getData();
      (await openapi).forum_editTopicCategory(item.id, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_forum.messages.TopicCategoryEdited'),
          type: 'success',
        });
        this.$refs.editTopicCategoryDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.editTopicCategoryDialog.setError(err);
      });
    },
    openTopicEditDialog(item) {
      this.$refs.editTopicDialog.show(item);
      console.log(item);
      this.$refs.editTopicDialog.setData(item);
    },
    async editTopic(item) {
      const data = this.$refs.editTopicDialog.getData();
      if (data.description.length > 75) {
        this.$refs.editTopicDialog.setErrorMessage(this.$t('_forum.messages.TopicDescriptionTooLong'));
        return;
      }
      (await openapi).forum_editTopic(item.id, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_forum.messages.TopicEdited'),
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
    goToTopic(item) {
      // const id = item.id.substring(0, 8);
      // const title = item.title.replace(/\s/g, '_');
      // const router_id = id + title;
      // this.$router.push({ name: 'ForumTopic', params: { id: router_id.toLowerCase() } });
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

.cat {
  transition: transform 0.7s ease-in-out;
}
.cat:hover {
  transform: scale(1.01);
  box-shadow: #545454 0px 0px 5px 0px;
}
</style>
