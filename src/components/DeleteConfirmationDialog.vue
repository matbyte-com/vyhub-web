<template>
  <ConfirmationDialog
    ref="deleteConfirmationDialog"
    btn-icon="mdi-delete"
    :btn-text="$t('delete')"
    :text="text"
    :countdown="countdown"
    @submit="submit"
  >
    <template
      v-for="(index, name) in $slots"
      #[name]
    >
      <slot :name="name" />
    </template>
  </ConfirmationDialog>
</template>

<script>
export default {
  props: {
    text: String,
    countdown: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    cancel() {
      this.$refs.deleteConfirmationDialog.cancel();
    },
    closeAndReset() {
      this.$refs.deleteConfirmationDialog.closeAndReset();
    },
    submit(item) {
      this.$emit('submit', item);
    },
    show(item) {
      this.$refs.deleteConfirmationDialog.show(item);
    },
    setErrorMessage(text) {
      this.$refs.deleteConfirmationDialog.setErrorMessage(text);
    },
    setError(err) {
      this.$refs.deleteConfirmationDialog.setError(err);
    },
  },
};
</script>

<style scoped>

</style>
