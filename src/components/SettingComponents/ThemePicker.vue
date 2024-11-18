<script setup lang="ts">
import themes from '@/assets/predefinedThemes';

const props = defineProps(['noDownload']);

const shopOnlyThemes = themes.themes.filter((theme) => theme.type == 'shop_only');
const fullManagementThemes = themes.themes.filter((theme) => theme.type == 'full_management');
</script>

<template>
  <div class="d-flex align-center">
    <v-divider />
    <div class="text-no-wrap mx-3 text-h6">
      Shop Only
    </div>
    <v-divider />
  </div>
  <div class="d-flex flex-wrap">
    <v-card
      v-for="theme in shopOnlyThemes"
      :key="theme.name"
    >
      <v-img :src="theme.preview_img" />
      <v-card-title>{{ theme.name }}</v-card-title>
    </v-card>
  </div>
  <div class="d-flex align-center">
    <v-divider />
    <div class="text-no-wrap mx-3 text-h6">
      Full Management System
    </div>
    <v-divider />
  </div>
  <div class="d-flex flex-wrap">
    <v-card>
      <v-img src="https://picsum.photos/200/300" />
      <v-card-title>Theme 1</v-card-title>
    </v-card>
  </div>
</template>

<style scoped lang="sass">
</style>
