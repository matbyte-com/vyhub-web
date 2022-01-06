<template>
  <Dialog ref="dialog" :title="dialogTitle" icon="mdi-newspaper-variant-outline">
    <v-row v-if="errorMsg != null">
      <v-col cols="12" class="mt-4">
        <v-alert
          type="error"
        >
          {{ errorMessage }}
        </v-alert>
      </v-col>
    </v-row>
    <v-text-field v-if="!hideTitleInput" :label="$t('_ticket.title')"
                  v-model="title"></v-text-field>
    <editor v-model="content" label="test" :class="hideTitleInput ? 'mt-3' : ''"/>
    <template v-slot:actions>
      <v-btn text color="primary" @click="$emit('submit')">
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
import Dialog from '../Dialog.vue';
import config from '../../config';
import i18n from '../../plugins/i18n';
import Editor from '@/components/Editor.vue';

export default {
  name: 'ThreadAddDialog',
  components: {
    Editor,
    Dialog,
  },
  props: ['dialogTitle', 'hideTitleInput'],
  data() {
    return {
      title: '',
      content: '',
      loading: false,
      errorMsg: null,
    };
  },
  methods: {
    getData() {
      if (this.content.length > config.html_max_input_length) {
        this.errorMsg = i18n.t('maxInputExceeded', { length: config.html_max_input_length });
        return {};
      }
      this.loading = true;
      return {
        title: this.title,
        content: this.content,
      };
    },
    show() {
      this.$refs.dialog.show();
    },
    close() {
      this.$refs.dialog.close();
      this.title = '';
      this.content = '';
      this.errorMsg = null;
      this.loading = false;
    },
    setErrorMessage(msg) {
      this.errorMsg = msg;
      this.loading = false;
    },
  },
};
</script>

<style scoped>

</style>
