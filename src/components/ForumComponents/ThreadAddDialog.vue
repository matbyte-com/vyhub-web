<template>
  <Dialog
    ref="dialog"
    :title="dialogTitle"
    icon="mdi-newspaper-variant-outline"
    :max-width="1000"
  >
    <v-row v-if="errorMsg != null">
      <v-col
        cols="12"
        class="mt-4"
      >
        <v-alert
          type="error"
        >
          {{ errorMsg }}
        </v-alert>
      </v-col>
    </v-row>
    <v-text-field
      v-if="!hideTitleInput"
      v-model="title"
      variant="underlined"
      :label="$t('title')"
    />
    <v-select
      v-if="showCategory"
      v-model="category_id"
      :items="categories"
      item-title="name"
      item-value="id"
      variant="underlined"
      :label="$t('category')"
    />
    <editor
      v-model="content"
      :class="hideTitleInput ? 'mt-3' : ''"
    />
    <template #actions>
      <v-btn
        v-if="content !== ''"
        variant="text"
        color="primary"
        :disabled="!hideTitleInput && (title == null || title === '')"
        @click="$emit('submit', obj)"
      >
        <v-progress-circular
          v-if="loading"
          indeterminate
          size="25"
          width="2"
        />
        <v-icon
          v-if="!loading"
          start
        >
          mdi-check
        </v-icon>
        <div v-if="!loading">
          {{ $t('submit') }}
        </div>
      </v-btn>
      <v-btn
        color="lighten-5"
        variant="text"
        @click="close"
      >
        <v-icon start>
          mdi-close
        </v-icon>
        {{ $t('cancel') }}
      </v-btn>
    </template>
  </Dialog>
</template>

<script>
import config from '../../config';
import i18n from '../../plugins/i18n';
import openapi from '../../api/openapi';

export default {
  props: ['dialogTitle', 'hideTitleInput', 'showCategory'],
emits: ['submit'],
  data() {
    return {
      title: null,
      content: '',
      ban_id: '',
      topic_id: '',
      category_id: null,
      categories: [],
      pinned: false,
      loading: false,
      errorMsg: null,
      obj: null,
    };
  },
  methods: {
    getData() {
      if (this.content && this.content.length > config.html_max_input_length) {
        this.errorMsg = i18n.global.t('maxInputExceeded', { length: config.html_max_input_length });
      }
      this.loading = true;
      return {
        title: this.title,
        content: this.content || '',
        pinned: this.pinned,
        ...(this.showCategory ? { category_id: this.category_id } : {}),
      };
    },
    async fetchCategories() {
      const api = await openapi;
      api.forum_getTicketCategories().then((rsp) => {
        this.categories = rsp.data;
        if (this.category_id == null && this.categories.length > 0) {
          this.category_id = this.categories[0].id;
        }
      });
    },
    show(obj) {
      this.$refs.dialog.show();
      this.obj = obj;
      if (this.showCategory) {
        this.fetchCategories();
      }
    },
    close() {
      this.$refs.dialog.close();
      this.title = '';
      this.content = '';
      this.pinned = false;
      this.category_id = null;
      this.errorMsg = null;
      this.loading = false;
    },
    setErrorMessage(msg) {
      this.errorMsg = msg;
      this.loading = false;
    },
    setError(err) {
      this.errorMsg = this.utils.formatErrorMessage(err).text;
      this.loading = false;
    },
  },
};
</script>

<style scoped>

</style>
