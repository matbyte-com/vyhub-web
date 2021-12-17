<template>
  <div>
    <v-list-item :to="{path: $route.path, query: { personal_settings: 'true' } }">
      <v-icon left>mdi-account</v-icon>
      <v-list-item-title>
        {{ $t('personalSettings') }}
      </v-list-item-title>
    </v-list-item>
  </div>
</template>

<script>
import PersonalSettings from '@/components/PersonalSettings.vue';

export default {
  name: 'PersonalSettingsLinkItem',
  components: { },
};
</script>

<style scoped>

</style>
