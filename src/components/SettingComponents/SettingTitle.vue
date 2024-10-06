<template>
  <div>
    <div class="d-flex align-center">
      <h5 class="text-h5">
        <slot />
      </h5>
      <v-spacer />
      <v-tooltip
        v-if="docLink"
        location="left"
      >
        <template #activator="{ props }">
          <v-btn
            icon="mdi-book-open-variant"
            size="small"
            v-bind="props"
            :href="docLink"
            target="_blank"
            variant="text"
          />
        </template>
        {{ $t('_settings.documentationLink') }}
      </v-tooltip>
    </div>
    <v-divider
      v-if="divider"
      class="mb-3 mt-3"
    />
  </div>
</template>

<script>
import semver from 'semver';
import { version } from '../../../package.json';

export default {
  props: {
    divider: {
      type: Boolean,
      default: true,
    },
    docPath: {
      type: String,
      default: '',
    },
  },
  computed: {
    minorVer() {
      const ver = semver.coerce(version);

      return `${ver.major}.${ver.minor}`;
    },
    docLink() {
      return `https://docs.vyhub.net/${this.minorVer}${this.docPath}`;
    },
  },
};
</script>

<style scoped>

</style>
