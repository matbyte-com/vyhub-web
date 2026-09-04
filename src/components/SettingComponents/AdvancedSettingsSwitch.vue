<template>
  <v-card
    variant="flat"
    color="surface-bright"
  >
    <div class="d-flex align-center justify-center">
      <span>
        {{ $t('_settings.advancedSettings') }}
      </span>
      <v-switch
        v-model="model"
        color="primary"
        hide-details="auto"
        class="ml-2"
        @update:model-value="toggleAdvancedSettings"
      />
    </div>
  </v-card>
</template>

<script>
import openapi from '@/api/openapi';
import { useVyHubStore } from '@/store';

export default {
  data() {
    return {
      model: false,
    };
  },
  computed: {
    store() {
      return useVyHubStore();
    },
  },
  mounted() {
    if (this.store.generalConfig) {
      this.model = this.store.generalConfig.show_advanced_settings;
    } else {
      this.model = false;
    }
  },
  methods: {
    async toggleAdvancedSettings(val) {
      (await openapi).general_editConfig(null, { show_advanced_settings: val }).then(() => {
        // Forms (e.g. ServerForm) read show_advanced_settings at build time, so a
        // full reload is needed for the change to take effect everywhere.
        window.location.reload();
      }).catch(() => {
        this.model = !val;
      });
    },
  },
};
</script>

<style scoped>

</style>
