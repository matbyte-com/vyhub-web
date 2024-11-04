<template>
  <div>
    <span class="text-subtitle-1">{{ label }}</span>
    <Editor
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
      content: null,
    };
  },
  watch: {
    content() {
      this.statefulLayout.input(this.node, this.content);
    },
  },
  beforeMount() {
    this.content = this.node.data;
  },
};
</script>

<style scoped>

</style>
