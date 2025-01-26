<script setup lang="ts">
import themes from '@/assets/predefinedThemes/index';
import EventBus from "@/services/EventBus";
import openapi from "@/api/openapi";
import {useStore} from "vuex";
import {notify} from "@kyvg/vue3-notification";
import {useTemplateRef} from "vue";

const props = defineProps(['noDownload']);
const store = useStore();

const confirmDialog = useTemplateRef('confirmationDialog')

const shopOnlyThemes = themes.themes.filter((theme) => theme.type == 'shop_only');
const fullManagementThemes = themes.themes.filter((theme) => theme.type == 'full_management');

async function setTheme(theme) {
  const general_config = theme.data.general;
  const theme_config = theme.data.theme;
  const shop_config = theme.data.shop_settings;
  Promise.allSettled([
    (await openapi).general_editConfig(null, general_config),
    (await openapi).shop_editConfig(null, shop_config),
    (await openapi).general_editTheme(null, theme_config)
  ]).then(() => {
    EventBus.emit('themeUpdated');
    EventBus.emit('advancedSettingsUpdated');
    confirmDialog.value.closeAndReset();
  })

  // TODO Maybe also import the page builder content
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

  // Download Homepage Content if enabled
  if (store.state.generalConfig.enable_landingpage) {
    const rsp = await (await openapi).design_getSections()
    res['data']['page_builder'] = rsp.data;
  }

  // Filter
  res = filterValues(res);
  res = JSON.stringify(res, null, 2);
  const blob = new Blob([res], {type: 'application/json'});
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

async function uploadTheme(event) {
  const file = event.target.files[0];
  let data = null;
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        data = JSON.parse(e.target.result);
        console.log("Uploaded file content:", data);
        data = filterValues(data);
        setTheme(data);
      } catch (error) {
        console.error("Invalid JSON file!", error);
        notify({
          title: 'Invalid JSON file!',
          text: error,
          type: 'error'
        });
      }
    };
    reader.readAsText(file);
  }
}
</script>

<template>
  <confirmation-dialog
    ref="confirmationDialog"
    @submit="setTheme"
  />
  <input
    ref="fileInput"
    type="file"
    accept=".json"
    style="display: none"
    @change="uploadTheme"
  >
  <div class="d-flex align-center mt-2 mb-2">
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
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <v-card
          class="fill-height"
          @click="$refs.confirmationDialog.show(theme)"
        >
          <v-img
            cover
            position="top"
            height="180px"
            :src="theme.preview_img"
          />
          <v-card-title>{{ theme.name }}</v-card-title>
          <v-card-text class="text-disabled">
            {{ theme.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <div class="d-flex align-center mt-6">
    <v-divider />
    <div class="text-no-wrap mx-3 text-h6 mb-2">
      Full Management System
    </div>
    <v-divider />
  </div>
  <div class="d-flex flex-wrap">
    <v-row>
      <v-col
        v-for="theme in fullManagementThemes"
        :key="theme.name"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <v-card
          class="fill-height"
          @click="$refs.confirmationDialog.show(theme)"
        >
          <v-img
            cover
            position="top"
            :src="theme.preview_img"
            height="180px"
          />
          <v-card-title>{{ theme.name }}</v-card-title>
          <v-card-text class="text-disabled">
            {{ theme.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <div class="d-flex align-center mt-6 mb-2">
    <v-divider />
    <div class="text-no-wrap mx-3 text-h6">
      Custom
    </div>
    <v-divider />
  </div>
  <v-row>
    <v-col
      v-if="!noDownload"
      cols="12"
      lg="3"
      md="4"
      sm="6"
    >
      <v-card
        class="fill-height"
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
      cols="12"
      lg="3"
      md="4"
      sm="6"
    >
      <v-card
        class="fill-height"
        @click="$refs.fileInput.click()"
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
          You can upload any theme here
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped lang="sass">
</style>
