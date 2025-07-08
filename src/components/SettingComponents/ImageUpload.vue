<template>
  <div class="d-flex align-center">
    <v-file-input
      v-if="!rawUrlInput"
      v-model="image"
      :label="title"
      :loading="loading"
      :error-messages="errorMsg"
      :clearable="false"
      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff,image/x-icon"
      @update:model-value="uploadImage"
    >
      <template #append-inner>
        <v-btn
          flat
          variant="tonal"
          size="small"
          icon="mdi-close"
          @click.stop="image = null; image_url = null;"
        />
        <v-btn
          v-if="errorMsg"
          flat
          class="ml-1"
          variant="tonal"
          size="small"
          icon="mdi-swap-vertical"
          @click.stop="rawUrlInput = true;"
        />
      </template>
    </v-file-input>
    <v-text-field
      v-if="rawUrlInput"
      v-model="image_url"
      :label="title"
      :clearable="true"
    >
      <template #append-inner>
        <v-btn
          flat
          class="ml-1"
          variant="tonal"
          size="small"
          icon="mdi-swap-vertical"
          @click.stop="rawUrlInput = false;"
        />
      </template>
    </v-text-field>
    <v-tooltip
      open-on-hover
      target="cursor"
      class="ma-0 pa-0"
    >
      <template #activator="{ props }">
        <v-img
          v-if="image_url"
          :src="image_url"
          class="mb-5 ml-1"
          height="48"
          max-width="80"
          rounded
          contain
          v-bind="props"
        />
      </template>
      <v-card class="my-n2 mx-n4">
        <img
          :src="image_url"
          height="160"
          class=""
        >
      </v-card>
    </v-tooltip>
    <v-tooltip
      v-if="description"
      v-model="tooltipOpen"
      :open-on-hover="false"
      open-on-click
      location="top left"
      no-click-animation
      interactive
      @click:outside="tooltipOpen = false"
    >
      <template #activator="{ props }">
        <v-btn
          flat
          size="24"
          color="info"
          icon="mdi-information-symbol"
          class="ml-2 mb-5"
          v-bind="props"
        />
      </template>
      <p class="my-2 img-upload-tooltip">
        {{ description }}
      </p>
    </v-tooltip>
  </div>
</template>

<script>
import openapi from "../../api/openapi";
import imageCompression from "browser-image-compression";
import i18n from "@/plugins/i18n.js";

export default {
  props: {
    title: {
      type: String,
      default: i18n.global.t('imageURL'),
    },
    description: {
      type: String,
      default: null
    },
    node: {
      type: Object,
      required: false,
      default: null
    },
    statefulLayout: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      image: null,
      image_url: null,
      receivedContent: false,
      loading: false,
      errorMsg: null,
      tooltipOpen: false,
      rawUrlInput: false,
    };
  },
  watch: {
    image_url() {
      this.receivedContent = true;
      this.statefulLayout.input(this.node, this.image_url);
    },
    node() {
      this.loadContent();
    }
  },
  beforeMount() {
    this.loadContent();
  },
  methods: {
    loadContent() {
      if (!this.receivedContent && this.node.data) {
        this.image_url = this.node.data;
      }
    },
    async uploadImage() {
      if (this.image == null) return;

      console.log("Uploading Img");
      this.loading = true;

      const fileToUpload = await this.compressImage(this.image);
      const formData = new FormData();
      formData.append("image", fileToUpload);
      formData.append("file_size", fileToUpload.size);

      await (await openapi).general_uploadImage(null, formData).then((response) => {
        this.loading = false;
        this.image_url = response.data.url;
        this.statefulLayout.input(this.node, this.image_url);
        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success'
        });
      }).catch((error) => {
        this.errorMsg = error.response?.data?.detail || error.message
        this.loading = false;
        console.log("Upload error:", error);
      });
    },
    async compressImage(file) {
      const maxSizeBytes = 2 * 1000 * 1000;

      // Only compress if file is larger than 2MB
      if (file.size <= maxSizeBytes) {
        console.log('File is already under 2MB, no compression needed');
        return file;
      }

      try {
        const options = {
          maxSizeMB: 2,
          useWebWorker: true,
        };

        console.log('Original size:', (file.size / 1024 / 1024).toFixed(2), 'MB');

        const compressedFile = await imageCompression(file, options);

        console.log('Compressed size:', (compressedFile.size / 1024 / 1024).toFixed(2), 'MB');

        return compressedFile;
      } catch (error) {
        console.error('Compression failed:', error);
        throw new Error('Failed to compress image');
      }
    },
  }
};
</script>

<style>
div:has(> p.img-upload-tooltip) {
  color: white;
  background-color: rgb(var(--v-theme-info)) !important;
}

.img-upload-tooltip {
  color: white
}
</style>
