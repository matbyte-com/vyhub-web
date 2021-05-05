<template>
    <div>
      <v-chip v-if="status === 'CANCELLED'">{{ $t('cancelled') }}</v-chip>
      <v-chip v-if="status === 'OPEN'" color="info">{{ $t('open') }}</v-chip>
      <v-chip v-if="status === 'FINISHED'" color="green">{{ $t('finished') }}</v-chip>
      <v-chip v-if="status === 'REVOKED'" color="orange">
        {{ $t('_purchases.labels.revoked') }}
      </v-chip>
      <v-chip v-if="status === 'REFUNDED'" color="red">
        {{ $t('_purchases.labels.refunded') }}
      </v-chip>
      <v-chip v-if="status === 'RECURRING'" color="purple">{{ $t('recurring') }}</v-chip>
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
