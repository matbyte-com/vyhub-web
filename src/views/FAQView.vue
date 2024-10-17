<template>
  <div>
    <PageTitleFlat :title="$t('faq')">
      <template
        v-if="$checkProp('faq_edit')"
        #end
      >
        <div class="justify-end d-flex">
          <v-btn
            color="success"
            variant="flat"
            size="small"
            @click="$refs.addQuestionDialog.show()"
          >
            <v-icon start>
              mdi-plus
            </v-icon>
            {{ $t('_faq.add') }}
          </v-btn>
        </div>
      </template>
    </PageTitleFlat>
    <div
      v-if="showSkeletonLoaders"
      class="mt-4"
    >
      <v-skeleton-loader
        type="list-item"
        class="mb-3"
      />
      <v-skeleton-loader
        type="list-item"
        class="mb-3"
      />
      <v-skeleton-loader
        type="list-item"
        class="mb-3"
      />
    </div>
    <v-card
      class="vh-faq card-rounded mt-4"
      flat
    >
      <v-expansion-panels
        flat
      >
        <VueDraggable
          v-model="questions"
          :disabled="!$checkProp('faq_edit')"
          style="width: 100%"
          @dragend="updateLinkOrder"
        >
          <v-expansion-panel
            v-for="(question, index) in questions"
            :key="question.id"
          >
            <v-expansion-panel-title class="d-flex align-center flex-wrap">
              <v-icon
                v-if="question.icon"
                class="mr-3"
              >
                {{ question.icon }}
              </v-icon>
              <b>
                <span class="text-primary">{{ String(index + 1).padStart(2, '0') }}.</span>
                <span class="ml-2">{{ question.title }}</span>
              </b>
              <v-spacer />
              <DragDropIcon
                v-if="$checkProp('faq_edit')"
                class="mr-1"
              />
              <v-btn
                v-if="$checkProp('faq_edit')"
                variant="outlined"
                color="primary"
                size="small"
                class="mr-1"
                @click.stop="openQuestionEditDialog(question)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                v-if="$checkProp('faq_edit')"
                variant="outlined"
                color="error"
                size="small"
                @click.stop="$refs.deleteQuestionConfirmationDialog.show(question)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <span
                v-html="question.content"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </VueDraggable>
      </v-expansion-panels>
    </v-card>
    <DialogForm
      ref="addQuestionDialog"
      :width="700"
      :max-width="700"
      :title="$t('_faq.addQuestionDialog')"
      icon="mdi-chat-question"
      :form-schema="faqAddSchema"
      @submit="addQuestion"
    >
      <template #form-after>
        <Editor
          v-model="content"
        />
      </template>
    </DialogForm>
    <DeleteConfirmationDialog
      ref="deleteQuestionConfirmationDialog"
      @submit="deleteQuestion"
    />
    <DialogForm
      ref="editQuestionDialog"
      :title="$t('_faq.editQuestionDialog')"
      icon="mdi-chat-question"
      :form-schema="faqAddSchema"
      @submit="editQuestion"
    >
      <template #form-after>
        <Editor v-model="content" />
      </template>
    </DialogForm>
  </div>
</template>

<script>
import openapi from '../api/openapi';
import FaqForm from '../forms/FaqForm';
import {VueDraggable} from "vue-draggable-plus";

export default {
  components: {VueDraggable},
  data() {
    return {
      questions: [],
      content: '',
      faqAddSchema: FaqForm,
      showSkeletonLoaders: true,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).faq_getFaq().then((rsp) => {
        this.questions = rsp.data;
        this.showSkeletonLoaders = false;
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
      const order = this.questions.map((c) => c.id);
      (await openapi).faq_updateOrder(null, order).then(() => {
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
:deep(.v-expansion-panel-title__icon i) {
  color: rgb(var(--v-theme-primary)) !important;
}
</style>
