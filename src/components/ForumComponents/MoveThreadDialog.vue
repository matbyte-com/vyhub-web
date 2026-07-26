<template>
  <Dialog
    ref="dialog"
    :title="$t('_forum.moveThread')"
    icon="mdi-folder-move"
    :max-width="600"
  >
    <v-alert
      v-if="errorMsg != null"
      type="error"
      class="mt-4"
    >
      {{ errorMsg }}
    </v-alert>
    <v-card
      flat
      border
      class="mt-3"
    >
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-autocomplete
            v-model="selectedTopicId"
            :items="topicItems"
            item-title="title"
            item-value="value"
            :label="$t('_forum.selectDestinationTopic')"
            :loading="loading"
            variant="underlined"
            hide-details="auto"
            autofocus
          >
            <template #item="{ props, internalItem: item }">
              <v-list-item
                v-bind="props"
                :title="item.raw.title"
                :subtitle="item.raw.subtitle"
              />
            </template>
          </v-autocomplete>
          <v-btn
            variant="outlined"
            color="success"
            class="mt-4"
            :disabled="selectedTopicId == null"
            @click="submit"
          >
            <v-icon start>
              mdi-check
            </v-icon>
            {{ $t('submit') }}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </Dialog>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  emits: ['submit'],
  data() {
    return {
      obj: null,
      threadId: null,
      currentTopicId: null,
      selectedTopicId: null,
      topicItems: [],
      loading: false,
      errorMsg: null,
    };
  },
  methods: {
    async fetchTopics() {
      this.loading = true;
      try {
        const rsp = await (await openapi).forum_getTopicCategories();
        const items = [];
        (rsp.data || []).forEach((category) => {
          (category.topics || []).forEach((topic) => {
            if (topic.id === this.currentTopicId) return;
            items.push({
              title: topic.title,
              subtitle: category.title,
              value: topic.id,
            });
          });
        });
        this.topicItems = items;
      } finally {
        this.loading = false;
      }
    },
    show(thread) {
      this.obj = thread;
      this.threadId = thread.id;
      this.currentTopicId = thread.topic ? thread.topic.id : null;
      this.selectedTopicId = null;
      this.errorMsg = null;
      this.topicItems = [];
      this.$refs.dialog.show();
      this.fetchTopics();
    },
    close() {
      this.$refs.dialog.close();
      this.selectedTopicId = null;
      this.errorMsg = null;
    },
    getData() {
      return { topic_id: this.selectedTopicId };
    },
    setError(err) {
      this.errorMsg = err;
    },
    submit() {
      if (this.selectedTopicId == null) return;
      this.$emit('submit', this.obj, this.getData());
    },
  },
};
</script>
