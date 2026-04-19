<template>
  <div>
    <span
      v-if="title"
      class="text-subtitle-1"
    >{{ title }}</span>
    <Editor
      v-if="content !== null"
      v-model="content"
      class="mt-1"
    />
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: null,
    },
    node: {
      type: Object,
      required: true,
    },
    statefulLayout: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      content: "",
      receivedContent: false,
    };
  },
  watch: {
    content() {
      this.receivedContent = true;
      this.statefulLayout.input(this.node, this.content);
    },
    node() {
      this.loadContent();
    }
  },
  mounted() {
    this.loadContent();
  },
  methods: {
    loadContent() {
      if (!this.receivedContent && this.node.data) {
        this.content = this.node.data;
      }
    },
    setContent(content) {
      this.content = content;
    }
  }
};
</script>

<style scoped>

</style>
