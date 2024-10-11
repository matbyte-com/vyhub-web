<template>
  <div>
    <span class="text-subtitle-1">{{ label }}</span>
    <Editor
      v-model="content"
      class="mt-1"
      v-on="{...on, change}"
    />
  </div>
</template>

<script>

export default {
  props: {
    value: { type: Array[String], default: '' },
    options: { type: Object, required: true },
    schema: { type: Object, required: true },
    fullSchema: { type: Object, required: true },
    fullKey: { type: String, required: true },
    label: { type: String, default: '' },
    htmlDescription: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    rules: { type: Array, required: true },
    on: { type: Object, required: true },
  },
  data() {
    return {
      content: null,
    };
  },
  beforeMount() {
    this.content = this.value;
  },
  methods: {
    change() {
      this.on.input(this.content);
    },
  },
};
</script>

<style scoped>

</style>
