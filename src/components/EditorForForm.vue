<template>
  <div>
    <!-- TODO Label not working -->
    <span class="text-subtitle-1">{{ node.layout.label }}</span>
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
    }
  }
};
</script>

<style scoped>

</style>
