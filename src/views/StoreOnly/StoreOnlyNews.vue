<script lang="ts" setup>
import {useStore} from "vuex";

const store = useStore();
</script>

<template>
  <!-- News -->
  <v-card
    class="mb-2 card-rounded vh-shop-news"
  >
    <v-card-text>
      <div
        v-if="store.state.shopConfig?.news"
        class="ql-editor"
        v-html="store.state.shopConfig?.news"
      />
      <div v-else>
        {{ $t('noDataAvailable') }} (Shop Introduction)
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
