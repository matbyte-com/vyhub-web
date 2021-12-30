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
    <v-divider v-if="divider" class="mb-1"></v-divider>
  </div>
</template>

<script>
export default {
  name: 'SettingTitle',
  props: {
    divider: {
      type: Boolean,
      default: true,
    },
    docLink: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>

</style>
