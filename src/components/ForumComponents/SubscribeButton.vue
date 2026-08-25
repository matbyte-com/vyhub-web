<template>
  <v-tooltip
    location="bottom"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        size="small"
        class="ml-1"
        variant="flat"
        :color="subscribed ? 'info' : 'surface'"
        :loading="loading"
        @click="toggle"
      >
        <v-icon :start="$vuetify.display.mdAndUp">
          {{ subscribed ? 'mdi-bell' : 'mdi-bell-outline' }}
        </v-icon>
        <span v-if="$vuetify.display.mdAndUp">
          {{ subscribed ? $t('_forum.unsubscribe') : $t('_forum.subscribe') }}
        </span>
      </v-btn>
    </template>
    {{ tooltip }}
  </v-tooltip>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  name: 'SubscribeButton',
  props: {
    thread: { type: Object, default: null },
    topic: { type: Object, default: null },
  },
  emits: ['changed'],
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    target() {
      return this.thread ?? this.topic;
    },
    subscribed() {
      return this.target?.subscribed === true;
    },
    tooltip() {
      const scope = this.thread ? 'Thread' : 'Topic';
      return this.subscribed
        ? this.$t(`_forum.subscribed${scope}`)
        : this.$t(`_forum.notSubscribed${scope}`);
    },
  },
  methods: {
    async toggle() {
      if (this.loading) { return; }
      this.loading = true;

      const active = !this.subscribed;
      const api = await openapi;

      try {
        const rsp = this.thread
          ? await api.forum_setThreadSubscription(this.thread.id, { active })
          : await api.forum_setTopicSubscription(this.topic.id, { active });

        // The endpoint is idempotent and returns the stored row, so trust it over the local guess.
        this.target.subscribed = rsp.data.active;
        this.$emit('changed', rsp.data.active);
      } catch (err) {
        this.utils.notifyUnexpectedError(err.response?.data ?? err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
