<template>
  <div>
    <SettingTitle docPath="/guide/faq">
      {{ $t('_faq.title') }}
    </SettingTitle>
    <v-row no-gutters> <!-- das brauchen wir nicht -->
    <v-col>  <!-- das brauchen wir nicht -->
    <v-list>
      <draggable
        :list="questions"
        @change="updateFaqEnabled = true">
        <div
          v-for="question in questions"
          :key="question.title">
          <v-list-item>
            <v-row >
              <v-col cols="2">
                {{ question.title }}
              </v-col>
              <v-col cols="8">
                <span v-html="question.content" class="ql-editor"/>
              </v-col>
              <v-col class="text-right">
                <v-btn outlined color="primary" small
                       @click="openQuestionEditDialog(question)" class="mr-1">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn outlined color="error" small
                       @click="$refs.deleteQuestionConfirmationDialog.show(question)">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-list-item>
        </div>
      </draggable>
    </v-list>
    </v-col>  <!-- das brauchen wir nicht -->
    </v-row>  <!-- das brauchen wir nicht -->
    <v-divider />
    <v-col cols="12" md="6">
      <v-btn @click="$refs.addQuestionDialog.show()" color="success" outlined>
        <v-icon left>mdi-plus</v-icon>
        <span>{{ $t('_faq.add') }}</span>
      </v-btn>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs}">
          <v-btn outlined color="primary" class="ml-5" v-on="on" v-bind="attrs"
                 style="border-top-right-radius: 0; border-bottom-right-radius: 0"
                 @click="updateLinkOrder" :disabled="!updateFaqEnabled">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </template>
        <span>
            {{ $t('_faq.update') }}
          </span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs}">
          <v-btn outlined color="primary" v-on="on" v-bind="attrs"
                 style="border-bottom-left-radius: 0; border-top-left-radius: 0"
                 @click="fetchData" :disabled="!updateFaqEnabled">
            <v-icon>mdi-backspace-outline</v-icon>
          </v-btn>
        </template>
        <span>
            {{ $t('_faq.reset') }}
          </span>
      </v-tooltip>
    </v-col>
    <DialogForm :title="$t('_faq.addQuestionDialog')" icon="mdi-chat-question"
                ref="addQuestionDialog"
                :form-schema="faqAddSchema"
                @submit="addQuestion">
      <template v-slot:title-after>
        <Editor v-model="content"/> <!-- Editor für das hinzufügen einer neuen Antwort. -->
      </template>
    </DialogForm>
    <DeleteConfirmationDialog ref="deleteQuestionConfirmationDialog"
                              @submit="deleteQuestion"/>
    <DialogForm :title="$t('_faq.editQuestionDialog')" icon="mdi-chat-question"
                ref="editQuestionDialog"
                :form-schema="faqAddSchema"
                @submit="editQuestion">
      <template v-slot:title-after>
        <Editor v-model="content"/> <!-- Editor für das Editieren einer bestehenden Antwort. -->
      </template>
      </DialogForm>
  </div>
</template>

<script>
import DialogForm from '@/components/DialogForm.vue';
import openapi from '@/api/openapi';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import SettingTitle from './SettingTitle.vue';
import FaqForm from '@/forms/FaqForm';
import Editor from '@/components/Editor.vue';
import i18n from '@/plugins/i18n';

export default {
  name: 'FAQ',
  components: {
    DialogForm,
    SettingTitle,
    DeleteConfirmationDialog,
    Editor,
  },
  data() {
    return {
      questions: null,
      content: null, // content des Editors
      faqAddSchema: FaqForm,
      questionAddSchema: null,
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
        this.$refs.addQuestionDialog.setErrorMessage(i18n.t('_faq.messages.contentEmpty'));
        return;
      }
      (await openapi).faq_createQuestion(null, data).then(() => {
        this.$refs.addQuestionDialog.closeAndReset();
        this.content = null;
        this.fetchData();
        this.$notify({
          title: this.$t('_faq.messages.addSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addQuestionDialog.setErrorMessage(err.response.data.detail);
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
          title: this.$t('_faq.messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteQuestionConfirmationDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.deleteQuestionConfirmationDialog.setErrorMessage(err.response.data.detail);
      });
    },
    async editQuestion(question) {
      const data = this.$refs.editQuestionDialog.getData();
      data.content = this.content;
      if (!this.content) {
        this.$refs.editQuestionDialog.setErrorMessage(i18n.t('_faq.messages.contentEmpty'));
        return;
      }
      (await openapi).faq_editQuestion(question.id, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_faq.messages.editSuccess'),
          type: 'success',
        });
        this.content = null;
        this.$refs.editQuestionDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.editQuestionDialog.setErrorMessage(err.response.data.details);
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
          title: this.$t('_faq.messages.updatedOrder'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(`${err}`);
      });
    },
  },
};
</script>
