<template>
  <div>
    <div class="d-flex align-center">
      <h5 class="text-h5"><slot></slot></h5>
      <v-spacer />
      <v-tooltip left v-if="docLink">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-bind="attrs" v-on="on" :href="docLink" target="_blank">
            <v-icon>
              mdi-book-open-variant
            </v-icon>
          </v-btn>
        </template>
        {{ $t('_settings.documentationLink') }}
      </v-tooltip>
    </div>
    <v-divider v-if="divider" class="mb-3 mt-3"></v-divider>
  </div>
</template>

<script>
import semver from 'semver';
import { version } from '../../../package.json';

export default {
  name: 'SettingTitle',
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
