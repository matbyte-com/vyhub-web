<template>
  <div>
    <v-chip
      v-if="status === 'CANCELLED'"
      class="text-white"
    >
      {{ $t('_shop.purchaseStatus.cancelled') }}
    </v-chip>
    <v-chip
      v-if="status === 'OPEN'"
      class="text-white"
      color="info"
    >
      {{ $t('_shop.purchaseStatus.open') }}
    </v-chip>
    <v-chip
      v-if="status === 'FINISHED'"
      class="text-white"
      color="green"
    >
      {{ $t('_shop.purchaseStatus.finished') }}
    </v-chip>
    <v-chip
      v-if="status === 'REVOKED'"
      class="text-white"
      color="orange"
    >
      {{ $t('_shop.purchaseStatus.revoked') }}
    </v-chip>
    <v-chip
      v-if="status === 'REFUNDED'"
      class="text-white"
      color="red"
    >
      {{ $t('_shop.purchaseStatus.refunded') }}
    </v-chip>
    <v-chip
      v-if="status === 'RECURRING'"
      class="text-white"
      color="purple"
    >
      {{ $t('_shop.purchaseStatus.recurring') }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    status: String,
  },
};
</script>

<style scoped>

</style>
