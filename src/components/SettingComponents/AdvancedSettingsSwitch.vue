<template>
  <v-card variant="flat">
    <div class="d-flex align-center justify-center">
      <span>
        {{ $t('_settings.advancedSettings') }}
      </span>
      <v-switch
        v-model="model"
        hide-details="auto"
        class="ml-2"
        @update:model-value="toggleAdvancedSettings"
      />
    </div>
  </v-card>
</template>

<script>
import openapi from '@/api/openapi';
import EventBus from '@/services/EventBus';

export default {
  name: 'AdvancedSettingsSwitch',
  data() {
    return {
      model: false,
    };
  },
  mounted() {
    if (this.$store.getters.generalConfig) {
      this.model = this.$store.getters.generalConfig.show_advanced_settings;
    } else {
      this.model = false;
    }
  },
  methods: {
    async toggleAdvancedSettings(val) {
      (await openapi).general_editConfig(null, { show_advanced_settings: val }).then(() => {
        // caught in App.vue to Update Theme + Header
        EventBus.emit('themeUpdated');
        // caught in Settings.vue to rerender the Forms
        EventBus.emit('advancedSettingsUpdated');
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
      }).catch(() => {
        this.model = !val;
      });
    },
  },
};
</script>

<style scoped>

</style>
