<script setup lang="ts">
import themes from '@/assets/predefinedThemes/index';
import EventBus from "@/services/EventBus";
import openapi from "@/api/openapi";

const props = defineProps(['noDownload']);

const shopOnlyThemes = themes.themes.filter((theme) => theme.type == 'shop_only');
const fullManagementThemes = themes.themes.filter((theme) => theme.type == 'full_management');

async function setTheme(theme) {
  const general_config = theme.data.general;
  const theme_config = theme.data.theme;
  const shop_config = theme.data.shop_settings;
  console.log(general_config, theme_config, shop_config);
  (await openapi).general_editConfig(null, general_config).then(() => {
  });
  (await openapi).shop_editConfig(null, shop_config).then(() => {
  });
  (await openapi).general_editTheme(null, theme_config).then(() => {
  });
  EventBus.emit('themeUpdated');
}
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
    <v-row>
      <v-col
        v-for="theme in shopOnlyThemes"
        :key="theme.name"
        cols="4"
      >
        <v-card
          @click="setTheme(theme)"
        >
          <v-img :src="theme.preview_img" />
          <v-card-title>{{ theme.name }}</v-card-title>
          <v-card-text class="text-disabled">
            {{ theme.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <div class="d-flex align-center">
    <v-divider />
    <div class="text-no-wrap mx-3 text-h6">
      Full Management System
    </div>
    <v-divider />
  </div>
  <div class="d-flex flex-wrap">
    <v-row>
      <v-col
        v-for="theme in fullManagementThemes"
        :key="theme.name"
        cols="4"
      >
        <v-card
          @click="setTheme(theme)"
        >
          <v-img :src="theme.preview_img" />
          <v-card-title>{{ theme.name }}</v-card-title>
          <v-card-text class="text-disabled">
            {{ theme.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="sass">
</style>
