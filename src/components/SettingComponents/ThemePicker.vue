<script setup lang="ts">
import themes from '@/assets/predefinedThemes/index';
import EventBus from "@/services/EventBus";
import openapi from "@/api/openapi";
import {useStore} from "vuex";

const props = defineProps(['noDownload']);
const store = useStore();

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

async function downloadTheme() {
  let res = {}
  res.name = 'Test';
  res.description = 'Test';
  res.preview_img = 'https://picsum.photos/200/300';
  res.data = {};
  res['data']['general'] = store.state.generalConfig;
  res['data']['theme'] = store.state.theme;
  res['data']['shop_settings'] = store.state.shopConfig;

  // Filter
  res = filterValues(res);
  res = JSON.stringify(res, null, 2);
  const blob = new Blob([res], { type: 'application/json' });
  const link = document.createElement('a');
  link.download = "vyhub-theme.json";
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function filterValues(obj) {
  console.log(obj.data.general);
  obj.data.general = Object.fromEntries(Object.entries(obj.data.general).filter(([key]) => themes.allowedValues.general.includes(key)));
  obj.data.theme = Object.fromEntries(Object.entries(obj.data.theme).filter(([key]) => themes.allowedValues.theme.includes(key)));
  obj.data.shop_settings = Object.fromEntries(Object.entries(obj.data.shop_settings).filter(([key]) => themes.allowedValues.shop_settings.includes(key)));
  return obj;
}

async function uploadTheme() {
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
  <div class="d-flex align-center">
    <v-divider />
    <div class="text-no-wrap mx-3 text-h6">
      Custom
    </div>
    <v-divider />
  </div>
  <v-row>
    <v-col
      cols="4"
    >
      <v-card
        @click="downloadTheme()"
      >
        <v-sheet
          height="100px"
          color="surface-light"
          class="d-flex align-center justify-center"
        >
          <v-icon size="40">
            mdi-download
          </v-icon>
        </v-sheet>
        <v-card-title>Download</v-card-title>
        <v-card-text class="text-disabled">
          You can download the current theme here
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      cols="4"
    >
      <v-card
        @click="uploadTheme()"
      >
        <v-sheet
          height="100px"
          color="surface-light"
          class="d-flex align-center justify-center"
        >
          <v-icon size="40">
            mdi-upload
          </v-icon>
        </v-sheet>
        <v-card-title>Upload</v-card-title>
        <v-card-text class="text-disabled">
          You can upload any themes here
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped lang="sass">
</style>
