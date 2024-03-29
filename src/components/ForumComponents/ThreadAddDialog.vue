<template>
  <Dialog ref="dialog" :title="dialogTitle" icon="mdi-newspaper-variant-outline" :max-width="1000">
    <v-row v-if="errorMsg != null">
      <v-col cols="12" class="mt-4">
        <v-alert
          type="error">
          {{ errorMsg }}
        </v-alert>
      </v-col>
    </v-row>
    <v-text-field v-if="!hideTitleInput" :label="$t('title')"
                  v-model="title" />
    <editor v-model="content" :class="hideTitleInput ? 'mt-3' : ''"/>
    <template v-slot:actions>
      <v-btn text color="primary" @click="$emit('submit', obj)" v-if="content !== ''"
             :disabled="!hideTitleInput && (title == null || title === '')">
        <v-progress-circular v-if="loading" indeterminate size="25" width="2"/>
        <v-icon v-if="!loading" left>mdi-check</v-icon>
        <div v-if="!loading">
          {{ $t('submit') }}
        </div>
      </v-btn>
      <v-btn color="lighten-5" text @click="close">
        <v-icon left>mdi-close</v-icon>
        {{ $t('cancel') }}
      </v-btn>
    </template>
  </Dialog>
</template>

<script>
import Editor from '@/components/Editor.vue';
import Dialog from '../Dialog.vue';
import config from '../../config';
import i18n from '../../plugins/i18n';

export default {
  name: 'ThreadAddDialog',
  components: {
    Editor,
    Dialog,
  },
  props: ['dialogTitle', 'hideTitleInput'],
  data() {
    return {
      title: null,
      content: null,
      ban_id: '',
      topic_id: '',
      pinned: false,
      loading: false,
      errorMsg: null,
      obj: null,
    };
  },
  methods: {
    getData() {
      if (this.content && this.content.length > config.html_max_input_length) {
        this.errorMsg = i18n.t('maxInputExceeded', { length: config.html_max_input_length });
        return {};
      }
      this.loading = true;
      return {
        title: this.title,
        content: this.content || '',
        pinned: this.pinned,
      };
    },
    show(obj) {
      this.$refs.dialog.show();
      this.obj = obj;
    },
    close() {
      this.$refs.dialog.close();
      this.title = '';
      this.content = '';
      this.pinned = false;
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
