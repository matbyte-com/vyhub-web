<script lang="ts" setup>
</script>

<template>
  <!-- News -->
  <v-card
    class="mb-2 card-rounded vh-shop-news"
  >
    <v-card-text>
      <div
        v-if="newsContent"
        class="ql-editor"
        v-html="newsContent"
      />
      <div v-else>
        {{ $t('noDataAvailable') }} (Shop Introduction)
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
