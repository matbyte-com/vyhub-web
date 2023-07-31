<template>
  <div>
    <PageTitle icon="mdi-chat-question">{{ $t('faq') }}</PageTitle>
    <div class="text-right" v-if="$checkProp('faq_edit')">
        <v-btn color="success" small @click="$refs.addQuestionDialog.show()">
          <v-icon left>
            mdi-plus
          </v-icon>
          {{ $t('_faq.add') }}
        </v-btn>
      <v-card class="ml-3" style="display: inline-block">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs}">
            <v-btn color="primary" v-on="on" v-bind="attrs"
                   style="border-top-right-radius: 0; border-bottom-right-radius: 0" small
                   @click="updateLinkOrder" :disabled="!updateFaqEnabled">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </template>
          <span>
          {{ $t('_settings.labels.updateOrder') }}
        </span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs}">
            <v-btn color="primary" v-on="on" v-bind="attrs"
                   style="border-bottom-left-radius: 0; border-top-left-radius: 0" small
                   @click="fetchData" :disabled="!updateFaqEnabled">
              <v-icon>mdi-backspace-outline</v-icon>
            </v-btn>
          </template>
          <span>
          {{ $t('_settings.labels.resetOrder') }}
        </span>
        </v-tooltip>
      </v-card>
    </div>
    <v-expansion-panels>
      <draggable :list="questions" :disabled="!$checkProp('faq_edit')"
                 @change="updateFaqEnabled = true" style="width: 100%">
        <v-expansion-panel v-for="question in questions" :key="question.id" class="mt-3">
          <v-card class="vh-faq">
            <v-expansion-panel-header>
              <v-row>
                <v-col cols="11" class="d-flex align-center">
                  <v-icon v-if="question.icon" class="mr-2">{{ question.icon }}</v-icon>
                  <b>
                    {{ question.title }}
                  </b>
                </v-col>
                <v-col class="text-right mr-1" v-if="$checkProp('faq_edit')">
                  <v-btn outlined color="primary" small
                         @click.stop="openQuestionEditDialog(question)" class="mr-1">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn outlined color="error" small
                         @click.stop="$refs.deleteQuestionConfirmationDialog.show(question)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content :style="{ background: 'rgba(19,19,19,0.2)' }">
              <v-divider />
              <span v-html="question.content" class="ql-editor"></span>
            </v-expansion-panel-content>
          </v-card>
        </v-expansion-panel>
      </draggable>
    </v-expansion-panels>
    <DialogForm :title="$t('_faq.addQuestionDialog')" icon="mdi-chat-question"
                ref="addQuestionDialog"
                :form-schema="faqAddSchema"
                @submit="addQuestion">
      <template v-slot:title-after>
        <Editor v-model="content"/>
      </template>
    </DialogForm>
    <DeleteConfirmationDialog ref="deleteQuestionConfirmationDialog"
                              @submit="deleteQuestion"/>
    <DialogForm :title="$t('_faq.editQuestionDialog')" icon="mdi-chat-question"
                ref="editQuestionDialog"
                :form-schema="faqAddSchema"
                @submit="editQuestion">
      <template v-slot:title-after>
        <Editor v-model="content"/>
      </template>
    </DialogForm>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import openapi from '../api/openapi';
import DialogForm from '../components/DialogForm.vue';
import Editor from '../components/Editor.vue';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog.vue';
import FaqForm from '../forms/FaqForm';

export default {
  name: 'FAQ',
  components: {
    PageTitle,
    DialogForm,
    Editor,
    DeleteConfirmationDialog,
  },
  data() {
    return {
      questions: null,
      content: null,
      faqAddSchema: FaqForm,
      updateFaqEnabled: false,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).faq_getFaq().then((rsp) => {
        this.questions = rsp.data;
        this.updateFaqEnabled = false;
      });
    },
    async addQuestion() {
      const data = this.$refs.addQuestionDialog.getData();
      data.content = this.content;
      if (!this.content) {
        this.$refs.addQuestionDialog.setErrorMessage(this.$t('_faq.messages.contentEmpty'));
        return;
      }
      (await openapi).faq_createQuestion(null, data).then(() => {
        this.$refs.addQuestionDialog.closeAndReset();
        this.content = null;
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addQuestionDialog.setError(err);
      });
    },
    openQuestionEditDialog(question) {
      this.$refs.editQuestionDialog.show(question);
      this.content = question.content;
      this.$refs.editQuestionDialog.setData(question);
    },
    async deleteQuestion(question) {
      (await openapi).faq_deleteQuestion(question.id).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteQuestionConfirmationDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.deleteQuestionConfirmationDialog.setError(err);
      });
    },
    async editQuestion(question) {
      const data = this.$refs.editQuestionDialog.getData();
      data.content = this.content;
      if (!this.content) {
        this.$refs.editQuestionDialog.setErrorMessage(this.$t('_faq.messages.contentEmpty'));
        return;
      }
      (await openapi).faq_editQuestion(question.id, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
        this.content = null;
        this.$refs.editQuestionDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.editQuestionDialog.setError(err);
      });
    },
    async updateLinkOrder() {
      const res = [];
      this.questions.forEach((item) => {
        res.push(item.id);
      });
      (await openapi).faq_updateOrder(null, res).then(() => {
        this.fetchData();
        this.updateFaqEnabled = false;
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
