<template>
  <confirmation-dialog ref="cancelPurchaseConfirmationDialog"
                       @submit="$emit('submit')"
                       :btn-cancel-text="$t('close')"
                       :btn-text="$t('_shop.labels.cancelPurchase')"
                       :text="$t('_shop.messages.cancelPurchaseConfirmation')"/>
</template>

<script>

import ConfirmationDialog from '../ConfirmationDialog.vue';

export default {
  name: 'CancelPurchaseConfirmationDialog',
  components: {
    ConfirmationDialog,
  },
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
