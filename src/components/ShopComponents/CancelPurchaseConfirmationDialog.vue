<template>
  <confirmation-dialog
    ref="cancelPurchaseConfirmationDialog"
    :btn-cancel-text="$t('close')"
    :btn-text="$t('_shop.labels.cancelPurchase')"
    :text="$t('_shop.messages.cancelPurchaseConfirmation')"
    @submit="$emit('submit')"
  />
</template>

<script>
export default {
  methods: {
    show() {
      this.$refs.cancelPurchaseConfirmationDialog.show();
    },
    closeAndReset() {
      this.$refs.cancelPurchaseConfirmationDialog.closeAndReset();
    },
  },
};
</script>

<style scoped>

</style>
