<template>
  <div>
    <v-list>
      <DataIterator
        :items="comments"
        sort-by="date"
        :sort-desc="true"
      >
        <template #default="props">
          <v-list-item
            v-for="comment in props.items"
            :key="comment.id"
            class="mb-1"
            :style="`border-color: ${comment.color}; border-width: 0 0 0 10px; border-style: solid;`"
          >
            <div class="pb-1">
              <div class="mb-2">
                {{ comment.message }}
              </div>
              <div>
                <div class="d-flex align-center justify-space-between">
                  <UserLink
                    v-if="comment.creator != null"
                    :user="comment.creator"
                    :simple="true"
                  />
                  <span class="text-disabled">{{ new Date(comment.date).toLocaleString() }}</span>
                  <v-btn
                    v-if="($checkProp(`${type}_comment_edit`) &&
                      comment.creator_id &&
                      $store.getters.user &&
                      $store.getters.user.id === comment.creator_id) ||
                      ($checkProp(`${type}_comment_delete`))"
                    variant="outlined"
                    color="error"
                    size="small"
                    @click="$refs.commentDeleteConfirm.show(comment)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
          </v-list-item>
        </template>
        <template
          v-if="!noAddBtn"
          #footer-left
        >
          <v-btn
            variant="outlined"
            color="success"
            @click="$refs.commentAddDialog.show()"
          >
            <v-icon start>
              mdi-comment-plus
            </v-icon>
            {{ $t('comment') }}
          </v-btn>
        </template>
      </DataIterator>
    </v-list>
    <DialogForm
      ref="commentAddDialog"
      :max-width="600"
      :form-schema="CommentForm"
      :title="$t('comment')"
      icon="mdi-comment-plus"
      @submit="addComment"
    />
    <DeleteConfirmationDialog
      ref="commentDeleteConfirm"
      @submit="deleteComment"
    />
  </div>
</template>

<script>
import UserLink from '@/components/UserLink.vue';
import openapi from '@/api/openapi';
import DialogForm from '@/components/DialogForm.vue';
import CommentForm from '@/forms/CommentForm';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import DataIterator from '@/components/DataIterator.vue';

export default {
  components: {
    DataIterator,
    DeleteConfirmationDialog,
    DialogForm,
    UserLink,
  },
  props: {
    type: String,
    categories: Array,
    objId: String,
    showSearch: Boolean,
    noAddBtn: Boolean,
    showCategory: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      comments: [],
      search: null,
      CommentForm,
    };
  },
  watch: {
    objId() {
      this.fetchData();
    },
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const api = await openapi;

      let getCommentsFn = null;
      let params = [];

      if (this.type === 'user') {
        getCommentsFn = api.user_getComments;
        params = [{ uuid: this.objId }];
      } else if (this.type === 'ban') {
        getCommentsFn = api.ban_getComments;
        params = [{ uuid: this.objId }];
      } else {
        return;
      }

      getCommentsFn(...params).then((rsp) => {
        this.comments = rsp.data;
      });
    },
    async addComment() {
      const api = await openapi;

      const data = this.$refs.commentAddDialog.getData();

      let addCommentFn = null;

      if (this.type === 'user') {
        data.user_id = this.objId;
        addCommentFn = api.user_createComment;
      } else if (this.type === 'ban') {
        data.ban_id = this.objId;
        addCommentFn = api.ban_createComment;
      }

      addCommentFn(null, data).then(() => {
        this.$refs.commentAddDialog.closeAndReset();
        this.fetchData();
      });
    },
    async deleteComment(comment) {
      const api = await openapi;

      let deleteCommentFn = null;

      if (this.type === 'user') {
        deleteCommentFn = api.user_deleteComment;
      } else if (this.type === 'ban') {
        deleteCommentFn = api.ban_deleteComment;
      }

      deleteCommentFn({ uuid: comment.id }).then(() => {
        this.$refs.commentDeleteConfirm.closeAndReset();
        this.fetchData();
      });
    },
  },
};
</script>

<style scoped>

</style>
