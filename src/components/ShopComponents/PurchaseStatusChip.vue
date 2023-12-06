<template>
    <div>
      <v-chip class="white--text" v-if="status === 'CANCELLED'">
        {{ $t('_shop.purchaseStatus.cancelled') }}
      </v-chip>
      <v-chip class="white--text" v-if="status === 'OPEN'" color="info">
        {{ $t('_shop.purchaseStatus.open') }}
      </v-chip>
      <v-chip class="white--text" v-if="status === 'FINISHED'" color="green">
        {{ $t('_shop.purchaseStatus.finished') }}
      </v-chip>
      <v-chip class="white--text" v-if="status === 'REVOKED'" color="orange">
        {{ $t('_shop.purchaseStatus.revoked') }}
      </v-chip>
      <v-chip class="white--text" v-if="status === 'REFUNDED'" color="red">
        {{ $t('_shop.purchaseStatus.refunded') }}
      </v-chip>
      <v-chip class="white--text" v-if="status === 'RECURRING'" color="purple">
        {{ $t('_shop.purchaseStatus.recurring') }}
      </v-chip>
    </div>
</template>

<script>
export default {
  name: 'PurchaseStatusChip',
  props: {
    status: String,
  },
};
</script>

<style scoped>

</style>
